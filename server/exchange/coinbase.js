const rp = require('request-promise')

function getAllSymbols() {
    return rp.get('https://api.pro.coinbase.com/products',{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36'
        }
    }).
                then(JSON.parse).
                then((data) => data.map((a) => a.id).sort())
}

function getPrice(symbol) {
    return rp.get(`https://api.pro.coinbase.com/products/${symbol}/ticker`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36'
        }
    })
                .then(JSON.parse)
                .then(data => data.price)
}

module.exports = {
    getAllSymbols,
    getPrice
};
