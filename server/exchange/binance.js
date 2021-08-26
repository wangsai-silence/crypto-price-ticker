const rp = require('request-promise');


function getAllSymbols() {
    return rp.get('https://api.binance.com/api/v1/exchangeInfo').
                then(JSON.parse).
                then((data) => data.symbols.filter((a) => a.status == 'TRADING').map((a) => a.symbol).sort());
}

function getPrice(symbol) {
    return rp.get(`https://api.binance.com/api/v1/trades?symbol=${symbol}&limit=1`).
                then(JSON.parse).
                then((data) => data[0].price);
}

module.exports = {
    getAllSymbols,
    getPrice
};
