// ============================
// EVENT-ENGINE.JS - Sistema de Triggers e Alertas
// Engine avançado para detecção de eventos e gatilhos de investimento
// ============================

/**
 * ENGINE AVANÇADO DE EVENTOS
 *
 * Responsável por:
 * - Registrar e gerenciar triggers (gatilhos)
 * - Avaliar condições em tempo real
 * - Gerar alertas automáticos
 * - Priorizar oportunidades
 * - Notificar sobre mudanças importantes
 */

class AdvancedEventEngine {
    constructor() {
        this.triggers = new Map();
        this.alerts = [];
        this.history = [];
        this.isActive = true;
    }

    /**
     * INICIALIZAR ENGINE
     */
    initialize() {
        console.log('🚀 Inicializando AdvancedEventEngine...');

        // Registrar todos os triggers
        this.setupTriggers();

        console.log(`✅ Event Engine inicializado com ${this.triggers.size} triggers ativos`);
    }

    /**
     * CONFIGURAR TODOS OS TRIGGERS
     */
    setupTriggers() {
        // ==================== TRIGGERS DE VALOR ====================

        // TRIGGER 1: Consenso de Price Targets
        this.addTrigger({
            id: 'consensus_upside',
            name: 'Alto Upside de Consenso',
            category: 'VALUE',
            conditions: [
                { field: 'projections.target1Y', operator: '>', reference: 'currentPrice', multiplier: 1.30 }
            ],
            action: 'BUY',
            priority: 'HIGH',
            message: 'Upside de consenso superior a 30%'
        });

        // TRIGGER 2: Score Elevado
        this.addTrigger({
            id: 'high_score',
            name: 'Score de Qualidade Elevado',
            category: 'QUALITY',
            conditions: [
                { field: 'score', operator: '>=', value: 85 }
            ],
            action: 'BUY',
            priority: 'HIGH',
            message: 'Score de qualidade no topo (≥85)'
        });

        // TRIGGER 3: Múltiplo de Crescimento Atrativo
        this.addTrigger({
            id: 'growth_multiple',
            name: 'Múltiplo de Crescimento 10Y',
            category: 'GROWTH',
            conditions: [
                { field: 'projections.target10Y', operator: '>', reference: 'currentPrice', multiplier: 3.0 }
            ],
            action: 'BUY',
            priority: 'MEDIUM',
            message: 'Potencial de triplicar em 10 anos'
        });

        // ==================== TRIGGERS FUNDAMENTALISTAS ====================

        // TRIGGER 4: ROE Excepcional
        this.addTrigger({
            id: 'exceptional_roe',
            name: 'ROE Excepcional',
            category: 'QUALITY',
            conditions: [
                { field: 'metrics.roe', operator: '>=', value: 25 },
                { field: 'metrics.roic', operator: '>=', value: 15 }
            ],
            action: 'BUY',
            priority: 'HIGH',
            message: 'ROE ≥25% com ROIC ≥15%'
        });

        // TRIGGER 5: Baixa Alavancagem
        this.addTrigger({
            id: 'low_leverage',
            name: 'Balanço Saudável',
            category: 'QUALITY',
            conditions: [
                { field: 'metrics.netDebtToEbitda', operator: '<', value: 1 }
            ],
            action: 'BUY',
            priority: 'MEDIUM',
            message: 'Dívida Líquida/EBITDA < 1x'
        });

        // TRIGGER 6: Alto Crescimento de Receita
        this.addTrigger({
            id: 'revenue_growth',
            name: 'Alto Crescimento de Receita',
            category: 'GROWTH',
            conditions: [
                { field: 'metrics.revenueGrowth', operator: '>=', value: 20 }
            ],
            action: 'BUY',
            priority: 'MEDIUM',
            message: 'Crescimento de receita ≥20% a.a.'
        });

        // ==================== TRIGGERS DE PERFORMANCE ====================

        // TRIGGER 7: Momentum Positivo
        this.addTrigger({
            id: 'positive_momentum',
            name: 'Momentum Positivo',
            category: 'MOMENTUM',
            conditions: [
                { field: 'performance.ytd', operator: '>', value: 20 },
                { field: 'performance.oneYear', operator: '>', value: 30 }
            ],
            action: 'BUY',
            priority: 'MEDIUM',
            message: 'Performance YTD >20% e 1Y >30%'
        });

        // TRIGGER 8: Recuperação após Queda
        this.addTrigger({
            id: 'recovery_opportunity',
            name: 'Oportunidade de Recuperação',
            category: 'VALUE',
            conditions: [
                { field: 'performance.ytd', operator: '<', value: -20 },
                { field: 'score', operator: '>=', value: 70 },
                { field: 'metrics.roe', operator: '>=', value: 15 }
            ],
            action: 'BUY',
            priority: 'HIGH',
            message: 'Empresa de qualidade em correção (-20% YTD)'
        });

        // ==================== TRIGGERS DE RISCO ====================

        // TRIGGER 9: Alta Alavancagem (Alerta de Risco)
        this.addTrigger({
            id: 'high_leverage_risk',
            name: 'Alerta: Alta Alavancagem',
            category: 'RISK',
            conditions: [
                { field: 'metrics.netDebtToEbitda', operator: '>', value: 4 }
            ],
            action: 'SELL',
            priority: 'HIGH',
            message: '⚠ Alavancagem muito alta (>4x)'
        });

        // TRIGGER 10: Performance Negativa Consistente
        this.addTrigger({
            id: 'negative_performance',
            name: 'Alerta: Performance Negativa',
            category: 'RISK',
            conditions: [
                { field: 'performance.ytd', operator: '<', value: -30 },
                { field: 'performance.oneYear', operator: '<', value: -40 }
            ],
            action: 'SELL',
            priority: 'MEDIUM',
            message: '⚠ Performance negativa persistente'
        });

        // TRIGGER 11: Pod Sell (Tese Quebrada)
        this.addTrigger({
            id: 'broken_thesis',
            name: 'Alerta: Tese Quebrada',
            category: 'RISK',
            conditions: [
                { field: 'pod', operator: '===', value: 'Pod Sell' }
            ],
            action: 'SELL',
            priority: 'CRITICAL',
            message: '🚨 Empresa classificada como "Evitar"'
        });

        // ==================== TRIGGERS DE DIVIDENDOS ====================

        // TRIGGER 12: Alto Dividend Yield
        this.addTrigger({
            id: 'high_dividend_yield',
            name: 'Alto Dividend Yield',
            category: 'INCOME',
            conditions: [
                { field: 'metrics.dividendYield', operator: '>=', value: 6 },
                { field: 'metrics.roe', operator: '>=', value: 12 }
            ],
            action: 'BUY',
            priority: 'MEDIUM',
            message: 'DY ≥6% com ROE sustentável'
        });

        // ==================== TRIGGERS DE CONFIDENCE ====================

        // TRIGGER 13: Alta Confiabilidade da Projeção
        this.addTrigger({
            id: 'high_confidence',
            name: 'Alta Confiança na Projeção',
            category: 'CONFIDENCE',
            conditions: [
                { field: 'confidence', operator: '>=', value: 80 },
                { field: 'score', operator: '>=', value: 75 }
            ],
            action: 'BUY',
            priority: 'HIGH',
            message: 'Alta confiabilidade (≥80) com score ≥75'
        });

        console.log(`✓ ${this.triggers.size} triggers configurados`);
    }

    /**
     * ADICIONAR NOVO TRIGGER
     */
    addTrigger(trigger) {
        if (!trigger.id || !trigger.conditions) {
            throw new Error('Trigger inválido: ID e condições são obrigatórios');
        }

        this.triggers.set(trigger.id, {
            ...trigger,
            enabled: true,
            createdAt: new Date().toISOString()
        });
    }

    /**
     * REMOVER TRIGGER
     */
    removeTrigger(id) {
        return this.triggers.delete(id);
    }

    /**
     * HABILITAR/DESABILITAR TRIGGER
     */
    toggleTrigger(id, enabled) {
        const trigger = this.triggers.get(id);
        if (trigger) {
            trigger.enabled = enabled;
        }
    }

    /**
     * AVALIAR TODOS OS TRIGGERS PARA UMA EMPRESA
     */
    evaluateTriggers(company) {
        if (!this.isActive || !company) {
            return [];
        }

        const triggered = [];

        for (const [id, trigger] of this.triggers) {
            if (!trigger.enabled) continue;

            if (this.checkConditions(company, trigger.conditions)) {
                const alert = {
                    triggerId: id,
                    triggerName: trigger.name,
                    category: trigger.category,
                    action: trigger.action,
                    priority: trigger.priority,
                    message: trigger.message,
                    company: {
                        ticker: company.ticker,
                        name: company.name,
                        currentPrice: company.currentPrice,
                        score: company.score
                    },
                    timestamp: new Date().toISOString()
                };

                triggered.push(alert);
                this.alerts.push(alert);
            }
        }

        return triggered;
    }

    /**
     * AVALIAR TRIGGERS PARA TODAS AS EMPRESAS
     */
    evaluateAllCompanies(companies) {
        if (!companies || companies.length === 0) {
            return [];
        }

        console.log(`🔍 Avaliando ${this.triggers.size} triggers para ${companies.length} empresas...`);

        const allAlerts = [];

        companies.forEach(company => {
            const companyAlerts = this.evaluateTriggers(company);
            allAlerts.push(...companyAlerts);
        });

        // Ordenar por prioridade
        const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        allAlerts.sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        console.log(`✓ ${allAlerts.length} alertas gerados`);

        return allAlerts;
    }

    /**
     * VERIFICAR SE UMA EMPRESA ATENDE ÀS CONDIÇÕES
     */
    checkConditions(company, conditions) {
        if (!conditions || conditions.length === 0) {
            return false;
        }

        // Todas as condições devem ser atendidas (AND logic)
        return conditions.every(condition => {
            return this.evaluateCondition(company, condition);
        });
    }

    /**
     * AVALIAR UMA CONDIÇÃO INDIVIDUAL
     */
    evaluateCondition(company, condition) {
        const { field, operator, value, reference, multiplier } = condition;

        // Obter valor do campo
        let fieldValue = this.getNestedValue(company, field);

        if (fieldValue === null || fieldValue === undefined) {
            return false;
        }

        // Se a condição usa uma referência (ex: currentPrice)
        let compareValue = value;
        if (reference) {
            const refValue = this.getNestedValue(company, reference);
            if (refValue !== null && refValue !== undefined) {
                compareValue = refValue * (multiplier || 1);
            } else {
                return false;
            }
        }

        // Avaliar operador
        switch (operator) {
            case '>':
                return fieldValue > compareValue;
            case '>=':
                return fieldValue >= compareValue;
            case '<':
                return fieldValue < compareValue;
            case '<=':
                return fieldValue <= compareValue;
            case '===':
                return fieldValue === compareValue;
            case '!==':
                return fieldValue !== compareValue;
            default:
                console.warn(`Operador desconhecido: ${operator}`);
                return false;
        }
    }

    /**
     * BUSCAR VALOR ANINHADO EM OBJETO
     */
    getNestedValue(obj, path) {
        if (!obj || !path) return null;

        return path.split('.').reduce((current, key) => {
            return (current && current[key] !== undefined) ? current[key] : null;
        }, obj);
    }

    /**
     * OBTER ALERTAS POR PRIORIDADE
     */
    getAlertsByPriority(priority) {
        return this.alerts.filter(alert => alert.priority === priority);
    }

    /**
     * OBTER ALERTAS POR CATEGORIA
     */
    getAlertsByCategory(category) {
        return this.alerts.filter(alert => alert.category === category);
    }

    /**
     * OBTER ALERTAS POR AÇÃO (BUY/SELL)
     */
    getAlertsByAction(action) {
        return this.alerts.filter(alert => alert.action === action);
    }

    /**
     * LIMPAR ALERTAS ANTIGOS
     */
    clearAlerts(olderThanHours = 24) {
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() - olderThanHours);

        const before = this.alerts.length;
        this.alerts = this.alerts.filter(alert => {
            return new Date(alert.timestamp) > cutoff;
        });

        const removed = before - this.alerts.length;
        if (removed > 0) {
            console.log(`🧹 ${removed} alertas antigos removidos`);
        }

        return removed;
    }

    /**
     * OBTER RESUMO DE ALERTAS
     */
    getAlertsSummary() {
        const summary = {
            total: this.alerts.length,
            byPriority: {
                CRITICAL: this.getAlertsByPriority('CRITICAL').length,
                HIGH: this.getAlertsByPriority('HIGH').length,
                MEDIUM: this.getAlertsByPriority('MEDIUM').length,
                LOW: this.getAlertsByPriority('LOW').length
            },
            byAction: {
                BUY: this.getAlertsByAction('BUY').length,
                SELL: this.getAlertsByAction('SELL').length,
                HOLD: this.getAlertsByAction('HOLD').length
            },
            byCategory: {
                VALUE: this.getAlertsByCategory('VALUE').length,
                QUALITY: this.getAlertsByCategory('QUALITY').length,
                GROWTH: this.getAlertsByCategory('GROWTH').length,
                MOMENTUM: this.getAlertsByCategory('MOMENTUM').length,
                RISK: this.getAlertsByCategory('RISK').length,
                INCOME: this.getAlertsByCategory('INCOME').length,
                CONFIDENCE: this.getAlertsByCategory('CONFIDENCE').length
            }
        };

        return summary;
    }

    /**
     * GERAR RELATÓRIO DE ALERTAS
     */
    generateReport() {
        const summary = this.getAlertsSummary();

        console.log('\n📊 RELATÓRIO DE ALERTAS');
        console.log('========================');
        console.log(`Total de Alertas: ${summary.total}`);
        console.log('\nPor Prioridade:');
        console.log(`  🚨 CRITICAL: ${summary.byPriority.CRITICAL}`);
        console.log(`  🔴 HIGH:     ${summary.byPriority.HIGH}`);
        console.log(`  🟡 MEDIUM:   ${summary.byPriority.MEDIUM}`);
        console.log(`  🔵 LOW:      ${summary.byPriority.LOW}`);
        console.log('\nPor Ação:');
        console.log(`  ✅ BUY:  ${summary.byAction.BUY}`);
        console.log(`  ❌ SELL: ${summary.byAction.SELL}`);
        console.log(`  ⏸ HOLD: ${summary.byAction.HOLD}`);
        console.log('========================\n');

        return summary;
    }

    /**
     * ATIVAR/DESATIVAR ENGINE
     */
    setActive(active) {
        this.isActive = active;
        console.log(`Event Engine ${active ? 'ativado' : 'desativado'}`);
    }

    /**
     * RESETAR ENGINE
     */
    reset() {
        this.alerts = [];
        this.history = [];
        console.log('✓ Event Engine resetado');
    }
}

/**
 * EXPORT
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedEventEngine;
}

console.log('✓ event-engine.js carregado');
