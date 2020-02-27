
/* eslint-disable no-unused-vars, no-mixed-operators */
(function (globalObject) {
    // Easy access to settings

    const storage = globalObject.storage;
    const api = globalObject.exchanges;

    let current;

    // Formats the price into currency suffixes
    function formatPrice(price) {
        var ranges = [
            { divider: 1e15, suffix: 'Q' },
            { divider: 1e12, suffix: 'T' },
            { divider: 1e9, suffix: 'B' },
            { divider: 1e6, suffix: 'M' },
            { divider: 1e3, suffix: 'K' }
        ];

        for (var i = 0; i < ranges.length; i++) {
            if (price >= ranges[i].divider) {
                var result = price / ranges[i].divider;

                // Gets the integer part of the price
                var intResult = parseInt(result, 10);


                // Finds the amount of digits the integer part has
                var integerDigits = Math.floor(Math.log(intResult) * Math.LOG10E + 1);
                switch (integerDigits) {
                    case 1:
                        return (Math.floor(10 * result) / 10).toFixed(1) + ranges[i].suffix;
                    case 2:
                    case 3:
                    default:
                        return Math.round(result) + ranges[i].suffix;
                }
            }
        }


        price = new BigNumber(price).toString(10);
        if (price.startsWith("0.0")) {
            price = price.substring(3);
            while (price.startsWith("0")) {
                price = price.substring(1);
            }
            price = "#" + price;
        }

        return price;
    }

    function updateBadgeText(price) {
        console.log(price);
        var badgeText = formatPrice(price);

        chrome.browserAction.setBadgeText({
            text: badgeText
        });

        chrome.browserAction.setTitle({
            title: "To Da Moon"
        });
    }

    function setupInterval() {
        window.setInterval(function () {
            updateBadge();
        }, 10000);
    }


    function setupBadge() {
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#F7931A"
        });

        chrome.browserAction.setBadgeText({
            text: "0.00000"
        });

        // chrome.browserAction.onClicked.addListener(function (tab) {
        //     chrome.tabs.create({
        //         url: 'https://www.huobi.pro'
        //     });
        // });
    }

    function setupStorage() {
        chrome.storage.onChanged.addListener(onStorageChanged);
        storage.updateExchange('Huobi');
        storage.updateExchangeSymbol('Huobi', 'btcusdt');
    }

    function onStorageChanged() {

        storage.getExchange().
        then((ex) => storage.getExchangeSymbol(ex)).
        then((symbol) => {
            console.log('new symbol:', symbol);
            current = symbol;
            updateBadge();
        });
    }

    function updateBadge() {
        const symbol = current;
        console.log(`symbol is: ${symbol}`);

        storage.getExchange().
        then((ex) => api[ex].getPrice(symbol)).
        then((price) => updateBadgeText(price));
    }

    setupBadge();
    setupStorage();
    setupInterval();
})(this);
