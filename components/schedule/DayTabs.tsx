"use client";

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
          .toLocaleDateString("en-EN", { weekday: "short" })
          .toUpperCase()
          .replace(".", "");
        const monthShort = date
          .toLocaleDateString("en-EN", { month: "short" })
          .toUpperCase()
          .replace(".", "");

        return (
          <button
            key={day}
            onClick={() => onChange(day)}
            className={[
              "flex flex-col items-center px-5 py-3 rounded-xl transition-all cursor-pointer shrink-0 min-w-20 outline-none border-border border",
              isActive
                ? "bg-primary/10 border-primary/30"
                : "bg-surface-light/40 border-border hover:border-border/60",
            ].join(" ")}
          >
            <span
              className={`text-[9px] tracking-widest font-semibold mb-1 ${
                isActive ? "text-primary" : "text-text-muted"
              }`}
            >
              {dayShort}
            </span>
            <span
              className={`text-xl font-bold tabular-nums leading-none ${
                isActive ? "text-text-main" : "text-text-muted/50"
              }`}
            >
              {dayNum}
            </span>
            <span
              className={`text-[8px] tracking-widest mt-1 font-medium ${
                isActive ? "text-primary" : "text-transparent"
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

