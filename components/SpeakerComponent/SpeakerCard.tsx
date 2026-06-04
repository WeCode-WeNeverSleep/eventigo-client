"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons";

import { SpeakerCardProps } from "@/types/speakerCardProps";

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="border border-border rounded-4xl p-6 bg-background hover:bg-surface transition-colors h-full flex flex-col w-full max-w-sm px-4 cursor-pointer hover:border-primary/30 group shadow-[0_0_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-colors flex-shrink-0 overflow-hidden bg-secondary/50">
          <img
            src={speaker.profilePictureUrl}
            alt={speaker.fullName}
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors leading-tight text-text-main">
            {speaker.fullName}
          </h3>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-grow">
        {speaker.bio}
      </p>

      <div className="border-t border-border/50 mb-4" />

      {speaker.externalLinks && speaker.externalLinks.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {speaker.externalLinks.slice(0, 2).map((link, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs text-primary border border-border rounded-3xl px-3 py-1 hover:bg-background transition-colors"
            >
              <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
              <span>{link.split("//")[1]?.split("/")[0] || "Link"}</span>
            </a>
          ))}

          {speaker.externalLinks.length > 2 && (
            <span className="text-xs text-muted-foreground flex items-center">
              +{speaker.externalLinks.length - 2}
            </span>
          )}
        </div>
      )}

      <button className="flex items-center justify-center gap-2 text-primary hover:bg-background text-sm font-medium transition-colors border border-border rounded-4xl py-2 group-hover:border-primary/30">
        View Profile
        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
      </button>
    </div>
  );
}
