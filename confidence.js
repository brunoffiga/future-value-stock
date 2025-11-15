// ============================
// CONFIDENCE.JS - Sistema de Scoring e Confiabilidade
// Algoritmo Bayesiano de Conviction Score
// ============================

/**
 * SISTEMA DE CONVICTION SCORE
 *
 * Calcula a confiabilidade de uma projeção de preço com base em:
 * 1. Qualidade dos Dados (30%)
 * 2. Consistência das Projeções (25%)
 * 3. Saúde Fundamental (25%)
 * 4. Acurácia Histórica (20%)
 *
 * Retorna um score de 0-100
 */

function calculateProjectionConfidence(company) {
    const weights = {
        dataQuality: 0.30,
        projectionConsistency: 0.25,
        fundamentalHealth: 0.25,
        historicalAccuracy: 0.20
    };

    const scores = {
        dataQuality: scoreDataQuality(company),
        projectionConsistency: scoreProjectionConsistency(company),
        fundamentalHealth: scoreFundamentalHealth(company),
        historicalAccuracy: scoreHistoricalAccuracy(company)
    };

    const totalScore = Object.keys(weights).reduce((sum, key) => {
        return sum + (scores[key] * weights[key]);
    }, 0);

    return Math.round(totalScore);
}

/**
 * 1. QUALIDADE DOS DADOS (30%)
 * Avalia completude e confiabilidade dos dados
 */
function scoreDataQuality(company) {
    let score = 0;
    let maxScore = 0;

    // Presença de price targets (25 pontos)
    maxScore += 25;
    if (company.targetPrice && company.currentPrice) {
        score += 25;
    }

    // Presença de projeções temporais (25 pontos)
    maxScore += 25;
    if (company.projections) {
        const targets = [
            company.projections.target1Y,
            company.projections.target3Y,
            company.projections.target5Y,
            company.projections.target10Y
        ];
        const validTargets = targets.filter(t => t > 0).length;
        score += (validTargets / 4) * 25;
    }

    // Presença de métricas fundamentais (20 pontos)
    maxScore += 20;
    if (company.metrics) {
        const requiredMetrics = ['pe', 'roe', 'roic', 'netDebtToEbitda', 'ebitdaMargin'];
        const presentMetrics = requiredMetrics.filter(m =>
            company.metrics[m] !== null && company.metrics[m] !== undefined
        ).length;
        score += (presentMetrics / requiredMetrics.length) * 20;
    }

    // Consenso de analistas (15 pontos)
    maxScore += 15;
    if (company.analystConsensus) {
        const total = company.analystConsensus.buy +
                     company.analystConsensus.hold +
                     company.analystConsensus.sell;
        if (total >= 5) {
            score += 15;
        } else if (total >= 3) {
            score += 10;
        } else if (total >= 1) {
            score += 5;
        }
    }

    // Resultados recentes (15 pontos)
    maxScore += 15;
    if (company.lastResults && company.lastResults.revenue > 0) {
        score += 15;
    }

    return (score / maxScore) * 100;
}

/**
 * 2. CONSISTÊNCIA DAS PROJEÇÕES (25%)
 * Avalia lógica e coerência das projeções temporais
 */
function scoreProjectionConsistency(company) {
    let score = 0;
    let maxScore = 0;

    if (!company.projections || !company.currentPrice) {
        return 0;
    }

    const current = company.currentPrice;
    const t1Y = company.projections.target1Y;
    const t3Y = company.projections.target3Y;
    const t5Y = company.projections.target5Y;
    const t10Y = company.projections.target10Y;

    // Progressão lógica (40 pontos)
    maxScore += 40;
    const progression = [];
    if (t1Y && t1Y >= current) progression.push(true);
    if (t3Y && t1Y && t3Y >= t1Y) progression.push(true);
    if (t5Y && t3Y && t5Y >= t3Y) progression.push(true);
    if (t10Y && t5Y && t10Y >= t5Y) progression.push(true);

    score += (progression.length / 4) * 40;

    // CAGR razoável (30 pontos) - Entre 5% e 50% a.a.
    maxScore += 30;
    if (t10Y) {
        const cagr10Y = (Math.pow(t10Y / current, 1/10) - 1) * 100;
        if (cagr10Y >= 5 && cagr10Y <= 50) {
            score += 30;
        } else if (cagr10Y >= 3 && cagr10Y <= 60) {
            score += 20;
        } else if (cagr10Y > 0) {
            score += 10;
        }
    }

    // Alinhamento com target de 1Y (30 pontos)
    maxScore += 30;
    if (t1Y && company.targetPrice) {
        const diff = Math.abs(t1Y - company.targetPrice) / company.targetPrice;
        if (diff < 0.05) score += 30;      // <5% diferença
        else if (diff < 0.10) score += 20;  // <10% diferença
        else if (diff < 0.20) score += 10;  // <20% diferença
    }

    return (score / maxScore) * 100;
}

/**
 * 3. SAÚDE FUNDAMENTAL (25%)
 * Avalia qualidade financeira da empresa
 */
function scoreFundamentalHealth(company) {
    let score = 0;
    let maxScore = 0;

    if (!company.metrics) return 0;

    const m = company.metrics;

    // ROE (20 pontos)
    maxScore += 20;
    if (m.roe !== null && m.roe !== undefined) {
        if (m.roe >= 20) score += 20;
        else if (m.roe >= 15) score += 15;
        else if (m.roe >= 10) score += 10;
        else if (m.roe >= 5) score += 5;
    }

    // Dívida Líquida/EBITDA (20 pontos)
    maxScore += 20;
    if (m.netDebtToEbitda !== null && m.netDebtToEbitda !== undefined) {
        if (m.netDebtToEbitda < 0) score += 20;          // Caixa líquido
        else if (m.netDebtToEbitda < 1) score += 18;
        else if (m.netDebtToEbitda < 2) score += 15;
        else if (m.netDebtToEbitda < 3) score += 10;
        else if (m.netDebtToEbitda < 4) score += 5;
    }

    // Margem EBITDA (15 pontos)
    maxScore += 15;
    if (m.ebitdaMargin !== null && m.ebitdaMargin !== undefined) {
        if (m.ebitdaMargin >= 25) score += 15;
        else if (m.ebitdaMargin >= 15) score += 12;
        else if (m.ebitdaMargin >= 10) score += 8;
        else if (m.ebitdaMargin >= 5) score += 4;
    }

    // Crescimento de Receita (15 pontos)
    maxScore += 15;
    if (m.revenueGrowth !== null && m.revenueGrowth !== undefined) {
        if (m.revenueGrowth >= 20) score += 15;
        else if (m.revenueGrowth >= 15) score += 12;
        else if (m.revenueGrowth >= 10) score += 9;
        else if (m.revenueGrowth >= 5) score += 6;
        else if (m.revenueGrowth > 0) score += 3;
    }

    // P/L razoável (15 pontos)
    maxScore += 15;
    if (m.pe !== null && m.pe !== undefined && m.pe > 0) {
        if (m.pe < 10) score += 15;
        else if (m.pe < 15) score += 12;
        else if (m.pe < 20) score += 9;
        else if (m.pe < 25) score += 6;
        else if (m.pe < 30) score += 3;
    }

    // Free Float (15 pontos) - Liquidez
    maxScore += 15;
    if (m.freeFloat !== null && m.freeFloat !== undefined) {
        if (m.freeFloat >= 40) score += 15;
        else if (m.freeFloat >= 30) score += 12;
        else if (m.freeFloat >= 20) score += 8;
        else if (m.freeFloat >= 10) score += 4;
    }

    return (score / maxScore) * 100;
}

/**
 * 4. ACURÁCIA HISTÓRICA (20%)
 * Avalia performance passada e momentum
 */
function scoreHistoricalAccuracy(company) {
    let score = 0;
    let maxScore = 0;

    if (!company.performance) return 50; // Score neutro se não houver dados

    const p = company.performance;

    // Performance YTD (30 pontos)
    maxScore += 30;
    if (p.ytd !== null && p.ytd !== undefined) {
        if (p.ytd > 50) score += 30;
        else if (p.ytd > 30) score += 25;
        else if (p.ytd > 10) score += 20;
        else if (p.ytd > 0) score += 15;
        else if (p.ytd > -10) score += 10;
        else if (p.ytd > -20) score += 5;
    }

    // Performance 1 Ano (30 pontos)
    maxScore += 30;
    if (p.oneYear !== null && p.oneYear !== undefined) {
        if (p.oneYear > 100) score += 30;
        else if (p.oneYear > 50) score += 25;
        else if (p.oneYear > 25) score += 20;
        else if (p.oneYear > 10) score += 15;
        else if (p.oneYear > 0) score += 10;
        else if (p.oneYear > -20) score += 5;
    }

    // Performance 3 Anos (25 pontos)
    maxScore += 25;
    if (p.threeYears !== null && p.threeYears !== undefined) {
        if (p.threeYears > 200) score += 25;
        else if (p.threeYears > 100) score += 20;
        else if (p.threeYears > 50) score += 15;
        else if (p.threeYears > 0) score += 10;
        else if (p.threeYears > -30) score += 5;
    }

    // Consistência (15 pontos) - Não ter perdas drásticas
    maxScore += 15;
    const hasYTD = p.ytd !== null && p.ytd !== undefined;
    const has1Y = p.oneYear !== null && p.oneYear !== undefined;
    const has3Y = p.threeYears !== null && p.threeYears !== undefined;

    if (hasYTD && has1Y && has3Y) {
        // Se todas forem positivas
        if (p.ytd > 0 && p.oneYear > 0 && p.threeYears > 0) {
            score += 15;
        }
        // Se pelo menos 2 forem positivas
        else if ((p.ytd > 0 ? 1 : 0) + (p.oneYear > 0 ? 1 : 0) + (p.threeYears > 0 ? 1 : 0) >= 2) {
            score += 10;
        }
        // Se pelo menos 1 for positiva
        else if (p.ytd > 0 || p.oneYear > 0 || p.threeYears > 0) {
            score += 5;
        }
    }

    return (score / maxScore) * 100;
}

/**
 * RATING TEXTUAL
 * Converte score numérico em rating de 1 a 5 estrelas
 */
function getConvictionRating(score) {
    if (score >= 85) return 5;
    if (score >= 70) return 4;
    if (score >= 55) return 3;
    if (score >= 40) return 2;
    return 1;
}

function getConvictionLabel(score) {
    if (score >= 85) return 'Muito Alta';
    if (score >= 70) return 'Alta';
    if (score >= 55) return 'Moderada';
    if (score >= 40) return 'Baixa';
    return 'Muito Baixa';
}

/**
 * DETALHAMENTO DO SCORE
 * Retorna breakdown completo para exibição
 */
function getConvictionBreakdown(company) {
    const dataQuality = scoreDataQuality(company);
    const projectionConsistency = scoreProjectionConsistency(company);
    const fundamentalHealth = scoreFundamentalHealth(company);
    const historicalAccuracy = scoreHistoricalAccuracy(company);

    const total = Math.round(
        dataQuality * 0.30 +
        projectionConsistency * 0.25 +
        fundamentalHealth * 0.25 +
        historicalAccuracy * 0.20
    );

    return {
        total: total,
        rating: getConvictionRating(total),
        label: getConvictionLabel(total),
        breakdown: {
            dataQuality: {
                score: Math.round(dataQuality),
                weight: 30,
                contribution: Math.round(dataQuality * 0.30)
            },
            projectionConsistency: {
                score: Math.round(projectionConsistency),
                weight: 25,
                contribution: Math.round(projectionConsistency * 0.25)
            },
            fundamentalHealth: {
                score: Math.round(fundamentalHealth),
                weight: 25,
                contribution: Math.round(fundamentalHealth * 0.25)
            },
            historicalAccuracy: {
                score: Math.round(historicalAccuracy),
                weight: 20,
                contribution: Math.round(historicalAccuracy * 0.20)
            }
        }
    };
}

/**
 * SISTEMA DE ALERTAS
 * Identifica pontos de atenção na análise
 */
function getConfidenceWarnings(company) {
    const warnings = [];

    // Avisos de Qualidade de Dados
    if (!company.projections || !company.projections.target1Y) {
        warnings.push({
            type: 'data',
            severity: 'high',
            message: 'Faltam projeções de preço-alvo'
        });
    }

    if (!company.analystConsensus ||
        (company.analystConsensus.buy + company.analystConsensus.hold + company.analystConsensus.sell) < 3) {
        warnings.push({
            type: 'data',
            severity: 'medium',
            message: 'Poucas análises de mercado disponíveis'
        });
    }

    // Avisos de Fundamentos
    if (company.metrics) {
        if (company.metrics.netDebtToEbitda > 4) {
            warnings.push({
                type: 'fundamental',
                severity: 'high',
                message: 'Alavancagem muito alta (>4x)'
            });
        }

        if (company.metrics.roe < 5) {
            warnings.push({
                type: 'fundamental',
                severity: 'medium',
                message: 'ROE abaixo de 5% indica baixa rentabilidade'
            });
        }

        if (company.metrics.pe > 40 && company.metrics.pe !== null) {
            warnings.push({
                type: 'valuation',
                severity: 'medium',
                message: 'P/L muito elevado (>40x) sugere valuation esticado'
            });
        }
    }

    // Avisos de Performance
    if (company.performance) {
        if (company.performance.ytd < -30) {
            warnings.push({
                type: 'performance',
                severity: 'medium',
                message: 'Performance YTD negativa em >30%'
            });
        }

        if (company.performance.oneYear < -40) {
            warnings.push({
                type: 'performance',
                severity: 'high',
                message: 'Queda superior a 40% no último ano'
            });
        }
    }

    // Avisos de Pod
    if (company.pod === 'Pod Sell') {
        warnings.push({
            type: 'thesis',
            severity: 'critical',
            message: 'Empresa classificada como "Evitar" - tese quebrada'
        });
    }

    return warnings;
}

/**
 * EXPORT
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateProjectionConfidence,
        scoreDataQuality,
        scoreProjectionConsistency,
        scoreFundamentalHealth,
        scoreHistoricalAccuracy,
        getConvictionRating,
        getConvictionLabel,
        getConvictionBreakdown,
        getConfidenceWarnings
    };
}
