import rp from 'request-promise'

function getAllSymbols(response) {
    return rp.get('https://api.huobi.pro/v1/common/symbols').
                then(JSON.parse).
                then((data) => data.data.filter((a) => a.state === 'online').map((a) => a.symbol).sort()).
                then((data) => response.send({
                    isErr: false,
                    data: data
                })).
                catch((err) => {
                    console.log(err);
                    response.send({
                    isErr: true,
                    errMsg: err
                     });
                });
}

function getPrice(response, symbol) {
    return rp.get(`https://api.huobi.pro/market/detail?symbol=${symbol}`)
                .then(JSON.parse)
                .then(data => data.tick.close)
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
