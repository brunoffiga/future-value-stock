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
        // Seção unificada de Análise Gráfica + Simulador
        container.innerHTML += `
            <section id="charts-section" class="content-section active">
                <div class="section-title">Análise Gráfica & Simulador de Carteira</div>
                <div class="section-subtitle">
                    Visualização de métricas-chave e simulação de alocação inteligente
                </div>

                <!-- Gráficos -->
                <div class="charts-grid">
                    <div class="chart-card">
                        <h2>Top 8 Múltiplos de Crescimento</h2>
                        <div class="chart-subtitle">Ações com maior potencial de upside 5Y.</div>
                        <div class="chart-container"><canvas id="topMultipleChart"></canvas></div>
                    </div>
                    <div class="chart-card">
                        <h2>Múltiplo Médio por Pod</h2>
                        <div class="chart-subtitle">Potencial de crescimento médio de cada estratégia.</div>
                        <div class="chart-container"><canvas id="podMultipleChart"></canvas></div>
                    </div>
                    <div class="chart-card">
                        <h2>Alocação Recomendada</h2>
                        <div class="chart-subtitle">Distribuição sugerida por score.</div>
                        <div class="chart-container"><canvas id="allocationChart"></canvas></div>
                    </div>
                </div>

                <!-- Simulador Integrado -->
                <div class="simulator-integrated">
                    ${getSimulatorHTML()}
                </div>
            </section>
        `;
        setTimeout(() => {
            createAllCharts();
            populateStockChips();
        }, 100);
    } else if (view === 'simulator') {
        // Redireciona para charts (seção unificada)
        switchView('charts');
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

        // Calcular upsides apenas para 1Y e 5Y
        const upside1Y = calculateUpside(company.currentPrice, getTargetPrice(company, '1Y'));
        const upside5Y = calculateUpside(company.currentPrice, getTargetPrice(company, '5Y'));

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
                <td><span class="score-badge ${getScoreClass(company.finalScore || company.score)}">${company.finalScore || company.score}</span></td>
                <td class="${company.metrics.roe > 20 ? 'change-value positive' : ''}">${formatNumber(company.metrics.roe, 1)}%</td>
                <td>${company.metrics.pe > 0 ? formatNumber(company.metrics.pe, 2) + 'x' : 'N/A'}</td>
                <td class="change-value ${upside1Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside1Y)}</td>
                <td class="change-value ${upside5Y > 0 ? 'positive' : 'negative'}">${formatPercentage(upside5Y)}</td>
                <td>${formatCurrency(getTargetPrice(company, '1Y'))}</td>
                <td>${formatCurrency(getTargetPrice(company, '5Y'))}</td>
                <td class="change-value ${company.performance?.ytd > 0 ? 'positive' : 'negative'}">
                    ${company.performance?.ytd ? formatPercentage(company.performance.ytd) : '-'}
                </td>
                <td>${formatNumber(company.metrics.dividendYield, 2)}%</td>
                <td><span class="tag ${getRecommendationClass(company.recommendation)}">${company.recommendation}</span></td>
            </tr>
        `;
    }).join('');

    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="16" style="text-align:center;">Nenhuma empresa encontrada.</td></tr>';
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
 * HTML COMPLETO PARA STRATEGY SECTION - Teses & Playbook
 */
function getStrategyHTML() {
    return `
<div class="section-title">Teses de Investimento & Playbook de Execução</div>
<div class="section-subtitle">
    O racional estratégico, gatilhos de entrada/saída e regras de decisão para cada tese de investimento (Pod)
</div>

<div class="strategy-container">

    <!-- Pod Secular -->
    <div class="strategy-card">
        <div class="header secular">
            <h3>🚀 Pod Secular (Crescimento Estrutural)</h3>
            <p class="thesis-intro">Tese de crescimento de longo prazo, <strong>independente do ciclo macroeconômico</strong>. Empresas com vantagens competitivas sustentáveis (moat), alta capacidade de reinvestimento e geração de valor consistente. Foco em <code>ROE</code> alto, margens expansíveis e crescimento acima da média do mercado.</p>
        </div>
        <div class="content">
            <div class="buy-section">
                <h4>✅ Gatilhos de Compra (Quando Entrar)</h4>
                <ul>
                    <li><strong>Qualidade Comprovada:</strong> <code>metrics.roe</code> ≥ 20% <strong>E</strong> <code>metrics.roic</code> ≥ 15% (indicando retornos superiores ao custo de capital).</li>
                    <li><strong>Crescimento Sustentável:</strong> <code>metrics.earningsGrowth</code> ≥ 15% a.a. por pelo menos 2 trimestres consecutivos.</li>
                    <li><strong>Confirmação Técnica:</strong> <code>technicalAnalysis.momentum.macd.trend</code> = "BULLISH" (momentum técnico confirmando a tese).</li>
                    <li><strong>Smart Money Positivo:</strong> <code>smartMoney.institutional.flowTrend</code> = "POSITIVE" (capital institucional entrando).</li>
                    <li><strong>Valuation Razoável:</strong> <code>metrics.pe</code> < 30x OU <code>metrics.pe / metrics.earningsGrowth</code> < 1.5 (PEG ratio atrativo).</li>
                </ul>
            </div>
            <div class="sell-section">
                <h4>❌ Gatilhos de Venda (Quando Sair)</h4>
                <ul>
                    <li><strong>Quebra da Tese de Crescimento:</strong> <code>metrics.earningsGrowth</code> fica abaixo de 5% (ou da inflação <code>macroAnalysis.brazil.ipca</code>) por 2 trimestres consecutivos.</li>
                    <li><strong>Deterioração de Margens:</strong> <code>metrics.ebitdaMargin</code> apresenta queda superior a 20% relativa em 3 trimestres, indicando perda de poder de precificação (moat enfraquecido).</li>
                    <li><strong>Valuation Esticado:</strong> <code>metrics.pe</code> > 40x E <code>upside1Y</code> < 15% (risco/retorno desfavorável).</li>
                    <li><strong>Reversão Técnica:</strong> <code>technicalAnalysis.momentum.rsi14</code> > 80 por 3 semanas E <code>technicalAnalysis.volume.accumDist</code> = "DISTRIBUTION" (euforia + distribuição institucional).</li>
                </ul>
            </div>
            <div class="examples-section">
                <h4>📌 Exemplos de Empresas Pod Secular:</h4>
                <p>WEG, RADL3 (Raia Drogasil), HYPE3 (Hypera), empresas de tecnologia/saúde com crescimento estrutural.</p>
            </div>
        </div>
    </div>

    <!-- Pod Global -->
    <div class="strategy-card">
        <div class="header global">
            <h3>🌍 Pod Global (Commodities & Exportação)</h3>
            <p class="thesis-intro">Tese <strong>descorrelacionada da Selic brasileira</strong>. O retorno depende do ciclo da commodity subjacente (minério, celulose, petróleo) e da variação cambial (Real vs Dólar). Empresas exportadoras ou com receita dolarizada se beneficiam de <code>macroAnalysis.brazil.exchange.trend</code> = "DEPRECIATION" (dólar em alta).</p>
        </div>
        <div class="content">
            <div class="buy-section">
                <h4>✅ Gatilhos de Compra (Quando Entrar)</h4>
                <ul>
                    <li><strong>Ciclo de Commodity Iniciando Alta:</strong> O preço da commodity principal (verificar em fontes externas: minério, celulose, petróleo) inicia tendência de alta confirmada (ex: acima da Média Móvel de 50 dias).</li>
                    <li><strong>Câmbio Favorável:</strong> <code>macroAnalysis.brazil.exchange.trend</code> = "DEPRECIATION" (Real se desvalorizando, inflando receita em Reais).</li>
                    <li><strong>Valuation de Ciclo:</strong> <code>metrics.evEbitda</code> < 5x (indicando ponto de entrada atrativo no ciclo de commodity).</li>
                    <li><strong>Alavancagem Controlada:</strong> <code>metrics.netDebtToEbitda</code> < 2.5x (empresa com balanço saudável para aproveitar a alta).</li>
                    <li><strong>Upside Expressivo:</strong> <code>upside1Y</code> > 25% (potencial justifica o risco de timing do ciclo).</li>
                </ul>
            </div>
            <div class="sell-section">
                <h4>❌ Gatilhos de Venda (Quando Sair)</h4>
                <ul>
                    <li><strong>Reversão do Ciclo de Commodity:</strong> O preço da commodity perde a Média Móvel de 200 dias ou apresenta padrão técnico de topo (ex: topos descendentes).</li>
                    <li><strong>Compressão de Margem:</strong> <code>metrics.ebitdaMargin</code> começa a cair, sinalizando que custos estão subindo mais rápido que preços (pico do ciclo).</li>
                    <li><strong>Reversão Cambial:</strong> <code>macroAnalysis.brazil.exchange.trend</code> = "APPRECIATION" (Real se fortalecendo, prejudicando exportadores).</li>
                    <li><strong>Valuation Esticado de Ciclo:</strong> <code>metrics.evEbitda</code> > 8x (indicando euforia no setor).</li>
                </ul>
            </div>
            <div class="examples-section">
                <h4>📌 Exemplos de Empresas Pod Global:</h4>
                <p>PETR4 (Petrobras), VALE3 (Vale), SUZB3 (Suzano), CSNA3 (CSN), PRIO3 (PetroRio).</p>
            </div>
        </div>
    </div>

    <!-- Pod Selic -->
    <div class="strategy-card">
        <div class="header selic">
            <h3>📉 Pod Selic (Virada de Ciclo Macro)</h3>
            <p class="thesis-intro">Tese de <strong>timing macroeconômico</strong>. Ações altamente sensíveis à queda da taxa Selic (juros). Empresas de setores cíclicos domésticos (construção civil, varejo, bancos de crédito) se beneficiam da redução do custo de capital e aquecimento da economia interna. Alavancagem financeira positiva: quanto maior a dívida, maior o ganho com a queda dos juros.</p>
        </div>
        <div class="content">
            <div class="buy-section">
                <h4>✅ Gatilhos de Compra (Quando Entrar)</h4>
                <ul>
                    <li><strong>Ciclo de Queda de Juros Confirmado:</strong> <code>macroAnalysis.brazil.selic.trend</code> = "DOWN" (Banco Central em ciclo de corte de juros, confirmado por pelo menos 2 reuniões consecutivas do COPOM).</li>
                    <li><strong>Revisão de Consenso:</strong> <code>analystTargets.revisions.delta30d</code> > 10% (mercado começando a reprecificar o setor para cima).</li>
                    <li><strong>Alavancagem como Catalisador:</strong> Focar em empresas com <code>metrics.netDebtToEbitda</code> > 1.5x, pois são as que mais se beneficiam da queda no custo da dívida.</li>
                    <li><strong>Valuation Comprimido:</strong> <code>metrics.pe</code> < 12x (setor ainda subprecificado, não refletindo a melhora macro).</li>
                    <li><strong>Upside Substancial:</strong> <code>upside1Y</code> > 30% (potencial de reprecificação justifica o risco).</li>
                </ul>
            </div>
            <div class="sell-section">
                <h4>❌ Gatilhos de Venda (Quando Sair)</h4>
                <ul>
                    <li><strong>Inversão do Ciclo de Juros:</strong> <code>macroAnalysis.brazil.selic.trend</code> = "UP" (COPOM sinaliza novo ciclo de alta de juros).</li>
                    <li><strong>Valuation de Euforia:</strong> <code>metrics.pe</code> do setor (ex: Construção Civil) ultrapassa 20x, indicando que a tese já foi precificada.</li>
                    <li><strong>Deterioração Fundamental:</strong> <code>metrics.revenueGrowth</code> < 5% por 2 trimestres, indicando que a melhora macro não está se traduzindo em resultados.</li>
                    <li><strong>Realização de Lucro em Alvo:</strong> <code>currentPrice</code> atinge ou supera <code>projections.target1Y</code> (tese concluída, realizar lucro).</li>
                </ul>
            </div>
            <div class="examples-section">
                <h4>📌 Exemplos de Empresas Pod Selic:</h4>
                <p>PLPL3 (Plano & Plano), CURY3 (Cury), DIRR3 (Direcional), CPFE3 (CPFL), CMIG4 (Cemig), EQTL3 (Equatorial).</p>
            </div>
        </div>
    </div>

    <!-- Playbook de Saída Geral -->
    <div class="strategy-card">
        <div class="header exit">
            <h3>🎯 Playbook Universal de Saída</h3>
            <p class="thesis-intro">Regras de decisão para <strong>realização de lucro, rotação de carteira ou stop loss fundamental</strong>, aplicáveis independentemente do Pod.</p>
        </div>
        <div class="content">
            <div class="scenario">
                <h4>📊 Cenário 1: Tese Concluída (Realizar Lucro)</h4>
                <ul>
                    <li><strong>Gatilho:</strong> <code>currentPrice</code> ≥ <code>projections.target1Y</code> (alvo de 1 ano atingido).</li>
                    <li><strong>Ação:</strong> Venda parcial de 30-50% da posição para cristalizar lucro. Realocação do capital em nova oportunidade com <code>upside5Y</code> > 100% (múltiplo de crescimento superior).</li>
                    <li><strong>Exceção:</strong> Se a empresa mantém <code>metrics.earningsGrowth</code> > 20% E <code>metrics.roe</code> > 25%, considerar manter a posição (tese de crescimento ainda intacta).</li>
                </ul>
            </div>

            <div class="scenario">
                <h4>🔄 Cenário 2: Custo de Oportunidade (Rotação de Carteira)</h4>
                <ul>
                    <li><strong>Gatilho:</strong> Um ativo na carteira (Ativo A) apresenta <code>upside5Y</code> < 50% (múltiplo de crescimento 5Y < 1.5x), enquanto surge uma nova tese (Ativo B) com <code>upside5Y</code> > 150% (múltiplo > 2.5x) E <code>score</code> ≥ 80.</li>
                    <li><strong>Ação:</strong> Vender 100% do Ativo A e alocar 100% no Ativo B. A diferença de múltiplo justifica a rotação (maximizar potencial da carteira).</li>
                    <li><strong>Validação:</strong> O Ativo B deve atender aos gatilhos de compra do Pod correspondente (não comprar apenas por upside, validar fundamentos).</li>
                </ul>
            </div>

            <div class="scenario">
                <h4>🚨 Cenário 3: Tese Quebrada (Stop Loss Fundamental)</h4>
                <ul>
                    <li><strong>Gatilho Crítico:</strong> <code>pod</code> = "Pod Sell" (empresa reclassificada como "Evitar" - ex: GOLL4, AMBP3).</li>
                    <li><strong>Gatilho do Pod:</strong> O gatilho de <strong>saída</strong> do Pod principal foi ativado (ex: Pod Global com commodity em bear market confirmado, Pod Selic com Selic subindo).</li>
                    <li><strong>Ação:</strong> <strong>Venda total e imediata</strong>. Preservação de capital é a prioridade absoluta. Não esperar recuperação - tese já invalidada.</li>
                    <li><strong>Exceção Zero:</strong> Não há exceção. Tese quebrada = sair.</li>
                </ul>
            </div>

            <div class="scenario">
                <h4>⚖️ Cenário 4: Gerenciamento de Risco (Rebalanceamento)</h4>
                <ul>
                    <li><strong>Gatilho:</strong> Um ativo ultrapassou 25% da carteira total (concentração excessiva), mesmo que a tese continue válida.</li>
                    <li><strong>Ação:</strong> Reduzir posição para 15-20% da carteira, realocando o excesso em outras oportunidades do portfólio para diversificação.</li>
                    <li><strong>Racionalidade:</strong> Proteger a carteira de risco idiossincrático (evento específico da empresa).</li>
                </ul>
            </div>
        </div>
    </div>

</div>

<div class="strategy-footer">
    <p><strong>Nota Importante:</strong> Este playbook é um framework de decisão baseado em dados quantitativos. Toda decisão de investimento deve considerar também análise qualitativa (governança, competição, regulação) e tolerância individual ao risco. <strong>Rentabilidade passada não garante rentabilidade futura.</strong></p>
</div>
    `;
}

/**
 * HTML COMPLETO PARA SIMULATOR - Simulador de Alocação Inteligente
 */
function getSimulatorHTML() {
    return `
<div class="simulator-section">
    <div class="simulator-title">💼 Simulador de Alocação Inteligente</div>
    <div class="simulator-subtitle">
        Monte sua carteira selecionando as melhores ações por score e simule o potencial de crescimento
    </div>

    <!-- Seleção de Ações -->
    <div class="stock-selection-area">
        <h3>1️⃣ Selecione as Ações (Top 10 por Score)</h3>
        <div class="stock-chips-container" id="stock-chips-container">
            <!-- Chips gerados dinamicamente via populateStockChips() -->
        </div>
    </div>

    <!-- Configuração do Aporte -->
    <div class="allocation-config">
        <h3>2️⃣ Configure o Aporte</h3>
        <div class="config-grid">
            <div class="config-item">
                <label>Valor Total do Aporte (R$)</label>
                <input type="number" id="monthly-input" value="10000" min="100" step="100" class="simulator-input">
            </div>
            <div class="config-item">
                <label>Estratégia de Alocação</label>
                <select id="allocation-strategy" class="simulator-select">
                    <option value="score">Por Score (Maior score = maior peso)</option>
                    <option value="equal">Igualitária (Mesmo peso para todas)</option>
                    <option value="upside">Por Upside 5Y (Maior potencial = maior peso)</option>
                </select>
            </div>
        </div>
        <button class="simulator-btn" onclick="calculateAllocation()">🧮 Calcular Alocação</button>
    </div>

    <!-- Resultados da Alocação -->
    <div class="allocation-results" id="allocation-results" style="display: none;">
        <h3>3️⃣ Resultado da Alocação</h3>
        <div class="results-summary" id="results-summary">
            <!-- Resumo gerado dinamicamente -->
        </div>
        <div class="allocation-table-wrapper">
            <table class="allocation-table" id="allocation-table">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Score</th>
                        <th>Pod</th>
                        <th>Peso %</th>
                        <th>Valor R$</th>
                        <th>Preço Atual</th>
                        <th>Qtd Ações</th>
                        <th>Alvo 1Y</th>
                        <th>Alvo 5Y</th>
                        <th>Upside 1Y</th>
                        <th>Upside 5Y</th>
                    </tr>
                </thead>
                <tbody id="allocation-table-body">
                    <!-- Linhas geradas dinamicamente -->
                </tbody>
            </table>
        </div>
        <div class="projection-summary" id="projection-summary">
            <!-- Projeções geradas dinamicamente -->
        </div>
    </div>
</div>
    `;
}

/**
 * SIMULADOR DE ALOCAÇÃO
 */
function setupSimulator() {
    console.log('✓ Simulador configurado');
}

function populateStockChips() {
    const container = document.getElementById('stock-chips-container');
    if (!container) return;

    // Selecionar top 10 empresas por score
    const topCompanies = companiesData.slice(0, 10);

    container.innerHTML = topCompanies.map(company => `
        <div class="stock-chip ${simulationSelectedTickers.has(company.ticker) ? 'selected' : ''}"
             onclick="toggleStockSelection('${company.ticker}')">
            <span class="chip-ticker">${company.ticker}</span>
            <span class="chip-name">${company.name}</span>
            <span class="chip-score">${company.finalScore || company.score}</span>
        </div>
    `).join('');
}

function toggleStockSelection(ticker) {
    if (simulationSelectedTickers.has(ticker)) {
        simulationSelectedTickers.delete(ticker);
    } else {
        simulationSelectedTickers.add(ticker);
    }
    populateStockChips();
}

/**
 * GRÁFICOS COM CHART.JS
 */
function createAllCharts() {
    console.log('📊 Criando gráficos...');

    if (typeof Chart === 'undefined') {
        console.warn('⚠ Chart.js não carregado');
        return;
    }

    // Gráfico 1: Top 8 Múltiplos de Crescimento
    createTopMultipleChart();

    // Gráfico 2: Múltiplo Médio por Pod
    createPodMultipleChart();

    // Gráfico 3: Alocação Recomendada
    createAllocationChart();

    console.log('✅ Gráficos criados com sucesso');
}

function createTopMultipleChart() {
    const ctx = document.getElementById('topMultipleChart');
    if (!ctx) return;

    const top8 = companiesData.slice(0, 8);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top8.map(c => c.ticker),
            datasets: [{
                label: 'Múltiplo 10Y',
                data: top8.map(c => {
                    const target10Y = getTargetPrice(c, '10Y');
                    return target10Y ? (target10Y / c.currentPrice).toFixed(2) : 0;
                }),
                backgroundColor: '#0a84ff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#2c2c2e' } },
                x: { grid: { color: '#2c2c2e' } }
            }
        }
    });
}

function createPodMultipleChart() {
    const ctx = document.getElementById('podMultipleChart');
    if (!ctx) return;

    const pods = ['Pod Selic', 'Pod Global', 'Pod Secular'];
    const avgMultiples = pods.map(pod => {
        const podCompanies = companiesData.filter(c => c.pod === pod);
        if (podCompanies.length === 0) return 0;

        const sum = podCompanies.reduce((acc, c) => {
            const target10Y = getTargetPrice(c, '10Y');
            return acc + (target10Y ? target10Y / c.currentPrice : 0);
        }, 0);

        return (sum / podCompanies.length).toFixed(2);
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pods.map(p => p.replace('Pod ', '')),
            datasets: [{
                label: 'Múltiplo Médio 10Y',
                data: avgMultiples,
                backgroundColor: ['#0a84ff', '#30d158', '#bf5af2']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#2c2c2e' } },
                x: { grid: { color: '#2c2c2e' } }
            }
        }
    });
}

function createAllocationChart() {
    const ctx = document.getElementById('allocationChart');
    if (!ctx) return;

    const top5 = companiesData.slice(0, 5);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: top5.map(c => c.ticker),
            datasets: [{
                data: top5.map(c => (c.finalScore || c.score)),
                backgroundColor: ['#0a84ff', '#30d158', '#bf5af2', '#ff9f0a', '#ff453a']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#ffffff' }
                }
            }
        }
    });
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

/**
 * CALCULADORA DE ALOCAÇÃO - Simulador
 */
function calculateAllocation() {
    // Obter ações selecionadas
    const selectedTickers = Array.from(simulationSelectedTickers);
    if (selectedTickers.length === 0) {
        alert('Selecione pelo menos uma ação para simular.');
        return;
    }

    // Obter configurações
    const totalAmount = parseFloat(document.getElementById('monthly-input').value) || 10000;
    const strategy = document.getElementById('allocation-strategy').value;

    // Buscar empresas selecionadas
    const selectedCompanies = companiesData.filter(c => selectedTickers.includes(c.ticker));

    // Calcular pesos baseado na estratégia
    let weights = [];
    if (strategy === 'equal') {
        // Alocação igualitária
        weights = selectedCompanies.map(() => 1 / selectedCompanies.length);
    } else if (strategy === 'score') {
        // Alocação por score (maior score = maior peso)
        const totalScore = selectedCompanies.reduce((sum, c) => sum + (c.finalScore || c.score), 0);
        weights = selectedCompanies.map(c => (c.finalScore || c.score) / totalScore);
    } else if (strategy === 'upside') {
        // Alocação por upside 5Y (maior upside = maior peso)
        const upsides = selectedCompanies.map(c => {
            const upside = calculateUpside(c.currentPrice, getTargetPrice(c, '5Y'));
            return Math.max(upside, 0); // Evitar negativos
        });
        const totalUpside = upsides.reduce((sum, u) => sum + u, 0);
        weights = upsides.map(u => totalUpside > 0 ? u / totalUpside : 1 / selectedCompanies.length);
    }

    // Calcular alocação para cada empresa
    const allocations = selectedCompanies.map((company, i) => {
        const weight = weights[i];
        const value = totalAmount * weight;
        const quantity = Math.floor(value / company.currentPrice);
        const actualValue = quantity * company.currentPrice;
        const upside1Y = calculateUpside(company.currentPrice, getTargetPrice(company, '1Y'));
        const upside5Y = calculateUpside(company.currentPrice, getTargetPrice(company, '5Y'));

        return {
            ticker: company.ticker,
            name: company.name,
            pod: company.pod,
            score: company.finalScore || company.score,
            weight: weight * 100,
            value: actualValue,
            currentPrice: company.currentPrice,
            quantity,
            target1Y: getTargetPrice(company, '1Y'),
            target5Y: getTargetPrice(company, '5Y'),
            upside1Y,
            upside5Y
        };
    });

    // Calcular métricas gerais
    const totalAllocated = allocations.reduce((sum, a) => sum + a.value, 0);
    const weightedUpside1Y = allocations.reduce((sum, a) => sum + (a.upside1Y * a.weight / 100), 0);
    const weightedUpside5Y = allocations.reduce((sum, a) => sum + (a.upside5Y * a.weight / 100), 0);
    const expectedValue1Y = totalAllocated * (1 + weightedUpside1Y / 100);
    const expectedValue5Y = totalAllocated * (1 + weightedUpside5Y / 100);

    // Renderizar resultados
    renderAllocationResults(allocations, {
        totalAmount,
        totalAllocated,
        weightedUpside1Y,
        weightedUpside5Y,
        expectedValue1Y,
        expectedValue5Y
    });
}

function renderAllocationResults(allocations, summary) {
    // Mostrar seção de resultados
    document.getElementById('allocation-results').style.display = 'block';

    // Renderizar resumo
    document.getElementById('results-summary').innerHTML = `
        <div class="summary-grid">
            <div class="summary-item">
                <span class="summary-label">Total Aportado:</span>
                <span class="summary-value">${formatCurrency(summary.totalAllocated)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Número de Ações:</span>
                <span class="summary-value">${allocations.length}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Upside Médio 1Y:</span>
                <span class="summary-value positive">${formatPercentage(summary.weightedUpside1Y)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Upside Médio 5Y:</span>
                <span class="summary-value positive">${formatPercentage(summary.weightedUpside5Y)}</span>
            </div>
        </div>
    `;

    // Renderizar tabela de alocação
    const tbody = document.getElementById('allocation-table-body');
    tbody.innerHTML = allocations.map(a => `
        <tr>
            <td><strong>${a.ticker}</strong></td>
            <td><span class="score-badge ${getScoreClass(a.score)}">${a.score}</span></td>
            <td><span class="tag ${getPodClass(a.pod)}">${a.pod.replace('Pod ', '')}</span></td>
            <td>${formatNumber(a.weight, 1)}%</td>
            <td>${formatCurrency(a.value)}</td>
            <td>${formatCurrency(a.currentPrice)}</td>
            <td>${a.quantity}</td>
            <td>${formatCurrency(a.target1Y)}</td>
            <td>${formatCurrency(a.target5Y)}</td>
            <td class="${a.upside1Y > 0 ? 'positive' : 'negative'}">${formatPercentage(a.upside1Y)}</td>
            <td class="${a.upside5Y > 0 ? 'positive' : 'negative'}">${formatPercentage(a.upside5Y)}</td>
        </tr>
    `).join('');

    // Renderizar projeções
    document.getElementById('projection-summary').innerHTML = `
        <h4>📈 Projeção de Patrimônio</h4>
        <div class="projection-grid">
            <div class="projection-item">
                <span class="projection-label">Investimento Inicial:</span>
                <span class="projection-value">${formatCurrency(summary.totalAllocated)}</span>
            </div>
            <div class="projection-item">
                <span class="projection-label">Patrimônio Esperado em 1 Ano:</span>
                <span class="projection-value positive">${formatCurrency(summary.expectedValue1Y)}</span>
                <span class="projection-delta">(${formatPercentage(summary.weightedUpside1Y)} retorno)</span>
            </div>
            <div class="projection-item">
                <span class="projection-label">Patrimônio Esperado em 5 Anos:</span>
                <span class="projection-value positive">${formatCurrency(summary.expectedValue5Y)}</span>
                <span class="projection-delta">(${formatPercentage(summary.weightedUpside5Y)} retorno total)</span>
            </div>
        </div>
        <p class="disclaimer">⚠️ <strong>Aviso:</strong> Estas são projeções baseadas em dados históricos e consenso de mercado. Não há garantia de rentabilidade futura.</p>
    `;

    // Scroll suave para resultados
    document.getElementById('allocation-results').scrollIntoView({ behavior: 'smooth' });
}

console.log('✓ app.js carregado');
