import { DashboardHeader } from '@/components/DashboardHeader';
import { OperacaoView } from '@/components/modules/OperacaoView';
import { ModulesPanel } from '@/components/modules/ModulesPanel';

const Index = () => {
  return (
    <div
      className="h-screen max-w-[2560px] mx-auto p-[clamp(12px,1.2vw,18px)] grid gap-[clamp(10px,1vw,14px)] overflow-hidden"
      style={{ gridTemplateRows: 'auto 1fr auto' }}
    >
      <DashboardHeader
        logoSrc="https://portal.zisign.ai/theme-assets/light-logo"
      />

      <div
        className="min-h-0 grid gap-[clamp(10px,1vw,14px)]"
        style={{ gridTemplateColumns: '1fr 320px' }}
      >
        {/* Área principal: Operações */}
        <div className="min-h-0">
          <OperacaoView />
        </div>

        {/* Painel lateral: Módulos resumidos */}
        <div className="min-h-0">
          <ModulesPanel />
        </div>
      </div>

      <footer className="flex items-center justify-between px-3 py-1 text-muted-foreground text-xs">
        <span>Atualização automática</span>
        <span>© 2025 ZiSign</span>
      </footer>
    </div>
  );
};

export default Index;
