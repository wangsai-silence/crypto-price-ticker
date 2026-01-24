// src/storage/index.js
const storage = {};

/* ======================
 * 基础封装
 * ====================== */
async function setItem(key, value) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => resolve());
    });
}

async function getItem(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get([key], (res) => resolve(res[key]));
    });
}

/* ======================
 * 交易所存储 API
 * ====================== */
storage.updateExchange = (exchange) => setItem('exchange', exchange);
storage.getExchange = () => getItem('exchange');

storage.updateExchangeSymbol = (exchange, symbol) =>
    setItem(`${exchange}_symbol`, symbol);
storage.getExchangeSymbol = (exchange) =>
    getItem(`${exchange}_symbol`);

storage.updateExchangeSymbols = (exchange, symbols) =>
    setItem(`${exchange}_symbols`, symbols); // 存数组

storage.getExchangeSymbols = async (exchange) => {
    let symbols = await getItem(`${exchange}_symbols`);
    if (symbols instanceof String) {
        symbols = symbols.split(',')
    }
    return symbols || [];
};

/* ======================
 * 导出
 * ====================== */
export default storage;
