"use client";

import { formatDayLabel } from "@/utils/date";

interface DayTabsProps {
    days: string[];
    activeDay: string;
    onChange: (day: string) => void;
}

export function DayTabs({ days, activeDay, onChange }: DayTabsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {days.map((day) => {
                const isActive = day === activeDay;
                const date = new Date(day);
                const dayNum = date.getDate();
                const dayShort = date
                    .toLocaleDateString("fr-FR", { weekday: "short" })
                    .toUpperCase()
                    .replace(".", "");
                const monthShort = date
                    .toLocaleDateString("fr-FR", { month: "short" })
                    .toUpperCase()
                    .replace(".", "");

                return (
                    <button
                        key={day}
                        onClick={() => onChange(day)}
                        className={[
                            "flex flex-col items-center px-5 py-3 rounded-xl transition-all cursor-pointer shrink-0 min-w-[70px]",
                            isActive
                                ? "bg-[rgba(15,241,206,0.1)] border border-[rgba(15,241,206,0.3)]"
                                : "bg-white/[0.04] border border-white/[0.06] hover:border-white/20",
                        ].join(" ")}
                    >
            <span
                className={`text-[9px] tracking-widest font-semibold mb-1 ${
                    isActive ? "text-[#0ff1ce]" : "text-white/35"
                }`}
            >
              {dayShort}
            </span>
                        <span
                            className={`text-xl font-bold tabular-nums leading-none ${
                                isActive ? "text-white" : "text-white/45"
                            }`}
                        >
              {dayNum}
            </span>
                        <span
                            className={`text-[8px] tracking-widest mt-1 font-medium ${
                                isActive ? "text-[#0ff1ce]" : "text-transparent"
                            }`}
                        >
              {monthShort}
            </span>
                    </button>
                );
            })}
        </div>
    );
}