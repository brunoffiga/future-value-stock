# 🚀 B3 SmallCaps Intelligence Platform v2.0
## Sistema Profissional de Análise Preditiva Multidimensional

---

## 📊 Visão Geral

Plataforma avançada de análise multidimensional para Small Caps da B3, combinando:
- **Análise Fundamentalista** (Valor, Qualidade, Crescimento)
- **Análise Técnica** (Tendência, Momentum, Volume)
- **Consenso de Analistas** (Price Targets, Revisões)
- **Smart Money** (Insiders, Institucionais)
- **Machine Learning** (Predições, Backtesting)
- **Análise Macro** (Regime, Sensibilidades)

---

## 🎯 Sistema de Teses (Pods)

### Pod Secular
Empresas de crescimento estrutural independentes do ciclo econômico.
**Método**: Startup Valuation (ARR, Crescimento, Escalabilidade)
**Exemplos**: WEG, Totvs, Smart Fit

### Pod Global
Empresas descorrelacionadas da Selic, expostas a commodities/dólar.
**Método**: Valuation por Commodity Pricing
**Exemplos**: Suzano, 3tentos, Petrobras

### Pod Selic
Empresas sensíveis à queda de juros (Risco-Brasil).
**Método**: DCF ajustado por spread de crédito
**Exemplos**: Plano & Plano, Cury, Direcional

---

## 📁 Estrutura do Projeto V2.0

```
future-value-stock/
├── config/
│   └── api-config.js                  # (FASE 2.1) Configuração de APIs
├── data/
│   └── data-companies-enhanced.js     # (FASE 1) Banco de dados FUNDIDO
├── services/
│   ├── data-collector.js              # (FASE 2.2) Coleta de dados externa
│   ├── event-engine.js                # (FASE 3.1) Sistema de triggers
│   └── scoring-engine.js              # (FASE 2.3) Motor de pontuação
├── styles/
│   └── style.css                      # (FASE 4.1) Design system
├── utils/
│   └── utils.js                       # Funções utilitárias globais
├── app.js                             # (FASE 4.1) Orquestrador principal
├── index.html                         # (FASE 4.1) Dashboard unificado
└── README.md                          # Este arquivo

ARQUIVOS LEGADOS (OBSOLETOS - NÃO USAR):
├── data-companies.js                  # → FUNDIDO em data/data-companies-enhanced.js
├── confidence.js                      # → INTEGRADO em services/scoring-engine.js
```

---

## 🔧 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+ (Vanilla)
- **Gráficos**: Chart.js 4.4.1
- **Tipografia**: Inter (Google Fonts)
- **Design**: Dark Mode Profissional
- **Arquitetura**: Modular, Service-Oriented

---

## 📈 Metodologias Implementadas

### 1. Sistema de Conviction Score (Bayesiano)
```javascript
Conviction Score = (
  Data Quality         × 0.30 +
  Projection Consistency × 0.25 +
  Fundamental Health    × 0.25 +
  Historical Accuracy   × 0.20
) × 100
```

### 2. Scoring Multidimensional (6 Dimensões)
```javascript
Score Total = (
  Fundamental  × 0.35 +  // Valor, Qualidade, Crescimento
  Técnico      × 0.20 +  // Tendência, Momentum, Volume
  Consenso     × 0.15 +  // Price Targets, Revisões
  Smart Money  × 0.15 +  // Insiders, Institucionais
  Macro        × 0.10 +  // Regime, Sensibilidades
  ML           × 0.05    // Predições de modelos
) × 100
```

### 3. Sistema de Gatilhos (Event Engine)
13 triggers em 7 categorias:
- **VALUE**: Upside de consenso, Múltiplos de crescimento
- **QUALITY**: ROE excepcional, Baixa alavancagem
- **GROWTH**: Alto crescimento de receita
- **MOMENTUM**: Performance positiva, Recuperação
- **RISK**: Alta alavancagem, Performance negativa, Tese quebrada
- **INCOME**: Alto dividend yield
- **CONFIDENCE**: Alta confiabilidade de projeção

---

## 🚀 Como Usar

### 1. Dashboard Principal (index.html)
- Visualize todas as empresas ranqueadas por Score
- Filtre por Tese (Pod), Setor, Origem dos dados
- Ordene por qualquer coluna (Upside, ROE, P/L, Score, etc.)
- Clique no ticker para análise detalhada (modal)

### 2. Análise Detalhada (Modal)
- Scores Multidimensionais (Radar Chart)
- Conviction Score com breakdown
- Valuation e Preços-Alvo temporais (1Y, 3Y, 5Y, 10Y)
- Performance Histórica + Projeções
- Catalisadores, Riscos e Key Highlights
- Recomendação Final com Confidence Score

### 3. Comparação de Empresas
- Selecione múltiplas empresas via checkboxes
- Compare lado a lado: métricas, projeções, scores
- Radar charts comparativos
- Decisão de alocação

### 4. Simulador de Alocação
- Selecione ações pelo chip visual
- Defina valor do aporte mensal
- Escolha estratégia: Agressiva, Balanceada, Conservadora
- Visualize distribuição e projeção de patrimônio

---

## 📊 Estrutura de Dados Enriquecida

### Empresa Completa (FUSÃO V2)
```javascript
{
  // ========== DADOS BASE ==========
  ticker: "PLPL3",
  name: "Plano & Plano",
  sector: "Construção Civil",
  subsector: "Baixa Renda / MCMV",
  pod: "Pod Selic",

  // Preços e Valuation
  marketCap: 3400000000,
  currentPrice: 16.06,
  targetPrice: 20.60,
  upside: 28.27,

  // Projeções Temporais
  projections: {
    target1Y: 20.60,
    target3Y: 31.00,
    target5Y: 42.00,
    target10Y: 62.00
  },

  // Score e Ranking
  score: 88,
  ranking: 1,
  recommendation: "STRONG BUY",
  confidence: 88,
  source: "V2",

  // Métricas Fundamentalistas
  metrics: {
    pe: 9.63,
    roe: 49,
    roic: 24.89,
    dividendYield: 5.96,
    netDebtToEbitda: 0.2,
    ebitdaMargin: 17.9,
    revenueGrowth: 29.22,
    earningsGrowth: 28.45,
    pb: 3.78,
    evEbitda: 7.28,
    beta: 1.2,
    freeFloat: 27,
    liquidityDaily: 120000000,
    fcfYield: 18.5,
    assetTurnover: 0.85
  },

  // Performance Histórica
  performance: {
    ytd: 71,
    oneYear: 105.5,
    threeYears: 145,
    fiveYears: null
  },

  // Tese de Investimento
  catalysts: [...],
  risks: [...],
  keyHighlights: [...],

  // Consenso
  analystConsensus: {
    buy: 8,
    hold: 1,
    sell: 0
  },

  // Resultados
  lastResults: {
    quarter: "2Q25",
    revenue: 920000000,
    netIncome: 168000000,
    ebitda: 164680000
  },

  nextEarnings: "2025-11-06",
  irWebsite: "https://ri.planoeplano.com.br/",

  // ========== DADOS AVANÇADOS (FASE 1.1 a 1.7) ==========

  // FASE 1.1: Consenso de Price Targets
  analystTargets: {
    consensus: { mean, median, high, low, count, stdDev },
    revisions: { delta30d, delta90d, upgrades, downgrades },
    impliedUpside: { toMean, toMedian, dispersion }
  },

  // FASE 1.3: Análise Técnica
  technicalAnalysis: {
    price: { current, ma20, ma50, ma200, week52High, week52Low },
    momentum: { rsi14, macd: {value, signal, histogram, trend}, stochastic },
    volume: { avgVolume20d, ratio, accumDist, obv },
    signals: { overallScore, recommendation, support, resistance }
  },

  // FASE 1.4: Smart Money
  smartMoney: {
    insiders: { last90days: {netBuys, totalValue, currentPremium}, ownership },
    institutional: { ownership, change3m, change12m, flowTrend, topHolders }
  },

  // FASE 1.6: ML Predictions
  mlPredictions: {
    randomForest: { prediction30d, probability, expectedReturn },
    lstm: { prediction30d, probability },
    ensemble: { consensus, agreement },
    backtest: { accuracy90d, sharpeRatio, maxDrawdown }
  },

  lastUpdated: "2025-11-15T10:30:00Z",
  dataSource: "hybrid" // mock | api | hybrid
}
```

---

## 🎨 Design System

### Cores
```css
--primary: #0a84ff         /* Azul principal */
--success: #30d158         /* Verde - Buy */
--danger: #ff453a          /* Vermelho - Sell */
--warning: #ff9f0a         /* Laranja - Hold */

--pod-selic: #0a84ff       /* Azul - Risco Brasil */
--pod-global: #30d158      /* Verde - Commodity */
--pod-secular: #bf5af2     /* Roxo - Startup */
--pod-sell: #ff453a        /* Vermelho - Evitar */

--bg-primary: #1c1c1e      /* Fundo escuro */
--bg-secondary: #2c2c2e    /* Cards */
--text-primary: #ffffff    /* Texto principal */
--text-secondary: #98989d  /* Texto secundário */
```

### Tipografia
- **Títulos**: Inter 700-800 (Bold/ExtraBold)
- **Body**: Inter 400/500/600
- **Números**: Inter 600/700 (SemiBold/Bold)

---

## 🔮 Roadmap de Desenvolvimento

### FASE 1: Fundação (✅ CONCLUÍDO)
- [x] Sistema de Teses (Pods)
- [x] Banco de dados fundido e enriquecido
- [x] Scoring Multidimensional (6 dimensões)
- [x] Conviction Score (Bayesiano)
- [x] Event Engine (13 triggers)
- [x] Projeções Temporais (1Y, 3Y, 5Y, 10Y)
- [x] Design System V2 completo

### FASE 2: Integração com APIs (PRÓXIMA)
- [ ] **2.1**: Implementar config/api-config.js
- [ ] **2.2**: Integrar Yahoo Finance para preços
- [ ] **2.3**: Buscar dados macro (Banco Central)
- [ ] **2.4**: Scraping de Status Invest / Fundamentus
- [ ] **2.5**: Cálculo de indicadores técnicos em tempo real

### FASE 3: Machine Learning
- [ ] **3.1**: Random Forest para previsão de preços
- [ ] **3.2**: LSTM para séries temporais
- [ ] **3.3**: Ensemble de modelos
- [ ] **3.4**: Backtesting automático
- [ ] **3.5**: Feature Importance Analysis
- [ ] **3.6**: Alertas preditivos

### FASE 4: Produção
- [ ] **4.1**: Deploy em Cloud (Vercel/Netlify)
- [ ] **4.2**: API REST backend (Node.js/Python)
- [ ] **4.3**: Dashboard Mobile responsivo
- [ ] **4.4**: Sistema de notificações push
- [ ] **4.5**: Autenticação de usuários
- [ ] **4.6**: Integração com brokers (XP, Clear, etc.)

---

## 🎯 Métricas de Sucesso

| Métrica | Target | Status |
|---------|--------|--------|
| Acurácia Preditiva (30d) | >70% | 🟡 Em desenvolvimento |
| Sharpe Ratio (Portfólio) | >1.5 | 🟡 Em desenvolvimento |
| Win Rate | >60% | 🟡 Em desenvolvimento |
| Alpha vs IBOV | >15% a.a. | 🟡 Em desenvolvimento |
| Número de Empresas | 16+ | ✅ 16 empresas |
| Dimensões de Análise | 6+ | ✅ 6 dimensões |
| Triggers Ativos | 10+ | ✅ 13 triggers |

---

## 📚 Documentação Técnica

### Arquitetura Modular

```
┌──────────────────────────────────────┐
│         index.html (UI)              │
└─────────────┬────────────────────────┘
              │
      ┌───────▼────────┐
      │    app.js      │  ← Orquestrador
      │  (Controller)  │
      └───────┬────────┘
              │
    ┌─────────┼─────────────────┐
    │         │                 │
┌───▼────┐ ┌──▼───────┐ ┌──────▼──────┐
│ Data   │ │ Services │ │   Utils     │
│ Layer  │ │  Layer   │ │   Layer     │
└────────┘ └──────────┘ └─────────────┘
    │            │              │
    ├─ data/    ├─ services/   ├─ utils/
    │  enhanced │  collector   │  utils.js
    │           │  scoring     │
    │           │  events      │
    │           └──────────────┘
    └─ config/
       api-config
```

### Fluxo de Dados

```
1. USER ACTION (index.html)
    ↓
2. APP.JS (orquestrador)
    ↓
3. DATA LAYER (data-companies-enhanced.js)
    ↓
4. SERVICES LAYER
    ├─ scoring-engine.js → Calcula scores
    ├─ event-engine.js → Avalia triggers
    └─ data-collector.js → Busca dados externos
    ↓
5. UTILS LAYER (formatação, cálculos)
    ↓
6. RENDER (atualiza UI)
```

---

## ⚠️ Disclaimer

**Este sistema é apenas para fins educacionais e de análise pessoal.**

- Não constitui recomendação de investimento
- Dados podem conter imprecisões
- Sempre consulte um profissional certificado (CPA/CFP)
- Investimentos em ações envolvem risco de perda de capital
- Rentabilidade passada não garante rentabilidade futura

---

## 🤝 Contribuindo

Este é um projeto de análise pessoal e educacional. Sugestões de melhoria são bem-vindas via issues.

Para desenvolvedores:
1. Nunca commitar chaves de API
2. Seguir a estrutura modular V2
3. Testar localmente antes de PR
4. Documentar novas features

---

## 📄 Licença

MIT License - Uso livre para fins educacionais

---

## 📧 Contato

Para dúvidas ou sugestões sobre a metodologia:
- Abra uma issue no repositório
- Consulte a documentação técnica acima

---

**Última atualização**: 15 de Novembro de 2025
**Versão**: 2.0.0 - Refatoração Completa V2
**Arquitetura**: Modular Service-Oriented
**Status**: FASE 1 Completa ✅ | FASE 2 Em Desenvolvimento 🟡
