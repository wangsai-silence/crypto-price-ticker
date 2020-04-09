/* eslint-disable no-unused-vars, no-mixed-operators */
(function(globalObject) {
    const store = {};
    globalObject.storage = store;

    store.updateExchange = function(exchange) {
        chrome.storage.local.set({
            exchange: exchange
        });
    };

    store.getExchange = function() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(['exchange'], (res) => {
                resolve(res.exchange);
            });
        });
    };

    store.updateExchangeSymbol = function(exchange, symbol) {
        obj = {

        };
        obj[`${exchange}_symbol`] = symbol;

        chrome.storage.local.set(obj);
    };

    store.getExchangeSymbol = function(exchange) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get([`${exchange}_symbol`], (res) => {
                resolve(res[`${exchange}_symbol`]);
            });
        });
    };

    store.updateExchangeSymbols = function(exchange, symbols) {
        obj = {

        };
        const key = `${exchange}_symbols`;
        obj[key] = symbols.join(',');
        console.log(`update exchange ${exchange} symbols ${symbols}`);
        chrome.storage.local.set(obj);
    };

    store.getExchangeSymbols = function(exchange) {
        return new Promise((resolve, reject) => {
            const key = `${exchange}_symbols`;
            chrome.storage.local.get([key], (res) => {
                if (res[key] === undefined) {
                    resolve(undefined);
                    return;
                }

                resolve(res[key].split(','));
            });
        });
    };
})(this);
