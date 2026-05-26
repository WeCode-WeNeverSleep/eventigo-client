"use client";

import { useEffect, useState } from "react";
import {
  fetchSpeakersWithSessions,
  type BackendSpeaker,
} from "@/lib/api/speakers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function getLinkIcon(url: string) {
  if (url.includes("twitter.com") || url.includes("x.com")) return faXTwitter;
  if (url.includes("linkedin.com")) return faLinkedin;
  if (url.includes("github.com")) return faGithub;
  return faGlobe;
}

function getCleanLinkLabel(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    if (domain === "linkedin.com") {
      const pathParts = new URL(url).pathname.split("/").filter(Boolean);
      return pathParts[1] ? `@${pathParts[1]}` : "LinkedIn";
    }
    if (
      domain === "twitter.com" ||
      domain === "x.com" ||
      domain === "github.com"
    ) {
      const handle = new URL(url).pathname.replace(/\//g, "");
      return handle ? `@${handle}` : domain;
    }
    return domain;
  } catch {
    return "Website";
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function SpeakerComponent() {
  const [activeSpeaker, setActiveSpeaker] = useState<BackendSpeaker | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const speakerData = await fetchSpeakersWithSessions();
        const now = new Date();

        const currentLiveSpeaker = speakerData.find((speaker) =>
          speaker.sessions?.some((session) => {
            const start = new Date(session.startTime);
            const end = new Date(session.endTime);
            return now >= start && now <= end;
          }),
        );

        setActiveSpeaker(currentLiveSpeaker || speakerData[0] || null);
      } catch (error) {
        console.error("Error loading speaker component matrix:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full rounded-3xl border border-slate-850 bg-background p-8 text-text-muted font-mono text-xs tracking-widest uppercase animate-pulse shadow-[0_0_40px_rgba(0,0,0,0.35)]">
        Loading Presentation Profile...
      </div>
    );
  }

  if (!activeSpeaker) {
    return (
      <div className="w-full rounded-3xl border border-border bg-background p-8 text-center text-text-muted font-sans text-sm shadow-[0_0_40px_rgba(0,0,0,0.35)]">
        No speaker profiles assigned to this session window.
      </div>
    );
  }

  const currentSession = activeSpeaker.sessions?.[0];

  return (
    <div className="w-full rounded-3xl border border-border bg-background p-6 md:p-8 text-text-main shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <h2 className="text-[11px] font-mono tracking-[0.2em] text-primary font-bold uppercase mb-6">
        Speaker
      </h2>

      <div className="flex items-center gap-4 mb-6">
        {activeSpeaker.avatarUrl ? (
          <img
            src={activeSpeaker.avatarUrl}
            alt={activeSpeaker.fullName}
            className="h-16 w-16 rounded-full object-cover border border-border shadow-[0_0_15px_rgba(34,211,238,0.15)]"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg font-sans shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            {getInitials(activeSpeaker.fullName)}
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          <h3 className="font-sans font-bold text-xl text-text-muted tracking-tight leading-tight">
            {activeSpeaker.fullName}
          </h3>
          {currentSession && (
            <p className="font-sans text-xs text-text-muted font-medium">
              Presenter •{" "}
              <span className="text-text-muted">
                {currentSession.room?.name || "Main Stage"}
              </span>
            </p>
          )}
        </div>
      </div>

      <p className="font-sans text-sm text-text-muted leading-relaxed mb-6 whitespace-pre-line">
        {activeSpeaker.bio ||
          "No biography details shared for this speaker profile node."}
      </p>

      {activeSpeaker.links && activeSpeaker.links.length > 0 && (
        <div className="flex flex-col gap-3 pt-2 border-t border-slate-900">
          {activeSpeaker.links.map((linkStr, idx) => (
            <a
              key={`${linkStr}-${idx}`}
              href={linkStr}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm text-text-muted hover:text-primary transition-colors duration-200 w-fit"
            >
              <FontAwesomeIcon
                icon={getLinkIcon(linkStr)}
                className="h-4 w-4 text-primary group-hover:text-primary transition-colors"
              />
              <span className="font-sans tracking-wide">
                {getCleanLinkLabel(linkStr)}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
