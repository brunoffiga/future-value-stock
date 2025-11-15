// ============================
// DATA-COMPANIES-ENHANCED.JS - Extensões de Dados (FASE 2+)
// Camada de dados avançados para integração futura com APIs
// ============================

/**
 * NOTA IMPORTANTE:
 *
 * Este arquivo contém EXTENSÕES OPCIONAIS de dados que serão
 * populadas através de APIs externas nas FASES 2 e 3.
 *
 * A base de dados principal está em: /data-companies.js
 *
 * As extensões aqui incluem:
 * - FASE 1.1: Consenso de Price Targets
 * - FASE 1.2: Earnings Revisions
 * - FASE 1.3: Análise Técnica
 * - FASE 1.4: Smart Money (Insiders + Institucionais)
 * - FASE 1.5: Free Cash Flow
 * - FASE 1.6: ML Predictions
 * - FASE 1.7: Análise Macro
 */

/**
 * ESTRUTURA DE EXTENSÃO PARA UMA EMPRESA
 */
const ENHANCED_DATA_TEMPLATE = {
    // Identificação (deve corresponder ao ticker em COMPANIES_DATABASE)
    ticker: "XXXX3",

    // FASE 1.1: Consenso de Price Targets
    analystTargets: {
        consensus: {
            mean: 0,              // Preço-alvo médio
            median: 0,            // Preço-alvo mediano
            high: 0,              // Maior preço-alvo
            low: 0,               // Menor preço-alvo
            count: 0,             // Número de analistas
            stdDev: 0             // Desvio padrão
        },
        revisions: {
            delta30d: 0,          // Mudança % nos últimos 30 dias
            delta90d: 0,          // Mudança % nos últimos 90 dias
            upgrades: 0,          // Número de upgrades recentes
            downgrades: 0         // Número de downgrades recentes
        },
        impliedUpside: {
            toMean: 0,            // Upside para média
            toMedian: 0,          // Upside para mediana
            dispersion: 0         // Dispersão entre analistas (0-1)
        }
    },

    // FASE 1.2: Earnings Revisions
    earningsData: {
        eps: {
            ttm: 0,               // EPS trailing 12 meses
            forward: 0,           // EPS projetado 12m
            growth1Y: 0,          // Crescimento YoY (%)
            growth3Y: 0           // CAGR 3 anos (%)
        },
        revisions: {
            eps3m: {
                up: 0,            // Revisões para cima (3 meses)
                down: 0,          // Revisões para baixo (3 meses)
                delta: 0          // Mudança % na estimativa
            }
        },
        surprises: {
            beatRate: 0,          // Taxa de beat nos últimos 4 trimestres (%)
            avgSurprise: 0        // Surpresa média (%)
        }
    },

    // FASE 1.3: Análise Técnica
    technicalAnalysis: {
        price: {
            current: 0,
            ma20: 0,              // Média móvel 20 dias
            ma50: 0,              // Média móvel 50 dias
            ma200: 0,             // Média móvel 200 dias
            week52High: 0,
            week52Low: 0
        },
        momentum: {
            rsi14: 0,             // RSI 14 períodos (0-100)
            macd: {
                value: 0,
                signal: 0,
                histogram: 0,
                trend: "NEUTRAL"  // BULLISH | BEARISH | NEUTRAL
            },
            stochastic: 0
        },
        volume: {
            avgVolume20d: 0,
            ratio: 0,             // Volume atual / Volume médio
            accumDist: "NEUTRAL", // ACCUMULATION | DISTRIBUTION | NEUTRAL
            obv: 0                // On-Balance Volume
        },
        signals: {
            overallScore: 0,      // Score técnico (0-100)
            recommendation: "HOLD", // STRONG_BUY | BUY | HOLD | SELL | STRONG_SELL
            support: 0,           // Suporte técnico
            resistance: 0         // Resistência técnica
        }
    },

    // FASE 1.4: Smart Money
    smartMoney: {
        insiders: {
            last90days: {
                netBuys: 0,       // Compras líquidas de insiders
                totalValue: 0,    // Valor total (R$)
                currentPremium: 0 // Premium/discount vs preço atual (%)
            },
            ownership: 0          // Participação total de insiders (%)
        },
        institutional: {
            ownership: 0,         // Participação institucional (%)
            change3m: 0,          // Mudança 3 meses (%)
            change12m: 0,         // Mudança 12 meses (%)
            flowTrend: "NEUTRAL", // POSITIVE | NEGATIVE | NEUTRAL
            topHolders: []        // Array de maiores fundos
        }
    },

    // FASE 1.5: Free Cash Flow
    cashFlow: {
        fcf: {
            ttm: 0,               // FCF trailing 12m (R$)
            fcfYield: 0,          // FCF Yield (%)
            fcfMargin: 0,         // FCF Margin (%)
            fcfConversion: 0      // FCF / Lucro Líquido (%)
        },
        earningsQuality: {
            accruals: 0,          // Accruals / Total Assets
            qualityScore: 0       // Score de qualidade (0-100)
        }
    },

    // FASE 1.6: ML Predictions
    mlPredictions: {
        randomForest: {
            prediction30d: "NEUTRAL", // UP | DOWN | NEUTRAL
            probability: 0,           // Confiança (0-1)
            expectedReturn: 0         // Retorno esperado (%)
        },
        lstm: {
            prediction30d: "NEUTRAL",
            probability: 0
        },
        ensemble: {
            consensus: "HOLD",        // STRONG_BUY | BUY | HOLD | SELL | STRONG_SELL
            agreement: 0              // Concordância entre modelos (0-1)
        },
        backtest: {
            accuracy90d: 0,           // Acurácia últimos 90 dias (%)
            sharpeRatio: 0,           // Sharpe Ratio do modelo
            maxDrawdown: 0            // Max drawdown (%)
        }
    },

    // FASE 1.7: Análise Macro
    macroAnalysis: {
        brazil: {
            selic: {
                current: 0,
                forecast12m: 0,
                trend: "NEUTRAL"      // UP | DOWN | NEUTRAL
            },
            gdp: {
                currentGrowth: 0,
                forecast: 0
            }
        },
        sensitivities: {
            betaSelic: 0,             // Sensibilidade à SELIC
            betaGDP: 0,               // Sensibilidade ao PIB
            betaUSD: 0                // Sensibilidade ao câmbio
        },
        regime: {
            current: "MID_CYCLE",     // EARLY_CYCLE | MID_CYCLE | LATE_CYCLE | RECESSION
            favoredSectors: []        // Setores favorecidos no regime atual
        }
    },

    // Timestamp da última atualização
    lastUpdated: null,
    dataSource: "mock" // mock | api | hybrid
};

/**
 * DADOS AVANÇADOS PARA EMPRESAS SELECIONADAS
 * (Mock data para demonstração - será substituído por dados reais via API)
 */
const ENHANCED_COMPANIES_DATA = {
    // Exemplo: PLPL3 com dados mock
    "PLPL3": {
        ticker: "PLPL3",
        analystTargets: {
            consensus: {
                mean: 24.50,
                median: 23.80,
                high: 28.00,
                low: 20.00,
                count: 9,
                stdDev: 2.5
            },
            revisions: {
                delta30d: 8.5,
                delta90d: 12.3,
                upgrades: 3,
                downgrades: 0
            },
            impliedUpside: {
                toMean: 52.5,
                toMedian: 48.2,
                dispersion: 0.10
            }
        },
        technicalAnalysis: {
            price: {
                current: 16.06,
                ma20: 15.80,
                ma50: 15.20,
                ma200: 14.50,
                week52High: 18.90,
                week52Low: 12.30
            },
            momentum: {
                rsi14: 62.5,
                macd: {
                    value: 0.35,
                    signal: 0.28,
                    histogram: 0.07,
                    trend: "BULLISH"
                },
                stochastic: 68.2
            },
            volume: {
                avgVolume20d: 850000,
                ratio: 1.18,
                accumDist: "ACCUMULATION",
                obv: 12500000
            },
            signals: {
                overallScore: 72,
                recommendation: "BUY",
                support: 14.80,
                resistance: 17.50
            }
        },
        smartMoney: {
            insiders: {
                last90days: {
                    netBuys: 4,
                    totalValue: 850000,
                    currentPremium: 8.5
                },
                ownership: 32.5
            },
            institutional: {
                ownership: 68.5,
                change3m: 5.2,
                change12m: 12.8,
                flowTrend: "POSITIVE",
                topHolders: ["Verde AM", "XP Asset", "BTG Pactual"]
            }
        },
        mlPredictions: {
            randomForest: {
                prediction30d: "UP",
                probability: 0.78,
                expectedReturn: 8.5
            },
            lstm: {
                prediction30d: "UP",
                probability: 0.72
            },
            ensemble: {
                consensus: "STRONG_BUY",
                agreement: 0.80
            },
            backtest: {
                accuracy90d: 78,
                sharpeRatio: 1.85,
                maxDrawdown: -12.5
            }
        },
        lastUpdated: "2025-11-15T10:30:00Z",
        dataSource: "mock"
    }

    // Adicionar outras empresas conforme necessário
};

/**
 * HELPER: Mesclar dados base com dados avançados
 */
function mergeCompanyData(baseCompany, enhancedData) {
    if (!enhancedData) return baseCompany;

    return {
        ...baseCompany,
        enhanced: enhancedData,
        hasEnhancedData: true
    };
}

/**
 * HELPER: Obter dados avançados de uma empresa
 */
function getEnhancedData(ticker) {
    return ENHANCED_COMPANIES_DATA[ticker] || null;
}

/**
 * HELPER: Verificar se empresa tem dados avançados
 */
function hasEnhancedData(ticker) {
    return ENHANCED_COMPANIES_DATA.hasOwnProperty(ticker);
}

/**
 * EXPORT
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ENHANCED_DATA_TEMPLATE,
        ENHANCED_COMPANIES_DATA,
        mergeCompanyData,
        getEnhancedData,
        hasEnhancedData
    };
}

console.log('✓ data-companies-enhanced.js carregado');
console.log(`✓ ${Object.keys(ENHANCED_COMPANIES_DATA).length} empresa(s) com dados avançados disponíveis`);
