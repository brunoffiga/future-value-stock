// ============================
// DATA-COMPANIES.JS - Base de Dados Completa
// Empresas B3 SmallCaps com Análise Multidimensional
// Atualizado: Novembro 2025
// ============================

const COMPANIES_DATABASE = [
    // ==================== POD SELIC (RISCO-BRASIL) ====================
    {
        ticker: "PLPL3",
        name: "Plano & Plano",
        sector: "Construção Civil",
        subsector: "Baixa Renda / MCMV",
        pod: "Pod Selic",

        // Preços e Valuation
        marketCap: 3400000000,
        currentPrice: 16.06,
        targetPrice: 20.60,
        upside: 28.27,

        // Projeções Temporais
        projections: {
            target1Y: 20.60,
            target3Y: 31.00,
            target5Y: 42.00,
            target10Y: 62.00
        },

        // Score e Ranking
        score: 88,
        ranking: 1,
        recommendation: "STRONG BUY",
        source: "V2",

        // Métricas Fundamentalistas
        metrics: {
            pe: 9.63,
            roe: 49,
            roic: 24.89,
            dividendYield: 5.96,
            netDebtToEbitda: 0.2,
            ebitdaMargin: 17.9,
            revenueGrowth: 29.22,
            earningsGrowth: 28.45,
            pb: 3.78,
            evEbitda: 7.28,
            beta: 1.2,
            freeFloat: 27,
            liquidityDaily: 120000000,
            fcfYield: 18.5,
            assetTurnover: 0.85
        },

        // Performance Histórica
        performance: {
            ytd: 71,
            oneYear: 105.5,
            threeYears: 145,
            fiveYears: null
        },

        // Tese de Investimento
        catalysts: [
            "Lançamentos 2H25: R$ 2.5B em VGV programado",
            "Renovação MCMV 2026 com subsídios ampliados pelo governo",
            "Follow-on potencial R$ 500M para expansão banco de terrenos",
            "Parceria estratégica Cyrela em alto padrão (15% do VGV)",
            "Margem EBITDA estável 17-18% demonstra eficiência operacional"
        ],

        risks: [
            "Alta sensibilidade à Selic - cada 100bps impacta ~8% no valuation",
            "Concentração geográfica em SP (72% das vendas)",
            "Execução dependente de crédito MCMV e políticas públicas",
            "Competição intensa no segmento econômico"
        ],

        keyHighlights: [
            "ROE 49% - o mais alto do setor de construção",
            "Líder em habitação econômica com marca consolidada",
            "45 mil unidades entregues com histórico de qualidade",
            "Apenas 0.2x dívida/EBITDA - balanço extremamente saudável",
            "P/L 9.63x muito atrativo vs peers em 12-15x"
        ],

        // Consenso de Analistas
        analystConsensus: {
            buy: 8,
            hold: 1,
            sell: 0
        },

        // Resultados Recentes
        lastResults: {
            quarter: "2Q25",
            revenue: 920000000,
            netIncome: 168000000,
            ebitda: 164680000
        },

        nextEarnings: "2025-11-06",
        irWebsite: "https://ri.planoeplano.com.br/"
    },

    {
        ticker: "CURY3",
        name: "Cury Construtora",
        sector: "Construção Civil",
        subsector: "Média Renda / MCMV",
        pod: "Pod Selic",

        marketCap: 5600000000,
        currentPrice: 32.94,
        targetPrice: 40.01,
        upside: 21.46,

        projections: {
            target1Y: 40.01,
            target3Y: 45.00,
            target5Y: 58.00,
            target10Y: 85.00
        },

        score: 87,
        ranking: 2,
        recommendation: "STRONG BUY",
        source: "V2",

        metrics: {
            pe: 12.34,
            roe: 66,
            roic: 42,
            dividendYield: 0,
            netDebtToEbitda: -0.3,
            ebitdaMargin: 43.4,
            revenueGrowth: 38,
            earningsGrowth: 52,
            pb: 5.2,
            evEbitda: 9.5,
            beta: 1.35,
            freeFloat: 42,
            liquidityDaily: 180000000,
            fcfYield: 22.0,
            assetTurnover: 0.92
        },

        performance: {
            ytd: 58,
            oneYear: 92,
            threeYears: 220,
            fiveYears: null
        },

        catalysts: [
            "Parceria Cyrela: acesso a terrenos premium em localizações estratégicas",
            "Candidato forte a stock split 2:1 por alto valor da ação",
            "Expansão agressiva para 18 estados até 2026",
            "Programa de recompra R$ 200M aprovado demonstra confiança",
            "Margem EBITDA líder do setor 43% vs média 20%"
        ],

        risks: [
            "Valuation premium vs. peers - múltiplos acima da média setorial",
            "Dependência da parceria Cyrela para crescimento",
            "Alta correlação com Selic limita upside em cenário de juros altos",
            "Ciclicalidade inerente do setor de construção"
        ],

        keyHighlights: [
            "ROE 66% - recorde histórico para o setor",
            "Caixa líquido positivo - empresa sem dívida líquida",
            "Zero dívida líquida - balanço fortaleza",
            "Eficiência operacional top tier com ROIC 42%",
            "ESG: Certificações ISO 14001 e 45001"
        ],

        analystConsensus: {
            buy: 7,
            hold: 2,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 1200000000,
            netIncome: 220000000,
            ebitda: 520800000
        },

        nextEarnings: "2025-11-09",
        irWebsite: "https://ri.cury.net/"
    },

    {
        ticker: "DIRR3",
        name: "Direcional",
        sector: "Construção Civil",
        subsector: "Incorporação",
        pod: "Pod Selic",

        marketCap: 4850000000,
        currentPrice: 15.72,
        targetPrice: 18.76,
        upside: 19.34,

        projections: {
            target1Y: 18.76,
            target3Y: 31.00,
            target5Y: 42.00,
            target10Y: 62.00
        },

        score: 83,
        ranking: 3,
        recommendation: "STRONG BUY",
        source: "V1+V2",

        metrics: {
            pe: 14.22,
            roe: 21.5,
            roic: 18,
            dividendYield: 12.0,
            netDebtToEbitda: 1.5,
            ebitdaMargin: 20,
            revenueGrowth: 22,
            earningsGrowth: 18,
            pb: 2.8,
            evEbitda: 8.5,
            beta: 1.25,
            freeFloat: 48,
            liquidityDaily: 95000000,
            fcfYield: 15.8,
            assetTurnover: 0.78
        },

        performance: {
            ytd: 28,
            oneYear: 42,
            threeYears: 85,
            fiveYears: 180
        },

        catalysts: [
            "Desdobramento 2:1 aprovado para aumentar liquidez",
            "Dividend yield 12% muito atrativo para o setor",
            "Diversificação geográfica em 15 estados reduz risco",
            "Governança Novo Mercado desde IPO",
            "VGV 2025: R$ 4.2B (+28% vs 2024)"
        ],

        risks: [
            "Leverage moderada 1.5x requer monitoramento",
            "Sensibilidade a juros impacta demanda",
            "Competição regional em mercados menores",
            "Execução de expansão geográfica"
        ],

        keyHighlights: [
            "Presença nacional consolidada em 15 estados",
            "ROE 21.5% consistente ao longo dos anos",
            "Payout ratio 80-90% - foco em retorno ao acionista",
            "Histórico de 35 anos no mercado",
            "Free float 48% garante boa liquidez"
        ],

        analystConsensus: {
            buy: 6,
            hold: 3,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 1450000000,
            netIncome: 185000000,
            ebitda: 391500000
        },

        nextEarnings: "2025-11-07",
        irWebsite: "https://ri.direcional.com.br/"
    },

    {
        ticker: "IGTI11",
        name: "Iguatemi",
        sector: "Shoppings",
        subsector: "Varejo Imobiliário",
        pod: "Pod Selic",

        marketCap: 6200000000,
        currentPrice: 24.46,
        targetPrice: 29.17,
        upside: 19.25,

        projections: {
            target1Y: 29.17,
            target3Y: 34.00,
            target5Y: 38.00,
            target10Y: 48.00
        },

        score: 78,
        ranking: 8,
        recommendation: "BUY",
        source: "V2",

        metrics: {
            pe: 18.5,
            roe: 8.5,
            roic: 6.8,
            dividendYield: 6.8,
            netDebtToEbitda: 3.5,
            ebitdaMargin: 70.1,
            revenueGrowth: 12,
            earningsGrowth: 15,
            pb: 1.2,
            evEbitda: 12.5,
            beta: 0.9,
            freeFloat: 45,
            liquidityDaily: 85000000,
            fcfYield: 8.2,
            assetTurnover: 0.15
        },

        performance: {
            ytd: 8,
            oneYear: 15,
            threeYears: 35,
            fiveYears: 72
        },

        catalysts: [
            "Concessões até 2051 garantem receita de longo prazo",
            "Expansão premium (JK Iguatemi São Paulo)",
            "NOI Yield 8-10% atrativo vs CDI",
            "Tráfego recuperando pós-pandemia (+18% vs 2019)",
            "Dividend yield 6-8% estável e crescente"
        ],

        risks: [
            "Risco regulatório de contratos de aluguel",
            "Concentração em shoppings AAA (high-end)",
            "Sensibilidade a consumo de alto padrão",
            "Leverage 3.5x acima da média ideal"
        ],

        keyHighlights: [
            "Receita de aluguéis previsível e indexada",
            "Portfólio premium em localizações AAA",
            "Margem EBITDA 70% - modelo asset-light",
            "Geração de caixa estável e recorrente",
            "Baixa volatilidade (Beta 0.9)"
        ],

        analystConsensus: {
            buy: 7,
            hold: 2,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 280000000,
            netIncome: 95000000,
            ebitda: 196280000
        },

        nextEarnings: "2025-11-13",
        irWebsite: "https://ri.iguatemi.com.br/"
    },

    {
        ticker: "B3SA3",
        name: "B3",
        sector: "Serviços Financeiros",
        subsector: "Bolsa de Valores",
        pod: "Pod Selic",

        marketCap: 85000000000,
        currentPrice: 15.67,
        targetPrice: 18.50,
        upside: 18.06,

        projections: {
            target1Y: 18.50,
            target3Y: 21.00,
            target5Y: 24.00,
            target10Y: 30.00
        },

        score: 75,
        ranking: 9,
        recommendation: "BUY",
        source: "V2",

        metrics: {
            pe: 16.8,
            roe: 20.2,
            roic: 18.5,
            dividendYield: 5.2,
            netDebtToEbitda: 1.5,
            ebitdaMargin: 72.0,
            revenueGrowth: 8,
            earningsGrowth: 12,
            pb: 3.4,
            evEbitda: 11.2,
            beta: 1.1,
            freeFloat: 78,
            liquidityDaily: 450000000,
            fcfYield: 6.8,
            assetTurnover: 0.42
        },

        performance: {
            ytd: -5,
            oneYear: 8,
            threeYears: 25,
            fiveYears: 120
        },

        catalysts: [
            "Monopólio natural da infraestrutura de mercado",
            "Diversificação: balcão, derivativos, renda fixa",
            "Volume cresce com Selic baixa e migração para ações",
            "Expansão internacional (Argentina, Chile)",
            "Payout 100% FFO - dividendos fartos"
        ],

        risks: [
            "Risco regulatório (CVM pode impor limites)",
            "Competição de fintechs em nichos específicos",
            "Volumes dependem de apetite ao risco do mercado",
            "Sensibilidade a crises de liquidez"
        ],

        keyHighlights: [
            "Única bolsa do Brasil - moat regulatório",
            "ROE 20% consistente há anos",
            "Margem EBITDA 72% - negócio altamente escalável",
            "Geração de caixa extraordinária",
            "Free float 78% - alta liquidez"
        ],

        analystConsensus: {
            buy: 8,
            hold: 4,
            sell: 1
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 1850000000,
            netIncome: 980000000,
            ebitda: 1332000000
        },

        nextEarnings: "2025-11-08",
        irWebsite: "https://ri.b3.com.br/"
    },

    // ==================== POD GLOBAL (COMMODITY/DÓLAR) ====================
    {
        ticker: "SUZB3",
        name: "Suzano",
        sector: "Papel e Celulose",
        subsector: "Commodities",
        pod: "Pod Global",

        marketCap: 65000000000,
        currentPrice: 48.55,
        targetPrice: 92.00,
        upside: 89.49,

        projections: {
            target1Y: 92.00,
            target3Y: 110.00,
            target5Y: 135.00,
            target10Y: 180.00
        },

        score: 85,
        ranking: 4,
        recommendation: "STRONG BUY",
        source: "V2",

        metrics: {
            pe: 18.2,
            roe: 15.8,
            roic: 12.5,
            dividendYield: 2.8,
            netDebtToEbitda: 2.8,
            ebitdaMargin: 45.0,
            revenueGrowth: 12,
            earningsGrowth: 25,
            pb: 2.9,
            evEbitda: 8.5,
            beta: 0.85,
            freeFloat: 68,
            liquidityDaily: 380000000,
            fcfYield: 8.5,
            assetTurnover: 0.55
        },

        performance: {
            ytd: -8,
            oneYear: 12,
            threeYears: 35,
            fiveYears: 180
        },

        catalysts: [
            "Preço da celulose em recuperação na China/Europa",
            "Projeto Cerrado: +2.5M ton capacidade até 2028",
            "Integração vertical (florestas próprias)",
            "Beneficiada por dólar forte (receita 95% USD)",
            "ESG líder: carbono negativo certificado"
        ],

        risks: [
            "Volatilidade do preço da celulose (commodity cíclica)",
            "Capex intensivo R$ 22B no Projeto Cerrado",
            "Risco cambial (dívida 70% USD)",
            "Competição de players asiáticos"
        ],

        keyHighlights: [
            "Maior produtora de celulose de eucalipto do mundo",
            "4.2M ton capacidade instalada",
            "Custo cash <$200/ton - entre os mais baixos globalmente",
            "Florestas plantadas: 1.3M hectares",
            "Margem EBITDA 45% robusta"
        ],

        analystConsensus: {
            buy: 12,
            hold: 3,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 9800000000,
            netIncome: 1250000000,
            ebitda: 4410000000
        },

        nextEarnings: "2025-11-07",
        irWebsite: "https://ri.suzano.com.br/"
    },

    {
        ticker: "TTEN3",
        name: "3tentos",
        sector: "Agronegócio",
        subsector: "Grãos e Insumos",
        pod: "Pod Global",

        marketCap: 3200000000,
        currentPrice: 13.45,
        targetPrice: 20.00,
        upside: 48.70,

        projections: {
            target1Y: 20.00,
            target3Y: 26.00,
            target5Y: 34.00,
            target10Y: 50.00
        },

        score: 81,
        ranking: 5,
        recommendation: "STRONG BUY",
        source: "V2",

        metrics: {
            pe: 15.8,
            roe: 24.1,
            roic: 18.2,
            dividendYield: 3.5,
            netDebtToEbitda: 1.9,
            ebitdaMargin: 12.3,
            revenueGrowth: 28,
            earningsGrowth: 32,
            pb: 3.8,
            evEbitda: 9.2,
            beta: 1.15,
            freeFloat: 35,
            liquidityDaily: 45000000,
            fcfYield: 12.5,
            assetTurnover: 1.85
        },

        performance: {
            ytd: 18,
            oneYear: 35,
            threeYears: 120,
            fiveYears: null
        },

        catalysts: [
            "Integração vertical: grãos + insumos + armazenagem",
            "Safra recorde Brasil 2024/25: 322M ton projetadas",
            "Preço da soja acima de US$ 12/bushel sustenta margens",
            "Expansão para Nordeste e Centro-Oeste",
            "Varejo de insumos crescendo 40% a.a."
        ],

        risks: [
            "Volatilidade de commodities agrícolas",
            "Dependência de safra e clima",
            "Margens comprimidas em momentos de spread baixo",
            "Competição de tradings gigantes (ADM, Bunge)"
        ],

        keyHighlights: [
            "ROE 24% - alta rentabilidade para o setor",
            "Modelo hub de origination diferenciado",
            "60 lojas de varejo agro no Sul",
            "Capacidade de armazenagem: 1.2M ton",
            "Descorrelacionada da Selic"
        ],

        analystConsensus: {
            buy: 6,
            hold: 2,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 2100000000,
            netIncome: 85000000,
            ebitda: 258300000
        },

        nextEarnings: "2025-11-12",
        irWebsite: "https://ri.3tentos.com.br/"
    },

    {
        ticker: "PETR4",
        name: "Petrobras",
        sector: "Petróleo e Gás",
        subsector: "Exploração e Produção",
        pod: "Pod Global",

        marketCap: 425000000000,
        currentPrice: 31.76,
        targetPrice: 37.50,
        upside: 18.07,

        projections: {
            target1Y: 37.50,
            target3Y: 42.00,
            target5Y: 48.00,
            target10Y: 60.00
        },

        score: 80,
        ranking: 6,
        recommendation: "BUY",
        source: "V2",

        metrics: {
            pe: 4.2,
            roe: 35.7,
            roic: 28.5,
            dividendYield: 14.5,
            netDebtToEbitda: 0.8,
            ebitdaMargin: 48.2,
            revenueGrowth: 8,
            earningsGrowth: -5,
            pb: 1.5,
            evEbitda: 2.8,
            beta: 1.25,
            freeFloat: 72,
            liquidityDaily: 1800000000,
            fcfYield: 28.0,
            assetTurnover: 0.68
        },

        performance: {
            ytd: -12,
            oneYear: -8,
            threeYears: 15,
            fiveYears: 250
        },

        catalysts: [
            "Brent >$80/barril sustenta dividendos extraordinários",
            "Produção pré-sal 2.2M bpd com custo <$8/barril",
            "Payout 45% do FCF - R$ 50B+ em dividendos anuais",
            "Deleveraging completo: dívida/EBITDA 0.8x",
            "Investimento em refino reduz exposição a margens"
        ],

        risks: [
            "Risco político e interferência governamental",
            "Volatilidade do Brent pode reduzir dividendos",
            "Transição energética de longo prazo",
            "Custo de extração crescente em campos maduros"
        ],

        keyHighlights: [
            "ROE 35% - entre as maiores do mundo",
            "Dividend yield 14.5% extraordinário",
            "Pré-sal breakeven <$35/barril",
            "Reservas provadas: 11.6B barris",
            "FCF yield 28% - geração de caixa brutal"
        ],

        analystConsensus: {
            buy: 15,
            hold: 8,
            sell: 2
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 120000000000,
            netIncome: 28500000000,
            ebitda: 57840000000
        },

        nextEarnings: "2025-11-14",
        irWebsite: "https://ri.petrobras.com.br/"
    },

    // ==================== POD SECULAR (STARTUP METHOD) ====================
    {
        ticker: "WEGE3",
        name: "WEG",
        sector: "Bens de Capital",
        subsector: "Equipamentos Elétricos",
        pod: "Pod Secular",

        marketCap: 68000000000,
        currentPrice: 36.16,
        targetPrice: 64.00,
        upside: 77.04,

        projections: {
            target1Y: 64.00,
            target3Y: 80.00,
            target5Y: 105.00,
            target10Y: 150.00
        },

        score: 92,
        ranking: 1,
        recommendation: "STRONG BUY",
        source: "V2",

        metrics: {
            pe: 28.5,
            roe: 30.5,
            roic: 25.8,
            dividendYield: 1.2,
            netDebtToEbitda: -0.5,
            ebitdaMargin: 20.1,
            revenueGrowth: 22,
            earningsGrowth: 28,
            pb: 8.7,
            evEbitda: 22.5,
            beta: 0.95,
            freeFloat: 52,
            liquidityDaily: 280000000,
            fcfYield: 3.8,
            assetTurnover: 1.12
        },

        performance: {
            ytd: 48,
            oneYear: 85,
            threeYears: 220,
            fiveYears: 450
        },

        catalysts: [
            "Transição energética global impulsiona soluções elétricas",
            "Receita crescendo >20% a.a. consistentemente há 10 anos",
            "Expansão internacional: 39 plantas em 15 países",
            "Motores elétricos +30% com eletrificação veicular",
            "Energia renovável: eólica e solar +45% a.a."
        ],

        risks: [
            "Valuation premium (P/L 28x vs setor 15x)",
            "Exposição a ciclo industrial global",
            "Competição chinesa em produtos de baixo valor",
            "Apreciação do Real reduz competitividade exportação"
        ],

        keyHighlights: [
            "ROE 30% - qualidade excepcional há décadas",
            "Caixa líquido - empresa sem dívida líquida",
            "Crescimento secular independente de macro",
            "Marca global reconhecida em +130 países",
            "Inovação: 5% receita em P&D anualmente"
        ],

        analystConsensus: {
            buy: 18,
            hold: 3,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 9200000000,
            netIncome: 1250000000,
            ebitda: 1849200000
        },

        nextEarnings: "2025-11-08",
        irWebsite: "https://ri.weg.net/"
    },

    {
        ticker: "TOTS3",
        name: "Totvs",
        sector: "Tecnologia",
        subsector: "Software (SaaS)",
        pod: "Pod Secular",

        marketCap: 28000000000,
        currentPrice: 43.57,
        targetPrice: 55.00,
        upside: 26.22,

        projections: {
            target1Y: 55.00,
            target3Y: 68.00,
            target5Y: 85.00,
            target10Y: 120.00
        },

        score: 86,
        ranking: 7,
        recommendation: "BUY",
        source: "V2",

        metrics: {
            pe: 32.5,
            roe: 18.2,
            roic: 15.8,
            dividendYield: 0.8,
            netDebtToEbitda: 1.1,
            ebitdaMargin: 25.0,
            revenueGrowth: 18,
            earningsGrowth: 22,
            pb: 5.9,
            evEbitda: 18.5,
            beta: 1.05,
            freeFloat: 58,
            liquidityDaily: 95000000,
            fcfYield: 4.2,
            assetTurnover: 0.72
        },

        performance: {
            ytd: 22,
            oneYear: 38,
            threeYears: 95,
            fiveYears: 280
        },

        catalysts: [
            "Migração SaaS acelerando: ARR +35% a.a.",
            "Receita recorrente já representa 75% do total",
            "M&A estratégicas em verticais (RD Station, Supplier)",
            "Expansão LATAM: México, Colômbia, Argentina",
            "Churn baixíssimo 0.8% mensal - clientes sticky"
        ],

        risks: [
            "Competição de players globais (SAP, Oracle)",
            "Dependência de PMEs brasileiras",
            "Valuation alto limita margem de segurança",
            "Execução de integrações pós-M&A"
        ],

        keyHighlights: [
            "Líder absoluta em ERP para PMEs no Brasil",
            "12 mil empresas clientes - base consolidada",
            "NPS 70+ demonstra satisfação altíssima",
            "Receita recorrente garante previsibilidade",
            "Tese secular de digitalização de PMEs"
        ],

        analystConsensus: {
            buy: 14,
            hold: 4,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 1250000000,
            netIncome: 185000000,
            ebitda: 312500000
        },

        nextEarnings: "2025-11-11",
        irWebsite: "https://ri.totvs.com/"
    },

    {
        ticker: "SMFT3",
        name: "Smart Fit",
        sector: "Varejo",
        subsector: "Academias",
        pod: "Pod Secular",

        marketCap: 5800000000,
        currentPrice: 25.83,
        targetPrice: 31.00,
        upside: 20.01,

        projections: {
            target1Y: 31.00,
            target3Y: 43.00,
            target5Y: 55.00,
            target10Y: 80.00
        },

        score: 79,
        ranking: 13,
        recommendation: "BUY",
        source: "V1+V2",

        metrics: {
            pe: 25.0,
            roe: 22.0,
            roic: 18.5,
            dividendYield: 0,
            netDebtToEbitda: 2.5,
            ebitdaMargin: 28.5,
            revenueGrowth: 33,
            earningsGrowth: 25,
            pb: 5.5,
            evEbitda: 14.2,
            beta: 1.46,
            freeFloat: 62,
            liquidityDaily: 110000000,
            fcfYield: 6.8,
            assetTurnover: 0.88
        },

        performance: {
            ytd: -12,
            oneYear: -8,
            threeYears: 85,
            fiveYears: 350
        },

        catalysts: [
            "5.3M membros +16% a.a. - maior rede LATAM",
            "Expansão internacional: 15 países, meta 20 até 2026",
            "340-360 novas unidades planejadas para 2025",
            "Vintages maduras com 53% margem EBITDA",
            "Tese secular de saúde e bem-estar"
        ],

        risks: [
            "Competição de academias locais e low-cost",
            "Saturação de mercados maduros (SP, RJ)",
            "Capex intensivo para expansão",
            "Execução internacional (diferenças culturais)"
        ],

        keyHighlights: [
            "4ª maior rede de academias do mundo",
            "Margem EBITDA 31% - eficiência operacional",
            "Modelo HVLP (High Volume, Low Price) resiliente",
            "FCF yield 11% esperado para 2026",
            "Não depende de crédito - receita recorrente"
        ],

        analystConsensus: {
            buy: 6,
            hold: 3,
            sell: 0
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 850000000,
            netIncome: 95000000,
            ebitda: 263500000
        },

        nextEarnings: "2025-11-14",
        irWebsite: "https://investor.smartfit.com.br/"
    },

    // ==================== POD SELL (EVITAR) ====================
    {
        ticker: "AMBP3",
        name: "Ambipar",
        sector: "Serviços",
        subsector: "Gestão Ambiental",
        pod: "Pod Sell",

        marketCap: 380000000,
        currentPrice: 0.38,
        targetPrice: 0.0,
        upside: -100,

        projections: {
            target1Y: 0.50,
            target3Y: null,
            target5Y: null,
            target10Y: null
        },

        score: 25,
        ranking: 20,
        recommendation: "SELL",
        source: "V1",

        metrics: {
            pe: -2.5,
            roe: -15.0,
            roic: -8.5,
            dividendYield: 0,
            netDebtToEbitda: 5.8,
            ebitdaMargin: 10.1,
            revenueGrowth: -12,
            earningsGrowth: -250,
            pb: 0.4,
            evEbitda: 15.2,
            beta: 2.2,
            freeFloat: 35,
            liquidityDaily: 8000000,
            fcfYield: -5.2,
            assetTurnover: 0.45
        },

        performance: {
            ytd: -75,
            oneYear: -82,
            threeYears: -95,
            fiveYears: null
        },

        catalysts: [],

        risks: [
            "Alavancagem insustentável 5.8x dívida/EBITDA",
            "Queima de caixa operacional",
            "Investigações regulatórias em andamento",
            "Governança questionável",
            "Risco de recuperação judicial"
        ],

        keyHighlights: [
            "EVITAR: Tese completamente quebrada",
            "Prejuízo recorrente e crescente",
            "Empresa em modo de sobrevivência",
            "Sem catalisadores de curto/médio prazo"
        ],

        analystConsensus: {
            buy: 0,
            hold: 1,
            sell: 5
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 450000000,
            netIncome: -180000000,
            ebitda: 45450000
        },

        nextEarnings: "2025-11-15",
        irWebsite: "https://ri.ambipar.com/"
    },

    // ==================== POD N/A (RADAR ANTIGO) ====================
    {
        ticker: "CASH3",
        name: "Méliuz",
        sector: "Tecnologia",
        subsector: "E-commerce/Fintech",
        pod: "Pod N/A",

        marketCap: 385000000,
        currentPrice: 4.26,
        targetPrice: 7.20,
        upside: 69.01,

        projections: {
            target1Y: 7.20,
            target3Y: 12.00,
            target5Y: 18.00,
            target10Y: 32.00
        },

        score: 62,
        ranking: 18,
        recommendation: "HOLD",
        source: "V1",

        metrics: {
            pe: 7.53,
            roe: 3,
            roic: 5,
            dividendYield: 0,
            netDebtToEbitda: -2.5,
            ebitdaMargin: 15,
            revenueGrowth: 12,
            earningsGrowth: 300,
            pb: 0.8,
            evEbitda: 5.2,
            beta: 2.1,
            freeFloat: 45,
            liquidityDaily: 25000000,
            fcfYield: 18.5,
            assetTurnover: 1.25
        },

        performance: {
            ytd: 45,
            oneYear: 85,
            threeYears: -95,
            fiveYears: null
        },

        catalysts: [
            "Turnaround completo EBITDA positivo após anos de prejuízo",
            "Novo CEO (nov 2024) com foco em rentabilidade",
            "Aposta em Bitcoin Treasury (polêmica)",
            "Caixa excessivo permite distribuição extraordinária"
        ],

        risks: [
            "Alta volatilidade (Beta 2.1)",
            "Competição intensa (Méliuz, Ame, Picpay)",
            "Modelo de negócio questionável",
            "Risco da estratégia Bitcoin"
        ],

        keyHighlights: [
            "EBITDA +R$54M vs -R$93M (virada)",
            "P/L 7.53x muito atrativo se turnaround se confirmar",
            "Caixa líquido robusto",
            "Upside de 69% segundo consenso"
        ],

        analystConsensus: {
            buy: 3,
            hold: 2,
            sell: 1
        },

        lastResults: {
            quarter: "2Q25",
            revenue: 95000000,
            netIncome: 8000000,
            ebitda: 14250000
        },

        nextEarnings: "2025-11-08",
        irWebsite: "https://ri.meliuz.com.br/"
    }
];

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COMPANIES_DATABASE };
}
