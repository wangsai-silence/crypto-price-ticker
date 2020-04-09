import rp from 'request-promise'

function getAllSymbols() {
    return rp.get('https://www.okex.com/api/spot/v3/instruments')
                .then(JSON.parse)
                .then((data) => data.map((a) => a.instrument_id).sort())
}

function getPrice(symbol) {
    return rp.get(`https://www.okex.com/api/spot/v3/instruments/${symbol}/ticker`)
                .then(JSON.parse)
                .then((data) => data.last)
}

module.exports = {
    getAllSymbols,
    getPrice
};
