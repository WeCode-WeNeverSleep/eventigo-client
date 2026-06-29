import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: "calendar" | "error";
}

export function EmptyState({
  title,
  message,
  icon = "calendar",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-xl bg-surface-light flex items-center justify-center mb-4">
        {icon === "error" ? (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-live/60 text-xl"
          />
        ) : (
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="text-text-muted text-xl"
          />
        )}
      </div>
      <h3 className="text-sm font-semibold text-text-main/60 mb-1">{title}</h3>
      <p className="text-xs text-text-muted max-w-xs leading-relaxed">
        {message}
      </p>
    </div>
  );
}

