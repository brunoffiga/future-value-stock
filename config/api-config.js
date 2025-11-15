// config/api-config.js
// (Baseado na FASE 2.1 do plano)

const API_CONFIG = {
    // Dados de Preços (Gratuitas)
    yahoo: {
        base: "https://query1.finance.yahoo.com/v8/finance",
        key: null // Gratuita
    },
    
    // Alpha Vantage (Gratuita com limites)
    alphaVantage: {
        base: "https://www.alphavantage.co/query",
        key: "SUA_CHAVE_API_AQUI", // Registrar em alphavantage.co
        limit: "5 calls/minute, 500 calls/day"
    },
    
    // Banco Central (Gratuita)
    bcb: {
        base: "https://api.bcb.gov.br/dados/serie/bcdata.sgs",
        endpoints: {
            selic: "/432/dados/ultimos/1",
            ipca: "/433/dados/ultimos/12"
        }
    },
    
    // Status Invest (Scraping)
    statusInvest: {
        base: "https://statusinvest.com.br/acoes",
        method: "scraping"
    }
};