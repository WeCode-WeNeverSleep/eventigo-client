"use client";
import { useState, useEffect } from "react";

export function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const start = targetDate.getTime();
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft("Started");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`Starts in ${hours}h ${minutes}m`);
    };

    calculate();
    const timer = setInterval(calculate, 60000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
