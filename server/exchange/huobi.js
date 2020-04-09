import rp from 'request-promise'

function getAllSymbols() {
    return rp.get('https://api.huobi.pro/v1/common/symbols').
                then(JSON.parse).
                then((data) => data.data.filter((a) => a.state === 'online').map((a) => a.symbol).sort())
}

function getPrice(symbol) {
    return rp.get(`https://api.huobi.pro/market/detail?symbol=${symbol}`)
                .then(JSON.parse)
                .then(data => data.tick.close)
}

module.exports = {
    getAllSymbols,
    getPrice
};
