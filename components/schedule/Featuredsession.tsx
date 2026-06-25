import { Session } from "@/types/sessions";
import { formatTime } from "@/utils/date";

interface FeaturedSessionProps {
    session: Session;
}

export function FeaturedSession({ session }: FeaturedSessionProps) {
    return (
        <div className="relative rounded-2xl p-6 overflow-hidden border border-[rgba(15,241,206,0.18)] bg-gradient-to-br from-[rgba(15,241,206,0.07)] to-[#0b1120]">
            <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(15,241,206,0.12)_0%,transparent_70%)] translate-x-1/3 -translate-y-1/3" />

            <div className="flex items-start justify-between mb-3">
                <div>
                    {session.isLive && (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest px-2 py-1 rounded bg-[#e5294a] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              EN DIRECT
            </span>
                    )}
                </div>
                <span className="text-[9px] tracking-widest text-white/30 uppercase">
          {session.room.name}
        </span>
            </div>

            <p className="text-[10px] tracking-widest text-white/35 mb-2 uppercase">
                Session
            </p>
            <h2 className="text-lg font-bold leading-snug tracking-tight text-white max-w-md mb-4">
                {session.title}
            </h2>

            {session.speakers.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    {session.speakers.map((sp) => (
                        <div key={sp.id} className="flex items-center gap-1.5">
                            {sp.profilePictureUrl ? (
                                <img
                                    src={sp.profilePictureUrl}
                                    alt={sp.fullName}
                                    className="w-5 h-5 rounded-full object-cover ring-1 ring-white/10"
                                />
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-[rgba(15,241,206,0.2)] flex items-center justify-center text-[8px] text-[#0ff1ce] font-bold">
                                    {sp.fullName.charAt(0)}
                                </div>
                            )}
                            <span className="text-[11px] text-white/50">{sp.fullName}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-5 flex-wrap">
        <span className="flex items-center gap-1.5 text-[11px] text-white/40">
          <ClockIcon />
            {formatTime(session.startTime)} – {formatTime(session.endTime)}
        </span>
                <span className="flex items-center gap-1.5 text-[11px] text-white/40">
          <PinIcon />
                    {session.room.name}
        </span>
                {session.capacity != null && (
                    <span className="flex items-center gap-1.5 text-[11px] text-white/40">
            <PeopleIcon />
                        {session.capacity} places
          </span>
                )}
            </div>
        </div>
    );
}

function ClockIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
    );
}
function PinIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    );
}
function PeopleIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
    );
}