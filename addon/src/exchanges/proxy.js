(function(globalObject) {
    const exchanges = [
        {
            name: "Huobi",
            symbol: "huobi"
        },
        {
            name: "OkEx",
            symbol: "ok"
        },
        {
            name: "Binance",
            symbol: "binance"
        },
        {
            name: "Coinbase",
            symbol: "coinbase"
        }
    ];

    if (globalObject.exchanges === undefined) {
        globalObject.exchanges = {};
    }

    exchanges.forEach((ex) => {
        const api = {};
        api.getAllSymbols = function() {
            return fetch(`http://www.wangsai.xyz:4040/getAllSymbols?exchange=${ex.symbol}`).
                then((respones) => respones.json()).
                then((data) => data.data);
        };
        api.getPrice = function (symbol) {
            return fetch(`http://www.wangsai.xyz:4040/getPrice?exchange=${ex.symbol}&symbol=${symbol}`).
                    then((respones) => respones.json()).
                    then((data) => data.data);
        };

        globalObject.exchanges[ex.name] = api;
    });

})(this);
