import { Session } from "@/types/sessions";
import { formatTime } from "@/utils/date";

interface SessionRowProps {
    session: Session;
}

export function SessionRow({ session }: SessionRowProps) {
    return (
        <div className="group rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer transition-all bg-white/[0.03] border border-white/[0.05] hover:border-[rgba(15,241,206,0.15)] hover:bg-white/[0.05]">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    {session.isLive && (
                        <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#e5294a]/90 text-white">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
                    )}
                    <p className="text-[9px] tracking-widest text-white/28 uppercase truncate">
                        {session.room.name}
                    </p>
                </div>

                <h3 className="text-[13px] font-semibold text-white/85 tracking-tight leading-snug truncate mb-1.5">
                    {session.title}
                </h3>

                <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-[10px] text-white/30">
            <ClockIcon />
              {formatTime(session.startTime)} – {formatTime(session.endTime)}
          </span>
                    {session.speakers.length > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-white/30 truncate">
              <PersonIcon />
                            {session.speakers.map((s) => s.fullName).join(", ")}
            </span>
                    )}
                </div>
            </div>

            <svg
                className="shrink-0 ml-3 text-white/20 group-hover:text-[rgba(15,241,206,0.4)] transition-colors"
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
                <path d="M9 18l6-6-6-6" />
            </svg>
        </div>
    );
}

function ClockIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
    );
}
function PersonIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    );
}