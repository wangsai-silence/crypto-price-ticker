(function(globalObject) {
    const binance = {};

    binance.getAllSymbols = function() {
        return fetch('http://www.wangsai.xyz:4040/getAllSymbols?exchange=binance').
               then((respones) => respones.json()).
               then((data) => data.data);
    };

    binance.getPrice = function (symbol) {
            return fetch(`http://www.wangsai.xyz:4040/getPrice?exchange=binance&symbol=${symbol}`).
                    then((respones) => respones.json()).
                    then((data) => data.data);
    };


    binance.getAllSymbols = function () {
        return fetch('https://api.binance.com/api/v1/exchangeInfo').
               then((respones) => respones.json()).
               then((data) => data.symbols.filter((a) => a.status == 'TRADING').map((a) => a.symbol).sort());
    };

    binance.getPrice = function (symbol) {
            return fetch(`https://api.binance.com/api/v1/trades?symbol=${symbol}&limit=1`).
                    then((respones) => respones.json()).
                    // then(console.log).
                    then((data) => data[0].price);
    };

    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }


    if (globalObject.exchanges === undefined) {
        globalObject.exchanges = {};
    }

    globalObject.exchanges.Binance = binance;
})(this);
