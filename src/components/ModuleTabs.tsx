import { MODULES, OPERACAO_MODULE, type ModuleId } from '@/lib/modules';

interface ModuleTabsProps {
  active: ModuleId;
  onSelect: (id: ModuleId) => void;
}

export function ModuleTabs({ active, onSelect }: ModuleTabsProps) {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto scrollbar-hidden py-1 px-1">
      {/* Operação tab - separate & first */}
      <button
        className={`module-tab ${active === OPERACAO_MODULE.id ? 'active' : ''}`}
        onClick={() => onSelect(OPERACAO_MODULE.id)}
      >
        ⚙ {OPERACAO_MODULE.label}
      </button>

      <div className="w-px h-6 bg-foreground/10 mx-1 shrink-0" />

      {/* Other modules */}
      {MODULES.map((m) => (
        <button
          key={m.id}
          className={`module-tab ${active === m.id ? 'active' : ''}`}
          onClick={() => onSelect(m.id)}
        >
          {m.label}
        </button>
      ))}
    </nav>
  );
}
