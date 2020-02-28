import rp from 'request-promise'

function getAllSymbols(response) {
    return rp.get('https://api.pro.coinbase.com/products').
                then(JSON.parse).
                then((data) => data.map((a) => a.id).sort()).
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
    return rp.get(`https://api.pro.coinbase.com/products/${symbol}/ticker`)
                .then(JSON.parse)
                .then(data => data.amount)
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
