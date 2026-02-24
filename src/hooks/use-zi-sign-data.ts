import { useQuery } from '@tanstack/react-query';
import { fetchModuleEvents, fetchOperations, ZiSignEvent, ZiSignOperation } from '@/lib/api';
import { MODULES } from '@/lib/modules';

export function useZiSignModules() {
    return useQuery({
        queryKey: ['zi-sign-modules'],
        queryFn: fetchModuleEvents,
        refetchInterval: 30000, // Refresh every 30 seconds
        select: (data: ZiSignEvent[]) => {
            // Create a map of apiId to event counts
            const moduleStats = data.reduce((acc, event) => {
                const moduleId = event.idTipoModulo;
                if (!acc[moduleId]) {
                    acc[moduleId] = { count: 0, events: [] };
                }
                acc[moduleId].count++;
                acc[moduleId].events.push(event);
                return acc;
            }, {} as Record<number, { count: number; events: ZiSignEvent[] }>);

            // Map back to our local MODULES structure
            return MODULES.map(m => ({
                ...m,
                pendencias: moduleStats[m.apiId]?.count || 0,
                recentEvents: moduleStats[m.apiId]?.events || [],
                // Processados count is harder to determine without historical data or another endpoint
                // For now we'll display 0 or a placeholder
                processados: 0,
            }));
        },
    });
}

export function useZiSignOperations() {
    return useQuery({
        queryKey: ['zi-sign-operations'],
        queryFn: fetchOperations,
        refetchInterval: 20000,
    });
}
