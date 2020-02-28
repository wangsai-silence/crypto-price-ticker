import rp from 'request-promise'

function getAllSymbols(response) {
    return rp.get('https://api.binance.com/api/v1/exchangeInfo')
                .then(JSON.parse)
                .then((data) => data.symbols.filter((a) => a.status == 'TRADING').map((a) => a.symbol).sort())
                .then(data => response.send({
                    isErr: false,
                    data: data
                }))
                .catch(err => {
                    console.log(err)
                    response.send({
                    isErr: true,
                    errMsg: err
                     })
                })
}

function getPrice(response, symbol) {
    return rp.get(`https://api.binance.com/api/v1/trades?symbol=${symbol}&limit=1`)
                .then(JSON.parse)
                .then((data) => data[0].price)
                .then(data => response.send({
                    isErr: false,
                    data: data
                }))
                .catch(err => {
                    console.log(err)
                    response.send({
                    isErr: true,
                    errMsg: err
                     })
                })
}

module.exports = {
    getAllSymbols,
    getPrice
};
