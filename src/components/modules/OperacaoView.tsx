import { KpiCard } from '@/components/KpiCard';
import { useZiSignModules, useZiSignOperations } from '@/hooks/use-zi-sign-data';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function OperacaoView() {
  const { data: modules, isLoading: isLoadingModules } = useZiSignModules();
  const { data: operations, isLoading: isLoadingOps } = useZiSignOperations();

  const isLoading = isLoadingModules || isLoadingOps;

  const allEvents = operations || [];
  const totalPendencias = allEvents.length;

  // Calculate rhythm (events in the last hour)
  const oneHourAgo = new Date(Date.now() - 3600000);
  const rhythm = allEvents.filter(e => {
    const [h, m, s] = e.horario.split(':').map(Number);
    const now = new Date();
    const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
    return eventTime > oneHourAgo;
  }).length;

  return (
    <div className="grid gap-[clamp(10px,1vw,14px)] min-h-0 h-full"
      style={{
        gridTemplateColumns: '340px 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gridTemplateAreas: `"side donut bars" "side area ticker"`,
      }}
    >
      {/* Side panel */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'side' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Visão geral</span>
          <span className={`pill ${isLoading ? '' : 'pill-ok'}`}>
            {isLoading ? 'Carregando...' : 'Atualizado'}
          </span>
        </div>
        <KpiCard label="Total pendências" value={totalPendencias} sub={`${modules?.length || 0} módulos ativos`} />
        <KpiCard label="Ritmo (última hora)" value={rhythm} sub="Eventos recentes" />
        <div className="h-px bg-foreground/8" />
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/70">Maiores atrasos</span>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
          {allEvents.slice(0, 5).sort((a, b) => b.atrasoSeg - a.atrasoSeg).map((op, i) => (
            <div key={i} className="p-3 rounded-2xl border border-foreground/10 bg-black/16 flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-black text-sm opacity-95 truncate">
                    {op.nomeFundo}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Op: {op.idOperacaoRecebivel}
                  </span>
                </div>
                <span className="font-black text-xs text-danger tabular-nums shrink-0">
                  {op.atrasoStr}
                </span>
              </div>
            </div>
          ))}
          {allEvents.length === 0 && !isLoading && (
            <div className="p-3 rounded-2xl border border-foreground/10 bg-black/16 flex flex-col gap-2">
              <span className="font-black text-sm opacity-60">Nenhuma pendência</span>
            </div>
          )}
        </div>
      </div>

      {/* Donut chart placeholder */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'donut' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Pendências por status</span>
          <span className="pill">{totalPendencias}</span>
        </div>
        <div className="flex-1 min-h-0 rounded-2xl border border-foreground/8 bg-black/12 flex items-center justify-center">
          <span className="text-muted-foreground font-bold text-sm">Distribuição de Status</span>
        </div>
      </div>

      {/* Bars chart placeholder */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'bars' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Atraso por Módulo</span>
          <span className="pill">{modules?.length || 0}</span>
        </div>
        <div className="flex-1 min-h-0 rounded-2xl border border-foreground/8 bg-black/12 flex items-center justify-center">
          <span className="text-muted-foreground font-bold text-sm">Top Atrasos</span>
        </div>
      </div>

      {/* Area chart placeholder */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'area' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Eventos por hora (hoje)</span>
          <span className="pill">API Ativa</span>
        </div>
        <div className="flex-1 min-h-0 rounded-2xl border border-foreground/8 bg-black/12 flex items-center justify-center">
          <span className="text-muted-foreground font-bold text-sm">Volume de Eventos</span>
        </div>
      </div>

      {/* Ticker / table */}
      <div className="glass-card p-0 flex flex-col min-h-0" style={{ gridArea: 'ticker' }}>
        <div className="flex items-center justify-between p-4 border-b border-foreground/8">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Últimas Pendências</span>
          <span className="pill">{allEvents.length}</span>
        </div>
        <div className="flex-1 min-h-0 overflow-auto scrollbar-hidden p-4 grid gap-3">
          {allEvents.slice(0, 10).map((op, i) => (
            <div key={i} className="grid gap-3 items-center p-4 rounded-2xl border border-foreground/10 bg-black/14"
              style={{ gridTemplateColumns: '120px 1fr 160px 140px' }}
            >
              <span className="font-black tabular-nums text-foreground/90">
                {op.horario}
              </span>
              <div className="flex flex-col gap-1 min-w-0">
                <b className="text-base truncate">{op.nomeFundo}</b>
                <span className="text-sm text-muted-foreground truncate">CNPJ: {op.cnpjFundo}</span>
              </div>
              <span className={`pill ${op.atrasoSeg > 0 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'pill-ok'}`}>
                {op.atrasoSeg > 0 ? 'PENDENTE' : 'OK'}
              </span>
              <span className="font-black tabular-nums text-foreground/92 text-right">
                {op.atrasoStr}
              </span>
            </div>
          ))}
          {allEvents.length === 0 && !isLoading && (
            <div className="p-8 text-center text-muted-foreground italic">
              Aguardando novos eventos...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
