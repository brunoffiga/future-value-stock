// ============================
// APP.JS - Orquestrador Principal
// B3 SmallCaps Intelligence Platform v2.0
// ============================

/**
 * ESTADO GLOBAL DA APLICAÇÃO
 */
let companiesData = [];
let selectedCompanies = new Set();
let currentSort = { field: 'score', direction: 'desc' };
let currentFilters = { search: '', pod: 'all', source: 'all' };
let currentView = 'overview';
let allCharts = {};
let simulationSelectedTickers = new Set();

// Engines
let scoringEngine = null;
let eventEngine = null;

/**
 * INICIALIZAÇÃO
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando B3 SmallCaps Intelligence Platform v2.0...');

    // 1. Carregar dados
    loadData();

    // 2. Configurar navegação
    setupNavigation();

    // 3. Configurar filtros
    setupFilters();

    // 4. Renderizar tabela inicial
    renderTable();

    // 5. Configurar modals
    setupModals();

    // 6. Configurar simulador
    setupSimulator();

    console.log('✅ Sistema inicializado com sucesso!');
});

/**
 * FUNÇÕES DE CARGA DE DADOS
 */
function loadData() {
    // Carregar do arquivo data-companies-enhanced.js
    companiesData = COMPANIES_DATABASE || [];
    console.log(`📦 ${companiesData.length} empresas carregadas do database`);

    // Inicializar Scoring Engine
    if (typeof ScoringEngine !== 'undefined') {
        scoringEngine = new ScoringEngine();
        scoringEngine.initialize();
    } else {
        console.warn('⚠ ScoringEngine não disponível');
    }

    // Inicializar Event Engine
    if (typeof AdvancedEventEngine !== 'undefined') {
        eventEngine = new AdvancedEventEngine();
        eventEngine.initialize();
    } else {
        console.warn('⚠ AdvancedEventEngine não disponível');
    }

    // Calcular scores multidimensionais para cada empresa
    companiesData = companiesData.map(company => {
        // Calcular score multidimensional
        if (scoringEngine) {
            const scoreResult = scoringEngine.calculateScore(company);
            company.finalScore = scoreResult.total;
            company.scoreBreakdown = scoreResult.breakdown;
            company.scoreConfidence = scoreResult.confidence;
            company.signals = scoreResult.signals;

            // Usar o score calculado se não houver score manual
            if (!company.score || company.score === 0) {
                company.score = scoreResult.total;
            }
        }

        // Calcular confidence score (se disponível do confidence.js)
        if (typeof calculateProjectionConfidence !== 'undefined') {
            company.confidence = calculateProjectionConfidence(company);
        }

        return company;
    });

    // Avaliar triggers para todas as empresas
    if (eventEngine) {
        const alerts = eventEngine.evaluateAllCompanies(companiesData);
        console.log(`🔔 ${alerts.length} alertas gerados`);

        // Armazenar alertas críticos
        window.criticalAlerts = alerts.filter(a => a.priority === 'CRITICAL' || a.priority === 'HIGH');
    }

    // Ordenar empresas por score
    companiesData.sort((a, b) => (b.finalScore || b.score) - (a.finalScore || a.score));

    // Atualizar rankings
    companiesData.forEach((company, index) => {
        company.ranking = index + 1;
    });

    // Pré-selecionar algumas ações para o simulador (Silver Bullets)
    companiesData
        .filter(c => (c.finalScore || c.score) >= 80 &&
                     (c.pod === 'Pod Selic' || c.pod === 'Pod Secular' || c.pod === 'Pod Global'))
        .forEach(c => simulationSelectedTickers.add(c.ticker));

    console.log(`✅ ${companiesData.length} empresas processadas e ranqueadas`);
}

/**
 * NAVEGAÇÃO ENTRE SEÇÕES
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const view = link.dataset.view;

            // Atualizar links ativos
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Mostrar seção correta
            switchView(view);
        });
    });
}

function switchView(view) {
    currentView = view;

    // Ocultar todas as sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    // Mostrar a section correta
    const targetSection = document.getElementById(`${view}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    } else {
        // Se a section não existe, criar dinamicamente
        createSection(view);
    }

    // Executar ações específicas por view
    switch(view) {
        case 'charts':
            setTimeout(() => createAllCharts(), 100);
            break;
        case 'simulator':
            populateStockChips();
            break;
    }
}

/**
 * CRIAR SECTIONS DINAMICAMENTE
 */
function createSection(view) {
    const container = document.querySelector('.container');

    if (view === 'strategy') {
        container.innerHTML += `
            <section id="strategy-section" class="content-section active">
                ${getStrategyHTML()}
            </section>
        `;
    } else if (view === 'charts') {
        container.innerHTML += `
            <section id="charts-section" class="content-section active">
                <div class="charts-grid">
                    <div class="chart-card">
                        <h2>Top 8 Múltiplos de Crescimento</h2>
                        <div class="chart-subtitle">Ações com maior potencial de upside.</div>
                        <div class="chart-container"><canvas id="topMultipleChart"></canvas></div>
                    </div>
                    <div class="chart-card">
                        <h2>Múltiplo Médio por Pod</h2>
                        <div class="chart-subtitle">Potencial de crescimento médio de cada estratégia.</div>
                        <div class="chart-container"><canvas id="podMultipleChart"></canvas></div>
                    </div>
                    <div class="chart-card">
                        <h2>Alocação Recomendada</h2>
                        <div class="chart-subtitle">Foco nos maiores múltiplos.</div>
                        <div class="chart-container"><canvas id="allocationChart"></canvas></div>
                    </div>
                    <div class="chart-card">
                        <h2>Distribuição por Setor</h2>
                        <div class="chart-subtitle">Diversificação setorial.</div>
                        <div class="chart-container"><canvas id="sectorChart"></canvas></div>
                    </div>
                </div>
            </section>
        `;
        setTimeout(() => createAllCharts(), 100);
    } else if (view === 'simulator') {
        container.innerHTML += `
            <section id="simulator-section" class="content-section active">
                ${getSimulatorHTML()}
            </section>
        `;
        populateStockChips();
    }
}

/**
 * CONFIGURAÇÃO DE FILTROS
 */
function setupFilters() {
    // Busca por ticker
    document.getElementById('search-input').addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        renderTable();
    });

    // Filtro por Pod
    document.getElementById('pod-filter').addEventListener('change', (e) => {
        currentFilters.pod = e.target.value;
        renderTable();
    });

    // Filtro por Fonte
    document.getElementById('source-filter').addEventListener('change', (e) => {
        currentFilters.source = e.target.value;
        renderTable();
    });

    // Ordenação por coluna
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            handleSort(th.dataset.sort);
        });
    });

    // Select all checkbox
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                getFilteredData().forEach(c => selectedCompanies.add(c.ticker));
            } else {
                selectedCompanies.clear();
            }
            renderTable();
            updateCompareButton();
        });
    }
}

/**
 * RENDERIZAÇÃO DA TABELA PRINCIPAL
 */
function renderTable() {
    const tbody = document.getElementById('companies-table-body');
    if (!tbody) return;

    const filtered = getFilteredData();
    const sorted = sortCompanies([...filtered]);

    tbody.innerHTML = sorted.map(company => {
        const isSelected = selectedCompanies.has(company.ticker);

        // Calcular upsides
        const upside1Y = calculateUpside(company.currentPrice, getTargetPrice(company, '1Y'));
        const upside3Y = calculateUpside(company.currentPrice, getTargetPrice(company, '3Y'));
        const upside5Y = calculateUpside(company.currentPrice, getTargetPrice(company, '5Y'));
        const upside10Y = calculateUpside(company.currentPrice, getTargetPrice(company, '10Y'));

        return `
            <tr class="${isSelected ? 'selected' : ''}" data-ticker="${company.ticker}">
                <td>
                    <input type="checkbox" class="select-checkbox"
                           ${isSelected ? 'checked' : ''}
                           onchange="toggleSelection('${company.ticker}')">
                </td>
                <td>${company.ranking}</td>
                <td>
                    <a href="#" class="ticker-link" onclick="openAnalysisModal('${company.ticker}'); return false;">
                        ${company.ticker}
                    </a>
                </td>
                <td>${company.sector}</td>
                <td><span class="tag ${getPodClass(company.pod)}">${company.pod.replace('Pod ', '')}</span></td>
                <td>${formatCurrency(company.currentPrice)}</td>
                <td><span class="score-badge ${getScoreClass(company.score)}">${company.score}</span></td>
                <td class="${company.metrics.roe > 20 ? 'change-value positive' : ''}">${formatNumber(company.metrics.roe, 1)}%</td>
                <td>${company.metrics.pe > 0 ? formatNumber(company.metrics.pe, 2) + 'x' : 'N/A'}</td>
                <td class="change-value ${upside1Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside1Y)}</td>
                <td class="change-value ${upside3Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside3Y)}</td>
                <td class="change-value ${upside5Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside5Y)}</td>
                <td class="change-value ${upside10Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside10Y)}</td>
                <td>${formatCurrency(getTargetPrice(company, '1Y'))}</td>
                <td class="change-value ${company.performance?.ytd > 0 ? 'positive' : 'negative'}">
                    ${company.performance?.ytd ? formatPercentage(company.performance.ytd) : '-'}
                </td>
                <td>${formatNumber(company.metrics.dividendYield, 2)}%</td>
                <td><span class="tag ${getRecommendationClass(company.recommendation)}">${company.recommendation}</span></td>
                <td><span class="tag ${getSourceClass(company.source)}">${company.source}</span></td>
            </tr>
        `;
    }).join('');

    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="18" style="text-align:center;">Nenhuma empresa encontrada.</td></tr>';
    }
}

/**
 * FUNÇÕES DE FILTRO E ORDENAÇÃO
 */
function getFilteredData() {
    return companiesData.filter(company => {
        // Busca
        if (currentFilters.search) {
            const searchLower = currentFilters.search;
            if (!company.ticker.toLowerCase().includes(searchLower) &&
                !company.name.toLowerCase().includes(searchLower)) {
                return false;
            }
        }

        // Pod
        if (currentFilters.pod !== 'all' && company.pod !== currentFilters.pod) {
            return false;
        }

        // Fonte
        if (currentFilters.source !== 'all' && company.source !== currentFilters.source) {
            return false;
        }

        return true;
    });
}

function sortCompanies(companies) {
    return companies.sort((a, b) => {
        const { field, direction } = currentSort;
        const mult = direction === 'asc' ? 1 : -1;

        let aVal = getNestedValue(a, field);
        let bVal = getNestedValue(b, field);

        // Tratamento especial para upsides calculados
        if (field.startsWith('upside')) {
            const horizon = field.replace('upside', '');
            aVal = calculateUpside(a.currentPrice, getTargetPrice(a, horizon));
            bVal = calculateUpside(b.currentPrice, getTargetPrice(b, horizon));
        }

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return mult * aVal.localeCompare(bVal);
        }

        return mult * (aVal - bVal);
    });
}

function handleSort(field) {
    if (currentSort.field === field) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.field = field;
        currentSort.direction = ['ticker', 'sector', 'recommendation'].includes(field) ? 'asc' : 'desc';
    }

    // Atualizar visual das colunas
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    document.querySelector(`th[data-sort="${field}"]`).classList.add(`sort-${currentSort.direction}`);

    renderTable();
}

/**
 * FUNÇÕES DE SELEÇÃO E COMPARAÇÃO
 */
function toggleSelection(ticker) {
    if (selectedCompanies.has(ticker)) {
        selectedCompanies.delete(ticker);
    } else {
        selectedCompanies.add(ticker);
    }
    renderTable();
    updateCompareButton();
}

function updateCompareButton() {
    const btn = document.getElementById('compare-btn');
    const count = document.getElementById('compare-count');

    if (btn && count) {
        count.textContent = selectedCompanies.size;
        btn.disabled = selectedCompanies.size < 2;
    }
}

/**
 * MODAIS
 */
function setupModals() {
    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
}

function openAnalysisModal(ticker) {
    const company = companiesData.find(c => c.ticker === ticker);
    if (!company) return;

    document.getElementById('modal-ticker').textContent = company.ticker;
    document.getElementById('modal-company').textContent = company.name;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = generateAnalysisHTML(company);

    document.getElementById('analysis-modal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Renderizar gráficos do modal
    setTimeout(() => {
        if (typeof renderPriceChart !== 'undefined') renderPriceChart(company);
        if (typeof renderScoresChart !== 'undefined') renderScoresChart(company);
    }, 100);
}

function closeAnalysisModal() {
    document.getElementById('analysis-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openCompareModal() {
    const selected = Array.from(selectedCompanies).map(ticker =>
        companiesData.find(c => c.ticker === ticker)
    );

    const grid = document.getElementById('compare-grid');
    grid.innerHTML = selected.map(company => generateCompareCardHTML(company)).join('');

    document.getElementById('compare-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
    document.getElementById('compare-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * FUNÇÕES AUXILIARES DE CÁLCULO
 */
function getTargetPrice(company, horizon) {
    if (!company.projections) return company.targetPrice || null;

    const key = `target${horizon}`;
    return company.projections[key] || null;
}

function calculateUpside(currentPrice, targetPrice) {
    if (!currentPrice || !targetPrice) return null;
    return ((targetPrice - currentPrice) / currentPrice) * 100;
}

/**
 * PLACEHOLDER: HTML para Strategy Section
 */
function getStrategyHTML() {
    return `
        <div class="section">
            <h2>Teses & Estratégia</h2>
            <p>Playbook completo em desenvolvimento...</p>
        </div>
    `;
}

/**
 * PLACEHOLDER: HTML para Simulator Section
 */
function getSimulatorHTML() {
    return `
        <div class="section">
            <h2>Simulador de Aportes</h2>
            <div id="stock-chips"></div>
            <input type="number" id="monthly-input" value="2500">
            <select id="allocation-strategy">
                <option value="aggressive">Agressiva</option>
                <option value="balanced">Balanceada</option>
                <option value="conservative">Conservadora</option>
            </select>
            <div id="allocation-results"></div>
        </div>
    `;
}

/**
 * PLACEHOLDER: Simulador
 */
function setupSimulator() {
    // Implementação em próxima etapa
}

function populateStockChips() {
    // Implementação em próxima etapa
}

/**
 * PLACEHOLDER: Gráficos
 */
function createAllCharts() {
    console.log('Criando gráficos...');
    // Implementação em próxima etapa
}

/**
 * GERAÇÃO DE HTML DINÂMICO - Análise Detalhada
 */
function generateAnalysisHTML(company) {
    const upside1Y = calculateUpside(company.currentPrice, getTargetPrice(company, '1Y'));
    const upside3Y = calculateUpside(company.currentPrice, getTargetPrice(company, '3Y'));
    const upside5Y = calculateUpside(company.currentPrice, getTargetPrice(company, '5Y'));
    const upside10Y = calculateUpside(company.currentPrice, getTargetPrice(company, '10Y'));

    return `
        <div class="analysis-content">
            <!-- Cabeçalho da Análise -->
            <div class="analysis-header">
                <div class="header-left">
                    <h2>${company.name} (${company.ticker})</h2>
                    <p class="sector-info">${company.sector} ${company.subsector ? `• ${company.subsector}` : ''}</p>
                    <span class="tag ${getPodClass(company.pod)}">${company.pod}</span>
                </div>
                <div class="header-right">
                    <div class="price-box">
                        <span class="label">Preço Atual</span>
                        <span class="value">${formatCurrency(company.currentPrice)}</span>
                    </div>
                    <div class="score-box">
                        <span class="label">Score</span>
                        <span class="value score-badge ${getScoreClass(company.finalScore || company.score)}">${company.finalScore || company.score}</span>
                    </div>
                </div>
            </div>

            <!-- Scores Multidimensionais -->
            ${generateScoresBreakdownHTML(company)}

            <!-- Valuation e Projeções -->
            <div class="section">
                <h3>📊 Valuation e Projeções Temporais</h3>
                <div class="projections-grid">
                    <div class="projection-card">
                        <div class="horizon">1 Ano</div>
                        <div class="target">${formatCurrency(getTargetPrice(company, '1Y'))}</div>
                        <div class="upside ${upside1Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside1Y)}</div>
                    </div>
                    <div class="projection-card">
                        <div class="horizon">3 Anos</div>
                        <div class="target">${formatCurrency(getTargetPrice(company, '3Y'))}</div>
                        <div class="upside ${upside3Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside3Y)}</div>
                    </div>
                    <div class="projection-card">
                        <div class="horizon">5 Anos</div>
                        <div class="target">${formatCurrency(getTargetPrice(company, '5Y'))}</div>
                        <div class="upside ${upside5Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside5Y)}</div>
                    </div>
                    <div class="projection-card">
                        <div class="horizon">10 Anos</div>
                        <div class="target">${formatCurrency(getTargetPrice(company, '10Y'))}</div>
                        <div class="upside ${upside10Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside10Y)}</div>
                    </div>
                </div>
            </div>

            <!-- Métricas Fundamentalistas -->
            ${generateFundamentalsHTML(company)}

            <!-- Consenso de Analistas -->
            ${generateAnalystConsensusHTML(company)}

            <!-- Análise Técnica -->
            ${generateTechnicalAnalysisHTML(company)}

            <!-- Smart Money -->
            ${generateSmartMoneyHTML(company)}

            <!-- Predições ML -->
            ${generateMLPredictionsHTML(company)}

            <!-- Performance Histórica -->
            ${generatePerformanceHTML(company)}

            <!-- Catalisadores e Riscos -->
            ${generateCatalystsRisksHTML(company)}

            <!-- Recomendação Final -->
            <div class="section final-recommendation">
                <h3>🎯 Recomendação Final</h3>
                <div class="recommendation-box">
                    <div class="recommendation-badge ${getRecommendationClass(company.recommendation)}">
                        ${company.recommendation}
                    </div>
                    <div class="confidence-info">
                        <span>Confidence Score: <strong>${company.confidence || company.scoreConfidence || 'N/A'}</strong></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Funções auxiliares para gerar seções específicas da análise

function generateScoresBreakdownHTML(company) {
    if (!company.scoreBreakdown) return '';

    const breakdown = company.scoreBreakdown;
    return `
        <div class="section">
            <h3>🎯 Scores Multidimensionais</h3>
            <div class="scores-grid">
                <div class="score-item"><span>Fundamental:</span> <strong>${Math.round(breakdown.fundamental || 0)}/100</strong></div>
                <div class="score-item"><span>Técnico:</span> <strong>${Math.round(breakdown.technical || 0)}/100</strong></div>
                <div class="score-item"><span>Consenso:</span> <strong>${Math.round(breakdown.consensus || 0)}/100</strong></div>
                <div class="score-item"><span>Smart Money:</span> <strong>${Math.round(breakdown.smartMoney || 0)}/100</strong></div>
                <div class="score-item"><span>Macro:</span> <strong>${Math.round(breakdown.macro || 0)}/100</strong></div>
                <div class="score-item"><span>ML:</span> <strong>${Math.round(breakdown.ml || 0)}/100</strong></div>
            </div>
        </div>
    `;
}

function generateFundamentalsHTML(company) {
    if (!company.metrics) return '';

    const m = company.metrics;
    return `
        <div class="section">
            <h3>📈 Métricas Fundamentalistas</h3>
            <div class="metrics-grid">
                <div class="metric"><span>P/L:</span> <strong>${m.pe > 0 ? formatNumber(m.pe, 2) + 'x' : 'N/A'}</strong></div>
                <div class="metric"><span>P/VP:</span> <strong>${formatNumber(m.pb, 2)}x</strong></div>
                <div class="metric"><span>ROE:</span> <strong class="${m.roe > 20 ? 'positive' : ''}">${formatNumber(m.roe, 1)}%</strong></div>
                <div class="metric"><span>ROIC:</span> <strong>${formatNumber(m.roic, 1)}%</strong></div>
                <div class="metric"><span>Div. Yield:</span> <strong>${formatNumber(m.dividendYield, 2)}%</strong></div>
                <div class="metric"><span>Dív/EBITDA:</span> <strong class="${m.netDebtToEbitda < 2 ? 'positive' : m.netDebtToEbitda > 4 ? 'negative' : ''}">${formatNumber(m.netDebtToEbitda, 2)}x</strong></div>
                <div class="metric"><span>Marg. EBITDA:</span> <strong>${formatNumber(m.ebitdaMargin, 1)}%</strong></div>
                <div class="metric"><span>Cresc. Receita:</span> <strong class="${m.revenueGrowth > 15 ? 'positive' : ''}">${formatNumber(m.revenueGrowth, 1)}%</strong></div>
            </div>
        </div>
    `;
}

function generateAnalystConsensusHTML(company) {
    if (!company.analystTargets) return '';

    const at = company.analystTargets;
    return `
        <div class="section">
            <h3>👥 Consenso de Analistas</h3>
            <div class="consensus-info">
                <div><strong>Preço-Alvo Médio:</strong> ${formatCurrency(at.consensus.mean)} (${at.consensus.count} analistas)</div>
                <div><strong>Upside Implícito:</strong> <span class="${at.impliedUpside.toMean > 0 ? 'positive' : 'negative'}">${formatPercentage(at.impliedUpside.toMean)}</span></div>
                <div><strong>Revisões (30d):</strong> ${at.revisions.upgrades} upgrades / ${at.revisions.downgrades} downgrades</div>
            </div>
        </div>
    `;
}

function generateTechnicalAnalysisHTML(company) {
    if (!company.technicalAnalysis) return '';

    const tech = company.technicalAnalysis;
    return `
        <div class="section">
            <h3>📉 Análise Técnica</h3>
            <div class="technical-info">
                <div><strong>Tendência:</strong> ${tech.momentum?.macd?.trend || 'N/A'}</div>
                <div><strong>RSI(14):</strong> ${tech.momentum?.rsi14 || 'N/A'}</div>
                <div><strong>Volume:</strong> ${tech.volume?.accumDist || 'N/A'}</div>
                <div><strong>Suporte/Resistência:</strong> ${formatCurrency(tech.signals?.support)} / ${formatCurrency(tech.signals?.resistance)}</div>
            </div>
        </div>
    `;
}

function generateSmartMoneyHTML(company) {
    if (!company.smartMoney) return '';

    const sm = company.smartMoney;
    return `
        <div class="section">
            <h3>💰 Smart Money</h3>
            <div class="smartmoney-info">
                <div><strong>Insiders (90d):</strong> ${sm.insiders?.last90days?.netBuys > 0 ? `${sm.insiders.last90days.netBuys} compras líquidas` : 'Sem movimento significativo'}</div>
                <div><strong>Fluxo Institucional:</strong> ${sm.institutional?.flowTrend || 'N/A'}</div>
                <div><strong>Ownership Institucional:</strong> ${formatNumber(sm.institutional?.ownership || 0, 1)}%</div>
            </div>
        </div>
    `;
}

function generateMLPredictionsHTML(company) {
    if (!company.mlPredictions) return '';

    const ml = company.mlPredictions;
    return `
        <div class="section">
            <h3>🤖 Predições Machine Learning</h3>
            <div class="ml-info">
                <div><strong>Consenso Ensemble:</strong> ${ml.ensemble?.consensus || 'N/A'} (${formatNumber(ml.ensemble?.agreement * 100, 0)}% acordo)</div>
                <div><strong>Predição 30d:</strong> ${formatCurrency(ml.randomForest?.prediction30d || 0)} (${formatPercentage(ml.randomForest?.expectedReturn || 0)} retorno esperado)</div>
                <div><strong>Acurácia (90d):</strong> ${ml.backtest?.accuracy90d || 'N/A'}%</div>
                <div><strong>Sharpe Ratio:</strong> ${formatNumber(ml.backtest?.sharpeRatio || 0, 2)}</div>
            </div>
        </div>
    `;
}

function generatePerformanceHTML(company) {
    if (!company.performance) return '';

    const perf = company.performance;
    return `
        <div class="section">
            <h3>📊 Performance Histórica</h3>
            <div class="performance-grid">
                <div class="perf-item"><span>YTD:</span> <strong class="${perf.ytd > 0 ? 'positive' : 'negative'}">${formatPercentage(perf.ytd)}</strong></div>
                <div class="perf-item"><span>1 Ano:</span> <strong class="${perf.oneYear > 0 ? 'positive' : 'negative'}">${formatPercentage(perf.oneYear)}</strong></div>
                <div class="perf-item"><span>3 Anos:</span> <strong class="${perf.threeYears > 0 ? 'positive' : 'negative'}">${formatPercentage(perf.threeYears || 0)}</strong></div>
                <div class="perf-item"><span>5 Anos:</span> <strong>${perf.fiveYears ? formatPercentage(perf.fiveYears) : 'N/A'}</strong></div>
            </div>
        </div>
    `;
}

function generateCatalystsRisksHTML(company) {
    return `
        <div class="section">
            <h3>✨ Catalisadores</h3>
            <ul class="catalysts-list">
                ${(company.catalysts || []).map(cat => `<li>${cat}</li>`).join('')}
            </ul>

            <h3 class="risks-title">⚠️ Riscos</h3>
            <ul class="risks-list">
                ${(company.risks || []).map(risk => `<li>${risk}</li>`).join('')}
            </ul>

            ${company.keyHighlights && company.keyHighlights.length > 0 ? `
                <h3>💡 Key Highlights</h3>
                <ul class="highlights-list">
                    ${company.keyHighlights.map(hl => `<li>${hl}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `;
}

function generateCompareCardHTML(company) {
    return `<div class="compare-card"><h3>${company.ticker}</h3></div>`;
}

console.log('✓ app.js carregado');
