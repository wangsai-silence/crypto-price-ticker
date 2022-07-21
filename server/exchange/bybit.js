const rp = require('request-promise')

function getAllSymbols() {
    return rp.get('https://api.bybit.com/spot/v1/symbols').
                then(JSON.parse).
                then((data) => data.result.map((a) => a.name).sort())
}

function getPrice(symbol) {
    return rp.get(`https://api.bybit.com/spot/quote/v1/ticker/price?symbol=${symbol}`)
                .then(JSON.parse)
                .then(data => data.result.price)
}

module.exports = {
    getAllSymbols,
    getPrice
};
