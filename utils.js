// ============================
// UTILS.JS - Funções Utilitárias Globais
// Sistema de helpers reutilizáveis
// ============================

/**
 * FORMATAÇÃO DE NÚMEROS E MOEDAS
 */

function formatCurrency(value) {
    if (value === null || value === undefined || isNaN(value)) return '-';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

function formatPercentage(value, decimals = 1) {
    if (value === null || value === undefined || isNaN(value)) return '-';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
}

function formatMultiple(value) {
    if (value === null || value === undefined || isNaN(value) || value <= 0) return '-';
    return value.toFixed(2) + 'x';
}

function formatLargeNumber(value) {
    if (value === null || value === undefined || isNaN(value)) return '-';

    if (value >= 1e9) {
        return `R$ ${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
        return `R$ ${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
        return `R$ ${(value / 1e3).toFixed(2)}K`;
    }
    return formatCurrency(value);
}

function formatNumber(value, decimals = 0) {
    if (value === null || value === undefined || isNaN(value)) return '-';
    return value.toFixed(decimals);
}

/**
 * CLASSES CSS DINÂMICAS
 */

function getScoreClass(score) {
    if (score >= 85) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 50) return 'score-fair';
    return 'score-poor';
}

function getPodClass(pod) {
    if (!pod) return 'pod-na';
    const podMap = {
        'Pod Selic': 'pod-selic',
        'Pod Global': 'pod-global',
        'Pod Secular': 'pod-secular',
        'Pod Sell': 'pod-sell',
        'Pod N/A': 'pod-na'
    };
    return podMap[pod] || 'pod-na';
}

function getPodColor(pod, opacity = 1) {
    const colorMap = {
        'Pod Selic': `rgba(10, 132, 255, ${opacity})`,    // Azul
        'Pod Global': `rgba(48, 209, 88, ${opacity})`,    // Verde
        'Pod Secular': `rgba(191, 90, 242, ${opacity})`,  // Roxo
        'Pod Sell': `rgba(255, 69, 58, ${opacity})`,      // Vermelho
        'Pod N/A': `rgba(142, 142, 147, ${opacity})`      // Cinza
    };
    return colorMap[pod] || `rgba(142, 142, 147, ${opacity})`;
}

function getRecommendationClass(recommendation) {
    if (!recommendation) return 'rec-hold';
    const rec = recommendation.toLowerCase();

    if (rec.includes('strong buy')) return 'rec-strong-buy';
    if (rec.includes('buy')) return 'rec-buy';
    if (rec.includes('hold')) return 'rec-hold';
    if (rec.includes('sell')) return 'rec-sell';

    return 'rec-hold';
}

function getSourceClass(source) {
    if (!source) return 'source-v1';
    const sourceMap = {
        'V1': 'source-v1',
        'V2': 'source-v2',
        'V1+V2': 'source-v1-v2'
    };
    return sourceMap[source] || 'source-v1';
}

/**
 * CÁLCULOS FINANCEIROS
 */

function calculateUpside(currentPrice, targetPrice) {
    if (!currentPrice || !targetPrice) return null;
    return ((targetPrice - currentPrice) / currentPrice) * 100;
}

function calculateGrowthMultiple(currentPrice, targetPrice) {
    if (!currentPrice || !targetPrice || currentPrice === 0) return 0;
    return targetPrice / currentPrice;
}

function calculateCAGR(startValue, endValue, years) {
    if (!startValue || !endValue || !years || startValue === 0) return 0;
    return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
}

function calculateVolatility(returns) {
    if (!returns || returns.length === 0) return 0;

    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
}

function calculateSharpeRatio(returns, riskFreeRate = 0) {
    if (!returns || returns.length === 0) return 0;

    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const volatility = calculateVolatility(returns);

    if (volatility === 0) return 0;
    return (avgReturn - riskFreeRate) / volatility;
}

/**
 * MANIPULAÇÃO DE DADOS
 */

function getNestedValue(obj, path) {
    if (!obj || !path) return null;
    return path.split('.').reduce((current, key) => {
        return (current && current[key] !== undefined) ? current[key] : null;
    }, obj);
}

function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!current[key]) current[key] = {};
        return current[key];
    }, obj);
    target[lastKey] = value;
}

function sortBy(array, field, direction = 'asc') {
    return array.sort((a, b) => {
        const aVal = getNestedValue(a, field);
        const bVal = getNestedValue(b, field);

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        const comparison = typeof aVal === 'string'
            ? aVal.localeCompare(bVal)
            : aVal - bVal;

        return direction === 'asc' ? comparison : -comparison;
    });
}

function filterBy(array, filters) {
    return array.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === 'all' || value === '') return true;

            const itemValue = getNestedValue(item, key);

            if (typeof value === 'string') {
                return itemValue && itemValue.toString().toLowerCase().includes(value.toLowerCase());
            }

            return itemValue === value;
        });
    });
}

function groupBy(array, field) {
    return array.reduce((groups, item) => {
        const key = getNestedValue(item, field) || 'undefined';
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
        return groups;
    }, {});
}

/**
 * ESTATÍSTICAS E AGREGAÇÕES
 */

function calculateMedian(values) {
    if (!values || values.length === 0) return 0;

    const sorted = values.filter(v => v !== null && v !== undefined).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calculateAverage(values) {
    if (!values || values.length === 0) return 0;

    const filtered = values.filter(v => v !== null && v !== undefined);
    return filtered.reduce((sum, val) => sum + val, 0) / filtered.length;
}

function calculateSum(values) {
    if (!values || values.length === 0) return 0;
    return values.filter(v => v !== null && v !== undefined).reduce((sum, val) => sum + val, 0);
}

function calculateMin(values) {
    if (!values || values.length === 0) return 0;
    return Math.min(...values.filter(v => v !== null && v !== undefined));
}

function calculateMax(values) {
    if (!values || values.length === 0) return 0;
    return Math.max(...values.filter(v => v !== null && v !== undefined));
}

function calculatePercentile(values, percentile) {
    if (!values || values.length === 0) return 0;

    const sorted = values.filter(v => v !== null && v !== undefined).sort((a, b) => a - b);
    const index = (percentile / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;

    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * VALIDAÇÕES
 */

function isValidNumber(value) {
    return value !== null && value !== undefined && !isNaN(value) && isFinite(value);
}

function isPositiveNumber(value) {
    return isValidNumber(value) && value > 0;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function normalize(value, min, max) {
    if (max === min) return 0;
    return (value - min) / (max - min);
}

/**
 * UTILITÁRIOS DE DATA
 */

function formatDate(date, format = 'dd/mm/yyyy') {
    if (!date) return '-';

    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return format
        .replace('dd', day)
        .replace('mm', month)
        .replace('yyyy', year);
}

function daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

/**
 * UTILITÁRIOS DE ARRAY
 */

function removeDuplicates(array, key) {
    if (!key) return [...new Set(array)];

    const seen = new Set();
    return array.filter(item => {
        const value = getNestedValue(item, key);
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
    });
}

function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * UTILITÁRIOS DE STRING
 */

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

function truncate(text, length, suffix = '...') {
    if (!text || text.length <= length) return text;
    return text.substring(0, length - suffix.length) + suffix;
}

function capitalize(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * UTILITÁRIOS DE DOM
 */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on')) {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
}

/**
 * UTILITÁRIOS DE CACHE/STORAGE
 */

function setLocalStorage(key, value, expirationMinutes = null) {
    const item = {
        value: value,
        timestamp: Date.now(),
        expiration: expirationMinutes ? Date.now() + (expirationMinutes * 60 * 1000) : null
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorage(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);

        if (item.expiration && Date.now() > item.expiration) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    } catch (e) {
        return null;
    }
}

function clearLocalStorage(prefix = null) {
    if (!prefix) {
        localStorage.clear();
        return;
    }

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
        }
    });
}

/**
 * UTILITÁRIOS DE CÓPIA
 */

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));

    const cloned = {};
    Object.keys(obj).forEach(key => {
        cloned[key] = deepClone(obj[key]);
    });
    return cloned;
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    }

    // Fallback para navegadores antigos
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    return Promise.resolve();
}

/**
 * EXPORT (para uso em módulos)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Formatação
        formatCurrency,
        formatPercentage,
        formatMultiple,
        formatLargeNumber,
        formatNumber,
        formatDate,

        // Classes CSS
        getScoreClass,
        getPodClass,
        getPodColor,
        getRecommendationClass,
        getSourceClass,

        // Cálculos Financeiros
        calculateUpside,
        calculateGrowthMultiple,
        calculateCAGR,
        calculateVolatility,
        calculateSharpeRatio,

        // Manipulação de Dados
        getNestedValue,
        setNestedValue,
        sortBy,
        filterBy,
        groupBy,

        // Estatísticas
        calculateMedian,
        calculateAverage,
        calculateSum,
        calculateMin,
        calculateMax,
        calculatePercentile,

        // Validações
        isValidNumber,
        isPositiveNumber,
        clamp,
        normalize,

        // Utilitários
        debounce,
        throttle,
        deepClone,
        copyToClipboard,
        createElement,

        // Storage
        setLocalStorage,
        getLocalStorage,
        clearLocalStorage
    };
}
