import express from 'express'
import huobi from './exchange/huobi'
import ok from './exchange/ok'
import binance from './exchange/binance'
import coinbase from './exchange/coinbase'

const server = express()

let exchanges = {
    huobi,
    ok,
    binance,
    coinbase
} 


server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('request query:', req.query)
    console.log('request header:', req.rawHeaders)

    var oldWrite = res.write,
    oldEnd = res.end;

    var chunks = [];

    res.write = function (chunk) {
    chunks.push(chunk);

    oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
    if (chunk)
        chunks.push(chunk);

    var body = Buffer.concat(chunks).toString('utf8');
    console.log('response:', req.path, body);

    oldEnd.apply(res, arguments);
    };
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

    if (exchanges[exchange] === undefined) {
        response.send({
            isErr: true,
            errMsg: 'exchange not supported'
        })
        return
    }

    exchanges[exchange].getAllSymbols(response)
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
    
    if(exchange == undefined){
        response.send({
            isErr: true,
            errMsg: 'no exchange in params'
        })
        return
    }

    if(symbol == undefined) {
        response.send({
            isErr: true,
            errMsg: 'no symbol in params'
        })
        return
    }

    exchanges[exchange].getPrice(response, symbol)
})

//4. 绑定端口
server.listen(4040)