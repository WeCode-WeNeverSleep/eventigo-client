"use client";

import { useState } from "react";
import QuestionTypeBar from "./QuestionTypeBar";

export default function QuestionForm() {
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState<string[]>([]);

    const handleAddQuestion = () => {
        if (question.trim() === "") return;

        setQuestions([question, ...questions]);
        setQuestion("");
    };

    const handleDeleteQuestion = (indexToDelete: number) => {
        setQuestions(
            questions.filter((_, index) => index !== indexToDelete)
        );
    };

    return (
        <div
            className="
        w-full
        max-w-3xl
        rounded-[28px]
        border border-[#132238]
        bg-[#07101D]
        p-8
        shadow-[0_0_40px_rgba(0,0,0,0.35)]
        ml-5
      "
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00C2FF]">
                        Live Q&A
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold text-white">
                        Ask the speaker
                    </h1>

                    <p className="mt-2 text-sm text-[#718096]">
                        Most-liked questions float to the top.
                    </p>
                </div>

                <div className="pt-2 text-[11px] uppercase tracking-[0.35em] text-[#718096]">
                    {questions.length} Questions
                </div>
            </div>

            <div className="mt-8">
                <QuestionTypeBar
                    question={question}
                    setQuestion={setQuestion}
                    handleAddQuestion={handleAddQuestion}
                />
            </div>

            <div className="mt-8 space-y-4">
                {questions.map((item, index) => (
                    <div
                        key={index}
                        className="
                              flex items-center justify-between
                              rounded-3xl
                              border border-[#122033]
                              bg-[#040B16]
                              p-6
                            "
                    >
                        <p className="text-white">{item}</p>

                        <button
                            onClick={() => handleDeleteQuestion(index)}
                            className="
                                rounded-full
                                border border-red-500/30
                                bg-red-500/10
                                px-4 py-2
                                text-sm text-red-400
                                transition
                                hover:bg-red-500/20
                              "
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}