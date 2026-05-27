"use client";

import { useEffect, useState } from "react";
import QuestionTypeBar from "./QuestionTypeBar";
import { getQuestionsBySession, type Question } from "@/lib/api/questions";
import { socket } from "@/lib/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";

type QuestionFormProps = {
  sessionId: string;
};

type QuestionUpvotedPayload = {
  id: string;
  upvotes: number;
};

const formatTimeAgo = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 10) return "now";
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h`;
  return `${Math.floor(diff / 86400)} j`;
};

export default function QuestionForm({ sessionId }: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [socketError, setSocketError] = useState<string | null>(null);
  const [upvotedQuestionIds, setUpvotedQuestionIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await getQuestionsBySession(sessionId);
        setQuestions(data);
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    }

    loadQuestions();
  }, [sessionId]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_session", sessionId);

    socket.on("session_joined", () => {
      setSocketError(null);
    });

    socket.on("new_question", (newQuestion: Question) => {
      setQuestions((currentQuestions) => {
        const alreadyExists = currentQuestions.some(
          (question) => question.id === newQuestion.id
        );

        if (alreadyExists) {
          return currentQuestions;
        }

        return [newQuestion, ...currentQuestions].sort(
          (a, b) => b.upvotes - a.upvotes
        );
      });
    });

    socket.on("question_upvoted", (payload: QuestionUpvotedPayload) => {
      setQuestions((currentQuestions) =>
        currentQuestions
          .map((question) =>
            question.id === payload.id
              ? { ...question, upvotes: payload.upvotes }
              : question
          )
          .sort((a, b) => b.upvotes - a.upvotes)
      );
    });

    socket.on("error", (error: { message?: string }) => {
      setSocketError(error.message ?? "Socket error");
    });

    return () => {
      socket.off("session_joined");
      socket.off("new_question");
      socket.off("question_upvoted");
      socket.off("error");
    };
  }, [sessionId]);

  const handleAddQuestion = () => {
    if (question.trim() === "") return;

    socket.emit("post_question", {
      content: question.trim(),
      authorName: authorName.trim() || undefined,
    });

    setQuestion("");
  };

  const handleUpvote = (questionId: string) => {
    if (upvotedQuestionIds.has(questionId)) return;

    setUpvotedQuestionIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(questionId);
      return nextIds;
    });

    socket.emit("upvote_question", questionId);
  };

  return (
    <div className="w-full rounded-[28px] border border-border bg-background p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
            Live Q&A
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-text-main">
            Ask the speaker
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            Most-liked questions float to the top.
          </p>

          {socketError && (
            <p className="mt-3 text-sm text-red-400">{socketError}</p>
          )}
        </div>

        <div className="pt-2 text-[11px] uppercase tracking-[0.35em] text-text-muted">
          {questions.length} Questions
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <input
          type="text"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          placeholder="Your name (optional)"
          className="
            w-full
            rounded-2xl
            border border-border
            bg-background/50
            px-5 py-3
            text-sm text-text-main
            outline-none
            transition
            placeholder:text-text-muted
            focus:border-primary/50
          "
        />

        <QuestionTypeBar
          question={question}
          setQuestion={setQuestion}
          handleAddQuestion={handleAddQuestion}
        />
      </div>

      <div className="mt-8 space-y-4">
        {questions.map((question) => {
          const isUpvoted = upvotedQuestionIds.has(question.id);

          return (
            <div
              key={question.id}
              className="
                flex items-start justify-between
                rounded-3xl
                border border-border
                bg-background/50
                p-6
                gap-4
              "
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-text-main font-medium">
                    {question.authorName ?? "Anonymous"}
                  </p>

                  <span className="text-xs text-text-muted">
                    {formatTimeAgo(question.createdAt)}
                  </span>
                </div>

                <p className="text-text-muted">{question.content}</p>
              </div>

              <button
                type="button"
                onClick={() => handleUpvote(question.id)}
                disabled={isUpvoted}
                className={`
                  inline-flex items-center gap-2
                  rounded-full
                  border
                  px-4 py-2
                  text-sm
                  transition
                  ${
                    isUpvoted
                      ? "border-primary/50 bg-primary/10 text-primary cursor-default"
                      : "border-border bg-background text-text-muted hover:border-primary/50 hover:text-primary"
                  }
                `}
              >
                <FontAwesomeIcon
                  icon={isUpvoted ? faThumbsUpSolid : faThumbsUpRegular}
                  className="h-4 w-4"
                />
                <span>{question.upvotes}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}