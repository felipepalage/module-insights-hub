import { useClock } from '@/hooks/use-clock';

interface DashboardHeaderProps {
  logoSrc?: string;
}

export function DashboardHeader({ logoSrc }: DashboardHeaderProps) {
  const clock = useClock();

  return (
    <header className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-3 opacity-95">
        {logoSrc && (
          <img
            src={logoSrc}
            alt="ZiSign"
            className="h-[clamp(50px,7vh,100px)] w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,.45)]"
          />
        )}
      </div>
      <div className="font-extrabold tracking-[.18em] text-sm text-foreground/88 px-4 py-2.5 rounded-full glass-card">
        {clock}
      </div>
    </header>
  );
}
