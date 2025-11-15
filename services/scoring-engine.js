// ============================
// SCORING-ENGINE.JS - Sistema de Pontuação Multidimensional
// Integrado com confidence.js para scoring unificado
// ============================

/**
 * ENGINE DE SCORING
 *
 * Sistema de pontuação multidimensional que integra com o
 * sistema de Conviction Score do confidence.js
 *
 * Dimensões avaliadas:
 * 1. Fundamental (35%) - Valor, Qualidade, Crescimento
 * 2. Técnico (20%) - Tendência, Momentum, Volume
 * 3. Consenso (15%) - Price Targets, Revisões
 * 4. Smart Money (15%) - Insiders, Institucionais
 * 5. Macro (10%) - Regime, Sensibilidades
 * 6. ML (5%) - Previsões de modelos
 */

class ScoringEngine {
    constructor() {
        // Pesos baseados em pesquisas empíricas
        this.weights = {
            fundamental: {
                weight: 0.35,
                components: {
                    value: 0.40,      // P/L, P/VP, EV/EBITDA
                    quality: 0.40,    // ROE, ROIC, Margem
                    growth: 0.20      // Crescimento receita/lucro
                }
            },
            technical: {
                weight: 0.20,
                components: {
                    trend: 0.40,      // MAs, Tendência
                    momentum: 0.35,   // RSI, MACD
                    volume: 0.25      // OBV, Volume ratio
                }
            },
            consensus: {
                weight: 0.15,
                components: {
                    targetUpside: 0.60,  // Upside para consenso
                    revisions: 0.40      // Revisões recentes
                }
            },
            smartMoney: {
                weight: 0.15,
                components: {
                    insiders: 0.50,      // Compras de insiders
                    institutional: 0.50  // Fluxo institucional
                }
            },
            macro: {
                weight: 0.10,
                components: {
                    regime: 0.60,        // Adequação ao regime
                    sensitivities: 0.40  // Sensibilidades macro
                }
            },
            ml: {
                weight: 0.05,
                components: {
                    predictions: 0.70,   // Predições de modelos
                    backtest: 0.30       // Acurácia histórica
                }
            }
        };

        this.isInitialized = false;
    }

    /**
     * INICIALIZAÇÃO
     */
    initialize() {
        console.log('🚀 Inicializando ScoringEngine...');

        // Verificar se confidence.js está disponível
        if (typeof calculateProjectionConfidence !== 'undefined') {
            console.log('✓ Integração com confidence.js detectada');
        } else {
            console.warn('⚠ confidence.js não encontrado - usando scoring simplificado');
        }

        this.isInitialized = true;
        console.log('✅ ScoringEngine inicializado');
    }

    /**
     * CALCULAR SCORE COMPLETO
     * Integra com o Conviction Score do confidence.js
     */
    calculateScore(company) {
        if (!company) {
            return this.getEmptyScore();
        }

        // Se temos confidence.js, usar como base principal
        let convictionScore = 50; // Default
        if (typeof calculateProjectionConfidence !== 'undefined') {
            convictionScore = calculateProjectionConfidence(company);
        }

        // Calcular scores de cada dimensão
        const scores = {
            fundamental: this.scoreFundamental(company),
            technical: this.scoreTechnical(company),
            consensus: this.scoreConsensus(company),
            smartMoney: this.scoreSmartMoney(company),
            macro: this.scoreMacro(company),
            ml: this.scoreML(company)
        };

        // Score ponderado total
        const totalScore = this.calculateWeightedScore(scores);

        // Score final: média entre conviction score e score multidimensional
        const finalScore = Math.round((convictionScore * 0.6) + (totalScore * 0.4));

        return {
            total: finalScore,
            convictionScore: convictionScore,
            breakdown: scores,
            confidence: this.calculateConfidence(scores),
            recommendation: this.getRecommendation(finalScore),
            signals: this.generateSignals(company, scores)
        };
    }

    /**
     * CALCULAR SCORE PONDERADO
     */
    calculateWeightedScore(scores) {
        let total = 0;

        Object.keys(this.weights).forEach(dimension => {
            const weight = this.weights[dimension].weight;
            const score = scores[dimension] || 0;
            total += score * weight;
        });

        return Math.round(total);
    }

    // ==================== SCORES POR DIMENSÃO ====================

    /**
     * 1. SCORE FUNDAMENTAL (35%)
     */
    scoreFundamental(company) {
        if (!company.metrics) return 50;

        const m = company.metrics;
        let score = 0;
        let maxScore = 0;

        // VALOR (40%)
        maxScore += 40;

        // P/L
        if (m.pe && m.pe > 0) {
            if (m.pe < 8) score += 15;
            else if (m.pe < 12) score += 12;
            else if (m.pe < 15) score += 9;
            else if (m.pe < 20) score += 6;
            else if (m.pe < 25) score += 3;
        }

        // Dívida Líquida/EBITDA
        if (m.netDebtToEbitda !== null && m.netDebtToEbitda !== undefined) {
            if (m.netDebtToEbitda < 0) score += 15;      // Caixa líquido
            else if (m.netDebtToEbitda < 1) score += 12;
            else if (m.netDebtToEbitda < 2) score += 9;
            else if (m.netDebtToEbitda < 3) score += 5;
        }

        // DY
        if (m.dividendYield) {
            if (m.dividendYield >= 6) score += 10;
            else if (m.dividendYield >= 4) score += 7;
            else if (m.dividendYield >= 2) score += 4;
        }

        // QUALIDADE (40%)
        maxScore += 40;

        // ROE
        if (m.roe) {
            if (m.roe >= 25) score += 15;
            else if (m.roe >= 20) score += 12;
            else if (m.roe >= 15) score += 9;
            else if (m.roe >= 10) score += 6;
            else if (m.roe >= 5) score += 3;
        }

        // ROIC
        if (m.roic) {
            if (m.roic >= 20) score += 10;
            else if (m.roic >= 15) score += 8;
            else if (m.roic >= 10) score += 6;
            else if (m.roic >= 8) score += 4;
        }

        // Margem EBITDA
        if (m.ebitdaMargin) {
            if (m.ebitdaMargin >= 25) score += 15;
            else if (m.ebitdaMargin >= 20) score += 12;
            else if (m.ebitdaMargin >= 15) score += 9;
            else if (m.ebitdaMargin >= 10) score += 6;
            else if (m.ebitdaMargin >= 5) score += 3;
        }

        // CRESCIMENTO (20%)
        maxScore += 20;

        if (m.revenueGrowth) {
            if (m.revenueGrowth >= 25) score += 20;
            else if (m.revenueGrowth >= 20) score += 16;
            else if (m.revenueGrowth >= 15) score += 12;
            else if (m.revenueGrowth >= 10) score += 8;
            else if (m.revenueGrowth >= 5) score += 4;
        }

        return (score / maxScore) * 100;
    }

    /**
     * 2. SCORE TÉCNICO (20%)
     */
    scoreTechnical(company) {
        // Se não há dados técnicos avançados, retornar score neutro
        if (!company.enhanced || !company.enhanced.technicalAnalysis) {
            return 50;
        }

        const tech = company.enhanced.technicalAnalysis;
        let score = 0;

        // TENDÊNCIA (40 pontos)
        if (tech.price) {
            const current = tech.price.current;
            const ma50 = tech.price.ma50;
            const ma200 = tech.price.ma200;

            if (current && ma50 && ma200) {
                if (current > ma50 && ma50 > ma200) score += 40;      // Tendência forte
                else if (current > ma50) score += 30;                  // Tendência positiva
                else if (current > ma200) score += 20;                 // Acima de MA200
                else score += 10;
            }
        }

        // MOMENTUM (35 pontos)
        if (tech.momentum) {
            const rsi = tech.momentum.rsi14;
            const macd = tech.momentum.macd;

            // RSI
            if (rsi) {
                if (rsi >= 40 && rsi <= 70) score += 20;      // Zona ideal
                else if (rsi >= 30 && rsi <= 80) score += 15; // Zona boa
                else if (rsi < 30) score += 25;                // Oversold (oportunidade)
                else score += 5;                               // Overbought
            }

            // MACD
            if (macd && macd.trend === 'BULLISH') {
                score += 15;
            } else if (macd && macd.trend === 'NEUTRAL') {
                score += 7;
            }
        }

        // VOLUME (25 pontos)
        if (tech.volume) {
            if (tech.volume.accumDist === 'ACCUMULATION') {
                score += 25;
            } else if (tech.volume.accumDist === 'NEUTRAL') {
                score += 12;
            }
        }

        return Math.min(score, 100);
    }

    /**
     * 3. SCORE DE CONSENSO (15%)
     */
    scoreConsensus(company) {
        // Usar dados de projeções como proxy
        if (!company.projections || !company.currentPrice) {
            return 50;
        }

        let score = 0;

        // Upside para target 1Y (60 pontos)
        const target1Y = company.projections.target1Y;
        if (target1Y && company.currentPrice) {
            const upside = ((target1Y - company.currentPrice) / company.currentPrice) * 100;

            if (upside >= 40) score += 60;
            else if (upside >= 30) score += 50;
            else if (upside >= 20) score += 40;
            else if (upside >= 10) score += 30;
            else if (upside >= 0) score += 20;
            else score += 10;
        }

        // Revisões (40 pontos) - Usar analystConsensus se disponível
        if (company.analystConsensus) {
            const total = company.analystConsensus.buy +
                         company.analystConsensus.hold +
                         company.analystConsensus.sell;

            if (total > 0) {
                const buyRatio = company.analystConsensus.buy / total;

                if (buyRatio >= 0.7) score += 40;
                else if (buyRatio >= 0.5) score += 30;
                else if (buyRatio >= 0.3) score += 20;
                else score += 10;
            }
        } else {
            score += 20; // Score neutro
        }

        return Math.min(score, 100);
    }

    /**
     * 4. SCORE SMART MONEY (15%)
     */
    scoreSmartMoney(company) {
        // Se não há dados de Smart Money, retornar neutro
        if (!company.enhanced || !company.enhanced.smartMoney) {
            return 50;
        }

        const sm = company.enhanced.smartMoney;
        let score = 0;

        // Insiders (50 pontos)
        if (sm.insiders && sm.insiders.last90days) {
            if (sm.insiders.last90days.netBuys > 0) {
                score += 50; // Insiders comprando
            } else if (sm.insiders.last90days.netBuys === 0) {
                score += 25; // Neutro
            }
        } else {
            score += 25;
        }

        // Institucionais (50 pontos)
        if (sm.institutional) {
            if (sm.institutional.flowTrend === 'POSITIVE') {
                score += 50;
            } else if (sm.institutional.flowTrend === 'NEUTRAL') {
                score += 25;
            } else {
                score += 10;
            }
        } else {
            score += 25;
        }

        return Math.min(score, 100);
    }

    /**
     * 5. SCORE MACRO (10%)
     */
    scoreMacro(company) {
        // Avaliar adequação ao Pod
        let score = 50; // Base

        if (!company.pod) return score;

        // Pods favoráveis
        if (company.pod === 'Pod Selic' || company.pod === 'Pod Global' || company.pod === 'Pod Secular') {
            score = 75;
        }

        // Pod Sell
        if (company.pod === 'Pod Sell') {
            score = 10;
        }

        return score;
    }

    /**
     * 6. SCORE ML (5%)
     */
    scoreML(company) {
        // Se não há predições ML, retornar neutro
        if (!company.enhanced || !company.enhanced.mlPredictions) {
            return 50;
        }

        const ml = company.enhanced.mlPredictions;
        let score = 0;

        // Ensemble consensus (70 pontos)
        if (ml.ensemble && ml.ensemble.consensus) {
            const consensus = ml.ensemble.consensus;

            if (consensus === 'STRONG_BUY') score += 70;
            else if (consensus === 'BUY') score += 55;
            else if (consensus === 'HOLD') score += 35;
            else if (consensus === 'SELL') score += 15;
            else score += 5;
        } else {
            score += 35;
        }

        // Backtest accuracy (30 pontos)
        if (ml.backtest && ml.backtest.accuracy90d) {
            const accuracy = ml.backtest.accuracy90d;

            if (accuracy >= 75) score += 30;
            else if (accuracy >= 65) score += 20;
            else if (accuracy >= 55) score += 10;
        } else {
            score += 15;
        }

        return Math.min(score, 100);
    }

    // ==================== HELPERS ====================

    /**
     * CALCULAR CONFIANÇA NO SCORE
     */
    calculateConfidence(scores) {
        // Calcular desvio padrão entre os scores
        const values = Object.values(scores);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);

        // Converter para confiança (0-100)
        // Menor desvio = maior confiança
        const confidence = Math.max(0, Math.min(100, 100 - stdDev));

        return Math.round(confidence);
    }

    /**
     * OBTER RECOMENDAÇÃO
     */
    getRecommendation(score) {
        if (score >= 85) return "STRONG BUY";
        if (score >= 70) return "BUY";
        if (score >= 50) return "HOLD";
        if (score >= 30) return "SELL";
        return "STRONG SELL";
    }

    /**
     * GERAR SINAIS
     */
    generateSignals(company, scores) {
        const signals = [];

        // Sinal de valor
        if (scores.fundamental >= 80) {
            signals.push({ type: 'FUNDAMENTAL', strength: 'STRONG', message: 'Fundamentos excepcionais' });
        }

        // Sinal técnico
        if (scores.technical >= 75) {
            signals.push({ type: 'TECHNICAL', strength: 'STRONG', message: 'Tendência técnica positiva' });
        }

        // Sinal de consenso
        if (scores.consensus >= 70) {
            signals.push({ type: 'CONSENSUS', strength: 'MEDIUM', message: 'Consenso favorável' });
        }

        // Sinal de risco
        if (company.metrics && company.metrics.netDebtToEbitda > 4) {
            signals.push({ type: 'RISK', strength: 'WARNING', message: 'Alta alavancagem' });
        }

        return signals;
    }

    /**
     * SCORE VAZIO (FALLBACK)
     */
    getEmptyScore() {
        return {
            total: 0,
            convictionScore: 0,
            breakdown: {},
            confidence: 0,
            recommendation: "N/A",
            signals: []
        };
    }

    /**
     * COMPARAR EMPRESAS
     */
    compareCompanies(companies) {
        return companies.map(company => ({
            ticker: company.ticker,
            name: company.name,
            score: this.calculateScore(company)
        })).sort((a, b) => b.score.total - a.score.total);
    }
}

/**
 * EXPORT
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScoringEngine;
}

console.log('✓ scoring-engine.js carregado');
