"use client";

interface Props {
  days: string[];
  selectedDay: string;
  onChange: (day: string) => void;
}

export function ScheduleDaySelector({
  days,
  selectedDay,
  onChange,
}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {days.map((day) => {
        const date = new Date(day);

        const weekday = date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        );

        const dayNumber = date.getDate();

        const active = selectedDay === day;

        return (
          <button
            key={day}
            onClick={() => onChange(day)}
            className={[
              "min-w-[90px] rounded-2xl border p-4 transition-all",
              active
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-border bg-card hover:border-primary/40",
            ].join(" ")}
          >
            <div className="text-xs uppercase tracking-widest text-text-muted">
              {weekday}
            </div>

            <div className="text-3xl font-bold">
              {dayNumber}
            </div>
          </button>
        );
      })}
    </div>
  );
}