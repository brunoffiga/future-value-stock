// ============================
// DATA-COLLECTOR.JS - Serviço de Coleta de Dados
// Integração com APIs externas para dados em tempo real
// ============================

/**
 * SERVIÇO DE COLETA DE DADOS
 *
 * Responsável por:
 * - Buscar dados históricos de preços
 * - Calcular indicadores técnicos
 * - Coletar consenso de analistas
 * - Atualizar dados fundamentalistas
 * - Gerenciar cache de dados
 */

class DataCollectorService {
    constructor() {
        this.cache = new Map();
        this.updateInterval = 5 * 60 * 1000; // 5 minutos
        this.apiConfig = typeof API_CONFIG !== 'undefined' ? API_CONFIG : null;
        this.isInitialized = false;
    }

    /**
     * INICIALIZAÇÃO DO SERVIÇO
     */
    async initialize() {
        if (this.isInitialized) {
            console.log('⚠ DataCollectorService já inicializado');
            return;
        }

        console.log('🚀 Inicializando DataCollectorService...');

        // Verificar disponibilidade de APIs
        this.checkApiAvailability();

        // Configurar atualização automática
        this.setupAutoUpdate();

        this.isInitialized = true;
        console.log('✅ DataCollectorService inicializado');
    }

    /**
     * VERIFICAR DISPONIBILIDADE DE APIs
     */
    checkApiAvailability() {
        if (!this.apiConfig) {
            console.warn('⚠ API_CONFIG não encontrado. Usando modo mock.');
            return;
        }

        const apis = ['yahoo', 'bcb', 'alphaVantage'];
        apis.forEach(api => {
            const config = this.apiConfig[api];
            if (config && config.key === null) {
                console.log(`✓ ${api}: Disponível (sem chave necessária)`);
            } else if (config && config.key && config.key !== 'YOUR_API_KEY_HERE') {
                console.log(`✓ ${api}: Configurado`);
            } else {
                console.log(`⚠ ${api}: Não configurado (usando mock)`);
            }
        });
    }

    /**
     * CONFIGURAR ATUALIZAÇÃO AUTOMÁTICA
     */
    setupAutoUpdate() {
        setInterval(() => {
            this.cleanExpiredCache();
        }, this.updateInterval);

        console.log(`✓ Auto-update configurado (${this.updateInterval / 1000}s)`);
    }

    // ==================== DADOS DE PREÇOS ====================

    /**
     * BUSCAR DADOS HISTÓRICOS DE PREÇOS
     * @param {string} ticker - Código da ação
     * @param {string} period - Período (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, max)
     * @param {string} interval - Intervalo (1m, 5m, 15m, 30m, 1h, 1d, 1wk, 1mo)
     */
    async fetchHistoricalPrices(ticker, period = "1y", interval = "1d") {
        const cacheKey = `hist_${ticker}_${period}_${interval}`;

        // Verificar cache
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            console.log(`✓ Dados de ${ticker} obtidos do cache`);
            return cached;
        }

        console.log(`📊 Buscando dados históricos para ${ticker}...`);

        try {
            // Tentar buscar dados reais via API
            const data = await this.fetchYahooFinance(ticker, period, interval);

            // Salvar no cache
            this.saveToCache(cacheKey, data, this.updateInterval);

            return data;
        } catch (error) {
            console.warn(`⚠ Erro ao buscar ${ticker}:`, error.message);
            console.log('→ Usando dados mock');

            // Fallback para dados mock
            const mockData = this.getMockHistoricalData(ticker, period);
            this.saveToCache(cacheKey, mockData, this.updateInterval);

            return mockData;
        }
    }

    /**
     * BUSCAR DADOS DO YAHOO FINANCE
     */
    async fetchYahooFinance(ticker, period, interval) {
        // Adicionar sufixo .SA para ações brasileiras
        const yahooTicker = ticker.endsWith('3') || ticker.endsWith('4')
            ? `${ticker}.SA`
            : ticker;

        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooTicker}?period1=0&period2=9999999999&interval=${interval}&range=${period}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        const result = json.chart.result[0];

        if (!result) {
            throw new Error('Sem dados retornados');
        }

        // Processar dados
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];

        return timestamps.map((timestamp, i) => ({
            date: new Date(timestamp * 1000).toISOString().split('T')[0],
            timestamp: timestamp,
            open: quotes.open[i],
            high: quotes.high[i],
            low: quotes.low[i],
            close: quotes.close[i],
            volume: quotes.volume[i]
        })).filter(item => item.close !== null);
    }

    /**
     * BUSCAR COTAÇÃO ATUAL
     */
    async fetchCurrentPrice(ticker) {
        const cacheKey = `price_${ticker}`;
        const cached = this.getFromCache(cacheKey);

        if (cached) return cached;

        try {
            const yahooTicker = `${ticker}.SA`;
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooTicker}?interval=1d&range=1d`;

            const response = await fetch(url);
            const json = await response.json();
            const result = json.chart.result[0];

            const currentPrice = result.meta.regularMarketPrice;
            const previousClose = result.meta.previousClose;
            const change = currentPrice - previousClose;
            const changePercent = (change / previousClose) * 100;

            const priceData = {
                ticker: ticker,
                price: currentPrice,
                previousClose: previousClose,
                change: change,
                changePercent: changePercent,
                timestamp: new Date().toISOString()
            };

            this.saveToCache(cacheKey, priceData, 60000); // Cache de 1 minuto

            return priceData;
        } catch (error) {
            console.warn(`⚠ Erro ao buscar cotação de ${ticker}:`, error.message);
            return null;
        }
    }

    // ==================== INDICADORES TÉCNICOS ====================

    /**
     * CALCULAR INDICADORES TÉCNICOS
     */
    async calculateTechnicalIndicators(prices) {
        if (!prices || prices.length === 0) {
            return null;
        }

        const closes = prices.map(p => p.close);
        const volumes = prices.map(p => p.volume);

        return {
            sma20: this.calculateSMA(closes, 20),
            sma50: this.calculateSMA(closes, 50),
            sma200: this.calculateSMA(closes, 200),
            rsi14: this.calculateRSI(closes, 14),
            macd: this.calculateMACD(closes),
            obv: this.calculateOBV(closes, volumes),
            volatility: this.calculateVolatility(closes, 20)
        };
    }

    /**
     * CALCULAR SMA (Simple Moving Average)
     */
    calculateSMA(values, period) {
        if (values.length < period) return null;

        const slice = values.slice(-period);
        const sum = slice.reduce((a, b) => a + b, 0);
        return sum / period;
    }

    /**
     * CALCULAR RSI (Relative Strength Index)
     */
    calculateRSI(closes, period = 14) {
        if (closes.length < period + 1) return null;

        const changes = [];
        for (let i = 1; i < closes.length; i++) {
            changes.push(closes[i] - closes[i - 1]);
        }

        const recentChanges = changes.slice(-period);
        const gains = recentChanges.filter(c => c > 0);
        const losses = recentChanges.filter(c => c < 0).map(Math.abs);

        const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / period : 0;
        const avgLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / period : 0;

        if (avgLoss === 0) return 100;

        const rs = avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));

        return rsi;
    }

    /**
     * CALCULAR MACD (Moving Average Convergence Divergence)
     */
    calculateMACD(closes) {
        if (closes.length < 26) return null;

        const ema12 = this.calculateEMA(closes, 12);
        const ema26 = this.calculateEMA(closes, 26);

        if (!ema12 || !ema26) return null;

        const macdLine = ema12 - ema26;

        return {
            value: macdLine,
            signal: 0, // Simplificado
            histogram: macdLine,
            trend: macdLine > 0 ? 'BULLISH' : 'BEARISH'
        };
    }

    /**
     * CALCULAR EMA (Exponential Moving Average)
     */
    calculateEMA(values, period) {
        if (values.length < period) return null;

        const k = 2 / (period + 1);
        let ema = values[0];

        for (let i = 1; i < values.length; i++) {
            ema = (values[i] * k) + (ema * (1 - k));
        }

        return ema;
    }

    /**
     * CALCULAR OBV (On-Balance Volume)
     */
    calculateOBV(closes, volumes) {
        if (!closes || !volumes || closes.length < 2) return 0;

        let obv = 0;
        for (let i = 1; i < closes.length; i++) {
            if (closes[i] > closes[i - 1]) {
                obv += volumes[i];
            } else if (closes[i] < closes[i - 1]) {
                obv -= volumes[i];
            }
        }

        return obv;
    }

    /**
     * CALCULAR VOLATILIDADE
     */
    calculateVolatility(closes, period = 20) {
        if (closes.length < period) return null;

        const returns = [];
        for (let i = 1; i < closes.length; i++) {
            returns.push((closes[i] - closes[i - 1]) / closes[i - 1]);
        }

        const recentReturns = returns.slice(-period);
        const mean = recentReturns.reduce((a, b) => a + b, 0) / period;
        const variance = recentReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / period;

        return Math.sqrt(variance) * Math.sqrt(252) * 100; // Anualizada
    }

    // ==================== DADOS FUNDAMENTALISTAS ====================

    /**
     * BUSCAR CONSENSO DE ANALISTAS
     * (Requer scraping - implementação futura)
     */
    async fetchAnalystConsensus(ticker) {
        console.log(`📈 Buscando consenso de analistas para ${ticker}...`);

        // Por enquanto, retornar mock
        return {
            recommendation: "BUY",
            targetPrice: null,
            numberOfAnalysts: 0,
            source: "mock"
        };
    }

    // ==================== DADOS MACROECONÔMICOS ====================

    /**
     * BUSCAR TAXA SELIC ATUAL
     */
    async fetchSelicRate() {
        const cacheKey = 'macro_selic';
        const cached = this.getFromCache(cacheKey);

        if (cached) return cached;

        try {
            const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs/432/dados/ultimos/1?formato=json';
            const response = await fetch(url);
            const data = await response.json();

            const selicData = {
                value: parseFloat(data[0].valor),
                date: data[0].data,
                source: 'BCB'
            };

            this.saveToCache(cacheKey, selicData, 24 * 60 * 60 * 1000); // Cache de 24h

            return selicData;
        } catch (error) {
            console.warn('⚠ Erro ao buscar SELIC:', error.message);
            return { value: 11.25, date: '2025-11-15', source: 'mock' };
        }
    }

    // ==================== CACHE ====================

    /**
     * SALVAR NO CACHE
     */
    saveToCache(key, data, ttl = this.updateInterval) {
        this.cache.set(key, {
            data: data,
            expires: Date.now() + ttl
        });
    }

    /**
     * OBTER DO CACHE
     */
    getFromCache(key) {
        const cached = this.cache.get(key);

        if (!cached) return null;

        if (Date.now() > cached.expires) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    /**
     * LIMPAR CACHE EXPIRADO
     */
    cleanExpiredCache() {
        const now = Date.now();
        let cleaned = 0;

        for (const [key, value] of this.cache.entries()) {
            if (now > value.expires) {
                this.cache.delete(key);
                cleaned++;
            }
        }

        if (cleaned > 0) {
            console.log(`🧹 Cache limpo: ${cleaned} item(ns) removido(s)`);
        }
    }

    /**
     * LIMPAR TODO O CACHE
     */
    clearCache() {
        this.cache.clear();
        console.log('🧹 Cache completamente limpo');
    }

    // ==================== DADOS MOCK ====================

    /**
     * GERAR DADOS HISTÓRICOS MOCK
     */
    getMockHistoricalData(ticker, period) {
        const company = typeof companiesData !== 'undefined'
            ? companiesData.find(c => c.ticker === ticker)
            : null;

        const basePrice = company ? company.currentPrice : 50;
        const days = period === '1mo' ? 30 : period === '3mo' ? 90 : period === '6mo' ? 180 : 365;

        const data = [];
        const today = new Date();

        for (let i = days; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            const randomWalk = (Math.random() - 0.5) * 0.05; // ±2.5%
            const price = basePrice * (1 + randomWalk);

            data.push({
                date: date.toISOString().split('T')[0],
                timestamp: Math.floor(date.getTime() / 1000),
                open: price * 0.99,
                high: price * 1.02,
                low: price * 0.98,
                close: price,
                volume: Math.floor(Math.random() * 1000000 + 500000)
            });
        }

        return data;
    }
}

/**
 * EXPORT
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataCollectorService;
}

console.log('✓ data-collector.js carregado');
