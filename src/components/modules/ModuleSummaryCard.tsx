import type { Module } from '@/lib/modules';

interface ModuleSummaryCardProps {
  module: Module & { pendencias?: number; processados?: number };
}

export function ModuleSummaryCard({ module }: ModuleSummaryCardProps) {
  const pendencias = module.pendencias || 0;
  const processados = module.processados || 0;
  const total = pendencias + processados;
  const progress = total > 0 ? (processados / total) * 100 : 0;

  return (
    <div className="glass-card p-3.5 flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <span className="font-black text-xs tracking-widest uppercase text-foreground/70 truncate flex items-center gap-2">
          <span className="opacity-40 font-mono">#{module.apiId}</span>
          {module.label}
        </span>
        <span className={`pill ${pendencias === 0 ? 'pill-ok' : 'bg-amber-500/20 text-amber-500'} text-xs !py-1 !px-2.5 shrink-0`}>
          {pendencias === 0 ? 'OK' : 'Pendente'}
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="font-black text-3xl tracking-tight text-foreground">{pendencias}</div>
          <div className="text-xs font-extrabold text-muted-foreground mt-0.5">pendências</div>
        </div>
        <div className="text-right">
          <div className="font-black text-lg tabular-nums text-primary">{processados}</div>
          <div className="text-xs font-extrabold text-muted-foreground mt-0.5">processados</div>
        </div>
      </div>
      {/* Mini progress bar */}
      <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden mt-1">
        <div
          className="h-full rounded-full bg-primary/60 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
