import storage from '../storage.js';
import exchangesAPI from '../exchanges/proxy.js';

let currExchange;
let currSymbol;

async function addItems() {
    try {
        // 填充交易所下拉
        const exchangeNames = Object.keys(exchangesAPI);
        const exchangeSelect = document.getElementById('_exchanges');

        exchangeNames.forEach((ex) => {
            const opt = document.createElement('option');
            opt.value = ex;
            opt.textContent = ex;
            exchangeSelect.appendChild(opt);
        });

        // 获取当前选中交易所
        const ex = await storage.getExchange();
        currExchange = ex || exchangeNames[0]; // 默认第一个交易所

        exchangeSelect.value = currExchange;

        // 获取 symbol 列表
        let symbols = await storage.getExchangeSymbols(currExchange);
        if (!symbols.length) {
            symbols = await exchangesAPI[currExchange].getAllSymbols();
            await storage.updateExchangeSymbols(currExchange, symbols);
        }

        await updateSymbolsUI(symbols);

    } catch (err) {
        console.error(err);
    }
}

async function updateSymbolsUI(symbols) {
    const symbolSelect = document.getElementById('_symbols');
    symbolSelect.innerHTML = ''; // 清空

    const fragment = document.createDocumentFragment();
    symbols.forEach((sym) => {
        const opt = document.createElement('option');
        opt.value = sym;
        opt.textContent = sym;
        fragment.appendChild(opt);
    });
    symbolSelect.appendChild(fragment);

    // 设置当前选中 symbol
    const symbol = await storage.getExchangeSymbol(currExchange);
    currSymbol = symbol || symbols[0]; // 默认第一个 symbol
    symbolSelect.value = currSymbol;
}

document.addEventListener('DOMContentLoaded', addItems);

document.getElementById('_exchanges').addEventListener('change', async (event) => {
    try {
        currExchange = event.target.value;
        await storage.updateExchange(currExchange);

        let symbols = await storage.getExchangeSymbols(currExchange);
        if (!symbols.length) {
            symbols = await exchangesAPI[currExchange].getAllSymbols();
            await storage.updateExchangeSymbols(currExchange, symbols);
        }

        await updateSymbolsUI(symbols);
    } catch (err) {
        console.error(err);
    }
});

document.getElementById('_symbols').addEventListener('change', async (event) => {
    currSymbol = event.target.value;
    await storage.updateExchangeSymbol(currExchange, currSymbol);
});
