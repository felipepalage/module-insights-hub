import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ModuleTabs } from '@/components/ModuleTabs';
import { OperacaoView } from '@/components/modules/OperacaoView';
import { GenericModuleView } from '@/components/modules/GenericModuleView';
import { MODULES, OPERACAO_MODULE, type ModuleId } from '@/lib/modules';

const Index = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('operacao');

  const currentModule = MODULES.find((m) => m.id === activeModule);

  return (
    <div className="min-h-screen max-w-[2560px] mx-auto p-[clamp(12px,1.2vw,18px)] grid gap-[clamp(12px,1vw,14px)]"
      style={{ gridTemplateRows: 'auto auto 1fr auto' }}
    >
      <DashboardHeader />

      <ModuleTabs active={activeModule} onSelect={setActiveModule} />

      <div className="min-h-0">
        {activeModule === 'operacao' ? (
          <OperacaoView />
        ) : currentModule ? (
          <GenericModuleView module={currentModule} />
        ) : null}
      </div>

      <footer className="flex items-center justify-between px-3 py-2 text-muted-foreground text-xs">
        <span>Atualização automática</span>
        <span>© 2025 ZiSign</span>
      </footer>
    </div>
  );
};

export default Index;
