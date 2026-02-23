import { useClock } from '@/hooks/use-clock';

export function DashboardHeader() {
  const clock = useClock();

  return (
    <header className="flex items-center justify-between px-3 py-2.5">
      <div className="flex items-center gap-3 opacity-95">
        <div className="font-black text-2xl tracking-tight">
          <span className="text-primary">Zi</span>
          <span className="text-foreground">Sign</span>
        </div>
      </div>
      <div className="font-extrabold tracking-[.18em] text-sm text-foreground/88 px-4 py-2.5 rounded-full glass-card">
        {clock}
      </div>
    </header>
  );
}
