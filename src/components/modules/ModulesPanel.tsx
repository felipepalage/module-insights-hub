import { MODULES } from '@/lib/modules';
import { ModuleSummaryCard } from '@/components/modules/ModuleSummaryCard';

export function ModulesPanel() {
  return (
    <div className="flex flex-col gap-3 min-h-0 h-full">
      <div className="flex items-center justify-between px-1">
        <span className="font-black text-sm tracking-widest uppercase text-foreground/70">Módulos</span>
        <span className="pill text-xs !py-1 !px-2.5">6 ativos</span>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-1 gap-3 auto-rows-min overflow-auto scrollbar-hidden">
        {MODULES.map((m) => (
          <ModuleSummaryCard key={m.id} module={m} />
        ))}
      </div>
    </div>
  );
}
