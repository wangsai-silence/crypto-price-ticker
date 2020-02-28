(function(globalObject) {
    const ok = {};

    ok.getAllSymbols = function() {
        return fetch('http://www.wangsai.xyz:4040/getAllSymbols?exchange=ok').
               then((respones) => respones.json()).
               then((data) => data.data);
    };

    ok.getPrice = function (symbol) {
            return fetch(`http://www.wangsai.xyz:4040/getPrice?exchange=ok&symbol=${symbol}`).
                    then((respones) => respones.json()).
                    then((data) => data.data);
    };

    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }


    if (globalObject.exchanges === undefined) {
        globalObject.exchanges = {};
    }

    globalObject.exchanges.OkEx = ok;
})(this);
