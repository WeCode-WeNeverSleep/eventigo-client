"use client";

import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

type PageLoaderProps = {
  label?: string;
};

export default function PageLoader({ label = "Loading..." }: PageLoaderProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-primary">
      <Bouncy size="45" speed="1.75" color="currentColor" />

      <p className="text-sm font-medium text-text-muted">{label}</p>
    </div>
  );
}