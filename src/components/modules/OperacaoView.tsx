import { KpiCard } from '@/components/KpiCard';

export function OperacaoView() {
  return (
    <div className="grid gap-3 min-h-0 h-full"
      style={{
        gridTemplateColumns: '420px 1fr 1fr',
        gridTemplateRows: '360px 420px',
        gridTemplateAreas: `"side donut bars" "side area ticker"`,
      }}
    >
      {/* Side panel */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'side' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Visão geral</span>
          <span className="pill pill-ok">Atualizado</span>
        </div>
        <KpiCard label="Total pendências" value={0} sub="—" />
        <KpiCard label="Ritmo (última hora)" value={0} sub="—" />
        <div className="h-px bg-foreground/8" />
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/70">Maiores atrasos</span>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
          <div className="p-3 rounded-2xl border border-foreground/10 bg-black/16 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-black text-base opacity-95">Aguardando dados...</span>
              <span className="font-black text-muted-foreground tabular-nums">--:--</span>
            </div>
          </div>
        </div>
      </div>

      {/* Donut chart placeholder */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'donut' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Pendências por status</span>
          <span className="pill">—</span>
        </div>
        <div className="flex-1 min-h-0 rounded-2xl border border-foreground/8 bg-black/12 flex items-center justify-center">
          <span className="text-muted-foreground font-bold text-sm">Gráfico de rosca</span>
        </div>
      </div>

      {/* Bars chart placeholder */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'bars' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Atraso (Top 8 operações)</span>
          <span className="pill">—</span>
        </div>
        <div className="flex-1 min-h-0 rounded-2xl border border-foreground/8 bg-black/12 flex items-center justify-center">
          <span className="text-muted-foreground font-bold text-sm">Gráfico de barras</span>
        </div>
      </div>

      {/* Area chart placeholder */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'area' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Eventos por hora (hoje)</span>
          <span className="pill">—</span>
        </div>
        <div className="flex-1 min-h-0 rounded-2xl border border-foreground/8 bg-black/12 flex items-center justify-center">
          <span className="text-muted-foreground font-bold text-sm">Gráfico de área</span>
        </div>
      </div>

      {/* Ticker / table placeholder */}
      <div className="glass-card p-0 flex flex-col min-h-0" style={{ gridArea: 'ticker' }}>
        <div className="flex items-center justify-between p-4 border-b border-foreground/8">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Pendências</span>
          <span className="pill">—</span>
        </div>
        <div className="flex-1 min-h-0 overflow-auto scrollbar-hidden p-4 grid gap-3">
          <div className="grid gap-3 items-center p-4 rounded-2xl border border-foreground/10 bg-black/14"
            style={{ gridTemplateColumns: '120px 1fr 160px 140px' }}
          >
            <span className="font-black tabular-nums text-foreground/90">--:--</span>
            <div className="flex flex-col gap-1 min-w-0">
              <b className="text-base truncate">Aguardando dados...</b>
              <span className="text-sm text-muted-foreground truncate">—</span>
            </div>
            <span className="pill">—</span>
            <span className="font-black tabular-nums text-foreground/92 text-right">—</span>
          </div>
        </div>
      </div>
    </div>
  );
}
