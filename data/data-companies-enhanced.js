// data/data-companies-enhanced.js
// Base de dados mock (FASE 1) com a estrutura unificada.

const ENHANCED_COMPANIES = [
    {
        ticker: "PLPL3",
        name: "Plano & Plano",
        sector: "Construção Civil",
        // ... (outros dados básicos: score antigo, preço, etc.)

        // NOVO: Consenso de Price Targets (FASE 1.1)
        analystTargets: {
            consensus: { mean: 24.50, median: 23.80, count: 9 },
            revisions: { delta30d: 8.5, upgrades: 3, downgrades: 0 },
            impliedUpside: { toMedian: 48.2, dispersion: 0.10 }
        },
        
        // NOVO: Earnings Revisions (FASE 1.2)
        earningsData: {
            eps: { ttm: 1.67, forward: 2.10, growth1Y: 25.7 },
            revisions: { eps3m: { up: 7, down: 1, delta: 5.8 } },
            surprises: { beatRate: 75, avgSurprise: 5.0 }
        },
        
        // NOVO: Análise Técnica (FASE 1.3)
        technicalAnalysis: {
            price: { current: 16.06, ma50: 15.20, ma200: 14.50 },
            momentum: { rsi14: 62.5, macd: { trend: "BULLISH" } },
            volume: { ratio: 1.18, accumDist: "ACCUMULATION" },
            signals: { overallScore: 72, recommendation: "BUY" }
        },
        
        // NOVO: Smart Money (FASE 1.4)
        smartMoney: {
            insiders: { last90days: { netBuys: 4, currentPremium: 8.5 } },
            institutional: { ownership: 68.5, change3m: 5.2, flowTrend: "POSITIVE" }
        },

        // NOVO: Free Cash Flow (FASE 1.5)
        cashFlow: {
            fcf: { fcfYield: 21.8, fcfMargin: 15.2, fcfConversion: 85 },
            earningsQuality: { qualityScore: 85 }
        },

        // NOVO: ML Predictions (FASE 1.6)
        mlPredictions: {
            randomForest: { prediction30d: "UP", probability: 0.78, expectedReturn: 8.5 },
            ensemble: { consensus: "STRONG_BUY", agreement: 0.80 },
            backtest: { accuracy90d: 78, sharpeRatio: 1.85 }
        },

        // NOVO: Análise Macro (FASE 1.7)
        macroAnalysis: {
            brazil: { selic: { current: 15.00, trend: "DOWN" } },
            sensitivities: { betaSelic: -0.85, betaGDP: 1.20 },
            regime: { current: "LATE_CYCLE", favoredSectors: ["Banks", "Utilities"] }
        },
        
        // MANTIDO: Métricas Fundamentais (dos projetos antigos)
        metrics: {
            pe: 9.63,
            roe: 49,
            roic: 24.89,
            dividendYield: 5.96,
            netDebtToEbitda: 0.2,
            ebitdaMargin: 17.9,
            revenueGrowth: 29.22
        }
    }
    // ... (outras 16 empresas com a mesma estrutura)
];