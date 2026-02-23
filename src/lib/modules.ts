export type ModuleId = 
  | 'operacao'
  | 'boleto-subscricao'
  | 'contrato-mae'
  | 'ativos'
  | 'correntistas'
  | 'nota-comercial'
  | 'cotista-interno';

export interface Module {
  id: ModuleId;
  label: string;
  apiId: number;
}

export const MODULES: Module[] = [
  { id: 'boleto-subscricao', label: 'Boletim Subscrição', apiId: 1 },
  { id: 'contrato-mae', label: 'Contrato Mãe', apiId: 2 },
  { id: 'ativos', label: 'Ativos', apiId: 3 },
  { id: 'correntistas', label: 'Correntistas', apiId: 4 },
  { id: 'nota-comercial', label: 'Nota Comercial', apiId: 5 },
  { id: 'cotista-interno', label: 'Cotista Interno', apiId: 6 },
];

// Operação is separate (apiId: 7)
export const OPERACAO_MODULE: Module = { id: 'operacao', label: 'Operação', apiId: 7 };
