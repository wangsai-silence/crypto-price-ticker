import express from 'express'
import rp from 'request-promise'

const server = express()


server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

server.get('/getAllSymbols', (request, response) => {
    const exchange = request.query.exchange
    if(exchange == undefined){
        response.send({
            isErr: true,
            errMsg: 'no exchange in params'
        })
        return
    }

    switch(exchange) {
        case "huobi":
            rp.get('https://api.huobi.pro/v1/common/symbols')
                .then(JSON.parse)
                .then(data => data.data.filter((a) => a.state === 'online').map((a) => a.symbol).sort())
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

            return
        case "bn":
            rp.get('https://api.binance.com/api/v1/exchangeInfo')
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

               return
        case "ok":
            rp.get('https://www.okex.com/api/spot/v3/instruments')
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

               return
        default:
            response.send({
                isErr: true,
                errMsg: `exchange ${exchange} is not supported`
            })
    }
})

server.get('/getPrice', (request, response) => {
    const exchange = request.query.exchange
    const symbol = request.query.symbol

    if(exchange == undefined){
        response.send({
            isErr: true,
            errMsg: 'no exchange in params'
        })
        return
    }

    switch(exchange) {
        case "huobi":
            rp.get(`https://api.huobi.pro/market/detail?symbol=${symbol}`)
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

            return
        case "bn":
            rp.get(`https://api.binance.com/api/v1/trades?symbol=${symbol}&limit=1`)
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

            return
        case "ok":
            rp.get(`https://www.okex.com/api/spot/v3/instruments/${symbol}/ticker`)
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

            return
        default:
            response.send({
                isErr: true,
                errMsg: `exchange ${exchange} is not supported`
            })
    }
})

//4. 绑定端口
server.listen(4040)