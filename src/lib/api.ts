export interface ZiSignEvent {
    idTipoModulo: number;
    idPortalModulo: number;
    dsEvento: string;
    dtCriacao: string;
}

const API_BASE_URL = 'https://custodiabackend-prod.idsf.com.br/api';
const DEFAULT_HEADERS = {
    'accept': 'application/json',
    'Ambiente': 'custodia',
    'Token': 'DHQzckJ0TGWHiFxaVuUlmrBLWXwuejrtSAT0Mf47gvclZ5GKY543iYKNeLfqlzngXH0YcKGLe4qyv0avru3xeVGBp9yUQKKKlSyJ',
};

export async function fetchModuleEvents(): Promise<ZiSignEvent[]> {
    const response = await fetch(`${API_BASE_URL}/ZiSign/eventos-unicos`, {
        headers: DEFAULT_HEADERS,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch module events');
    }

    return response.json();
}

export interface ZiSignOperation {
    horario: string;
    idOperacaoRecebivel: number;
    nomeFundo: string;
    cnpjFundo: string;
    hrAtraso: string;
    atrasoSeg: number;
    atrasoStr: string;
}

export async function fetchOperations(): Promise<ZiSignOperation[]> {
    const cnpj = '54638076000176';
    const response = await fetch(`${API_BASE_URL}/ZiSign/TV?cnpjCertificadora=${cnpj}`, {
        headers: DEFAULT_HEADERS,
    });

    if (!response.ok) {
        throw new Error('Failed to fetch operations');
    }

    const data = await response.json();
    const eventos = Array.isArray(data) ? data : (data.data || []);

    return eventos.map((ev: any) => {
        const atrasoRaw = (ev.hrAtraso || "00:00:00").toString().trim();
        const [ah, am, as] = atrasoRaw.split(":").map(Number);
        const totalSeg = (ah || 0) * 3600 + (am || 0) * 60 + (as || 0);

        return {
            ...ev,
            atrasoSeg: totalSeg,
            atrasoStr: atrasoRaw,
        };
    });
}
