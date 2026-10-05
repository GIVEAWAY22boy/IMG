"use client";

import ErrorTV from "@/components/ErrorTV";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-premium-bg">
      <ErrorTV bgText="404" screenText="NOT FOUND" />
    </div>
  );
}
