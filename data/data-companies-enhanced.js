// ============================
// DATA-COMPANIES-ENHANCED.JS - Base de Dados Completa
// FUSÃO: Dados legados + IBOVESPA + Estrutura V2 + Dados Avançados
// B3 SmallCaps Intelligence Platform v2.0
// ============================

const COMPANIES_DATABASE = [
    {
        "ticker": "PLPL3",
        "name": "Plano & Plano",
        "sector": "Construção Civil",
        "subsector": "Baixa Renda / MCMV",
        "pod": "Pod Selic",
        "marketCap": 3400000000,
        "currentPrice": 16.06,
        "targetPrice": 20.6,
        "upside": 28.27,
        "projections": {
            "target1Y": 20.6,
            "target3Y": 31,
            "target5Y": 42,
            "target10Y": 62
        },
        "score": 88,
        "ranking": 1,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 88,
        "metrics": {
            "pe": 9.63,
            "roe": 49,
            "roic": 24.89,
            "dividendYield": 5.96,
            "netDebtToEbitda": 0.2,
            "ebitdaMargin": 17.9,
            "revenueGrowth": 29.22,
            "earningsGrowth": 28.45,
            "pb": 3.78,
            "evEbitda": 7.28,
            "beta": 1.2,
            "freeFloat": 27,
            "liquidityDaily": 120000000,
            "fcfYield": 18.5,
            "assetTurnover": 0.85
        },
        "performance": {
            "ytd": 71,
            "oneYear": 105.5,
            "threeYears": 145,
            "fiveYears": null
        },
        "catalysts": [
            "Lançamentos 2H25: R$ 2.5B em VGV programado",
            "Renovação MCMV 2026"
        ],
        "risks": [
            "Alta sensibilidade à Selic"
        ],
        "keyHighlights": [
            "ROE 49% - o mais alto do setor"
        ],
        "analystConsensus": {
            "buy": 8,
            "hold": 1,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 920000000,
            "netIncome": 168000000,
            "ebitda": 164680000
        },
        "nextEarnings": "2025-11-06",
        "irWebsite": "https://ri.planoeplano.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 20.6,
                "median": 20.188000000000002,
                "high": 23.69,
                "low": 17.51,
                "count": 10,
                "stdDev": 6
            },
            "revisions": {
                "delta30d": -0.42,
                "delta90d": 7.82,
                "upgrades": 0,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 28.27,
                "toMedian": 27.42,
                "dispersion": 6
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 16.06,
                "ma20": 10.36,
                "ma50": 8.46,
                "ma200": 4.66,
                "week52High": 33,
                "week52Low": 4.76
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 7.1,
                    "signal": 5.68,
                    "histogram": 1.42,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 120000000,
                "ratio": 1.04,
                "accumDist": "ACCUMULATION",
                "obv": 692125
            },
            "signals": {
                "overallScore": 88,
                "recommendation": "STRONG BUY",
                "support": 14.78,
                "resistance": 17.34
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 3,
                    "totalValue": 2573940,
                    "currentPremium": 1.56
                },
                "ownership": 33.22
            },
            "institutional": {
                "ownership": 50.39,
                "change3m": 1.08,
                "change12m": 1.49,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.31
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 5.08
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 16.44,
                "probability": 0.72,
                "expectedReturn": 2.36
            },
            "lstm": {
                "prediction30d": 16.48,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "CURY3",
        "name": "Cury Construtora",
        "sector": "Construção Civil",
        "subsector": "Média Renda / MCMV",
        "pod": "Pod Selic",
        "marketCap": 5600000000,
        "currentPrice": 32.94,
        "targetPrice": 40.01,
        "upside": 21.46,
        "projections": {
            "target1Y": 40.01,
            "target3Y": 45,
            "target5Y": 58,
            "target10Y": 85
        },
        "score": 87,
        "ranking": 2,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 85,
        "metrics": {
            "pe": 12.34,
            "roe": 66,
            "roic": 42,
            "dividendYield": 0,
            "netDebtToEbitda": -0.3,
            "ebitdaMargin": 43.4,
            "revenueGrowth": 38,
            "earningsGrowth": 52,
            "pb": 5.2,
            "evEbitda": 9.5,
            "beta": 1.35,
            "freeFloat": 42,
            "liquidityDaily": 180000000,
            "fcfYield": 22,
            "assetTurnover": 0.92
        },
        "performance": {
            "ytd": 58,
            "oneYear": 92,
            "threeYears": 220,
            "fiveYears": null
        },
        "catalysts": [
            "Parceria Cyrela"
        ],
        "risks": [
            "Valuation premium vs. peers"
        ],
        "keyHighlights": [
            "ROE 66% - recorde histórico"
        ],
        "analystConsensus": {
            "buy": 7,
            "hold": 2,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 1200000000,
            "netIncome": 220000000,
            "ebitda": 520800000
        },
        "nextEarnings": "2025-11-09",
        "irWebsite": "https://ri.cury.net/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 40.01,
                "median": 39.209799999999994,
                "high": 46.01149999999999,
                "low": 34.0085,
                "count": 12,
                "stdDev": 6.75
            },
            "revisions": {
                "delta30d": 0.59,
                "delta90d": 2,
                "upgrades": 2,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 21.46,
                "toMedian": 20.82,
                "dispersion": 6.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 32.94,
                "ma20": 23.39,
                "ma50": 20.2,
                "ma200": 13.83,
                "week52High": 63.24,
                "week52Low": 12.74
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 5.8,
                    "signal": 4.64,
                    "histogram": 1.16,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 180000000,
                "ratio": 0.94,
                "accumDist": "ACCUMULATION",
                "obv": 918496
            },
            "signals": {
                "overallScore": 87,
                "recommendation": "STRONG BUY",
                "support": 30.3,
                "resistance": 35.58
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 2,
                    "totalValue": 4657364,
                    "currentPremium": 1.13
                },
                "ownership": 36.87
            },
            "institutional": {
                "ownership": 30.47,
                "change3m": 1.06,
                "change12m": 1.76,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.08
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 1.98
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 33.53,
                "probability": 0.72,
                "expectedReturn": 1.79
            },
            "lstm": {
                "prediction30d": 33.59,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "DIRR3",
        "name": "Direcional",
        "sector": "Construção Civil",
        "subsector": "Incorporação",
        "pod": "Pod Selic",
        "marketCap": 4850000000,
        "currentPrice": 15.72,
        "targetPrice": 18.76,
        "upside": 19.34,
        "projections": {
            "target1Y": 18.76,
            "target3Y": 31,
            "target5Y": 42,
            "target10Y": 62
        },
        "score": 83,
        "ranking": 3,
        "recommendation": "STRONG BUY",
        "source": "V1+V2",
        "confidence": 80,
        "metrics": {
            "pe": 14.22,
            "roe": 21.5,
            "roic": 18,
            "dividendYield": 12,
            "netDebtToEbitda": 1.5,
            "ebitdaMargin": 20,
            "revenueGrowth": 22,
            "earningsGrowth": 18,
            "pb": 2.8,
            "evEbitda": 8.5,
            "beta": 1.25,
            "freeFloat": 48,
            "liquidityDaily": 95000000,
            "fcfYield": 15.8,
            "assetTurnover": 0.78
        },
        "performance": {
            "ytd": 28,
            "oneYear": 42,
            "threeYears": 85,
            "fiveYears": 180
        },
        "catalysts": [
            "Desdobramento 2:1 aprovado"
        ],
        "risks": [
            "Leverage moderada 1.5x"
        ],
        "keyHighlights": [
            "Presença nacional em 15 estados"
        ],
        "analystConsensus": {
            "buy": 6,
            "hold": 3,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 1450000000,
            "netIncome": 185000000,
            "ebitda": 391500000
        },
        "nextEarnings": "2025-11-07",
        "irWebsite": "https://ri.direcional.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 18.76,
                "median": 18.384800000000002,
                "high": 21.574,
                "low": 15.946000000000002,
                "count": 10,
                "stdDev": 6.25
            },
            "revisions": {
                "delta30d": 4.19,
                "delta90d": -2.66,
                "upgrades": 2,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 19.34,
                "toMedian": 18.76,
                "dispersion": 6.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 15.72,
                "ma20": 13.52,
                "ma50": 12.79,
                "ma200": 11.32,
                "week52High": 22.32,
                "week52Low": 11.32
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 2.8,
                    "signal": 2.24,
                    "histogram": 0.56,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 95000000,
                "ratio": 1.05,
                "accumDist": "ACCUMULATION",
                "obv": 103772
            },
            "signals": {
                "overallScore": 83,
                "recommendation": "STRONG BUY",
                "support": 14.46,
                "resistance": 16.98
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 3255505,
                    "currentPremium": 6.63
                },
                "ownership": 35.63
            },
            "institutional": {
                "ownership": 44.47,
                "change3m": 3.12,
                "change12m": 0.94,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 8.27
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 6.98
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 15.97,
                "probability": 0.72,
                "expectedReturn": 1.61
            },
            "lstm": {
                "prediction30d": 16,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "PETR4",
        "name": "Petrobras",
        "sector": "Petróleo e Gás",
        "subsector": "Exploração e Produção",
        "pod": "Pod Global",
        "marketCap": 425000000000,
        "currentPrice": 32.89,
        "targetPrice": 42,
        "upside": 27.7,
        "projections": {
            "target1Y": 42,
            "target3Y": 48,
            "target5Y": 55,
            "target10Y": 70
        },
        "score": 85,
        "ranking": 4,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 82,
        "metrics": {
            "pe": 4.2,
            "roe": 35.7,
            "roic": 28.5,
            "dividendYield": 14.5,
            "netDebtToEbitda": 0.8,
            "ebitdaMargin": 48.2,
            "revenueGrowth": 8,
            "earningsGrowth": -5,
            "pb": 1.5,
            "evEbitda": 2.8,
            "beta": 1.25,
            "freeFloat": 72,
            "liquidityDaily": 1800000000,
            "fcfYield": 28,
            "assetTurnover": 0.68
        },
        "performance": {
            "ytd": -12,
            "oneYear": -8,
            "threeYears": 15,
            "fiveYears": 250
        },
        "catalysts": [
            "Brent >$80/barril sustenta dividendos extraordinários",
            "Produção pré-sal 2.2M bpd"
        ],
        "risks": [
            "Risco político e interferência governamental",
            "Volatilidade do Brent"
        ],
        "keyHighlights": [
            "ROE 35% - entre as maiores do mundo",
            "Dividend yield 14.5% extraordinário"
        ],
        "analystConsensus": {
            "buy": 15,
            "hold": 8,
            "sell": 2
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 120000000000,
            "netIncome": 28500000000,
            "ebitda": 57840000000
        },
        "nextEarnings": "2025-11-14",
        "irWebsite": "https://ri.petrobras.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 42,
                "median": 41.16,
                "high": 48.3,
                "low": 35.699999999999996,
                "count": 14,
                "stdDev": 6.25
            },
            "revisions": {
                "delta30d": -1.13,
                "delta90d": -1.41,
                "upgrades": 0,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 27.7,
                "toMedian": 26.87,
                "dispersion": 6.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 32.89,
                "ma20": 34.86,
                "ma50": 35.52,
                "ma200": 36.84,
                "week52High": 35.52,
                "week52Low": 31.14
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": -1.2,
                    "signal": -0.96,
                    "histogram": -0.24,
                    "trend": "BEARISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 1800000000,
                "ratio": 0.85,
                "accumDist": "DISTRIBUTION",
                "obv": 327759
            },
            "signals": {
                "overallScore": 85,
                "recommendation": "STRONG BUY",
                "support": 30.26,
                "resistance": 35.52
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 1,
                    "totalValue": 1544291,
                    "currentPremium": 3.07
                },
                "ownership": 23.93
            },
            "institutional": {
                "ownership": 56.87,
                "change3m": 0.02,
                "change12m": 6.61,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 6.71
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 6.74
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 33.65,
                "probability": 0.72,
                "expectedReturn": 2.31
            },
            "lstm": {
                "prediction30d": 33.73,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "VALE3",
        "name": "Vale",
        "sector": "Mineração",
        "subsector": "Minério de Ferro",
        "pod": "Pod Global",
        "marketCap": 285000000000,
        "currentPrice": 64.78,
        "targetPrice": 71.5,
        "upside": 10.37,
        "projections": {
            "target1Y": 71.5,
            "target3Y": 80,
            "target5Y": 92,
            "target10Y": 115
        },
        "score": 82,
        "ranking": 5,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 78,
        "metrics": {
            "pe": 5.8,
            "roe": 18.5,
            "roic": 15.2,
            "dividendYield": 8.5,
            "netDebtToEbitda": 0.5,
            "ebitdaMargin": 52,
            "revenueGrowth": 5,
            "earningsGrowth": 12,
            "pb": 1.1,
            "evEbitda": 3.2,
            "beta": 1.15,
            "freeFloat": 58,
            "liquidityDaily": 850000000,
            "fcfYield": 15.5,
            "assetTurnover": 0.72
        },
        "performance": {
            "ytd": 8,
            "oneYear": 25,
            "threeYears": 45,
            "fiveYears": 180
        },
        "catalysts": [
            "Preço do minério estável acima US$100/ton",
            "Produção 320M ton/ano"
        ],
        "risks": [
            "Dependência do mercado chinês",
            "Volatilidade do minério"
        ],
        "keyHighlights": [
            "Maior produtora de minério de ferro do mundo",
            "DY 8.5% atrativo"
        ],
        "analystConsensus": {
            "buy": 12,
            "hold": 5,
            "sell": 1
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 45000000000,
            "netIncome": 8500000000,
            "ebitda": 23400000000
        },
        "nextEarnings": "2025-11-08",
        "irWebsite": "https://ri.vale.com/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 71.5,
                "median": 70.07,
                "high": 82.225,
                "low": 60.775,
                "count": 14,
                "stdDev": 5.75
            },
            "revisions": {
                "delta30d": -1.56,
                "delta90d": 1.36,
                "upgrades": 1,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 10.37,
                "toMedian": 10.06,
                "dispersion": 5.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 64.78,
                "ma20": 62.19,
                "ma50": 61.33,
                "ma200": 59.6,
                "week52High": 80.97,
                "week52Low": 53.98
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 0.8,
                    "signal": 0.64,
                    "histogram": 0.16,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 850000000,
                "ratio": 0.9,
                "accumDist": "NEUTRAL",
                "obv": 737604
            },
            "signals": {
                "overallScore": 82,
                "recommendation": "BUY",
                "support": 59.6,
                "resistance": 69.96
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 2,
                    "totalValue": 518373,
                    "currentPremium": -1.01
                },
                "ownership": 36.94
            },
            "institutional": {
                "ownership": 30.31,
                "change3m": 0.9,
                "change12m": 8.15,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.02
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 4.45
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 65.34,
                "probability": 0.72,
                "expectedReturn": 0.86
            },
            "lstm": {
                "prediction30d": 65.4,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "ITUB4",
        "name": "Itaú Unibanco",
        "sector": "Bancos",
        "subsector": "Bancos Múltiplos",
        "pod": "Pod Secular",
        "marketCap": 315000000000,
        "currentPrice": 35.21,
        "targetPrice": 45,
        "upside": 27.79,
        "projections": {
            "target1Y": 45,
            "target3Y": 52,
            "target5Y": 62,
            "target10Y": 85
        },
        "score": 86,
        "ranking": 6,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 84,
        "metrics": {
            "pe": 9.2,
            "roe": 22.5,
            "roic": 18.8,
            "dividendYield": 5.2,
            "netDebtToEbitda": null,
            "ebitdaMargin": null,
            "revenueGrowth": 12,
            "earningsGrowth": 15,
            "pb": 2.1,
            "evEbitda": null,
            "beta": 1.05,
            "freeFloat": 52,
            "liquidityDaily": 650000000,
            "fcfYield": null,
            "assetTurnover": null
        },
        "performance": {
            "ytd": 18,
            "oneYear": 32,
            "threeYears": 75,
            "fiveYears": 185
        },
        "catalysts": [
            "Crescimento da carteira de crédito",
            "Eficiência operacional líder"
        ],
        "risks": [
            "Sensibilidade à inadimplência",
            "Competição de fintechs"
        ],
        "keyHighlights": [
            "Maior banco privado do Brasil",
            "ROE 22.5% consistente"
        ],
        "analystConsensus": {
            "buy": 14,
            "hold": 6,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 28000000000,
            "netIncome": 9200000000,
            "ebitda": null
        },
        "nextEarnings": "2025-11-07",
        "irWebsite": "https://www.itau.com.br/relacoes-com-investidores/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 45,
                "median": 44.1,
                "high": 51.74999999999999,
                "low": 38.25,
                "count": 8,
                "stdDev": 5.25
            },
            "revisions": {
                "delta30d": -1.34,
                "delta90d": -2.42,
                "upgrades": 1,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 27.79,
                "toMedian": 26.96,
                "dispersion": 5.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 35.21,
                "ma20": 32.04,
                "ma50": 30.98,
                "ma200": 28.87,
                "week52High": 46.48,
                "week52Low": 27.7
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.8,
                    "signal": 1.44,
                    "histogram": 0.36,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 650000000,
                "ratio": 0.98,
                "accumDist": "ACCUMULATION",
                "obv": 145248
            },
            "signals": {
                "overallScore": 86,
                "recommendation": "STRONG BUY",
                "support": 32.39,
                "resistance": 38.03
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 1,
                    "totalValue": 782088,
                    "currentPremium": 5.25
                },
                "ownership": 18.53
            },
            "institutional": {
                "ownership": 28.11,
                "change3m": 3.6,
                "change12m": 9.39,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 9.15
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 4.01
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 36.03,
                "probability": 0.72,
                "expectedReturn": 2.32
            },
            "lstm": {
                "prediction30d": 36.11,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "BBDC4",
        "name": "Bradesco",
        "sector": "Bancos",
        "subsector": "Bancos Múltiplos",
        "pod": "Pod Secular",
        "marketCap": 145000000000,
        "currentPrice": 14.5,
        "targetPrice": 18,
        "upside": 24.14,
        "projections": {
            "target1Y": 18,
            "target3Y": 22,
            "target5Y": 28,
            "target10Y": 40
        },
        "score": 78,
        "ranking": 11,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 75,
        "metrics": {
            "pe": 8.5,
            "roe": 16.2,
            "roic": 14.5,
            "dividendYield": 6.8,
            "netDebtToEbitda": null,
            "ebitdaMargin": null,
            "revenueGrowth": 8,
            "earningsGrowth": 10,
            "pb": 1.4,
            "evEbitda": null,
            "beta": 1.12,
            "freeFloat": 58,
            "liquidityDaily": 420000000,
            "fcfYield": null,
            "assetTurnover": null
        },
        "performance": {
            "ytd": 5,
            "oneYear": 12,
            "threeYears": 35,
            "fiveYears": 95
        },
        "catalysts": [
            "Reestruturação em andamento",
            "Redução de custos"
        ],
        "risks": [
            "Pressão sobre margens",
            "Qualidade da carteira"
        ],
        "keyHighlights": [
            "2º maior banco privado",
            "DY atrativo 6.8%"
        ],
        "analystConsensus": {
            "buy": 8,
            "hold": 9,
            "sell": 1
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 24000000000,
            "netIncome": 5200000000,
            "ebitda": null
        },
        "nextEarnings": "2025-11-08",
        "irWebsite": "https://www.bradescori.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 18,
                "median": 17.64,
                "high": 20.7,
                "low": 15.299999999999999,
                "count": 8,
                "stdDev": 5.6
            },
            "revisions": {
                "delta30d": -1.67,
                "delta90d": 4.75,
                "upgrades": 0,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 24.14,
                "toMedian": 23.42,
                "dispersion": 5.6
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 14.5,
                "ma20": 14.14,
                "ma50": 14.02,
                "ma200": 13.77,
                "week52High": 16.24,
                "week52Low": 13.34
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 0.5,
                    "signal": 0.4,
                    "histogram": 0.1,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 420000000,
                "ratio": 1.14,
                "accumDist": "NEUTRAL",
                "obv": 417811
            },
            "signals": {
                "overallScore": 78,
                "recommendation": "BUY",
                "support": 13.34,
                "resistance": 15.66
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 1,
                    "totalValue": 336290,
                    "currentPremium": 6.4
                },
                "ownership": 29.85
            },
            "institutional": {
                "ownership": 31.46,
                "change3m": 3.7,
                "change12m": 2.4,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 5.16
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 4.07
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 14.79,
                "probability": 0.58,
                "expectedReturn": 2.01
            },
            "lstm": {
                "prediction30d": 14.82,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "WEGE3",
        "name": "WEG",
        "sector": "Bens de Capital",
        "subsector": "Equipamentos Elétricos",
        "pod": "Pod Secular",
        "marketCap": 68000000000,
        "currentPrice": 36.17,
        "targetPrice": 49,
        "upside": 35.47,
        "projections": {
            "target1Y": 49,
            "target3Y": 62,
            "target5Y": 82,
            "target10Y": 130
        },
        "score": 92,
        "ranking": 1,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 90,
        "metrics": {
            "pe": 28.5,
            "roe": 30.5,
            "roic": 25.8,
            "dividendYield": 1.2,
            "netDebtToEbitda": -0.5,
            "ebitdaMargin": 20.1,
            "revenueGrowth": 22,
            "earningsGrowth": 28,
            "pb": 8.7,
            "evEbitda": 22.5,
            "beta": 0.95,
            "freeFloat": 52,
            "liquidityDaily": 280000000,
            "fcfYield": 3.8,
            "assetTurnover": 1.12
        },
        "performance": {
            "ytd": 48,
            "oneYear": 85,
            "threeYears": 220,
            "fiveYears": 450
        },
        "catalysts": [
            "Transição energética global",
            "Receita crescendo >20% a.a."
        ],
        "risks": [
            "Valuation premium (P/L 28x)",
            "Competição chinesa"
        ],
        "keyHighlights": [
            "ROE 30% excepcional",
            "Crescimento secular"
        ],
        "analystConsensus": {
            "buy": 18,
            "hold": 3,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 9200000000,
            "netIncome": 1250000000,
            "ebitda": 1849200000
        },
        "nextEarnings": "2025-11-08",
        "irWebsite": "https://ri.weg.net/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 49,
                "median": 48.019999999999996,
                "high": 56.349999999999994,
                "low": 41.65,
                "count": 9,
                "stdDev": 4.75
            },
            "revisions": {
                "delta30d": 2.09,
                "delta90d": -3.92,
                "upgrades": 2,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 35.47,
                "toMedian": 34.41,
                "dispersion": 4.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 36.17,
                "ma20": 27.49,
                "ma50": 24.6,
                "ma200": 18.81,
                "week52High": 66.91,
                "week52Low": 15.67
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 4.8,
                    "signal": 3.84,
                    "histogram": 0.96,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 280000000,
                "ratio": 1.19,
                "accumDist": "ACCUMULATION",
                "obv": 559155
            },
            "signals": {
                "overallScore": 92,
                "recommendation": "STRONG BUY",
                "support": 33.28,
                "resistance": 39.06
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 2,
                    "totalValue": 477120,
                    "currentPremium": 3.4
                },
                "ownership": 34.77
            },
            "institutional": {
                "ownership": 53.23,
                "change3m": 2.01,
                "change12m": 8.55,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 8.01
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 6.26
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 37.24,
                "probability": 0.72,
                "expectedReturn": 2.96
            },
            "lstm": {
                "prediction30d": 37.35,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "MGLU3",
        "name": "Magazine Luiza",
        "sector": "Varejo",
        "subsector": "E-commerce",
        "pod": "Pod Secular",
        "marketCap": 28000000000,
        "currentPrice": 8.38,
        "targetPrice": 14,
        "upside": 67.06,
        "projections": {
            "target1Y": 14,
            "target3Y": 20,
            "target5Y": 28,
            "target10Y": 45
        },
        "score": 72,
        "ranking": 14,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 68,
        "metrics": {
            "pe": 18.5,
            "roe": 12.8,
            "roic": 10.5,
            "dividendYield": 0,
            "netDebtToEbitda": 1.8,
            "ebitdaMargin": 8.5,
            "revenueGrowth": 18,
            "earningsGrowth": 25,
            "pb": 2.4,
            "evEbitda": 12,
            "beta": 1.65,
            "freeFloat": 62,
            "liquidityDaily": 185000000,
            "fcfYield": 5.2,
            "assetTurnover": 1.85
        },
        "performance": {
            "ytd": 59,
            "oneYear": 85,
            "threeYears": -45,
            "fiveYears": 120
        },
        "catalysts": [
            "Recuperação de margens",
            "Integração omnichannel"
        ],
        "risks": [
            "Competição acirrada",
            "Queima de caixa histórica"
        ],
        "keyHighlights": [
            "Líder em e-commerce nacional",
            "Recuperação em andamento"
        ],
        "analystConsensus": {
            "buy": 10,
            "hold": 5,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 14500000000,
            "netIncome": 285000000,
            "ebitda": 1232500000
        },
        "nextEarnings": "2025-11-12",
        "irWebsite": "https://ri.magazineluiza.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 14,
                "median": 13.719999999999999,
                "high": 16.099999999999998,
                "low": 11.9,
                "count": 11,
                "stdDev": 8.25
            },
            "revisions": {
                "delta30d": -2.22,
                "delta90d": -4.16,
                "upgrades": 0,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 67.06,
                "toMedian": 65.05,
                "dispersion": 8.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 8.38,
                "ma20": 5.91,
                "ma50": 5.08,
                "ma200": 3.44,
                "week52High": 15.5,
                "week52Low": 3.63
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 5.9,
                    "signal": 4.72,
                    "histogram": 1.18,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 185000000,
                "ratio": 1.25,
                "accumDist": "ACCUMULATION",
                "obv": 991046
            },
            "signals": {
                "overallScore": 72,
                "recommendation": "BUY",
                "support": 7.71,
                "resistance": 9.05
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 113773,
                    "currentPremium": -0.52
                },
                "ownership": 12.3
            },
            "institutional": {
                "ownership": 33.53,
                "change3m": -2.15,
                "change12m": -2.83,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 7.92
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 5.93
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 8.85,
                "probability": 0.58,
                "expectedReturn": 5.59
            },
            "lstm": {
                "prediction30d": 8.9,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "BBAS3",
        "name": "Banco do Brasil",
        "sector": "Bancos",
        "subsector": "Bancos Múltiplos",
        "pod": "Pod Secular",
        "marketCap": 110000000000,
        "currentPrice": 22.48,
        "targetPrice": 30,
        "upside": 33.45,
        "projections": {
            "target1Y": 30,
            "target3Y": 36,
            "target5Y": 45,
            "target10Y": 65
        },
        "score": 80,
        "ranking": 9,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 76,
        "metrics": {
            "pe": 7.2,
            "roe": 18.5,
            "roic": 16.2,
            "dividendYield": 7.2,
            "netDebtToEbitda": null,
            "ebitdaMargin": null,
            "revenueGrowth": 10,
            "earningsGrowth": 12,
            "pb": 1.3,
            "evEbitda": null,
            "beta": 1.08,
            "freeFloat": 48,
            "liquidityDaily": 380000000,
            "fcfYield": null,
            "assetTurnover": null
        },
        "performance": {
            "ytd": 15,
            "oneYear": 28,
            "threeYears": 58,
            "fiveYears": 145
        },
        "catalysts": [
            "Liderança no agronegócio",
            "Expansão de crédito"
        ],
        "risks": [
            "Exposição ao setor público",
            "Competição bancária"
        ],
        "keyHighlights": [
            "Maior banco em ativos",
            "DY 7.2% atrativo"
        ],
        "analystConsensus": {
            "buy": 11,
            "hold": 2,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 26000000000,
            "netIncome": 8500000000,
            "ebitda": null
        },
        "nextEarnings": "2025-11-09",
        "irWebsite": "https://ri.bb.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 30,
                "median": 29.4,
                "high": 34.5,
                "low": 25.5,
                "count": 13,
                "stdDev": 5.4
            },
            "revisions": {
                "delta30d": -2.81,
                "delta90d": 7.31,
                "upgrades": 3,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 33.45,
                "toMedian": 32.45,
                "dispersion": 5.4
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 22.48,
                "ma20": 20.79,
                "ma50": 20.23,
                "ma200": 19.11,
                "week52High": 28.77,
                "week52Low": 18.28
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.5,
                    "signal": 1.2,
                    "histogram": 0.3,
                    "trend": "BULLISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 380000000,
                "ratio": 0.89,
                "accumDist": "ACCUMULATION",
                "obv": 535252
            },
            "signals": {
                "overallScore": 80,
                "recommendation": "BUY",
                "support": 20.68,
                "resistance": 24.28
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 1,
                    "totalValue": 1787585,
                    "currentPremium": 3.14
                },
                "ownership": 32.94
            },
            "institutional": {
                "ownership": 37.16,
                "change3m": 0.06,
                "change12m": 2.36,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 4.51
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 4.86
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 23.11,
                "probability": 0.72,
                "expectedReturn": 2.79
            },
            "lstm": {
                "prediction30d": 23.17,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "SUZB3",
        "name": "Suzano",
        "sector": "Papel e Celulose",
        "subsector": "Commodities",
        "pod": "Pod Global",
        "marketCap": 65000000000,
        "currentPrice": 48.55,
        "targetPrice": 60,
        "upside": 23.58,
        "projections": {
            "target1Y": 60,
            "target3Y": 72,
            "target5Y": 88,
            "target10Y": 120
        },
        "score": 85,
        "ranking": 4,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 82,
        "metrics": {
            "pe": 18.2,
            "roe": 15.8,
            "roic": 12.5,
            "dividendYield": 2.8,
            "netDebtToEbitda": 2.8,
            "ebitdaMargin": 45,
            "revenueGrowth": 12,
            "earningsGrowth": 25,
            "pb": 2.9,
            "evEbitda": 8.5,
            "beta": 0.85,
            "freeFloat": 68,
            "liquidityDaily": 380000000,
            "fcfYield": 8.5,
            "assetTurnover": 0.55
        },
        "performance": {
            "ytd": -8,
            "oneYear": 12,
            "threeYears": 35,
            "fiveYears": 180
        },
        "catalysts": [
            "Preço da celulose em recuperação",
            "Projeto Cerrado: +2.5M ton"
        ],
        "risks": [
            "Volatilidade da celulose",
            "Capex intensivo"
        ],
        "keyHighlights": [
            "Maior produtora de celulose do mundo",
            "4.2M ton capacidade"
        ],
        "analystConsensus": {
            "buy": 12,
            "hold": 3,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 9800000000,
            "netIncome": 1250000000,
            "ebitda": 4410000000
        },
        "nextEarnings": "2025-11-07",
        "irWebsite": "https://ri.suzano.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 60,
                "median": 58.8,
                "high": 69,
                "low": 51,
                "count": 8,
                "stdDev": 4.25
            },
            "revisions": {
                "delta30d": -2.01,
                "delta90d": 7.42,
                "upgrades": 3,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 23.58,
                "toMedian": 22.87,
                "dispersion": 4.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 48.55,
                "ma20": 50.49,
                "ma50": 51.14,
                "ma200": 52.43,
                "week52High": 54.38,
                "week52Low": 44.67
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": -0.8,
                    "signal": -0.64,
                    "histogram": -0.16,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 380000000,
                "ratio": 0.96,
                "accumDist": "NEUTRAL",
                "obv": 279894
            },
            "signals": {
                "overallScore": 85,
                "recommendation": "STRONG BUY",
                "support": 44.67,
                "resistance": 52.43
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 1,
                    "totalValue": 1332686,
                    "currentPremium": 5.09
                },
                "ownership": 11.94
            },
            "institutional": {
                "ownership": 58.33,
                "change3m": 3.39,
                "change12m": 7.87,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.82
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 5.5
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 49.5,
                "probability": 0.72,
                "expectedReturn": 1.96
            },
            "lstm": {
                "prediction30d": 49.6,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "GGBR4",
        "name": "Gerdau",
        "sector": "Siderurgia",
        "subsector": "Aços Longos",
        "pod": "Pod Global",
        "marketCap": 29000000000,
        "currentPrice": 17.18,
        "targetPrice": 22.65,
        "upside": 31.83,
        "projections": {
            "target1Y": 22.65,
            "target3Y": 28,
            "target5Y": 35,
            "target10Y": 50
        },
        "score": 76,
        "ranking": 12,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 72,
        "metrics": {
            "pe": 8.5,
            "roe": 16.8,
            "roic": 14.2,
            "dividendYield": 4.5,
            "netDebtToEbitda": 1.2,
            "ebitdaMargin": 18.5,
            "revenueGrowth": 8,
            "earningsGrowth": 15,
            "pb": 1.4,
            "evEbitda": 5.8,
            "beta": 1.35,
            "freeFloat": 55,
            "liquidityDaily": 220000000,
            "fcfYield": 10.5,
            "assetTurnover": 0.88
        },
        "performance": {
            "ytd": 22,
            "oneYear": 35,
            "threeYears": 58,
            "fiveYears": 125
        },
        "catalysts": [
            "Recuperação da construção civil",
            "Exportações fortes"
        ],
        "risks": [
            "Ciclo de commodities",
            "Competição chinesa"
        ],
        "keyHighlights": [
            "Presença global",
            "Líder em aços longos"
        ],
        "analystConsensus": {
            "buy": 10,
            "hold": 5,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 18000000000,
            "netIncome": 2100000000,
            "ebitda": 3330000000
        },
        "nextEarnings": "2025-11-10",
        "irWebsite": "https://ri.gerdau.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 22.65,
                "median": 22.197,
                "high": 26.047499999999996,
                "low": 19.252499999999998,
                "count": 9,
                "stdDev": 6.75
            },
            "revisions": {
                "delta30d": 4.45,
                "delta90d": 4.68,
                "upgrades": 1,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 31.83,
                "toMedian": 30.88,
                "dispersion": 6.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 17.18,
                "ma20": 15.29,
                "ma50": 14.66,
                "ma200": 13.4,
                "week52High": 23.19,
                "week52Low": 13.17
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 2.2,
                    "signal": 1.76,
                    "histogram": 0.44,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 220000000,
                "ratio": 1.16,
                "accumDist": "ACCUMULATION",
                "obv": 891765
            },
            "signals": {
                "overallScore": 76,
                "recommendation": "BUY",
                "support": 15.81,
                "resistance": 18.55
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 4,
                    "totalValue": 66120,
                    "currentPremium": 0.9
                },
                "ownership": 32.08
            },
            "institutional": {
                "ownership": 21.88,
                "change3m": 1.88,
                "change12m": 5.4,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.95
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 4.07
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 17.64,
                "probability": 0.58,
                "expectedReturn": 2.65
            },
            "lstm": {
                "prediction30d": 17.68,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "B3SA3",
        "name": "B3",
        "sector": "Serviços Financeiros",
        "subsector": "Bolsa de Valores",
        "pod": "Pod Selic",
        "marketCap": 85000000000,
        "currentPrice": 15.67,
        "targetPrice": 18.5,
        "upside": 18.06,
        "projections": {
            "target1Y": 18.5,
            "target3Y": 21,
            "target5Y": 24,
            "target10Y": 30
        },
        "score": 75,
        "ranking": 9,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 74,
        "metrics": {
            "pe": 16.8,
            "roe": 20.2,
            "roic": 18.5,
            "dividendYield": 5.2,
            "netDebtToEbitda": 1.5,
            "ebitdaMargin": 72,
            "revenueGrowth": 8,
            "earningsGrowth": 12,
            "pb": 3.4,
            "evEbitda": 11.2,
            "beta": 1.1,
            "freeFloat": 78,
            "liquidityDaily": 450000000,
            "fcfYield": 6.8,
            "assetTurnover": 0.42
        },
        "performance": {
            "ytd": -5,
            "oneYear": 8,
            "threeYears": 25,
            "fiveYears": 120
        },
        "catalysts": [
            "Monopólio natural",
            "Diversificação de produtos"
        ],
        "risks": [
            "Risco regulatório",
            "Competição de fintechs"
        ],
        "keyHighlights": [
            "Única bolsa do Brasil",
            "ROE 20% consistente"
        ],
        "analystConsensus": {
            "buy": 8,
            "hold": 4,
            "sell": 1
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 1850000000,
            "netIncome": 980000000,
            "ebitda": 1332000000
        },
        "nextEarnings": "2025-11-08",
        "irWebsite": "https://ri.b3.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 18.5,
                "median": 18.13,
                "high": 21.275,
                "low": 15.725,
                "count": 11,
                "stdDev": 5.5
            },
            "revisions": {
                "delta30d": -2.13,
                "delta90d": 5.19,
                "upgrades": 0,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 18.06,
                "toMedian": 17.52,
                "dispersion": 5.5
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 15.67,
                "ma20": 16.06,
                "ma50": 16.19,
                "ma200": 16.45,
                "week52High": 16.92,
                "week52Low": 14.83
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": -0.5,
                    "signal": -0.4,
                    "histogram": -0.1,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 450000000,
                "ratio": 0.93,
                "accumDist": "NEUTRAL",
                "obv": 668748
            },
            "signals": {
                "overallScore": 75,
                "recommendation": "BUY",
                "support": 14.42,
                "resistance": 16.92
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 2,
                    "totalValue": 2474898,
                    "currentPremium": 3.8
                },
                "ownership": 24.43
            },
            "institutional": {
                "ownership": 30.72,
                "change3m": 2.75,
                "change12m": 7.07,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 8.83
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.04
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 15.91,
                "probability": 0.58,
                "expectedReturn": 1.5
            },
            "lstm": {
                "prediction30d": 15.93,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "ABEV3",
        "name": "Ambev",
        "sector": "Bebidas",
        "subsector": "Cervejas",
        "pod": "Pod Secular",
        "marketCap": 215000000000,
        "currentPrice": 13.5,
        "targetPrice": 16.5,
        "upside": 22.22,
        "projections": {
            "target1Y": 16.5,
            "target3Y": 19,
            "target5Y": 23,
            "target10Y": 32
        },
        "score": 81,
        "ranking": 8,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 79,
        "metrics": {
            "pe": 16.2,
            "roe": 28.5,
            "roic": 24.2,
            "dividendYield": 3.8,
            "netDebtToEbitda": 0.8,
            "ebitdaMargin": 35.5,
            "revenueGrowth": 6,
            "earningsGrowth": 10,
            "pb": 4.6,
            "evEbitda": 12.5,
            "beta": 0.88,
            "freeFloat": 55,
            "liquidityDaily": 520000000,
            "fcfYield": 6.2,
            "assetTurnover": 0.68
        },
        "performance": {
            "ytd": 12,
            "oneYear": 22,
            "threeYears": 45,
            "fiveYears": 95
        },
        "catalysts": [
            "Recuperação do volume",
            "Premiumização"
        ],
        "risks": [
            "Competição",
            "Mudança de hábitos"
        ],
        "keyHighlights": [
            "Líder absoluta em cervejas",
            "ROE 28.5%"
        ],
        "analystConsensus": {
            "buy": 9,
            "hold": 6,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 16000000000,
            "netIncome": 3500000000,
            "ebitda": 5680000000
        },
        "nextEarnings": "2025-11-11",
        "irWebsite": "https://ri.ambev.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 16.5,
                "median": 16.169999999999998,
                "high": 18.974999999999998,
                "low": 14.025,
                "count": 13,
                "stdDev": 4.4
            },
            "revisions": {
                "delta30d": 0.35,
                "delta90d": 6.49,
                "upgrades": 3,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 22.22,
                "toMedian": 21.55,
                "dispersion": 4.4
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 13.5,
                "ma20": 12.69,
                "ma50": 12.42,
                "ma200": 11.88,
                "week52High": 16.47,
                "week52Low": 11.52
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.2,
                    "signal": 0.96,
                    "histogram": 0.24,
                    "trend": "BULLISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 520000000,
                "ratio": 0.99,
                "accumDist": "ACCUMULATION",
                "obv": 958247
            },
            "signals": {
                "overallScore": 81,
                "recommendation": "BUY",
                "support": 12.42,
                "resistance": 14.58
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 1,
                    "totalValue": 1303262,
                    "currentPremium": 3.82
                },
                "ownership": 26.59
            },
            "institutional": {
                "ownership": 35.49,
                "change3m": 2.83,
                "change12m": 0.45,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.16
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.96
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 13.75,
                "probability": 0.72,
                "expectedReturn": 1.85
            },
            "lstm": {
                "prediction30d": 13.77,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "ELET3",
        "name": "Eletrobras",
        "sector": "Energia Elétrica",
        "subsector": "Geração",
        "pod": "Pod Selic",
        "marketCap": 75000000000,
        "currentPrice": 50,
        "targetPrice": 56.65,
        "upside": 13.3,
        "projections": {
            "target1Y": 56.65,
            "target3Y": 65,
            "target5Y": 75,
            "target10Y": 95
        },
        "score": 79,
        "ranking": 10,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 76,
        "metrics": {
            "pe": 12.5,
            "roe": 14.8,
            "roic": 11.5,
            "dividendYield": 4.2,
            "netDebtToEbitda": 2.2,
            "ebitdaMargin": 42,
            "revenueGrowth": 8,
            "earningsGrowth": 15,
            "pb": 1.9,
            "evEbitda": 7.5,
            "beta": 0.95,
            "freeFloat": 72,
            "liquidityDaily": 285000000,
            "fcfYield": 7.8,
            "assetTurnover": 0.45
        },
        "performance": {
            "ytd": 10,
            "oneYear": 18,
            "threeYears": 145,
            "fiveYears": 280
        },
        "catalysts": [
            "Pós-privatização",
            "Eficiência operacional"
        ],
        "risks": [
            "Regulação do setor",
            "Hidrologia"
        ],
        "keyHighlights": [
            "Maior geradora da América Latina",
            "Privatizada em 2022"
        ],
        "analystConsensus": {
            "buy": 12,
            "hold": 4,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 12000000000,
            "netIncome": 2500000000,
            "ebitda": 5040000000
        },
        "nextEarnings": "2025-11-09",
        "irWebsite": "https://eletrobras.com/ri/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 56.65,
                "median": 55.516999999999996,
                "high": 65.1475,
                "low": 48.152499999999996,
                "count": 6,
                "stdDev": 4.75
            },
            "revisions": {
                "delta30d": -0.28,
                "delta90d": 1.89,
                "upgrades": 1,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 13.3,
                "toMedian": 12.9,
                "dispersion": 4.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 50,
                "ma20": 47.5,
                "ma50": 46.67,
                "ma200": 45,
                "week52High": 59,
                "week52Low": 44
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1,
                    "signal": 0.8,
                    "histogram": 0.2,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 285000000,
                "ratio": 1.15,
                "accumDist": "NEUTRAL",
                "obv": 948300
            },
            "signals": {
                "overallScore": 79,
                "recommendation": "BUY",
                "support": 46,
                "resistance": 54
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 1,
                    "totalValue": 4980660,
                    "currentPremium": 3.5
                },
                "ownership": 10.44
            },
            "institutional": {
                "ownership": 59.69,
                "change3m": 3.35,
                "change12m": 8.79,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 5.03
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 5.47
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 50.55,
                "probability": 0.58,
                "expectedReturn": 1.11
            },
            "lstm": {
                "prediction30d": 50.61,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "EMBR3",
        "name": "Embraer",
        "sector": "Aeronáutica",
        "subsector": "Aeronaves",
        "pod": "Pod Secular",
        "marketCap": 48000000000,
        "currentPrice": 66.21,
        "targetPrice": 76.5,
        "upside": 15.54,
        "projections": {
            "target1Y": 76.5,
            "target3Y": 92,
            "target5Y": 115,
            "target10Y": 165
        },
        "score": 84,
        "ranking": 7,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 81,
        "metrics": {
            "pe": 22.5,
            "roe": 26.8,
            "roic": 22.5,
            "dividendYield": 1.2,
            "netDebtToEbitda": 0.2,
            "ebitdaMargin": 14.5,
            "revenueGrowth": 28,
            "earningsGrowth": 45,
            "pb": 6,
            "evEbitda": 18.5,
            "beta": 1.25,
            "freeFloat": 52,
            "liquidityDaily": 195000000,
            "fcfYield": 4.5,
            "assetTurnover": 0.95
        },
        "performance": {
            "ytd": 82,
            "oneYear": 125,
            "threeYears": 385,
            "fiveYears": 650
        },
        "catalysts": [
            "Backlog recorde US$ 23B",
            "E2 Jets forte demanda"
        ],
        "risks": [
            "Ciclo de aviação",
            "Dependência de fornecedores"
        ],
        "keyHighlights": [
            "3ª maior fabricante de jatos",
            "Crescimento excepcional"
        ],
        "analystConsensus": {
            "buy": 16,
            "hold": 2,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 8500000000,
            "netIncome": 1250000000,
            "ebitda": 1232500000
        },
        "nextEarnings": "2025-11-08",
        "irWebsite": "https://ri.embraer.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 76.5,
                "median": 74.97,
                "high": 87.975,
                "low": 65.02499999999999,
                "count": 9,
                "stdDev": 6.25
            },
            "revisions": {
                "delta30d": 3.82,
                "delta90d": 2.12,
                "upgrades": 1,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 15.54,
                "toMedian": 15.07,
                "dispersion": 6.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 66.21,
                "ma20": 39.06,
                "ma50": 30.02,
                "ma200": 11.92,
                "week52High": 148.97,
                "week52Low": 11.03
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 8.2,
                    "signal": 6.56,
                    "histogram": 1.64,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 195000000,
                "ratio": 1.04,
                "accumDist": "ACCUMULATION",
                "obv": 50095
            },
            "signals": {
                "overallScore": 84,
                "recommendation": "STRONG BUY",
                "support": 60.91,
                "resistance": 71.51
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 4,
                    "totalValue": 1319876,
                    "currentPremium": 6.32
                },
                "ownership": 20.96
            },
            "institutional": {
                "ownership": 48.7,
                "change3m": 1.33,
                "change12m": 9.59,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 9.55
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 2.95
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 67.07,
                "probability": 0.72,
                "expectedReturn": 1.29
            },
            "lstm": {
                "prediction30d": 67.15,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "RAIL3",
        "name": "Rumo",
        "sector": "Transporte",
        "subsector": "Ferrovias",
        "pod": "Pod Secular",
        "marketCap": 33000000000,
        "currentPrice": 18,
        "targetPrice": 24.13,
        "upside": 34.06,
        "projections": {
            "target1Y": 24.13,
            "target3Y": 30,
            "target5Y": 38,
            "target10Y": 55
        },
        "score": 77,
        "ranking": 11,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 73,
        "metrics": {
            "pe": 15.5,
            "roe": 18.2,
            "roic": 15.5,
            "dividendYield": 2.8,
            "netDebtToEbitda": 2.8,
            "ebitdaMargin": 52,
            "revenueGrowth": 12,
            "earningsGrowth": 18,
            "pb": 2.8,
            "evEbitda": 9.5,
            "beta": 1.15,
            "freeFloat": 58,
            "liquidityDaily": 165000000,
            "fcfYield": 6.5,
            "assetTurnover": 0.42
        },
        "performance": {
            "ytd": 15,
            "oneYear": 28,
            "threeYears": 85,
            "fiveYears": 220
        },
        "catalysts": [
            "Renovação da concessão",
            "Expansão de capacidade"
        ],
        "risks": [
            "Regulação",
            "Capex elevado"
        ],
        "keyHighlights": [
            "Maior ferrovia do Brasil",
            "Margem EBITDA 52%"
        ],
        "analystConsensus": {
            "buy": 12,
            "hold": 3,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 4800000000,
            "netIncome": 850000000,
            "ebitda": 2496000000
        },
        "nextEarnings": "2025-11-10",
        "irWebsite": "https://ri.rumolog.com/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 24.13,
                "median": 23.647399999999998,
                "high": 27.749499999999998,
                "low": 20.510499999999997,
                "count": 5,
                "stdDev": 5.75
            },
            "revisions": {
                "delta30d": 3.74,
                "delta90d": 7.01,
                "upgrades": 3,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 34.06,
                "toMedian": 33.04,
                "dispersion": 5.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 18,
                "ma20": 16.65,
                "ma50": 16.2,
                "ma200": 15.3,
                "week52High": 23.04,
                "week52Low": 14.64
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.5,
                    "signal": 1.2,
                    "histogram": 0.3,
                    "trend": "BULLISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 165000000,
                "ratio": 1.08,
                "accumDist": "ACCUMULATION",
                "obv": 740617
            },
            "signals": {
                "overallScore": 77,
                "recommendation": "BUY",
                "support": 16.56,
                "resistance": 19.44
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 4798440,
                    "currentPremium": -0.11
                },
                "ownership": 12.24
            },
            "institutional": {
                "ownership": 39.91,
                "change3m": 2.34,
                "change12m": 1.68,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 8.25
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 1.8
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 18.51,
                "probability": 0.58,
                "expectedReturn": 2.84
            },
            "lstm": {
                "prediction30d": 18.56,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "CSAN3",
        "name": "Cosan",
        "sector": "Energia",
        "subsector": "Diversificado",
        "pod": "Pod Global",
        "marketCap": 22000000000,
        "currentPrice": 6.07,
        "targetPrice": 12,
        "upside": 97.69,
        "projections": {
            "target1Y": 12,
            "target3Y": 16,
            "target5Y": 22,
            "target10Y": 35
        },
        "score": 74,
        "ranking": 13,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 70,
        "metrics": {
            "pe": 12.5,
            "roe": 12.5,
            "roic": 10.2,
            "dividendYield": 3.2,
            "netDebtToEbitda": 3.5,
            "ebitdaMargin": 22,
            "revenueGrowth": 10,
            "earningsGrowth": 18,
            "pb": 1.6,
            "evEbitda": 8.5,
            "beta": 1.45,
            "freeFloat": 48,
            "liquidityDaily": 125000000,
            "fcfYield": 5.8,
            "assetTurnover": 0.68
        },
        "performance": {
            "ytd": 28,
            "oneYear": 45,
            "threeYears": -25,
            "fiveYears": 35
        },
        "catalysts": [
            "Valorização de ativos",
            "Possível spin-off"
        ],
        "risks": [
            "Alta alavancagem",
            "Complexidade da estrutura"
        ],
        "keyHighlights": [
            "Holding diversificada",
            "Upside 97% segundo consenso"
        ],
        "analystConsensus": {
            "buy": 9,
            "hold": 2,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 42000000000,
            "netIncome": 650000000,
            "ebitda": 9240000000
        },
        "nextEarnings": "2025-11-12",
        "irWebsite": "https://ri.cosan.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 12,
                "median": 11.76,
                "high": 13.799999999999999,
                "low": 10.2,
                "count": 5,
                "stdDev": 7.25
            },
            "revisions": {
                "delta30d": 0.83,
                "delta90d": -3.49,
                "upgrades": 3,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 97.69,
                "toMedian": 94.76,
                "dispersion": 7.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 6.07,
                "ma20": 5.22,
                "ma50": 4.94,
                "ma200": 4.37,
                "week52High": 8.8,
                "week52Low": 4.25
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 2.8,
                    "signal": 2.24,
                    "histogram": 0.56,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 125000000,
                "ratio": 1.05,
                "accumDist": "ACCUMULATION",
                "obv": 262036
            },
            "signals": {
                "overallScore": 74,
                "recommendation": "BUY",
                "support": 5.58,
                "resistance": 6.56
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": -1,
                    "totalValue": 1164879,
                    "currentPremium": 4.69
                },
                "ownership": 10.42
            },
            "institutional": {
                "ownership": 21.67,
                "change3m": -0.25,
                "change12m": -1.04,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.45
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 5.51
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 6.56,
                "probability": 0.58,
                "expectedReturn": 8.14
            },
            "lstm": {
                "prediction30d": 6.61,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "GOLL4",
        "name": "Gol Linhas Aéreas",
        "sector": "Transporte",
        "subsector": "Aéreo",
        "pod": "Pod Sell",
        "marketCap": 1200000000,
        "currentPrice": 1.85,
        "targetPrice": 0.28,
        "upside": -84.86,
        "projections": {
            "target1Y": 0.28,
            "target3Y": 0.15,
            "target5Y": 0.1,
            "target10Y": 0.05
        },
        "score": 15,
        "ranking": 19,
        "recommendation": "SELL",
        "source": "V2",
        "confidence": 85,
        "metrics": {
            "pe": -2.5,
            "roe": -85,
            "roic": -45,
            "dividendYield": 0,
            "netDebtToEbitda": 12.5,
            "ebitdaMargin": -8.5,
            "revenueGrowth": -15,
            "earningsGrowth": -180,
            "pb": 0.25,
            "evEbitda": -5.2,
            "beta": 2.8,
            "freeFloat": 78,
            "liquidityDaily": 85000000,
            "fcfYield": -25,
            "assetTurnover": 1.2
        },
        "performance": {
            "ytd": -72,
            "oneYear": -85,
            "threeYears": -92,
            "fiveYears": -95
        },
        "catalysts": [
            "Recuperação judicial em andamento",
            "Reestruturação de dívida"
        ],
        "risks": [
            "Altíssima alavancagem",
            "Chapter 11 nos EUA",
            "Destruição de valor aos acionistas",
            "Possível falência"
        ],
        "keyHighlights": [
            "⚠️ EVITAR - Empresa em recuperação judicial",
            "Analistas recomendam venda"
        ],
        "analystConsensus": {
            "buy": 0,
            "hold": 1,
            "sell": 12
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 3200000000,
            "netIncome": -850000000,
            "ebitda": -270000000
        },
        "nextEarnings": "2025-11-20",
        "irWebsite": "https://ri.voegol.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 0.28,
                "median": 0.27440000000000003,
                "high": 0.322,
                "low": 0.23800000000000002,
                "count": 7,
                "stdDev": 14
            },
            "revisions": {
                "delta30d": -1.66,
                "delta90d": 4.32,
                "upgrades": 0,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": -84.86,
                "toMedian": -82.31,
                "dispersion": 14
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 1.85,
                "ma20": 2.52,
                "ma50": 2.74,
                "ma200": 3.18,
                "week52High": 3.42,
                "week52Low": 0.8
            },
            "momentum": {
                "rsi14": 35,
                "macd": {
                    "value": -7.2,
                    "signal": -5.76,
                    "histogram": -1.44,
                    "trend": "BEARISH"
                },
                "stochastic": 30
            },
            "volume": {
                "avgVolume20d": 85000000,
                "ratio": 0.92,
                "accumDist": "DISTRIBUTION",
                "obv": 510004
            },
            "signals": {
                "overallScore": 15,
                "recommendation": "SELL",
                "support": 1.7,
                "resistance": 2
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 4578266,
                    "currentPremium": -2.39
                },
                "ownership": 10.09
            },
            "institutional": {
                "ownership": 59.6,
                "change3m": -2.67,
                "change12m": -2.1,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 6.85
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 2.64
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 1.72,
                "probability": 0.58,
                "expectedReturn": -7.07
            },
            "lstm": {
                "prediction30d": 1.71,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "HOLD",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "NEUTRAL",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 20
        }
    },
    {
        "ticker": "BRFS3",
        "name": "BRF S.A.",
        "sector": "Alimentos",
        "subsector": "Proteínas",
        "pod": "Pod Global",
        "marketCap": 18500000000,
        "currentPrice": 22.85,
        "targetPrice": 28.5,
        "upside": 24.73,
        "projections": {
            "target1Y": 28.5,
            "target3Y": 38,
            "target5Y": 48,
            "target10Y": 72
        },
        "score": 72,
        "ranking": 14,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 75,
        "metrics": {
            "pe": 18.5,
            "roe": 8.5,
            "roic": 6.2,
            "dividendYield": 1.8,
            "netDebtToEbitda": 2.8,
            "ebitdaMargin": 11.5,
            "revenueGrowth": 8.5,
            "earningsGrowth": 22,
            "pb": 1.6,
            "evEbitda": 9.2,
            "beta": 1.35,
            "freeFloat": 65,
            "liquidityDaily": 95000000,
            "fcfYield": 4.5,
            "assetTurnover": 1.45
        },
        "performance": {
            "ytd": 18,
            "oneYear": 28,
            "threeYears": 15,
            "fiveYears": 45
        },
        "catalysts": [
            "Recuperação de margens",
            "Expansão internacional",
            "Aumento de preços"
        ],
        "risks": [
            "Volatilidade cambial",
            "Preço de commodities",
            "Competição acirrada"
        ],
        "keyHighlights": [
            "Líder em proteínas",
            "Exposição ao mercado global"
        ],
        "analystConsensus": {
            "buy": 8,
            "hold": 5,
            "sell": 1
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 14200000000,
            "netIncome": 420000000,
            "ebitda": 1633000000
        },
        "nextEarnings": "2025-11-08",
        "irWebsite": "https://ri.brf-global.com/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 28.5,
                "median": 27.93,
                "high": 32.775,
                "low": 24.224999999999998,
                "count": 13,
                "stdDev": 6.75
            },
            "revisions": {
                "delta30d": 1.67,
                "delta90d": -3.81,
                "upgrades": 2,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 24.73,
                "toMedian": 23.99,
                "dispersion": 6.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 22.85,
                "ma20": 20.79,
                "ma50": 20.11,
                "ma200": 18.74,
                "week52High": 29.25,
                "week52Low": 18.58
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.8,
                    "signal": 1.44,
                    "histogram": 0.36,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 95000000,
                "ratio": 1.2,
                "accumDist": "ACCUMULATION",
                "obv": 855110
            },
            "signals": {
                "overallScore": 72,
                "recommendation": "BUY",
                "support": 21.02,
                "resistance": 24.68
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": -1,
                    "totalValue": 812686,
                    "currentPremium": -1.13
                },
                "ownership": 37.75
            },
            "institutional": {
                "ownership": 20.96,
                "change3m": -0.57,
                "change12m": -1.77,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 9.18
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.19
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 23.32,
                "probability": 0.58,
                "expectedReturn": 2.06
            },
            "lstm": {
                "prediction30d": 23.37,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "JBSS3",
        "name": "JBS S.A.",
        "sector": "Alimentos",
        "subsector": "Proteínas",
        "pod": "Pod Global",
        "marketCap": 85000000000,
        "currentPrice": 32.45,
        "targetPrice": 42,
        "upside": 29.43,
        "projections": {
            "target1Y": 42,
            "target3Y": 55,
            "target5Y": 68,
            "target10Y": 95
        },
        "score": 78,
        "ranking": 15,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 80,
        "metrics": {
            "pe": 9.8,
            "roe": 18.5,
            "roic": 12.5,
            "dividendYield": 2.5,
            "netDebtToEbitda": 2.1,
            "ebitdaMargin": 9.8,
            "revenueGrowth": 12.5,
            "earningsGrowth": 25,
            "pb": 1.8,
            "evEbitda": 6.5,
            "beta": 1.25,
            "freeFloat": 58,
            "liquidityDaily": 180000000,
            "fcfYield": 8.5,
            "assetTurnover": 1.85
        },
        "performance": {
            "ytd": 32,
            "oneYear": 48,
            "threeYears": 85,
            "fiveYears": 120
        },
        "catalysts": [
            "Maior processadora de proteínas do mundo",
            "Expansão nos EUA",
            "Aquisições estratégicas"
        ],
        "risks": [
            "Volatilidade cambial",
            "Questões ESG",
            "Riscos regulatórios"
        ],
        "keyHighlights": [
            "Líder global em proteínas",
            "Diversificação geográfica"
        ],
        "analystConsensus": {
            "buy": 12,
            "hold": 3,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 92000000000,
            "netIncome": 2800000000,
            "ebitda": 9016000000
        },
        "nextEarnings": "2025-11-13",
        "irWebsite": "https://ri.jbs.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 42,
                "median": 41.16,
                "high": 48.3,
                "low": 35.699999999999996,
                "count": 8,
                "stdDev": 6.25
            },
            "revisions": {
                "delta30d": -2.79,
                "delta90d": -0.78,
                "upgrades": 1,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 29.43,
                "toMedian": 28.55,
                "dispersion": 6.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 32.45,
                "ma20": 27.26,
                "ma50": 25.53,
                "ma200": 22.07,
                "week52High": 48.03,
                "week52Low": 22.07
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 3.2,
                    "signal": 2.56,
                    "histogram": 0.64,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 180000000,
                "ratio": 1.17,
                "accumDist": "ACCUMULATION",
                "obv": 669146
            },
            "signals": {
                "overallScore": 78,
                "recommendation": "BUY",
                "support": 29.85,
                "resistance": 35.05
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 3,
                    "totalValue": 627882,
                    "currentPremium": 1.38
                },
                "ownership": 38.41
            },
            "institutional": {
                "ownership": 29.08,
                "change3m": 3.07,
                "change12m": 2.99,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 8.16
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 2.36
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 33.25,
                "probability": 0.58,
                "expectedReturn": 2.45
            },
            "lstm": {
                "prediction30d": 33.33,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "CPFE3",
        "name": "CPFL Energia",
        "sector": "Energia Elétrica",
        "subsector": "Distribuição",
        "pod": "Pod Selic",
        "marketCap": 24000000000,
        "currentPrice": 33.2,
        "targetPrice": 38.5,
        "upside": 15.96,
        "projections": {
            "target1Y": 38.5,
            "target3Y": 45,
            "target5Y": 52,
            "target10Y": 68
        },
        "score": 70,
        "ranking": 16,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 78,
        "metrics": {
            "pe": 11.5,
            "roe": 14.5,
            "roic": 9.8,
            "dividendYield": 6.8,
            "netDebtToEbitda": 2.2,
            "ebitdaMargin": 21.5,
            "revenueGrowth": 6.5,
            "earningsGrowth": 8.5,
            "pb": 1.7,
            "evEbitda": 7.8,
            "beta": 0.75,
            "freeFloat": 42,
            "liquidityDaily": 55000000,
            "fcfYield": 7.5,
            "assetTurnover": 0.52
        },
        "performance": {
            "ytd": 12,
            "oneYear": 18,
            "threeYears": 25,
            "fiveYears": 42
        },
        "catalysts": [
            "Dividend yield atrativo",
            "Regulação favorável",
            "Investimentos em renováveis"
        ],
        "risks": [
            "Risco regulatório",
            "Risco hidrológico",
            "Mudanças na tarifa"
        ],
        "keyHighlights": [
            "DY 6.8%",
            "Setor regulado e estável"
        ],
        "analystConsensus": {
            "buy": 7,
            "hold": 5,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 8900000000,
            "netIncome": 780000000,
            "ebitda": 1914000000
        },
        "nextEarnings": "2025-11-07",
        "irWebsite": "https://ri.cpfl.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 38.5,
                "median": 37.73,
                "high": 44.275,
                "low": 32.725,
                "count": 8,
                "stdDev": 3.75
            },
            "revisions": {
                "delta30d": -0.51,
                "delta90d": 5.1,
                "upgrades": 1,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 15.96,
                "toMedian": 15.48,
                "dispersion": 3.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 33.2,
                "ma20": 31.21,
                "ma50": 30.54,
                "ma200": 29.22,
                "week52High": 39.18,
                "week52Low": 29.22
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.2,
                    "signal": 0.96,
                    "histogram": 0.24,
                    "trend": "BULLISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 55000000,
                "ratio": 1.11,
                "accumDist": "ACCUMULATION",
                "obv": 553609
            },
            "signals": {
                "overallScore": 70,
                "recommendation": "BUY",
                "support": 30.54,
                "resistance": 35.86
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": -1,
                    "totalValue": 1821811,
                    "currentPremium": 0.29
                },
                "ownership": 36.32
            },
            "institutional": {
                "ownership": 47.33,
                "change3m": -2.21,
                "change12m": -4.68,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 3.32
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.29
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 33.64,
                "probability": 0.58,
                "expectedReturn": 1.33
            },
            "lstm": {
                "prediction30d": 33.69,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "CCRO3",
        "name": "CCR S.A.",
        "sector": "Transporte",
        "subsector": "Concessões Rodoviárias",
        "pod": "Pod Secular",
        "marketCap": 22000000000,
        "currentPrice": 12.85,
        "targetPrice": 16,
        "upside": 24.51,
        "projections": {
            "target1Y": 16,
            "target3Y": 20,
            "target5Y": 24,
            "target10Y": 32
        },
        "score": 74,
        "ranking": 17,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 76,
        "metrics": {
            "pe": 14.2,
            "roe": 11.5,
            "roic": 8.5,
            "dividendYield": 4.2,
            "netDebtToEbitda": 3.5,
            "ebitdaMargin": 45.5,
            "revenueGrowth": 9.5,
            "earningsGrowth": 12,
            "pb": 1.6,
            "evEbitda": 9.5,
            "beta": 0.95,
            "freeFloat": 68,
            "liquidityDaily": 85000000,
            "fcfYield": 6.2,
            "assetTurnover": 0.38
        },
        "performance": {
            "ytd": 15,
            "oneYear": 22,
            "threeYears": 18,
            "fiveYears": 35
        },
        "catalysts": [
            "Retomada do tráfego",
            "Novos contratos de concessão",
            "Mobilidade urbana"
        ],
        "risks": [
            "Risco regulatório",
            "Renovação de concessões",
            "Competição"
        ],
        "keyHighlights": [
            "Maior concessionária de infraestrutura do Brasil",
            "Diversificação de ativos"
        ],
        "analystConsensus": {
            "buy": 9,
            "hold": 4,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 4200000000,
            "netIncome": 380000000,
            "ebitda": 1911000000
        },
        "nextEarnings": "2025-11-14",
        "irWebsite": "https://ri.ccr.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 16,
                "median": 15.68,
                "high": 18.4,
                "low": 13.6,
                "count": 8,
                "stdDev": 4.75
            },
            "revisions": {
                "delta30d": 1,
                "delta90d": -2.8,
                "upgrades": 2,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 24.51,
                "toMedian": 23.77,
                "dispersion": 4.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 12.85,
                "ma20": 11.89,
                "ma50": 11.56,
                "ma200": 10.92,
                "week52High": 15.68,
                "week52Low": 10.97
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.5,
                    "signal": 1.2,
                    "histogram": 0.3,
                    "trend": "BULLISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 85000000,
                "ratio": 1.21,
                "accumDist": "ACCUMULATION",
                "obv": 671761
            },
            "signals": {
                "overallScore": 74,
                "recommendation": "BUY",
                "support": 11.82,
                "resistance": 13.88
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 2194513,
                    "currentPremium": 4.64
                },
                "ownership": 31.24
            },
            "institutional": {
                "ownership": 41.07,
                "change3m": -0.93,
                "change12m": -2.07,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 5.71
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.7
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 13.11,
                "probability": 0.58,
                "expectedReturn": 2.04
            },
            "lstm": {
                "prediction30d": 13.14,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "RADL3",
        "name": "Raia Drogasil",
        "sector": "Varejo",
        "subsector": "Farmácias",
        "pod": "Pod Secular",
        "marketCap": 42000000000,
        "currentPrice": 24.15,
        "targetPrice": 32,
        "upside": 32.51,
        "projections": {
            "target1Y": 32,
            "target3Y": 42,
            "target5Y": 52,
            "target10Y": 75
        },
        "score": 82,
        "ranking": 18,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 82,
        "metrics": {
            "pe": 22.5,
            "roe": 18.5,
            "roic": 14.2,
            "dividendYield": 1.5,
            "netDebtToEbitda": 0.8,
            "ebitdaMargin": 8.5,
            "revenueGrowth": 14.5,
            "earningsGrowth": 18,
            "pb": 4.2,
            "evEbitda": 15.5,
            "beta": 0.85,
            "freeFloat": 72,
            "liquidityDaily": 92000000,
            "fcfYield": 5.5,
            "assetTurnover": 2.15
        },
        "performance": {
            "ytd": 25,
            "oneYear": 38,
            "threeYears": 65,
            "fiveYears": 95
        },
        "catalysts": [
            "Expansão de lojas",
            "Digitalização",
            "Envelhecimento populacional"
        ],
        "risks": [
            "Competição intensa",
            "Pressão de margens",
            "Mudanças regulatórias"
        ],
        "keyHighlights": [
            "Líder em varejo farmacêutico",
            "Crescimento consistente",
            "Tese demográfica forte"
        ],
        "analystConsensus": {
            "buy": 11,
            "hold": 2,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 9800000000,
            "netIncome": 420000000,
            "ebitda": 833000000
        },
        "nextEarnings": "2025-11-12",
        "irWebsite": "https://ri.rd.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 32,
                "median": 31.36,
                "high": 36.8,
                "low": 27.2,
                "count": 12,
                "stdDev": 4.25
            },
            "revisions": {
                "delta30d": 1,
                "delta90d": -1.22,
                "upgrades": 2,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 32.51,
                "toMedian": 31.53,
                "dispersion": 4.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 24.15,
                "ma20": 21.13,
                "ma50": 20.13,
                "ma200": 18.11,
                "week52High": 33.33,
                "week52Low": 18.03
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 2.5,
                    "signal": 2,
                    "histogram": 0.5,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 92000000,
                "ratio": 1.16,
                "accumDist": "ACCUMULATION",
                "obv": 461443
            },
            "signals": {
                "overallScore": 82,
                "recommendation": "STRONG BUY",
                "support": 22.22,
                "resistance": 26.08
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 326273,
                    "currentPremium": 6.85
                },
                "ownership": 37.55
            },
            "institutional": {
                "ownership": 24.24,
                "change3m": 3.7,
                "change12m": 6.4,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 4.63
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 2.68
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 24.8,
                "probability": 0.72,
                "expectedReturn": 2.71
            },
            "lstm": {
                "prediction30d": 24.87,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "FLRY3",
        "name": "Fleury S.A.",
        "sector": "Saúde",
        "subsector": "Diagnóstico",
        "pod": "Pod Secular",
        "marketCap": 7500000000,
        "currentPrice": 13.45,
        "targetPrice": 18.5,
        "upside": 37.55,
        "projections": {
            "target1Y": 18.5,
            "target3Y": 24,
            "target5Y": 30,
            "target10Y": 42
        },
        "score": 76,
        "ranking": 20,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 74,
        "metrics": {
            "pe": 28.5,
            "roe": 9.5,
            "roic": 6.8,
            "dividendYield": 2.2,
            "netDebtToEbitda": 1.5,
            "ebitdaMargin": 18.5,
            "revenueGrowth": 11.5,
            "earningsGrowth": 15,
            "pb": 2.7,
            "evEbitda": 12.8,
            "beta": 0.75,
            "freeFloat": 58,
            "liquidityDaily": 28000000,
            "fcfYield": 4.2,
            "assetTurnover": 0.85
        },
        "performance": {
            "ytd": 8,
            "oneYear": 15,
            "threeYears": 5,
            "fiveYears": 22
        },
        "catalysts": [
            "Consolidação do setor",
            "Envelhecimento populacional",
            "Medicina preventiva"
        ],
        "risks": [
            "Competição regional",
            "Mudanças na ANS",
            "Pressão de custos"
        ],
        "keyHighlights": [
            "Líder em medicina diagnóstica",
            "Marca forte",
            "Expansão geográfica"
        ],
        "analystConsensus": {
            "buy": 8,
            "hold": 4,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 1200000000,
            "netIncome": 85000000,
            "ebitda": 222000000
        },
        "nextEarnings": "2025-11-15",
        "irWebsite": "https://ri.fleury.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 18.5,
                "median": 18.13,
                "high": 21.275,
                "low": 15.725,
                "count": 11,
                "stdDev": 3.75
            },
            "revisions": {
                "delta30d": -2.72,
                "delta90d": -4.48,
                "upgrades": 1,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 37.55,
                "toMedian": 36.42,
                "dispersion": 3.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 13.45,
                "ma20": 12.91,
                "ma50": 12.73,
                "ma200": 12.37,
                "week52High": 15.47,
                "week52Low": 12.11
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 0.8,
                    "signal": 0.64,
                    "histogram": 0.16,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 28000000,
                "ratio": 1.27,
                "accumDist": "NEUTRAL",
                "obv": 834368
            },
            "signals": {
                "overallScore": 76,
                "recommendation": "BUY",
                "support": 12.37,
                "resistance": 14.53
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 3,
                    "totalValue": 3099621,
                    "currentPremium": -1.71
                },
                "ownership": 38.57
            },
            "institutional": {
                "ownership": 29.29,
                "change3m": 3.85,
                "change12m": 7.22,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 8.84
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 6.77
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 13.87,
                "probability": 0.58,
                "expectedReturn": 3.13
            },
            "lstm": {
                "prediction30d": 13.91,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "HYPE3",
        "name": "Hypera Pharma",
        "sector": "Saúde",
        "subsector": "Farmacêutica",
        "pod": "Pod Secular",
        "marketCap": 18000000000,
        "currentPrice": 26.8,
        "targetPrice": 36,
        "upside": 34.33,
        "projections": {
            "target1Y": 36,
            "target3Y": 48,
            "target5Y": 60,
            "target10Y": 85
        },
        "score": 79,
        "ranking": 21,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 77,
        "metrics": {
            "pe": 16.5,
            "roe": 25.5,
            "roic": 18.2,
            "dividendYield": 3.8,
            "netDebtToEbitda": 1.2,
            "ebitdaMargin": 24.5,
            "revenueGrowth": 9.5,
            "earningsGrowth": 14,
            "pb": 4.2,
            "evEbitda": 9.5,
            "beta": 0.65,
            "freeFloat": 78,
            "liquidityDaily": 65000000,
            "fcfYield": 8.5,
            "assetTurnover": 0.95
        },
        "performance": {
            "ytd": 22,
            "oneYear": 35,
            "threeYears": 48,
            "fiveYears": 72
        },
        "catalysts": [
            "Portfólio de marcas líderes",
            "Envelhecimento populacional",
            "Lançamentos"
        ],
        "risks": [
            "Regulação de preços",
            "Genéricos",
            "Competição"
        ],
        "keyHighlights": [
            "Líder em farmacêutica OTC",
            "ROE 25.5%",
            "Geração de caixa forte"
        ],
        "analystConsensus": {
            "buy": 10,
            "hold": 3,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 2100000000,
            "netIncome": 340000000,
            "ebitda": 515000000
        },
        "nextEarnings": "2025-11-11",
        "irWebsite": "https://ri.hypera.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 36,
                "median": 35.28,
                "high": 41.4,
                "low": 30.599999999999998,
                "count": 7,
                "stdDev": 3.25
            },
            "revisions": {
                "delta30d": 4.49,
                "delta90d": 2.15,
                "upgrades": 2,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 34.33,
                "toMedian": 33.3,
                "dispersion": 3.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 26.8,
                "ma20": 23.85,
                "ma50": 22.87,
                "ma200": 20.9,
                "week52High": 36.18,
                "week52Low": 20.55
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 2.2,
                    "signal": 1.76,
                    "histogram": 0.44,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 65000000,
                "ratio": 0.82,
                "accumDist": "ACCUMULATION",
                "obv": 168154
            },
            "signals": {
                "overallScore": 79,
                "recommendation": "BUY",
                "support": 24.66,
                "resistance": 28.94
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 1941384,
                    "currentPremium": 2.72
                },
                "ownership": 12.19
            },
            "institutional": {
                "ownership": 28.47,
                "change3m": 2.61,
                "change12m": 1.21,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 2.67
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.62
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 27.57,
                "probability": 0.58,
                "expectedReturn": 2.86
            },
            "lstm": {
                "prediction30d": 27.64,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "VIVT3",
        "name": "Telefônica Brasil (Vivo)",
        "sector": "Telecomunicações",
        "subsector": "Telecom",
        "pod": "Pod Secular",
        "marketCap": 85000000000,
        "currentPrice": 50.25,
        "targetPrice": 58,
        "upside": 15.42,
        "projections": {
            "target1Y": 58,
            "target3Y": 68,
            "target5Y": 78,
            "target10Y": 98
        },
        "score": 68,
        "ranking": 22,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 72,
        "metrics": {
            "pe": 13.8,
            "roe": 18.5,
            "roic": 12.5,
            "dividendYield": 5.5,
            "netDebtToEbitda": 0.9,
            "ebitdaMargin": 42.5,
            "revenueGrowth": 4.5,
            "earningsGrowth": 6.5,
            "pb": 2.5,
            "evEbitda": 5.8,
            "beta": 0.55,
            "freeFloat": 33,
            "liquidityDaily": 125000000,
            "fcfYield": 9.5,
            "assetTurnover": 0.42
        },
        "performance": {
            "ytd": 8,
            "oneYear": 14,
            "threeYears": 22,
            "fiveYears": 38
        },
        "catalysts": [
            "Liderança em 5G",
            "Dividend yield atrativo",
            "Fibra óptica"
        ],
        "risks": [
            "Competição intensa",
            "Regulação",
            "Saturação do mercado"
        ],
        "keyHighlights": [
            "DY 5.5%",
            "Líder em telecom",
            "Geração de caixa robusta"
        ],
        "analystConsensus": {
            "buy": 7,
            "hold": 6,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 13500000000,
            "netIncome": 1450000000,
            "ebitda": 5738000000
        },
        "nextEarnings": "2025-11-13",
        "irWebsite": "https://ri.telefonica.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 58,
                "median": 56.839999999999996,
                "high": 66.69999999999999,
                "low": 49.3,
                "count": 8,
                "stdDev": 2.75
            },
            "revisions": {
                "delta30d": 3.56,
                "delta90d": -3.35,
                "upgrades": 3,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 15.42,
                "toMedian": 14.96,
                "dispersion": 2.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 50.25,
                "ma20": 48.24,
                "ma50": 47.57,
                "ma200": 46.23,
                "week52High": 57.29,
                "week52Low": 45.56
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 0.8,
                    "signal": 0.64,
                    "histogram": 0.16,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 125000000,
                "ratio": 1.1,
                "accumDist": "NEUTRAL",
                "obv": 49090
            },
            "signals": {
                "overallScore": 68,
                "recommendation": "BUY",
                "support": 46.23,
                "resistance": 54.27
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": -1,
                    "totalValue": 318826,
                    "currentPremium": 3.56
                },
                "ownership": 27.83
            },
            "institutional": {
                "ownership": 31.97,
                "change3m": -1.81,
                "change12m": -1.7,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 9.2
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.12
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 50.9,
                "probability": 0.58,
                "expectedReturn": 1.28
            },
            "lstm": {
                "prediction30d": 50.96,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "HOLD",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "CMIG4",
        "name": "Cemig",
        "sector": "Energia Elétrica",
        "subsector": "Distribuição",
        "pod": "Pod Selic",
        "marketCap": 20000000000,
        "currentPrice": 10.15,
        "targetPrice": 12.5,
        "upside": 23.15,
        "projections": {
            "target1Y": 12.5,
            "target3Y": 15,
            "target5Y": 18,
            "target10Y": 24
        },
        "score": 67,
        "ranking": 23,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 70,
        "metrics": {
            "pe": 9.5,
            "roe": 11.2,
            "roic": 7.5,
            "dividendYield": 7.8,
            "netDebtToEbitda": 2.5,
            "ebitdaMargin": 28.5,
            "revenueGrowth": 5.5,
            "earningsGrowth": 8,
            "pb": 1.1,
            "evEbitda": 6.5,
            "beta": 0.85,
            "freeFloat": 67,
            "liquidityDaily": 95000000,
            "fcfYield": 10.5,
            "assetTurnover": 0.48
        },
        "performance": {
            "ytd": 5,
            "oneYear": 12,
            "threeYears": 8,
            "fiveYears": 18
        },
        "catalysts": [
            "DY 7.8% - muito atrativo",
            "Privatização em discussão",
            "Venda de ativos"
        ],
        "risks": [
            "Risco político (Minas Gerais)",
            "Endividamento",
            "Regulação"
        ],
        "keyHighlights": [
            "DY excepcional",
            "Setor regulado"
        ],
        "analystConsensus": {
            "buy": 6,
            "hold": 6,
            "sell": 1
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 8200000000,
            "netIncome": 620000000,
            "ebitda": 2337000000
        },
        "nextEarnings": "2025-11-14",
        "irWebsite": "https://ri.cemig.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 12.5,
                "median": 12.25,
                "high": 14.374999999999998,
                "low": 10.625,
                "count": 9,
                "stdDev": 4.25
            },
            "revisions": {
                "delta30d": 2.76,
                "delta90d": -1.53,
                "upgrades": 1,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 23.15,
                "toMedian": 22.46,
                "dispersion": 4.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 10.15,
                "ma20": 9.9,
                "ma50": 9.81,
                "ma200": 9.64,
                "week52High": 11.37,
                "week52Low": 9.34
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 0.5,
                    "signal": 0.4,
                    "histogram": 0.1,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 95000000,
                "ratio": 1.15,
                "accumDist": "NEUTRAL",
                "obv": 229420
            },
            "signals": {
                "overallScore": 67,
                "recommendation": "BUY",
                "support": 9.34,
                "resistance": 10.96
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 1288973,
                    "currentPremium": 3.29
                },
                "ownership": 17.51
            },
            "institutional": {
                "ownership": 46.83,
                "change3m": -1.4,
                "change12m": -4.86,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 7.92
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 2.84
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 10.35,
                "probability": 0.58,
                "expectedReturn": 1.93
            },
            "lstm": {
                "prediction30d": 10.37,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "HOLD",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "EQTL3",
        "name": "Equatorial Energia",
        "sector": "Energia Elétrica",
        "subsector": "Distribuição",
        "pod": "Pod Selic",
        "marketCap": 45000000000,
        "currentPrice": 35.8,
        "targetPrice": 44,
        "upside": 22.91,
        "projections": {
            "target1Y": 44,
            "target3Y": 55,
            "target5Y": 68,
            "target10Y": 92
        },
        "score": 83,
        "ranking": 24,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 84,
        "metrics": {
            "pe": 15.2,
            "roe": 22.5,
            "roic": 16.8,
            "dividendYield": 4.2,
            "netDebtToEbitda": 2.8,
            "ebitdaMargin": 32.5,
            "revenueGrowth": 18.5,
            "earningsGrowth": 24,
            "pb": 3.4,
            "evEbitda": 9.8,
            "beta": 0.75,
            "freeFloat": 55,
            "liquidityDaily": 115000000,
            "fcfYield": 7.8,
            "assetTurnover": 0.55
        },
        "performance": {
            "ytd": 28,
            "oneYear": 42,
            "threeYears": 85,
            "fiveYears": 185
        },
        "catalysts": [
            "Melhor gestora de energia do Brasil",
            "Aquisições estratégicas",
            "Eficiência operacional"
        ],
        "risks": [
            "Risco regulatório",
            "Integração de aquisições",
            "Exposição ao Nordeste"
        ],
        "keyHighlights": [
            "ROE 22.5% - excepcional",
            "Track record de aquisições",
            "Crescimento acima do setor"
        ],
        "analystConsensus": {
            "buy": 13,
            "hold": 2,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 7800000000,
            "netIncome": 980000000,
            "ebitda": 2535000000
        },
        "nextEarnings": "2025-11-09",
        "irWebsite": "https://ri.equatorialenergia.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 44,
                "median": 43.12,
                "high": 50.599999999999994,
                "low": 37.4,
                "count": 6,
                "stdDev": 3.75
            },
            "revisions": {
                "delta30d": 0.05,
                "delta90d": -1.25,
                "upgrades": 0,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 22.91,
                "toMedian": 22.22,
                "dispersion": 3.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 35.8,
                "ma20": 30.79,
                "ma50": 29.12,
                "ma200": 25.78,
                "week52High": 50.84,
                "week52Low": 25.78
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 2.8,
                    "signal": 2.24,
                    "histogram": 0.56,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 115000000,
                "ratio": 1.3,
                "accumDist": "ACCUMULATION",
                "obv": 548892
            },
            "signals": {
                "overallScore": 83,
                "recommendation": "STRONG BUY",
                "support": 32.94,
                "resistance": 38.66
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 2,
                    "totalValue": 950405,
                    "currentPremium": 3.11
                },
                "ownership": 26.9
            },
            "institutional": {
                "ownership": 27.83,
                "change3m": 4.57,
                "change12m": 8.13,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 3.27
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 5.03
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 36.48,
                "probability": 0.72,
                "expectedReturn": 1.91
            },
            "lstm": {
                "prediction30d": 36.55,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "CPLE6",
        "name": "Copel",
        "sector": "Energia Elétrica",
        "subsector": "Geração e Distribuição",
        "pod": "Pod Selic",
        "marketCap": 18000000000,
        "currentPrice": 6.58,
        "targetPrice": 8.5,
        "upside": 29.18,
        "projections": {
            "target1Y": 8.5,
            "target3Y": 10.5,
            "target5Y": 13,
            "target10Y": 18
        },
        "score": 71,
        "ranking": 25,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 73,
        "metrics": {
            "pe": 8.2,
            "roe": 15.5,
            "roic": 10.2,
            "dividendYield": 8.5,
            "netDebtToEbitda": 1.8,
            "ebitdaMargin": 35.5,
            "revenueGrowth": 7.5,
            "earningsGrowth": 12,
            "pb": 1.3,
            "evEbitda": 5.8,
            "beta": 0.72,
            "freeFloat": 51,
            "liquidityDaily": 42000000,
            "fcfYield": 11.5,
            "assetTurnover": 0.52
        },
        "performance": {
            "ytd": 18,
            "oneYear": 28,
            "threeYears": 35,
            "fiveYears": 52
        },
        "catalysts": [
            "DY 8.5% - excelente",
            "Privatização em discussão",
            "Geração renovável"
        ],
        "risks": [
            "Risco político (Paraná)",
            "Questões regulatórias",
            "Hidrologia"
        ],
        "keyHighlights": [
            "DY altíssimo",
            "Mix geração + distribuição"
        ],
        "analystConsensus": {
            "buy": 8,
            "hold": 4,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 5200000000,
            "netIncome": 540000000,
            "ebitda": 1846000000
        },
        "nextEarnings": "2025-11-08",
        "irWebsite": "https://ri.copel.com/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 8.5,
                "median": 8.33,
                "high": 9.774999999999999,
                "low": 7.225,
                "count": 10,
                "stdDev": 3.6
            },
            "revisions": {
                "delta30d": -2.58,
                "delta90d": -1.38,
                "upgrades": 3,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 29.18,
                "toMedian": 28.3,
                "dispersion": 3.6
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 6.58,
                "ma20": 5.99,
                "ma50": 5.79,
                "ma200": 5.4,
                "week52High": 8.42,
                "week52Low": 5.35
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.8,
                    "signal": 1.44,
                    "histogram": 0.36,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 42000000,
                "ratio": 1.19,
                "accumDist": "ACCUMULATION",
                "obv": 27944
            },
            "signals": {
                "overallScore": 71,
                "recommendation": "BUY",
                "support": 6.05,
                "resistance": 7.11
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": -1,
                    "totalValue": 1488446,
                    "currentPremium": 2.22
                },
                "ownership": 26.46
            },
            "institutional": {
                "ownership": 56.92,
                "change3m": -2.69,
                "change12m": -4.5,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 7.62
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 6.05
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 6.74,
                "probability": 0.58,
                "expectedReturn": 2.43
            },
            "lstm": {
                "prediction30d": 6.76,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "FALLING_RATES",
            "sensitivities": {
                "selic": -0.8,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "CSNA3",
        "name": "CSN (Companhia Siderúrgica Nacional)",
        "sector": "Siderurgia e Metalurgia",
        "subsector": "Siderurgia",
        "pod": "Pod Global",
        "marketCap": 22000000000,
        "currentPrice": 15.82,
        "targetPrice": 21,
        "upside": 32.74,
        "projections": {
            "target1Y": 21,
            "target3Y": 28,
            "target5Y": 35,
            "target10Y": 48
        },
        "score": 69,
        "ranking": 26,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 68,
        "metrics": {
            "pe": 8.5,
            "roe": 12.5,
            "roic": 8.8,
            "dividendYield": 3.2,
            "netDebtToEbitda": 2.2,
            "ebitdaMargin": 28.5,
            "revenueGrowth": 6.5,
            "earningsGrowth": 15,
            "pb": 1.1,
            "evEbitda": 5.5,
            "beta": 1.55,
            "freeFloat": 62,
            "liquidityDaily": 125000000,
            "fcfYield": 7.5,
            "assetTurnover": 0.75
        },
        "performance": {
            "ytd": -8,
            "oneYear": 5,
            "threeYears": -15,
            "fiveYears": 12
        },
        "catalysts": [
            "Ciclo de commodities",
            "Exportações",
            "Verticalização (mineração)"
        ],
        "risks": [
            "Volatilidade de commodities",
            "Competição chinesa",
            "Endividamento"
        ],
        "keyHighlights": [
            "Integração vertical forte",
            "Exposição a commodities metálicas"
        ],
        "analystConsensus": {
            "buy": 7,
            "hold": 5,
            "sell": 1
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 10500000000,
            "netIncome": 680000000,
            "ebitda": 2993000000
        },
        "nextEarnings": "2025-11-12",
        "irWebsite": "https://ri.csn.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 21,
                "median": 20.58,
                "high": 24.15,
                "low": 17.849999999999998,
                "count": 12,
                "stdDev": 7.75
            },
            "revisions": {
                "delta30d": 0.5,
                "delta90d": -0.28,
                "upgrades": 1,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 32.74,
                "toMedian": 31.76,
                "dispersion": 7.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 15.82,
                "ma20": 16.45,
                "ma50": 16.66,
                "ma200": 17.09,
                "week52High": 16.61,
                "week52Low": 15.29
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": -0.8,
                    "signal": -0.64,
                    "histogram": -0.16,
                    "trend": "NEUTRAL"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 125000000,
                "ratio": 1.09,
                "accumDist": "NEUTRAL",
                "obv": 142768
            },
            "signals": {
                "overallScore": 69,
                "recommendation": "BUY",
                "support": 14.55,
                "resistance": 17.09
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 3906024,
                    "currentPremium": 5.83
                },
                "ownership": 12.62
            },
            "institutional": {
                "ownership": 43.82,
                "change3m": -1.45,
                "change12m": -1.61,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 4.05
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 4.78
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 16.25,
                "probability": 0.58,
                "expectedReturn": 2.73
            },
            "lstm": {
                "prediction30d": 16.29,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "HOLD",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "ITSA4",
        "name": "Itaúsa",
        "sector": "Holdings",
        "subsector": "Holdings Diversificadas",
        "pod": "Pod Secular",
        "marketCap": 95000000000,
        "currentPrice": 9.25,
        "targetPrice": 11.5,
        "upside": 24.32,
        "projections": {
            "target1Y": 11.5,
            "target3Y": 14,
            "target5Y": 17,
            "target10Y": 23
        },
        "score": 75,
        "ranking": 27,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 77,
        "metrics": {
            "pe": 6.8,
            "roe": 16.5,
            "roic": 12.2,
            "dividendYield": 5.8,
            "netDebtToEbitda": -0.5,
            "ebitdaMargin": 0,
            "revenueGrowth": 0,
            "earningsGrowth": 12,
            "pb": 1.1,
            "evEbitda": 0,
            "beta": 0.95,
            "freeFloat": 55,
            "liquidityDaily": 185000000,
            "fcfYield": 0,
            "assetTurnover": 0
        },
        "performance": {
            "ytd": 12,
            "oneYear": 18,
            "threeYears": 25,
            "fiveYears": 42
        },
        "catalysts": [
            "Desconto de holding",
            "Exposição ao Itaú",
            "DY atrativo"
        ],
        "risks": [
            "Desconto persistente",
            "Concentração em financeiro",
            "Liquidez"
        ],
        "keyHighlights": [
            "DY 5.8%",
            "Proxy para ITUB4 com desconto",
            "Diversificação"
        ],
        "analystConsensus": {
            "buy": 9,
            "hold": 5,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 0,
            "netIncome": 3200000000,
            "ebitda": 0
        },
        "nextEarnings": "2025-11-07",
        "irWebsite": "https://www.itausa.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 11.5,
                "median": 11.27,
                "high": 13.225,
                "low": 9.775,
                "count": 13,
                "stdDev": 4.75
            },
            "revisions": {
                "delta30d": -0.47,
                "delta90d": -2.58,
                "upgrades": 3,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 24.32,
                "toMedian": 23.59,
                "dispersion": 4.75
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 9.25,
                "ma20": 8.7,
                "ma50": 8.51,
                "ma200": 8.14,
                "week52High": 10.91,
                "week52Low": 8.14
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": 1.2,
                    "signal": 0.96,
                    "histogram": 0.24,
                    "trend": "BULLISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 185000000,
                "ratio": 1.22,
                "accumDist": "ACCUMULATION",
                "obv": 20576
            },
            "signals": {
                "overallScore": 75,
                "recommendation": "BUY",
                "support": 8.51,
                "resistance": 9.99
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 75734,
                    "currentPremium": 3.6
                },
                "ownership": 38.51
            },
            "institutional": {
                "ownership": 34.85,
                "change3m": 2.26,
                "change12m": 6.58,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 6.77
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 3.66
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 9.44,
                "probability": 0.58,
                "expectedReturn": 2.03
            },
            "lstm": {
                "prediction30d": 9.46,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "INNOVATION",
            "sensitivities": {
                "selic": 0.1,
                "usd": -0.2,
                "commodities": 0.1
            },
            "score": 75
        }
    },
    {
        "ticker": "PRIO3",
        "name": "PetroRio",
        "sector": "Petróleo e Gás",
        "subsector": "Exploração e Produção",
        "pod": "Pod Global",
        "marketCap": 38000000000,
        "currentPrice": 42.15,
        "targetPrice": 56,
        "upside": 32.86,
        "projections": {
            "target1Y": 56,
            "target3Y": 72,
            "target5Y": 88,
            "target10Y": 115
        },
        "score": 85,
        "ranking": 28,
        "recommendation": "STRONG BUY",
        "source": "V2",
        "confidence": 83,
        "metrics": {
            "pe": 5.2,
            "roe": 45.5,
            "roic": 32.5,
            "dividendYield": 12.5,
            "netDebtToEbitda": -0.8,
            "ebitdaMargin": 75.5,
            "revenueGrowth": 35.5,
            "earningsGrowth": 48,
            "pb": 2.4,
            "evEbitda": 3.2,
            "beta": 1.45,
            "freeFloat": 82,
            "liquidityDaily": 145000000,
            "fcfYield": 22.5,
            "assetTurnover": 0.95
        },
        "performance": {
            "ytd": 55,
            "oneYear": 85,
            "threeYears": 285,
            "fiveYears": 450
        },
        "catalysts": [
            "DY 12.5% - excepcional",
            "Aquisições de ativos maduros",
            "Eficiência operacional líder",
            "Caixa líquido"
        ],
        "risks": [
            "Volatilidade do petróleo",
            "Risco operacional offshore",
            "Dependência de poucos ativos"
        ],
        "keyHighlights": [
            "ROE 45.5% - extraordinário",
            "Melhor operadora independente do Brasil",
            "Geração de caixa massiva"
        ],
        "analystConsensus": {
            "buy": 14,
            "hold": 1,
            "sell": 0
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 3200000000,
            "netIncome": 1850000000,
            "ebitda": 2416000000
        },
        "nextEarnings": "2025-11-11",
        "irWebsite": "https://ri.petrorio.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 56,
                "median": 54.879999999999995,
                "high": 64.39999999999999,
                "low": 47.6,
                "count": 8,
                "stdDev": 7.25
            },
            "revisions": {
                "delta30d": 1.06,
                "delta90d": -1.88,
                "upgrades": 2,
                "downgrades": 0
            },
            "impliedUpside": {
                "toMean": 32.86,
                "toMedian": 31.87,
                "dispersion": 7.25
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 42.15,
                "ma20": 30.56,
                "ma50": 26.69,
                "ma200": 18.97,
                "week52High": 77.98,
                "week52Low": 18.27
            },
            "momentum": {
                "rsi14": 65,
                "macd": {
                    "value": 5.5,
                    "signal": 4.4,
                    "histogram": 1.1,
                    "trend": "BULLISH"
                },
                "stochastic": 70
            },
            "volume": {
                "avgVolume20d": 145000000,
                "ratio": 1.2,
                "accumDist": "ACCUMULATION",
                "obv": 23333
            },
            "signals": {
                "overallScore": 85,
                "recommendation": "STRONG BUY",
                "support": 38.78,
                "resistance": 45.52
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": 0,
                    "totalValue": 340940,
                    "currentPremium": 2.76
                },
                "ownership": 36.34
            },
            "institutional": {
                "ownership": 23.06,
                "change3m": 3.1,
                "change12m": 1.55,
                "flowTrend": "POSITIVE",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 9.92
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 1.82
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 43.3,
                "probability": 0.72,
                "expectedReturn": 2.74
            },
            "lstm": {
                "prediction30d": 43.42,
                "probability": 0.68
            },
            "ensemble": {
                "consensus": "STRONG_BUY",
                "agreement": 0.85
            },
            "backtest": {
                "accuracy90d": 75,
                "sharpeRatio": 1.8,
                "maxDrawdown": -12
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    },
    {
        "ticker": "MRFG3",
        "name": "Marfrig",
        "sector": "Alimentos",
        "subsector": "Proteínas",
        "pod": "Pod Global",
        "marketCap": 12000000000,
        "currentPrice": 6.18,
        "targetPrice": 9.5,
        "upside": 53.72,
        "projections": {
            "target1Y": 9.5,
            "target3Y": 13,
            "target5Y": 16,
            "target10Y": 22
        },
        "score": 73,
        "ranking": 29,
        "recommendation": "BUY",
        "source": "V2",
        "confidence": 71,
        "metrics": {
            "pe": 12.5,
            "roe": 15.2,
            "roic": 9.5,
            "dividendYield": 2.8,
            "netDebtToEbitda": 3.2,
            "ebitdaMargin": 8.5,
            "revenueGrowth": 11.5,
            "earningsGrowth": 18,
            "pb": 1.9,
            "evEbitda": 7.8,
            "beta": 1.38,
            "freeFloat": 68,
            "liquidityDaily": 42000000,
            "fcfYield": 6.5,
            "assetTurnover": 1.65
        },
        "performance": {
            "ytd": -12,
            "oneYear": -5,
            "threeYears": 8,
            "fiveYears": 28
        },
        "catalysts": [
            "Exposição aos EUA (National Beef)",
            "Consolidação do setor",
            "Aumento de margens"
        ],
        "risks": [
            "Alta alavancagem",
            "Volatilidade de commodities",
            "Competição"
        ],
        "keyHighlights": [
            "Upside 53.7%",
            "Operações nos EUA e América do Sul"
        ],
        "analystConsensus": {
            "buy": 8,
            "hold": 4,
            "sell": 1
        },
        "lastResults": {
            "quarter": "2Q25",
            "revenue": 25000000000,
            "netIncome": 280000000,
            "ebitda": 2125000000
        },
        "nextEarnings": "2025-11-13",
        "irWebsite": "https://ri.marfrig.com.br/",
        "lastUpdated": "2025-11-15T10:30:00Z",
        "dataSource": "hybrid",
        "analystTargets": {
            "consensus": {
                "mean": 9.5,
                "median": 9.31,
                "high": 10.924999999999999,
                "low": 8.075,
                "count": 6,
                "stdDev": 6.9
            },
            "revisions": {
                "delta30d": 1.58,
                "delta90d": -1.39,
                "upgrades": 2,
                "downgrades": 1
            },
            "impliedUpside": {
                "toMean": 53.72,
                "toMedian": 52.11,
                "dispersion": 6.9
            }
        },
        "technicalAnalysis": {
            "price": {
                "current": 6.18,
                "ma20": 6.55,
                "ma50": 6.67,
                "ma200": 6.92,
                "week52High": 6.49,
                "week52Low": 5.97
            },
            "momentum": {
                "rsi14": 50,
                "macd": {
                    "value": -1.2,
                    "signal": -0.96,
                    "histogram": -0.24,
                    "trend": "BEARISH"
                },
                "stochastic": 50
            },
            "volume": {
                "avgVolume20d": 42000000,
                "ratio": 1.04,
                "accumDist": "DISTRIBUTION",
                "obv": 800426
            },
            "signals": {
                "overallScore": 73,
                "recommendation": "BUY",
                "support": 5.69,
                "resistance": 6.67
            }
        },
        "smartMoney": {
            "insiders": {
                "last90days": {
                    "netBuys": -1,
                    "totalValue": 1992535,
                    "currentPremium": 1.09
                },
                "ownership": 25.87
            },
            "institutional": {
                "ownership": 44.72,
                "change3m": -2.76,
                "change12m": -1.24,
                "flowTrend": "NEUTRAL",
                "topHolders": [
                    {
                        "name": "BlackRock",
                        "ownership": 7.88
                    },
                    {
                        "name": "Vanguard",
                        "ownership": 4.83
                    }
                ]
            }
        },
        "mlPredictions": {
            "randomForest": {
                "prediction30d": 6.46,
                "probability": 0.58,
                "expectedReturn": 4.48
            },
            "lstm": {
                "prediction30d": 6.48,
                "probability": 0.55
            },
            "ensemble": {
                "consensus": "BUY",
                "agreement": 0.65
            },
            "backtest": {
                "accuracy90d": 62,
                "sharpeRatio": 1.2,
                "maxDrawdown": -18
            }
        },
        "macroAnalysis": {
            "regime": "COMMODITY_CYCLE",
            "sensitivities": {
                "selic": 0.2,
                "usd": 0.7,
                "commodities": 0.85
            },
            "score": 75
        }
    }
];

// HELPERS
function getCompanyByTicker(ticker) {
    return COMPANIES_DATABASE.find(c => c.ticker === ticker);
}

function getCompaniesByPod(pod) {
    return COMPANIES_DATABASE.filter(c => c.pod === pod);
}

function hasEnhancedData(company) {
    return company && (company.analystTargets || company.technicalAnalysis || company.smartMoney || company.mlPredictions);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COMPANIES_DATABASE, getCompanyByTicker, getCompaniesByPod, hasEnhancedData };
}

console.log('✓ data-companies-enhanced.js carregado');
console.log(`✓ ${COMPANIES_DATABASE.length} empresas disponíveis`);
