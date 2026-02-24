import { useZiSignModules } from '@/hooks/use-zi-sign-data';
import { ModuleSummaryCard } from '@/components/modules/ModuleSummaryCard';
import { Skeleton } from '@/components/ui/skeleton';

export function ModulesPanel() {
  const { data: modules, isLoading } = useZiSignModules();

  return (
    <div className="flex flex-col gap-3 min-h-0 h-full overflow-hidden">
      <div className="flex items-center justify-between px-1">
        <span className="font-black text-sm tracking-widest uppercase text-foreground/70">Módulos</span>
        <span className="pill text-xs !py-1 !px-2.5">
          {isLoading ? '...' : `${modules?.length || 0} ativos`}
        </span>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-3.5 h-[120px]">
                <Skeleton className="h-4 w-24 mb-4" />
                <div className="flex justify-between items-end">
                  <Skeleton className="h-8 w-12" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-vertical-ticker">
            {/* Original list */}
            {modules?.map((m) => (
              <ModuleSummaryCard key={m.id} module={m} />
            ))}
            {/* Duplicated list for seamless loop */}
            {modules?.map((m) => (
              <ModuleSummaryCard key={`${m.id}-clone`} module={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
