(function(globalObject) {
    const binance = {};

    binance.getAllSymbols = function() {
        return fetch('http://127.0.0.1:4040/getAllSymbols?exchange=binance').
               then((respones) => respones.json()).
               then((data) => data.data);
    };

    binance.getPrice = function (symbol) {
            return fetch(`http://127.0.0.1:4040/getPrice?exchange=binance&symbol=${symbol}`).
                    then((respones) => respones.json()).
                    then((data) => data.data);
    };


    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }


    if (globalObject.exchanges === undefined) {
        globalObject.exchanges = {};
    }

    globalObject.exchanges.Binance = binance;
})(this);
