import type { Module } from '@/lib/modules';
import { KpiCard } from '@/components/KpiCard';

interface GenericModuleViewProps {
  module: Module;
}

export function GenericModuleView({ module }: GenericModuleViewProps) {
  return (
    <div className="grid gap-3 h-full" style={{ gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '200px 1fr' }}>
      {/* KPIs row */}
      <div className="glass-card p-4 flex flex-col gap-3">
        <KpiCard label="Total pendências" value={0} sub="Aguardando API..." />
      </div>
      <div className="glass-card p-4 flex flex-col gap-3">
        <KpiCard label="Processados (hoje)" value={0} sub="Aguardando API..." />
      </div>
      <div className="glass-card p-4 flex flex-col gap-3">
        <KpiCard label="Ritmo (última hora)" value={0} sub="Aguardando API..." />
      </div>

      {/* Main content */}
      <div className="glass-card p-0 flex flex-col min-h-0 col-span-3">
        <div className="flex items-center justify-between p-4 border-b border-foreground/8">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">
            Operações — {module.label}
          </span>
          <span className="pill">API ID: {module.apiId}</span>
        </div>
        <div className="flex-1 min-h-0 overflow-auto scrollbar-hidden p-4 flex flex-col gap-3">
          {/* Placeholder rows */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid gap-3 items-center p-4 rounded-2xl border border-foreground/10 bg-black/14"
              style={{ gridTemplateColumns: '120px 1fr 160px 140px' }}
            >
              <span className="font-black tabular-nums text-foreground/90">--:--</span>
              <div className="flex flex-col gap-1 min-w-0">
                <b className="text-base truncate">Aguardando dados de {module.label}...</b>
                <span className="text-sm text-muted-foreground truncate">Conectar API do módulo {module.apiId}</span>
              </div>
              <span className="pill">Pendente</span>
              <span className="font-black tabular-nums text-foreground/92 text-right">—</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
