import { storeLinks, type StoreLink } from '@/content/landing';
import { cn } from '@/lib/cn';
import Image from 'next/image';

type Size = 'sm' | 'md';
type Variant = 'default' | 'light';

const sizeConfig: Record<
  Size,
  Record<StoreLink['id'], { height: number; width: number }>
> = {
  sm: {
    chrome: { height: 36, width: 128 },
    firefox: { height: 36, width: 103 },
  },
  md: {
    chrome: { height: 48, width: 170 },
    firefox: { height: 48, width: 138 },
  },
};

type StoreBadgeLinksProps = {
  size?: Size;
  variant?: Variant;
  className?: string;
};

export function StoreBadgeLinks({
  size = 'md',
  variant = 'default',
  className,
}: StoreBadgeLinksProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {storeLinks.map((store) => {
        const dimensions = sizeConfig[size][store.id];
        const src =
          variant === 'light' && store.badgeSrcLight
            ? store.badgeSrcLight
            : store.badgeSrc;

        return (
          <a
            key={store.id}
            href={store.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            aria-label={store.alt}
          >
            <Image
              src={src}
              alt={store.alt}
              width={dimensions.width}
              height={dimensions.height}
              className="h-auto w-auto"
              style={{
                width: dimensions.width,
                height: dimensions.height,
              }}
            />
          </a>
        );
      })}
    </div>
  );
}
