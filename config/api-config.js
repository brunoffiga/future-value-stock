// ============================
// API-CONFIG.JS - Configuração de APIs Externas
// B3 SmallCaps Intelligence Platform v2.0
// ============================

/**
 * CONFIGURAÇÃO CENTRALIZADA DE APIs
 *
 * Este arquivo centraliza todas as configurações de APIs externas
 * utilizadas para coleta de dados em tempo real (FASE 2+)
 */

const API_CONFIG = {
    // ==================== DADOS DE PREÇOS ====================

    /**
     * Yahoo Finance API
     * - Gratuita, sem necessidade de chave
     * - Dados históricos de preços
     * - Quotes em tempo real (com delay de 15min)
     */
    yahoo: {
        base: "https://query1.finance.yahoo.com/v8/finance",
        endpoints: {
            quote: "/quote",
            chart: "/chart/{ticker}",
            spark: "/spark"
        },
        key: null,
        rateLimit: "Sem limite documentado",
        params: {
            range: "1y",
            interval: "1d",
            includeTimestamps: true
        }
    },

    /**
     * Alpha Vantage API
     * - Gratuita com limites (5 calls/min, 500 calls/dia)
     * - Indicadores técnicos pré-calculados
     * - Dados fundamentais
     */
    alphaVantage: {
        base: "https://www.alphavantage.co/query",
        key: "YOUR_API_KEY_HERE", // Registrar em: https://www.alphavantage.co/support/#api-key
        rateLimit: "5 calls/minute, 500 calls/day",
        endpoints: {
            timeSeries: "TIME_SERIES_DAILY",
            technicalRSI: "RSI",
            technicalMACD: "MACD",
            overview: "OVERVIEW"
        }
    },

    /**
     * Polygon.io API
     * - Gratuita para delayed data
     * - Real-time com planos pagos
     */
    polygon: {
        base: "https://api.polygon.io",
        key: "YOUR_POLYGON_KEY_HERE",
        rateLimit: "5 calls/minute (free tier)",
        endpoints: {
            aggregates: "/v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{from}/{to}",
            previousClose: "/v2/aggs/ticker/{ticker}/prev",
            technicals: "/v1/indicators/{indicator}/{ticker}"
        }
    },

    // ==================== DADOS MACROECONÔMICOS ====================

    /**
     * Banco Central do Brasil API
     * - Totalmente gratuita
     * - Dados oficiais de SELIC, IPCA, PIB, etc.
     */
    bcb: {
        base: "https://api.bcb.gov.br/dados/serie/bcdata.sgs",
        key: null,
        rateLimit: "Sem limite documentado",
        series: {
            selic: {
                code: 432,
                endpoint: "/432/dados/ultimos/1",
                description: "Taxa Selic Over"
            },
            ipca: {
                code: 433,
                endpoint: "/433/dados/ultimos/12",
                description: "IPCA - Índice de Preços ao Consumidor Amplo"
            },
            cambio: {
                code: 1,
                endpoint: "/1/dados/ultimos/30",
                description: "Taxa de câmbio - Dólar americano (venda)"
            },
            pib: {
                code: 4380,
                endpoint: "/4380/dados/ultimos/4",
                description: "PIB - Produto Interno Bruto"
            }
        }
    },

    /**
     * IBGE API
     * - Gratuita
     * - Dados estatísticos nacionais
     */
    ibge: {
        base: "https://servicodados.ibge.gov.br/api/v3",
        key: null,
        endpoints: {
            inflacao: "/agregados/1419/periodos/{periodo}/variaveis/63",
            pib: "/agregados/1620/periodos/{periodo}/variaveis/584"
        }
    },

    // ==================== DADOS FUNDAMENTALISTAS ====================

    /**
     * Status Invest
     * - Sem API oficial (scraping necessário)
     * - Dados fundamentalistas detalhados
     * - Consenso de analistas
     */
    statusInvest: {
        base: "https://statusinvest.com.br",
        method: "scraping",
        endpoints: {
            stock: "/acoes/{ticker}",
            indicators: "/categoria/advancedsearchresult"
        },
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        rateLimit: "Respeitar ~1 req/segundo para evitar bloqueio"
    },

    /**
     * Fundamentus
     * - Sem API oficial (scraping necessário)
     * - Dados fundamentalistas gratuitos
     */
    fundamentus: {
        base: "https://www.fundamentus.com.br",
        method: "scraping",
        endpoints: {
            detalhes: "/detalhes.php?papel={ticker}",
            resultado: "/resultado.php"
        },
        rateLimit: "Respeitar rate limiting"
    },

    // ==================== B3 OFICIAL ====================

    /**
     * B3 Data
     * - API oficial da B3
     * - Dados históricos de negociação
     */
    b3: {
        base: "https://www.b3.com.br/api",
        key: null,
        endpoints: {
            historico: "/download/requestname/NEG_BMF",
            cotacoes: "/cotacoes"
        },
        format: "csv"
    },

    // ==================== SENTIMENTO E NOTÍCIAS ====================

    /**
     * News API
     * - Gratuita com limites
     * - Notícias financeiras
     */
    newsApi: {
        base: "https://newsapi.org/v2",
        key: "YOUR_NEWS_API_KEY_HERE",
        rateLimit: "100 requests/day (free tier)",
        endpoints: {
            everything: "/everything",
            topHeadlines: "/top-headlines"
        },
        params: {
            language: "pt",
            country: "br",
            category: "business"
        }
    },

    // ==================== MACHINE LEARNING ====================

    /**
     * Configuração para modelos locais
     * - TensorFlow.js
     * - Python backend (Flask/FastAPI)
     */
    ml: {
        localBackend: "http://localhost:5000/api",
        endpoints: {
            predict: "/predict",
            train: "/train",
            evaluate: "/evaluate"
        },
        models: {
            randomForest: "/models/rf",
            lstm: "/models/lstm",
            ensemble: "/models/ensemble"
        }
    }
};

/**
 * CONFIGURAÇÕES GLOBAIS
 */
const GLOBAL_CONFIG = {
    // Timeout padrão para requests (ms)
    requestTimeout: 10000,

    // Retry em caso de falha
    retryAttempts: 3,
    retryDelay: 1000,

    // Cache
    cacheEnabled: true,
    cacheDuration: 5 * 60 * 1000, // 5 minutos

    // Headers padrão
    defaultHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },

    // CORS proxy (se necessário)
    corsProxy: null, // Ex: "https://cors-anywhere.herokuapp.com/"

    // Modo de desenvolvimento
    devMode: true,
    mockData: false
};

/**
 * HELPER: Construir URL completa
 */
function buildApiUrl(service, endpoint, params = {}) {
    const config = API_CONFIG[service];
    if (!config) {
        throw new Error(`Serviço ${service} não encontrado na configuração`);
    }

    let url = config.base + (config.endpoints?.[endpoint] || endpoint);

    // Substituir parâmetros na URL (ex: {ticker})
    Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`{${key}}`, value);
    });

    // Adicionar API key se necessário
    if (config.key) {
        const separator = url.includes('?') ? '&' : '?';
        url += `${separator}apikey=${config.key}`;
    }

    return url;
}

/**
 * HELPER: Fetch com retry e timeout
 */
async function fetchWithRetry(url, options = {}, attempt = 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), GLOBAL_CONFIG.requestTimeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                ...GLOBAL_CONFIG.defaultHeaders,
                ...options.headers
            }
        });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeout);

        if (attempt < GLOBAL_CONFIG.retryAttempts) {
            console.warn(`Tentativa ${attempt} falhou. Tentando novamente em ${GLOBAL_CONFIG.retryDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, GLOBAL_CONFIG.retryDelay));
            return fetchWithRetry(url, options, attempt + 1);
        }

        throw error;
    }
}

/**
 * EXPORT
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        GLOBAL_CONFIG,
        buildApiUrl,
        fetchWithRetry
    };
}

console.log('✓ api-config.js carregado');
