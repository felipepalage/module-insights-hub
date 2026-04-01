export interface ZiSignEvent {
    idTipoModulo: number;
    idPortalModulo: number;
    dsEvento: string;
    dtCriacao: string;
}

const API_BASE_URL = 'https://custodiabackend-staging.idsf.com.br/api';
const API_TOKEN = 'DHQzckJ0TGWHiFxaVuUlmrBLWXwuejrtSAT0Mf47gvclZ5GKY543iYKNeLfqlzngXH0YcKGLe4qyv0avru3xeVGBp9yUQKKKlSyJ';
const MODULE_HEADERS = {
    'accept': 'application/json',
    'Ambiente': 'custodia',
    'Token': API_TOKEN,
};
const OPERATIONS_HEADERS = {
    'accept': 'application/json',
    'Ambiente': 'nxc',
    'Token': API_TOKEN,
};

function getPreviousMonthReference() {
    const now = new Date();
    const reference = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    return {
        mes: String(reference.getMonth() + 1).padStart(2, '0'),
        ano: String(reference.getFullYear()),
    };
}

async function parseApiResponse<T>(response: Response, context: string): Promise<T> {
    const rawBody = await response.text();
    let parsedBody: any = null;

    try {
        parsedBody = rawBody ? JSON.parse(rawBody) : null;
    } catch {
        parsedBody = rawBody;
    }

    if (!response.ok) {
        const details =
            typeof parsedBody === 'string'
                ? parsedBody.slice(0, 200)
                : parsedBody?.message || parsedBody?.error || JSON.stringify(parsedBody);

        throw new Error(`${context} (${response.status}): ${details || 'Unexpected API error'}`);
    }

    return parsedBody as T;
}

export async function fetchModuleEvents(): Promise<ZiSignEvent[]> {
    const { mes, ano } = getPreviousMonthReference();
    const query = new URLSearchParams({ mes, ano });
    const response = await fetch(`${API_BASE_URL}/ZiSign/eventos-unicos?${query.toString()}`, {
        headers: MODULE_HEADERS,
    });

    const data = await parseApiResponse<any>(response, 'Failed to fetch module events');
    return Array.isArray(data) ? data : (data.data || []);
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
        headers: OPERATIONS_HEADERS,
    });

    const data = await parseApiResponse<any>(response, 'Failed to fetch operations');
    const eventos = Array.isArray(data) ? data : (data.data || []);

    return eventos
        .filter((ev: any) => ev.nomeFundo !== 'Zitec FIDC')
        .map((ev: any) => {
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
