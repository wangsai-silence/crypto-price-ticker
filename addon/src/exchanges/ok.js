(function(globalObject) {
    const ok = {};

    ok.getAllSymbols = function () {
        return fetch('https://www.okex.com/api/spot/v3/instruments').
               then((respones) => respones.json()).
               then((data) => data.map((a) => a.instrument_id).sort());
    };

    ok.getPrice = function (symbol) {
            return fetch(`https://www.okex.com/api/spot/v3/instruments/${symbol}/ticker`).
                    then((respones) => respones.json()).
                    then((data) => data.last);
    };

    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }


    if (globalObject.exchanges === undefined) {
        globalObject.exchanges = {};
    }

    globalObject.exchanges.OkEx = ok;
})(this);
