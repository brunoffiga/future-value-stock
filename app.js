// app.js - Orquestrador Principal da Aplicação

class B3IntelligencePlatform {
    constructor() {
        // Inicializa os serviços
        this.dataCollector = new DataCollectorService();
        this.scoringEngine = new ScoringEngine();
        this.eventEngine = new AdvancedEventEngine();

        this.companiesData = [];
        this.macroData = {};
    }

    /**
     * Ponto de entrada principal
     */
    async initialize() {
        console.log("🚀 Iniciando B3 Intelligence Platform v2.0...");
        
        // 1. Carregar dados (mock por enquanto)
        this.companiesData = this.loadMockData();

        // 2. Setup dos gatilhos
        this.eventEngine.setupTriggers();
        
        // 3. Processar dados (cálculos, scores, alertas)
        this.processData();

        // 4. Renderizar o dashboard
        this.renderDashboard();

        console.log("✅ Plataforma pronta.");
    }

    /**
     * Carrega os dados do mock (FASE 1)
     */
    loadMockData() {
        // Em produção (FASE 2), isso será substituído pelo dataCollector
        console.log(`Carregando ${ENHANCED_COMPANIES.length} empresas (mock)...`);
        return ENHANCED_COMPANIES;
    }

    /**
     * Orquestra os cálculos e análises
     */
    processData() {
        const allAlerts = [];
        
        this.companiesData.forEach(company => {
            // 1. Calcular Score Multifatorial (FASE 2.3)
            company.finalScore = this.scoringEngine.calculateScore(company);
            
            // 2. Avaliar Gatilhos (FASE 3.1)
            const alerts = this.eventEngine.evaluateTriggers(company);
            if (alerts.length > 0) {
                allAlerts.push(...alerts);
            }
        });

        // Ordenar empresas pelo score final
        this.companiesData.sort((a, b) => b.finalScore.total - a.finalScore.total);
        
        // Salvar alertas
        this.activeAlerts = allAlerts;
    }

    /**
     * Atualiza a UI
     */
    renderDashboard() {
        this.renderTable();
        this.renderKPIs();
        this.renderAlerts();
    }

    /**
     * Renderiza a tabela principal
     */
    renderTable() {
        const tableBody = document.getElementById('stocksTableBody');
        if (!tableBody) return;
        
        let html = '';
        
        this.companiesData.forEach(company => {
            // Lógica de renderização da linha (<tr>...</tr>)
            // ... (usando company.ticker, company.finalScore.total, company.analystTargets, etc.)
        });
        
        // tableBody.innerHTML = html;
        console.log("Renderizando tabela principal...");
    }

    /**
     * Renderiza os cards de KPI
     */
    renderKPIs() {
        const kpiGrid = document.getElementById('kpi-grid');
        if (!kpiGrid) return;
        
        // Lógica para
        // 1. Top Oportunidades (baseado em score)
        // 2. Gatilhos Ativos (baseado em this.activeAlerts)
        // 3. Smart Money Flow (baseado em this.companiesData)
        
        console.log("Renderizando KPIs...");
    }

    /**
     * Renderiza o painel de alertas
     */
    renderAlerts() {
        const alertsList = document.getElementById('alertsList');
        if (!alertsList) return;
        
        // Lógica para renderizar this.activeAlerts
        console.log(`Renderizando ${this.activeAlerts.length} alertas...`);
    }
}

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    const app = new B3IntelligencePlatform();
    app.initialize();
});