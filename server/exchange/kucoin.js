const rp = require('request-promise');

function getAllSymbols() {
    return rp.get('https://api.kucoin.com/api/v1/symbols').
                then(JSON.parse).
                then((data) => data.data.filter((a) => a.enableTrading).map((a) => a.symbol).sort());
}

function getPrice(symbol) {
    return rp.get(`https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`).
                then(JSON.parse).
                then((data) => data.data.price);
}

module.exports = {
    getAllSymbols,
    getPrice
};
