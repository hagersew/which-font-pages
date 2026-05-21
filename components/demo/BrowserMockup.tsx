import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

interface BrowserMockupProps {
  url?: string;
  children: ReactNode;
  className?: string;
}

export function BrowserMockup({
  url = "example.com",
  children,
  className,
}: BrowserMockupProps) {
  return (
    <div className={cn("browser-frame", className)}>
      <div className="browser-chrome">
        <span className="browser-dot" style={{ background: "#fca5a5" }} />
        <span className="browser-dot" style={{ background: "#fcd34d" }} />
        <span className="browser-dot" style={{ background: "#86efac" }} />
        <div className="browser-url">{url}</div>
      </div>
      <div className="relative overflow-hidden bg-zinc-900">{children}</div>
    </div>
  );
}
