import { useEffect, useRef } from 'react';

interface AdSlotProps {
  slot?: string;
  format?: string;
  className?: string;
  layout?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Google AdSense ad slot. Falls back to a styled placeholder in dev/preview
 * where the AdSense script may be blocked. Replace `slot` with real ad unit
 * IDs from your AdSense dashboard once approved.
 */
export function AdSlot({ slot = '0000000000', format = 'auto', className = '', layout }: AdSlotProps) {
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      /* ignore — script blocked or not loaded */
    }
  }, []);

  return (
    <div className={`my-8 w-full overflow-hidden rounded-lg border border-dashed border-border bg-muted/30 ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground text-center pt-1">Advertisement</div>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client="ca-pub-5562813955044752"
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  );
}