import { storeLinks } from "@/content/landing";
import { cn } from "@/lib/cn";

type StoreTextLinksProps = {
  className?: string;
  linkClassName?: string;
  separator?: string;
};

export function StoreTextLinks({
  className,
  linkClassName,
  separator = "·",
}: StoreTextLinksProps) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
      {storeLinks.map((store, index) => (
        <span key={store.id} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <span className="text-brand-500/50" aria-hidden>
              {separator}
            </span>
          ) : null}
          <a
            href={store.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline-offset-2 transition-colors hover:text-brand-300 hover:underline",
              linkClassName,
            )}
          >
            {store.label}
          </a>
        </span>
      ))}
    </span>
  );
}
