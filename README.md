# 🚀 B3 SmallCaps Intelligence Platform
## Sistema Profissional de Análise Preditiva para Ações de Alto Potencial

### 📊 Visão Geral

Plataforma avançada de análise multidimensional para Small Caps da B3, combinando análise fundamentalista, técnica, consenso de mercado e machine learning para identificar oportunidades de valorização múltipla.

---

## 🎯 Características Principais

### 1. **Sistema de Teses (Pods)**
- **Pod Secular**: Empresas de crescimento estrutural (Startup Method)
- **Pod Global**: Descorrelacionadas da Selic (Commodities/Dólar)
- **Pod Selic**: Sensíveis a queda de juros (Risco-Brasil)

### 2. **Scoring Multidimensional**
- Score Global (0-100)
- Análise de 6 dimensões: Qualidade, Valor, Crescimento, Momentum, Dividend, Eficiência
- Sistema de Confiança Bayesiano

### 3. **Análise Preditiva**
- Projeções de 1Y, 3Y, 5Y e 10Y
- Cálculo de Upside baseado em múltiplos
- Sistema de Conviction Score

### 4. **Simulador de Alocação**
- Estratégias: Agressiva, Balanceada, Conservadora
- Ponderação por Múltiplo de Crescimento
- Projeção de Patrimônio (12 meses)

### 5. **Gatilhos de Entrada/Saída**
- Playbook de teses por Pod
- Cenários de realização de lucro
- Sinais de tese quebrada

---

## 📁 Estrutura do Projeto

```
future-value-stock/
├── index.html              # Dashboard principal unificado
├── charts.html             # Análise gráfica avançada
├── simulator.html          # Simulador de aportes
├── data-companies.js       # Base de dados completa
├── utils.js               # Funções utilitárias
├── confidence.js          # Sistema de scoring
├── styles.css            # Estilos globais
├── services/
│   ├── scoring-engine.js      # Motor de pontuação
│   ├── event-engine.js        # Sistema de gatilhos
│   └── projection-calc.js     # Cálculos de projeção
└── README.md
```

---

## 🔧 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Gráficos**: Chart.js 4.4.1
- **Tipografia**: Inter (Google Fonts)
- **Design**: Dark Mode Profissional

---

## 📈 Metodologias Implementadas

### Análise Fundamentalista
- P/L, P/VP, EV/EBITDA
- ROE, ROIC, Margens
- Dívida Líquida/EBITDA
- Free Cash Flow Yield

### Análise de Projeções
- **Múltiplo de Crescimento**: Target Price / Preço Atual
- **Upside %**: (Target - Atual) / Atual × 100
- **Horizonte Temporal**: 1Y, 3Y, 5Y, 10Y

### Sistema de Confiança
```javascript
Confidence Score = (
  Data Quality × 0.30 +
  Projection Consistency × 0.25 +
  Fundamental Health × 0.25 +
  Historical Accuracy × 0.20
) × 100
```

---

## 🚀 Como Usar

### 1. Dashboard Principal (index.html)
- Visualize todas as empresas ranqueadas por Score
- Filtre por Tese (Pod), Origem dos dados
- Ordene por qualquer coluna (Upside, ROE, P/L, etc.)
- Clique no ticker para análise detalhada

### 2. Análise Detalhada (Modal)
- Scores Multidimensionais (Radar Chart)
- Valuation e Preços-Alvo
- Performance Histórica + Projeções
- Catalisadores e Riscos
- Recomendação com Conviction Score

### 3. Simulador de Aportes
- Selecione ações pelo chip visual
- Defina valor do aporte mensal
- Escolha estratégia de alocação
- Visualize distribuição e projeção de patrimônio

### 4. Teses & Estratégia
- Playbook completo de gatilhos
- Cenários de entrada e saída
- Racional de cada Pod

---

## 📊 Estrutura de Dados

### Empresa Completa
```javascript
{
  ticker: "PLPL3",
  name: "Plano & Plano",
  sector: "Construção Civil",
  subsector: "Baixa Renda / MCMV",
  pod: "Pod Selic",

  // Preços
  currentPrice: 16.06,
  targetPrice: 20.60,

  // Projeções
  projections: {
    target1Y: 20.60,
    target3Y: 31.00,
    target5Y: 42.00,
    target10Y: 62.00
  },

  // Métricas Fundamentalistas
  metrics: {
    pe: 9.63,
    roe: 49,
    roic: 24.89,
    dividendYield: 5.96,
    netDebtToEbitda: 0.2,
    ebitdaMargin: 17.9,
    revenueGrowth: 29.22,
    earningsGrowth: 28.45
  },

  // Score e Recomendação
  score: 88,
  ranking: 1,
  recommendation: "STRONG BUY",
  confidence: 88,

  // Tese
  catalysts: [...],
  risks: [...],
  keyHighlights: [...]
}
```

---

## 🎨 Design System

### Cores
```css
--pod-selic: #0a84ff      /* Azul - Risco Brasil */
--pod-global: #30d158     /* Verde - Commodity */
--pod-secular: #bf5af2    /* Roxo - Startup */
--pod-sell: #ff453a       /* Vermelho - Evitar */
--success: #00c853        /* Buy */
--danger: #f44336         /* Sell */
--warning: #ff9800        /* Hold */
```

### Tipografia
- **Títulos**: Inter 800 (ExtraBold)
- **Body**: Inter 400/500/600
- **Números**: Inter 700 (Bold)

---

## 📱 Responsividade

- **Desktop**: Grid adaptativo 3-4 colunas
- **Tablet**: Grid 2 colunas
- **Mobile**: Layout empilhado vertical

---

## 🔮 Roadmap Futuro

### Fase 1: Fundação (Atual)
- [x] Sistema de Teses (Pods)
- [x] Scoring Multidimensional
- [x] Simulador de Alocação
- [x] Projeções Temporais

### Fase 2: Integração (Próxima)
- [ ] APIs de Preços (Yahoo Finance)
- [ ] Scraping de Consenso
- [ ] Indicadores Técnicos (RSI, MACD, Bollinger)
- [ ] Dados Macro (Banco Central)

### Fase 3: Machine Learning
- [ ] Random Forest para previsão
- [ ] Backtesting automático
- [ ] Feature Importance
- [ ] Alertas preditivos

### Fase 4: Produção
- [ ] Deploy em Cloud
- [ ] API REST
- [ ] Dashboard Mobile
- [ ] Sistema de notificações

---

## 🎯 Indicadores de Performance

### Métricas de Sucesso
- **Acurácia Preditiva**: Target >70% em 30 dias
- **Sharpe Ratio**: Target >1.5
- **Win Rate**: Target >60%
- **Alpha vs IBOV**: Target >15% a.a.

---

## 📚 Documentação Técnica

### Cálculos Principais

#### 1. Múltiplo de Crescimento
```
Múltiplo = Target Price / Preço Atual
Upside % = (Múltiplo - 1) × 100
```

#### 2. Score Global
```
Score = Σ (Dimensão_i × Peso_i)

Dimensões:
- Qualidade (ROE, ROIC, Margens)
- Valor (P/L, P/VP, EV/EBITDA)
- Crescimento (Revenue Growth, Earnings Growth)
- Momentum (Performance YTD, Tendência)
- Dividend (DY, Payout)
- Eficiência (Asset Turnover, Ciclo Operacional)
```

#### 3. Conviction Score
```
Conviction = (
  Qualidade dos Dados × 0.30 +
  Consistência Projeções × 0.25 +
  Saúde Fundamental × 0.25 +
  Acurácia Histórica × 0.20
) × 100
```

#### 4. Alocação Agressiva
```
Peso_ativo = (Múltiplo_ativo - 1) / Σ(Múltiplos - 1)
Alocação_R$ = Peso × Aporte_Total
```

---

## 🤝 Contribuindo

Este é um projeto de análise pessoal. Sugestões de melhoria são bem-vindas via issues.

---

## ⚠️ Disclaimer

**Este sistema é apenas para fins educacionais e de análise pessoal.**

- Não constitui recomendação de investimento
- Dados podem conter imprecisões
- Sempre consulte um profissional certificado
- Investimentos em ações envolvem risco de perda

---

## 📄 Licença

MIT License - Uso livre para fins educacionais

---

## 📧 Contato

Para dúvidas ou sugestões sobre a metodologia, abra uma issue no repositório.

---

**Última atualização**: Novembro 2025
**Versão**: 2.0.0 - Refatoração Completa
