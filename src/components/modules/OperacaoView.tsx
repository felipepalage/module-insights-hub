import { KpiCard } from '@/components/KpiCard';
import { useZiSignModules, useZiSignOperations } from '@/hooks/use-zi-sign-data';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip,
  AreaChart, Area, CartesianGrid
} from 'recharts';

export function OperacaoView() {
  const { data: modules, isLoading: isLoadingModules } = useZiSignModules();
  const { data: operations, isLoading: isLoadingOps } = useZiSignOperations();

  const isLoading = isLoadingModules || isLoadingOps;
  const allEvents = operations || [];
  const totalPendencias = allEvents.length;

  // Calculate rhythm (events in the last hour)
  const oneHourAgo = new Date(Date.now() - 3600000);
  const rhythm = allEvents.filter(e => {
    try {
      const [h, m, s] = e.horario.split(':').map(Number);
      const now = new Date();
      const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
      return eventTime > oneHourAgo;
    } catch {
      return false;
    }
  }).length;

  // Chart Data: Status Distribution
  const statusData = [
    { name: 'Crítico (>1h)', value: allEvents.filter(e => e.atrasoSeg > 3600).length, color: '#ef4444' },
    { name: 'Alerta (<1h)', value: allEvents.filter(e => e.atrasoSeg > 0 && e.atrasoSeg <= 3600).length, color: '#f59e0b' },
    { name: 'Normal', value: allEvents.filter(e => e.atrasoSeg === 0).length, color: '#10b981' },
  ].filter(d => d.value > 0);

  // Chart Data: Top Atrasos (Bar)
  const topDelaysData = [...allEvents]
    .sort((a, b) => b.atrasoSeg - a.atrasoSeg)
    .slice(0, 5)
    .map(op => ({
      name: op.nomeFundo.split(' ')[0], // Short name
      full: op.nomeFundo,
      value: Math.round(op.atrasoSeg / 60), // In minutes
    }));

  // Chart Data: Events per Hour (Area)
  const hourlyData = Array.from({ length: 24 }).map((_, hour) => {
    const count = allEvents.filter(e => {
      const h = parseInt(e.horario.split(':')[0]);
      return h === hour;
    }).length;
    return { hour: `${hour}h`, count };
  }).filter((d, i) => {
    const currentHour = new Date().getHours();
    return d.hour !== undefined && (parseInt(d.hour) >= currentHour - 8 && parseInt(d.hour) <= currentHour + 1);
  });

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

      {/* Donut chart */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'donut' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Pendências por status</span>
          <span className="pill">{totalPendencias}</span>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bars chart */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'bars' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Top Atrasos (min)</span>
          <span className="pill">Filtro: Ativos</span>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topDelaysData} layout="vertical" margin={{ left: -20, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold', fill: 'rgba(255,255,255,0.6)' }} />
              <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area chart */}
      <div className="glass-card p-4 flex flex-col gap-3" style={{ gridArea: 'area' }}>
        <div className="flex items-center justify-between">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Eventos por hora (hoje)</span>
          <span className="pill">API Ativa</span>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} style={{ fontSize: '10px', fill: 'rgba(255,255,255,0.4)' }} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="count" stroke="#10b981" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ticker for Latest Pendencies */}
      <div className="glass-card p-0 flex flex-col min-h-0 overflow-hidden" style={{ gridArea: 'ticker' }}>
        <div className="flex items-center justify-between p-4 border-b border-foreground/8">
          <span className="font-black text-sm tracking-widest uppercase text-foreground/78">Últimas Pendências</span>
          <span className="pill">{allEvents.length}</span>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden relative p-4">
          {allEvents.length === 0 && !isLoading ? (
            <div className="p-8 text-center text-muted-foreground italic">
              Aguardando novos eventos...
            </div>
          ) : (
            <div className="animate-vertical-ticker">
              {[...allEvents, ...allEvents].map((op, i) => (
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
