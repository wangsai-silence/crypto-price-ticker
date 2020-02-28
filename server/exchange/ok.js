import rp from 'request-promise'

function getAllSymbols(response) {
    return rp.get('https://www.okex.com/api/spot/v3/instruments')
                .then(JSON.parse)
                .then((data) => data.map((a) => a.instrument_id).sort())
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
    return rp.get(`https://www.okex.com/api/spot/v3/instruments/${symbol}/ticker`)
                .then(JSON.parse)
                .then((data) => data.last)
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
