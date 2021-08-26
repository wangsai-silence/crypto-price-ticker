const rp = require('request-promise');

function getAllSymbols() {
    return rp.get('https://www.mexc.com/open/api/v2/market/symbols').
                then(JSON.parse).
                then((data) => data.data.filter((a) => a.state === 'ENABLED').map((a) => a.symbol).sort());
}

function getPrice(symbol) {
    return rp.get(`https://www.mexc.com/open/api/v2/market/ticker?symbol=${symbol}`).
                then(JSON.parse).
                then((data) => data.data[0].last);
}

module.exports = {
    getAllSymbols,
    getPrice
};
