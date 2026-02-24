const API_BASE_URL = 'https://custodiabackend-prod.idsf.com.br/api';
const DEFAULT_HEADERS = {
    'accept': 'application/json',
    'Ambiente': 'custodia',
    'Token': 'DHQzckJ0TGWHiFxaVuUlmrBLWXwuejrtSAT0Mf47gvclZ5GKY543iYKNeLfqlzngXH0YcKGLe4qyv0avru3xeVGBp9yUQKKKlSyJ',
};

async function testApi() {
    try {
        const response = await fetch(`${API_BASE_URL}/ZiSign/eventos-unicos`, {
            headers: DEFAULT_HEADERS,
        });
        const data = await response.json();
        console.log('Sample Item (full):');
        console.log(JSON.stringify(data[0], null, 2));

        // Let's also check if there's another endpoint the user might be referring to
        // based on common patterns: /ZiSign/totais, /ZiSign/modulos, etc.
        // But the user mentioned "several returns from the module", which sounds like a list.
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi();
