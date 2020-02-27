(function(globalObject) {
    const huobi = {};

    huobi.getAllSymbols = function() {
        return fetch('https://api.huobi.pro/v1/common/symbols').
               then((respones) => respones.json()).
               then((data) => data.data.filter((a) => a.state === 'online').map((a) => a.symbol).sort());
    };

    huobi.getPrice = function (symbol) {
            return fetch(`https://api.huobi.pro/market/detail?symbol=${symbol}`).
                    then((respones) => respones.json()).
                    then((data) => data.tick.close);
    };

    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }


    if (globalObject.exchanges === undefined) {
        globalObject.exchanges = {};
    }

    globalObject.exchanges.Huobi = huobi;
})(this);
