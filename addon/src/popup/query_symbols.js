(function(global) {
    const storage = global.storage;
    const api = global.exchanges;

    let currExchange;

    function addItems() {
        const exchanges = Object.keys(api);

        for (const exchange of exchanges) {
            var opt = document.createElement('option');
            opt.value = exchange;
            opt.innerHTML = exchange;

            document.getElementById('_exchanges').appendChild(opt);
        }

        //cur select
        storage.getExchange().
        then((ex) => {
            if (ex === undefined) {
                return Promise.reject(new Error('no exchange selected'));
            }

            currExchange = ex;

            const index = exchanges.indexOf(ex);
            const option = document.getElementById('_exchanges').options[index];
            if (option !== undefined) {
                option.selected = true;
            }
            return ex;
        }).
        then((ex) => storage.getExchangeSymbols(ex)).
        then((symbols) => {
            console.log(symbols);
            if (symbols === undefined) {
                //request http
                return api[currExchange].getAllSymbols();
            }

            return Promise.resolve(symbols);
        }).
        then((symbols) => updateSymbolsUI(symbols)).
        catch(console.error);
    }

    function updateSymbolsUI(symbols) {
        const symbolSelect = document.getElementById('_symbols');

        while (symbolSelect.firstChild) {
            symbolSelect.removeChild(symbolSelect.lastChild);
        }

        symbols.forEach((symbol) => {
                    var opt = document.createElement('option');
                    opt.value = symbol;
                    opt.innerHTML = symbol;

                    symbolSelect.appendChild(opt);
                });

        return storage.getExchangeSymbol(currExchange).
            then((symbol) => Promise.resolve([symbols, symbol])).
            then(([symbols, symbol]) => {
                if (symbol === undefined) {
                    return Promise.reject(new Error('no symbol set'));
                }

                const index = symbols.indexOf(symbol);
                const option = symbolSelect.options[index];
                if (option !== undefined) {
                    option.selected = true;
                }

                // currSymbol = symbol;
            });

    }

    document.addEventListener('DOMContentLoaded', addItems);

    document.getElementById('_exchanges').addEventListener('change', (event) => {
        const select = event.target;
        const opt = select.options[select.selectedIndex];
        console.log('current exchange change to:', opt.value);
        currExchange = opt.value;
        storage.updateExchange(currExchange);
        //update symbols

        api[currExchange].getAllSymbols().
        then((symbols) => {
            storage.updateExchangeSymbols(currExchange, symbols);
            updateSymbolsUI(symbols);
        });
    });

    document.getElementById('_symbols').addEventListener('change', (event) => {
        const select = event.target;
        const opt = select.options[select.selectedIndex];
        console.log('current symbol change to:', opt.value);
        storage.updateExchangeSymbol(currExchange, opt.value);
    });
})(this);
