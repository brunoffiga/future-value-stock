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
let currentFilters = { search: '', pod: 'all' };
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
            </tr>
        `;
    }).join('');

    if (sorted.length === 0) {
        tbody.innerHTML = '<tr><td colspan="15" style="text-align:center;">Nenhuma empresa encontrada.</td></tr>';
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
 * HTML COMPLETO PARA STRATEGY SECTION - Teses & Drivers por Empresa/Setor
 */
function getStrategyHTML() {
    return `
<div class="section-title">Teses de Investimento & Drivers de Mercado</div>
<div class="section-subtitle">
    Mapeamento completo de drivers específicos por empresa e drivers macro por setor
</div>

<div class="strategy-intro">
    <h3>📚 Como Usar Este Mapeamento</h3>
    <p><strong>Drivers específicos (palavras):</strong> palavras-chave curtas que, quando mudam, tendem a afetar diretamente o preço da ação (ex.: "Brent", "celulose", "Selic", "ARPU", "frete", "sinistralidade").</p>
    <p><strong>O que isso significa:</strong> explicação rápida — por que o driver move a ação (ex.: "Brent↑ → receita Petrobras↑").</p>
    <p><strong>Indicador / Horizonte:</strong></p>
    <ul>
        <li><strong>Positivo</strong> = aumento do driver tende a empurrar o preço da ação para cima</li>
        <li><strong>Negativo</strong> = aumento tende a pressionar para baixo</li>
        <li><strong>Misto</strong> = depende (ex.: intervenção política)</li>
        <li><strong>Curto</strong> = impacto visível em dias/meses</li>
        <li><strong>Médio</strong> = trimestres até 2 anos</li>
        <li><strong>Longo</strong> = efeitos estruturais (vários anos)</li>
    </ul>
    <p class="warning">⚠️ <strong>Use esses pares (driver → polaridade/horizonte) como sinais para análise, não como recomendação de compra/venda.</strong> Eles servem para priorizar o que monitorar em cada ação.</p>
</div>

<!-- TABELA DE DRIVERS POR EMPRESA -->
<div class="strategy-section">
    <h2>📊 Drivers Específicos por Empresa</h2>
    <div class="table-wrapper">
        <table class="drivers-table">
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Empresa</th>
                    <th>Setor</th>
                    <th>Drivers Específicos</th>
                    <th>O que isso significa</th>
                    <th>Indicador / Horizonte</th>
                </tr>
            </thead>
            <tbody>
                ${getCompanyDriversRows()}
            </tbody>
        </table>
    </div>
</div>

<!-- TABELA DE DRIVERS MACRO POR SETOR -->
<div class="strategy-section">
    <h2>🌐 Drivers Macro por Setor</h2>
    <div class="sector-drivers-intro">
        <p><strong>Polaridade:</strong> Positivo/Negativo/Volátil/Reativo indica a direção provável do impacto no setor quando o driver muda.</p>
        <p><strong>Horizonte:</strong> Curto = semanas/meses; Médio = meses até ~2 anos; Longo = efeitos estruturais (vários anos).</p>
        <p><strong>Aparecer</strong> = use como gatilho de sentimento/curto prazo; <strong>Acontecer</strong> = validação fundamental — reavalie posições quando o evento se materializar.</p>
    </div>
    <div class="table-wrapper">
        <table class="sector-drivers-table">
            <thead>
                <tr>
                    <th>Setor</th>
                    <th>Driver Macro</th>
                    <th>Se <strong>Subir</strong></th>
                    <th>Se <strong>Descer</strong></th>
                    <th>Se <strong>Aparecer</strong> (notícias)</th>
                    <th>Se <strong>Acontecer</strong> (evento)</th>
                </tr>
            </thead>
            <tbody>
                ${getSectorDriversRows()}
            </tbody>
        </table>
    </div>
</div>

<div class="strategy-footer">
    <p><strong>Nota Importante:</strong> Este mapeamento é baseado em análise histórica e relações fundamentalistas conhecidas. Combine este mapeamento com a análise de cada empresa individual (métricas, scores) para decisões de investimento informadas. <strong>Rentabilidade passada não garante rentabilidade futura.</strong></p>
</div>
    `;
}

/**
 * GERA LINHAS DA TABELA DE DRIVERS POR EMPRESA
 */
function getCompanyDriversRows() {
    const drivers = [
        { ticker: "PLPL3", empresa: "Papelaria / Papel", setor: "Papel & Celulose", drivers: "celulose, preço pulp (USD), demanda export, custo madeira", significado: "Variação do preço celulose/pulp e demanda externa impactam receita e margem", indicador: "Positivo se subir demanda/preço / Longo" },
        { ticker: "CURY3", empresa: "Cury Construtora", setor: "Construção Civil", drivers: "taxa juros (Selic), vendas lançamentos, distratos, financiamento imobiliário", significado: "Juros mais baixos + vendas altas = maior VGV e lucro", indicador: "Positivo se Selic cair / Curto-Médio" },
        { ticker: "DIRR3", empresa: "Direcional", setor: "Construção Civil", drivers: "financiamento habitacional, incorporadoras, distratos, lançamentos", significado: "Mudanças nos subsídios e crédito alteram velocidade de vendas", indicador: "Positivo se crédito facilitar / Curto-Médio" },
        { ticker: "PETR4", empresa: "Petrobras", setor: "Petróleo & Gás", drivers: "preço Brent, câmbio (USD/BRL), produção/PO&G, política pública, royalties", significado: "Petróleo + câmbio favorável aumentam receita; intervenção estatal é risco", indicador: "Positivo se Brent↑ ou USD↑ / Misto (político)" },
        { ticker: "VALE3", empresa: "Vale", setor: "Mineração", drivers: "minério de ferro (Fe), demanda China, frete, acidentes/vale-disponibilidade", significado: "Preço do minério e demanda chinesa determinam receitas", indicador: "Positivo se minério↑ / Longo" },
        { ticker: "SUZB3", empresa: "Suzano", setor: "Celulose", drivers: "celulose (short-fibre), câmbio, custo madeira, demanda papel tissue", significado: "Preços de celulose e câmbio definem margens", indicador: "Positivo se celulose↑ / Longo" },
        { ticker: "WEGE3", empresa: "WEG", setor: "Bens de Capital", drivers: "ordem de fabricação, transição energética, exportações, dólar", significado: "Crescimento global e elétrificação aumentam vendas", indicador: "Positivo se capex global↑ / Longo" },
        { ticker: "ITUB4", empresa: "Itaú", setor: "Bancos", drivers: "spreads, inadimplência, taxa juros, crédito PJ/consumidor", significado: "Juros e qualidade da carteira definem lucro bancário", indicador: "Positivo se spreads↑ e inadimplência↓ / Curto-Médio" },
        { ticker: "BBDC4", empresa: "Bradesco", setor: "Bancos", drivers: "taxa juros, qualidade crédito, provisões, capilaridade", significado: "Mesmo raciocínio bancos: juro e crédito impactam lucro", indicador: "Positivo se Selic↑ (em margem) / Curto-Médio" },
        { ticker: "BBAS3", empresa: "Banco do Brasil", setor: "Bancos", drivers: "política agrícola, crédito rural, exposição governo, juro", significado: "Forte exposição ao agro e ao setor público", indicador: "Positivo se crédito agro↑ / Misto (político)" },
        { ticker: "BBSE3", empresa: "BB Seguridade", setor: "Seguros/Financeiro", drivers: "taxas juros (investimento reservas), sinistralidade, venda seguros", significado: "Rendimento de reservas e sinistros definem resultado", indicador: "Positivo se juros↑ e sinistralidade↓ / Curto-Médio" },
        { ticker: "MGLU3", empresa: "Magazine Luiza", setor: "Varejo / E-commerce", drivers: "GMV, margem bruta, logística, churn, vendas omnichannel", significado: "Crescimento de vendas/market share = acelera lucro", indicador: "Positivo se GMV↑ e logística melhora / Curto-Médio" },
        { ticker: "LREN3", empresa: "Lojas Renner", setor: "Varejo", drivers: "consumo doméstico, ticket médio, inventário, sazonalidade", significado: "Consumo e giro de estoque impactam lucro", indicador: "Positivo se consumo↑ / Curto-Médio" },
        { ticker: "GGBR4", empresa: "Gerdau", setor: "Siderurgia", drivers: "preço aço, construção/automotivo demanda, custo sucata", significado: "Aço e demanda industrial ditam receita", indicador: "Positivo se demanda construção/auto↑ / Longo" },
        { ticker: "B3SA3", empresa: "B3 (Bolsa)", setor: "Serviços Financeiros", drivers: "volumes negociação, juros, oferta IPOs, volatilidade", significado: "Mais volume = mais receita de clearing/negociação", indicador: "Positivo se volumes/IPO↑ / Curto-Médio" },
        { ticker: "CSNA3", empresa: "CSN", setor: "Siderurgia / Mineração", drivers: "preço aço, minério, demanda construção, câmbio", significado: "Mesma dinâmica do aço e minério", indicador: "Positivo se demanda industrial↑ / Longo" },
        { ticker: "CPFE3", empresa: "CPFL", setor: "Energia Elétrica", drivers: "consumo industrial, tarifas ANEEL, reajustes regulatórios", significado: "Tarifas e consumo definem receita regulada", indicador: "Positivo se tarifas aprovadas / Curto-Médio" },
        { ticker: "ABEV3", empresa: "Ambev", setor: "Bebidas", drivers: "consumo doméstico, preço/taxa câmbio (insumos), concorrência", significado: "Volume e preço são determinantes", indicador: "Positivo se consumo↑ / Curto" },
        { ticker: "HYPE3", empresa: "Hypera", setor: "Farmacêutica", drivers: "lançamentos, regulação preço, venda OTC, M&A", significado: "Pipeline e regulação afetam crescimento", indicador: "Positivo se lançamentos/M&A bem-sucedidos / Longo" },
        { ticker: "CCRO3", empresa: "CCR", setor: "Concessões (infra)", drivers: "tráfego rodoviário, pedágio, reajuste contratual, investimentos públicos", significado: "Volume tráfego e reajustes geram receita", indicador: "Positivo se tráfego↑ e reajustes aprovados / Longo" },
        { ticker: "JBSS3", empresa: "JBS", setor: "Proteínas / Alimentos", drivers: "preço commodities (soja, milho), câmbio, exportações, sanidade", significado: "Custo de ração e exportações impactam margem", indicador: "Positivo se preço proteínas↑ e câmbio favorável / Curto-Médio" },
        { ticker: "RADL3", empresa: "Raia Drogasil", setor: "Varejo / Farmácias", drivers: "fluxo clientes, vendas mesmas lojas, margem genéricos", significado: "Crescimento de SSS e expansão de lojas", indicador: "Positivo se SSS↑ / Curto-Médio" },
        { ticker: "FLRY3", empresa: "Fleury", setor: "Saúde / Diagnóstico", drivers: "volume exames, parcerias, regulação ANS, telemedicina", significado: "Volume de serviços e contratos com planos", indicador: "Positivo se demanda exames↑ / Curto-Médio" },
        { ticker: "VIVT3", empresa: "Telefônica Brasil (Vivo)", setor: "Telecom", drivers: "ARPU, capex 5G, churn, regulamentação ANATEL", significado: "ARPU e roll-out 5G definem receita", indicador: "Positivo se ARPU/5G adoption↑ / Longo" },
        { ticker: "CMIG4", empresa: "Cemig", setor: "Energia", drivers: "produção hidrelétrica, chuvas, tarifa, bandeiras ANEEL", significado: "Hidrologia e tarifas impactam caixa", indicador: "Positivo se chuvas favoráveis / Curto" },
        { ticker: "EQTL3", empresa: "Equatorial", setor: "Energia", drivers: "eficiência distribuição, tarifas, expansão concessões", significado: "Menor perda = mais margem", indicador: "Positivo se expansão e redução perdas / Curto-Médio" },
        { ticker: "CPLE6", empresa: "Copel", setor: "Energia", drivers: "chuvas, tarifas, geração/hidro, contratos", significado: "Hidrologia + contratos regulados importam", indicador: "Positivo se chuvas↑ e reajustes / Curto" },
        { ticker: "ITSA4", empresa: "Itaúsa", setor: "Holdings / Investimentos", drivers: "performance holdings (ITUB, K), retorno dividendos", significado: "Resultado depende das subsidiárias", indicador: "Positivo se holdings performarem / Longo" },
        { ticker: "PRIO3", empresa: "PetroRio", setor: "Petróleo & Gás", drivers: "produção óleo, preço Brent, eficiência ativos maduros", significado: "Produção e preço = caixa e dividendos", indicador: "Positivo se produção↑ e Brent↑ / Curto-Médio" },
        { ticker: "MRFG3", empresa: "Marfrig", setor: "Proteína / Alimentos", drivers: "preço proteína, exportações, custos ração", significado: "Similar JBS: custos e exportações definem margem", indicador: "Positivo se demanda/proteína↑ / Curto-Médio" },
        { ticker: "AZUL4", empresa: "Azul", setor: "Linhas Aéreas", drivers: "demanda viagens, preço combustível (jet fuel), capacidade", significado: "Recuperação de demanda e combustível são chave", indicador: "Positivo se demanda↑ e combustível↓ / Curto" },
        { ticker: "GOLL4", empresa: "Gol", setor: "Linhas Aéreas", drivers: "demanda, combustível, capacidade, passagens média", significado: "Mesmo da Azul: demanda e custos → lucro", indicador: "Positivo se demanda↑ e combustível↓ / Curto" },
        { ticker: "VAMO3", empresa: "Vamos", setor: "Locação de caminhões", drivers: "frete rodoviário, demanda logística, taxa juros leasing", significado: "Ciclo logístico e frete determinam uso de frotas", indicador: "Positivo se frete↑ / Curto-Médio" }
    ];

    return drivers.map(d => `
        <tr>
            <td><strong>${d.ticker}</strong></td>
            <td>${d.empresa}</td>
            <td>${d.setor}</td>
            <td class="drivers-cell">${d.drivers}</td>
            <td>${d.significado}</td>
            <td class="indicator-cell">${d.indicador}</td>
        </tr>
    `).join('');
}

/**
 * GERA LINHAS DA TABELA DE DRIVERS MACRO POR SETOR
 */
function getSectorDriversRows() {
    const sectors = [
        { setor: "Papel & Celulose", driver: "Preço da celulose (FOEX)", subir: "Positivo — aumenta receita de exportadoras; melhora margem. (Curto/Médio)", descer: "Negativo — compressão de margens e guidance revisado para baixo. (Curto/Médio)", aparecer: "Volátil/Positivo — relatório de tightness de oferta puxa expectativa e preço no curto. (Curto)", acontecer: "Material/Positivo — alta sustentada muda guidance, CAPEX e distribuição de caixa. (Médio/Longo)" },
        { setor: "Construção Civil", driver: "Selic / Crédito imobiliário / INCC", subir: "Negativo (Selic↑) — encarece financiamento e reduce demanda. (Curto/Médio)", descer: "Positivo (Selic↓) — estimula lançamentos e vendas; INCC↓ melhora margens. (Curto/Médio)", aparecer: "Neutro/Negativo — notícia de aperto de crédito afeta sentiment imediatamente. (Curto)", acontecer: "Direto — novos programas/linhas de crédito (ou cortes) mudam VGV e execução. (Médio)" },
        { setor: "Petróleo & Gás", driver: "Brent / decisões OPEP+ / câmbio", subir: "Positivo p/ produtoras se Brent↑; Negativo p/ consumidores (avião, transporte). (Curto/Médio)", descer: "Negativo p/ produtoras se Brent↓; Positivo p/ setores consumidores. (Curto/Médio)", aparecer: "Volátil — rumor de corte/expansão de oferta move preço e sentimento. (Curto)", acontecer: "Forte — corte/expansão efetivo altera receita e investimentos. (Curto/Médio)" },
        { setor: "Mineração / Siderurgia", driver: "Preço minério / demanda China / frete", subir: "Positivo se minério↑ e China demanda↑ — margens e volumes sobem. (Curto/Médio)", descer: "Negativo se minério↓ ou China desacelera — volumes e preços caem. (Curto/Médio)", aparecer: "Volátil — dados PMI/estoques chineses geram movimentos rápidos. (Curto)", acontecer: "Material — pacote de estímulos/excesso de oferta muda ciclos e guidance. (Médio)" },
        { setor: "Bens de Capital / Indústria", driver: "Ciclo de investimento (CAPEX) / backlog / PMI", subir: "Positivo se CAPEX↑ / backlog↑ — visibilidade e receita futura. (Médio/Longo)", descer: "Negativo se CAPEX↓ / backlog reduzido — demanda cai. (Médio)", aparecer: "Positivo/Neutro — anúncio de programas de investimento provoca re-rating. (Curto/Médio)", acontecer: "Transformador — execução de programas amplia vendas por anos. (Longo)" },
        { setor: "Bancos", driver: "Selic / spread bancário / inadimplência / PDD", subir: "Positivo se spread↑ e inadimplência↓ — lucro melhora. (Curto/Médio)", descer: "Negativo se inadimplência↑ ou spread comprimido — PDD sobe e lucro reduz. (Curto/Médio)", aparecer: "Volátil — sinalizações do BC afetam provisões e pricing. (Curto)", acontecer: "Estrutural — ciclo de juros sustentado altera modelo de lucro e valuation. (Médio)" },
        { setor: "Seguros / Financeiro (BBSE)", driver: "Taxas de juros (retorno reservas) / sinistralidade", subir: "Positivo se juros↑ e sinistralidade↓ — resultado financeiro e margem melhoram. (Curto/Médio)", descer: "Negativo se sinistralidade↑ ou juros↓ — reservas rendem menos e prováveis pressões. (Curto/Médio)", aparecer: "Neutro/Volátil — notícias de grandes sinistros afetam curto prazo. (Curto)", acontecer: "Direto — mudança regulatória ou sinistro macro altera provisões e pricing. (Médio)" },
        { setor: "Varejo / Consumo", driver: "Renda disponível / inflação / confiança consumidor / GMV", subir: "Positivo se renda↑ e confiança↑ — ticket e vendas sobem. (Curto/Médio)", descer: "Negativo se inflação↑ real/poder de compra↓ — promoções e compressão de margem. (Curto)", aparecer: "Reativo — relatórios de confiança/PIB alteram expectativa e estoque. (Curto)", acontecer: "Material — mudança persistente no consumo (por ex., recessão) impacta receitas. (Médio)" },
        { setor: "Siderurgia / Metalurgia", driver: "Preço do aço / custo minério / demanda industrial", subir: "Positivo se preço aço↑ e demanda industrial↑ — melhora margem. (Curto/Médio)", descer: "Negativo se preço aço↓ ou custo minério↑ — margem comprimida. (Curto/Médio)", aparecer: "Volátil — notícias sobre capacidade global / oferta/China movem preço. (Curto)", acontecer: "Impacto direto — booms ou quedas industriais mudam volumes e guidance. (Médio)" },
        { setor: "Serviços Financeiros / Bolsa (B3)", driver: "Volume negociado / volatilidade / IPOs", subir: "Positivo se volumes↑ e volatilidade saudável — receitas transacionais sobem. (Curto/Médio)", descer: "Negativo se volumes↓ ou mercado quieto — receitas transacionais caem. (Curto)", aparecer: "Positivo — aparecimento de grandes IPOs ou fusões aumenta volumes. (Curto)", acontecer: "Direto — onda de IPOs / mercado ativo gera ganho de receita consistente. (Curto/Médio)" },
        { setor: "Energia Elétrica", driver: "Hidrologia (reservatórios), tarifas ANEEL, bandeiras", subir: "Positivo se hidrologia favorável e tarifas reajustadas — menor custo térmico e caixa melhor. (Curto/Médio)", descer: "Negativo se seca persistente (mais térmico) e tarifa limitada — custos sobem. (Curto/Médio)", aparecer: "Volátil — relatório hídrico ou decisão de bandeiras muda percepção. (Curto)", acontecer: "Crítico — decisão tarifária ou seca prolongada altera lucro e preço. (Curto/Médio)" },
        { setor: "Bebidas", driver: "Preço de insumos (malte/açúcar), mix (premium)", subir: "Negativo se insumos↑ — margem pressionada; Positivo se mix premium↑ — ticket sobe. (Curto)", descer: "Positivo se insumos↓ ou mix melhora — margem sobe. (Curto)", aparecer: "Reativo — surtos de custo/fornecimento aparecem rápido nas notícias. (Curto)", acontecer: "Operacional — mudança de mix sustentada altera receita e margem. (Médio)" },
        { setor: "Farmacêutica", driver: "Regulação de preços / lançamentos / pipeline / genéricos", subir: "Positivo se lançamentos bem-sucedidos e pipeline forte — receita de longo prazo. (Médio/Longo)", descer: "Negativo se regulação apertar preços ou generics ganhar mercado — receita impactada. (Curto/Médio)", aparecer: "Volátil — notícia de aprovação/recall move preço. (Curto)", acontecer: "Estrutural — decisão regulatória ou sucesso de produto muda valuation. (Médio/Longo)" },
        { setor: "Saúde / Diagnóstico", driver: "Demanda por exames / contratos planos / ANS", subir: "Positivo se demanda↑ e contratos favoráveis — volume e receita aumentam. (Curto/Médio)", descer: "Negativo se planos reduzirem cobertura ou sinistralidade subir — pressão de preço. (Curto/Médio)", aparecer: "Reativo — notícia sobre ANS/contratos afeta curto prazo. (Curto)", acontecer: "Material — mudança regulatória ou grande contrato altera fluxo de caixa. (Médio)" },
        { setor: "Concessões / Infraestrutura", driver: "Tráfego / revisão tarifária / novos leilões", subir: "Positivo se tráfego↑ e revisões favoráveis — receita cresce. (Curto/Médio)", descer: "Negativo se tráfego↓ ou revisão cortar tarifas — receita reduz. (Curto/Médio)", aparecer: "Volátil — notícia de leilões/renovações traz reação forte. (Curto)", acontecer: "Direto — renovação ou leilão ganho altera backlog e receita futura. (Médio)" },
        { setor: "Proteínas / Alimentos", driver: "Preço commodities (soja, milho), câmbio, sanidade", subir: "Positivo p/ exportadores se commodities↑ e câmbio favorável (receita em USD). (Curto/Médio)", descer: "Negativo p/ processadores se insumos↑ e não repassável — margem comprimida. (Curto/Médio)", aparecer: "Volátil — relatório USDA/IBGE ou surto sanitário mexe com preço. (Curto)", acontecer: "Estrutural — choque de oferta/sanidade altera produção e preço por meses. (Médio)" },
        { setor: "Telecomunicações", driver: "ARPU / churn / rollout 5G / regulação ANATEL", subir: "Positivo se ARPU↑ e adopção 5G↑ — receita recorrente sobe. (Médio/Longo)", descer: "Negativo se churn↑ ou ARPU↓ — receita reduz; regulação restritiva aperta margem. (Curto/Médio)", aparecer: "Positivo — notícia de licença/rollout acelera expectativa. (Curto/Médio)", acontecer: "Determinante — rollout 5G/fibra e decisões regulatórias mudam estrutura competitiva. (Médio/Longo)" },
        { setor: "Aviação", driver: "Preço combustível (jet fuel) / demanda viagens / capacidade", subir: "Negativo se combustível↑ — custo operacional sobe; Positivo se demanda↑ — yield e ocupação melhoram. (Curto)", descer: "Positivo se combustível↓ e demanda↑ — margens melhoram. (Curto)", aparecer: "Volátil — notícia de choque (geopolítico/pandemia) derruba demanda. (Curto)", acontecer: "Direto — choque prolongado (pandemia, crise) reduz demanda e receita significativamente. (Curto/Médio)" },
        { setor: "Locação de veículos (frotas)", driver: "Frete / demanda logística / custo capex e manutenção", subir: "Positivo se frete/demanda logística↑ — utilização da frota sobe. (Curto/Médio)", descer: "Negativo se frete↓ ou excesso de oferta de frota — utilização cai. (Curto/Médio)", aparecer: "Reativo — notícia de paralisações/logística afeta uso de frota. (Curto)", acontecer: "Operacional — mudança estrutural na cadeia logística altera demanda por frotas. (Médio)" },
        { setor: "Holdings / Investimentos", driver: "Desconto de holding / alocação capital / performance subsidiárias", subir: "Positivo se desconto reduz (unlock value) ou holdings performam melhor — revalorização. (Médio/Longo)", descer: "Negativo se subsidiárias pioram ou desconto persiste — valuation comprimido. (Médio)", aparecer: "Positivo — anúncio de spin-off ou reestruturação melhora expectativa. (Curto/Médio)", acontecer: "Transformador — execução de spin-off / reorg altera valor percebido e dividends. (Médio/Longo)" }
    ];

    return sectors.map(s => `
        <tr>
            <td><strong>${s.setor}</strong></td>
            <td>${s.driver}</td>
            <td class="impact-cell">${s.subir}</td>
            <td class="impact-cell">${s.descer}</td>
            <td class="impact-cell">${s.aparecer}</td>
            <td class="impact-cell">${s.acontecer}</td>
        </tr>
    `).join('');
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

    // Destruir gráficos existentes para evitar duplicação
    Object.keys(allCharts).forEach(key => {
        if (allCharts[key]) {
            allCharts[key].destroy();
            delete allCharts[key];
        }
    });

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

    allCharts.topMultiple = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top8.map(c => c.ticker),
            datasets: [{
                label: 'Múltiplo 5Y',
                data: top8.map(c => {
                    const target5Y = getTargetPrice(c, '5Y');
                    return target5Y ? (target5Y / c.currentPrice).toFixed(2) : 0;
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
            const target5Y = getTargetPrice(c, '5Y');
            return acc + (target5Y ? target5Y / c.currentPrice : 0);
        }, 0);

        return (sum / podCompanies.length).toFixed(2);
    });

    allCharts.podMultiple = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: pods.map(p => p.replace('Pod ', '')),
            datasets: [{
                label: 'Múltiplo Médio 5Y',
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

    allCharts.allocation = new Chart(ctx, {
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
