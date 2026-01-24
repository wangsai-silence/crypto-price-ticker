// src/exchanges/index.js
const EXCHANGES = [
    { name: "Huobi", symbol: "huobi" },
    { name: "OkEx", symbol: "ok" },
    { name: "Binance", symbol: "binance" },
    { name: "Coinbase", symbol: "coinbase" },
    { name: "FTX", symbol: "ftx" },
    { name: "MXC", symbol: "mxc" },
    { name: "Bybit", symbol: "bybit" },
    { name: "Kucoin", symbol: "kucoin" },
];

const API_HOST = "https://addons.willwang.cloud";

function createExchangeAPI(symbol) {
    return {
        getAllSymbols: async () => {
            try {
                const res = await fetch(`${API_HOST}/getAllSymbols?exchange=${symbol}`);
                const data = await res.json();
                return data.data;
            } catch (err) {
                console.error(`[Exchange:${symbol}] getAllSymbols error`, err);
                return [];
            }
        },
        getPrice: async (symbolParam) => {
            try {
                const res = await fetch(`${API_HOST}/getPrice?exchange=${symbol}&symbol=${symbolParam}`);
                const data = await res.json();
                return data.data;
            } catch (err) {
                console.error(`[Exchange:${symbol}] getPrice error`, err);
                return null;
            }
        }
    };
}

const exchangesAPI = EXCHANGES.reduce((acc, ex) => {
    acc[ex.name] = createExchangeAPI(ex.symbol);
    return acc;
}, {});

export default exchangesAPI;
