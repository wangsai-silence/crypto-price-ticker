const rp = require('request-promise');

function getAllSymbols() {
    return rp.get('https://www.okex.com/api/v5/public/instruments?instType=SPOT').
        then(JSON.parse).
        then((data) => data.map((a) => a.instId).sort());
}

function getPrice(symbol) {
    return rp.get(`https://www.okex.com/api/v5/market/index-tickers?instId=${symbol}`).
        then(JSON.parse).
        then((data) => data.last);
}

module.exports = {
    getAllSymbols,
    getPrice
};
