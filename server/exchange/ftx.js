const rp = require('request-promise');

function getAllSymbols() {
    return rp.get('https://ftx.com/api/markets').
                then(JSON.parse).
                then((data) => data.result.map((a) => a.name).sort());
}

function getPrice(symbol) {
    return rp.get(`https://ftx.com/api/markets/${symbol}/candles?resolution=15`).
                then(JSON.parse).
                then((data) => data.result[0].close);
}

module.exports = {
    getAllSymbols,
    getPrice
};
