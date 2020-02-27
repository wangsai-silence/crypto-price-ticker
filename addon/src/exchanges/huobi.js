(function(globalObject) {
    const huobi = {};

    const header = new Headers({
        'Access-Control-Allow-Origin': '*'
    });

    huobi.getAllSymbols = function() {
        return fetch('http://www.wangsai.xyz:4040/getAllSymbols?exchange=huobi', {
            method: 'GET',
            headers: header,
            mode: 'cors'
        }).
               then((respones) => respones.json()).
               then((data) => data.data);
    };

    huobi.getPrice = function (symbol) {
            return fetch(`http://www.wangsai.xyz:4040/getPrice?exchange=huobi&symbol=${symbol}`).
                    then((respones) => respones.json()).
                    then((data) => data.data);
    };

    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }


    if (globalObject.exchanges === undefined) {
        globalObject.exchanges = {};
    }

    globalObject.exchanges.Huobi = huobi;
})(this);
