import type { Module } from '@/lib/modules';

interface ModuleSummaryCardProps {
  module: Module;
}

export function ModuleSummaryCard({ module }: ModuleSummaryCardProps) {
  return (
    <div className="glass-card p-3.5 flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <span className="font-black text-xs tracking-widest uppercase text-foreground/70 truncate">
          {module.label}
        </span>
        <span className="pill pill-ok text-xs !py-1 !px-2.5 shrink-0">OK</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="font-black text-3xl tracking-tight text-foreground">0</div>
          <div className="text-xs font-extrabold text-muted-foreground mt-0.5">pendências</div>
        </div>
        <div className="text-right">
          <div className="font-black text-lg tabular-nums text-primary">0</div>
          <div className="text-xs font-extrabold text-muted-foreground mt-0.5">processados</div>
        </div>
      </div>
      {/* Mini progress bar */}
      <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden mt-1">
        <div className="h-full rounded-full bg-primary/60 w-0 transition-all duration-500" />
      </div>
    </div>
  );
}
