/* eslint-disable no-unused-vars, no-mixed-operators */
(function () {
    // Easy access to settings
    const symbols = 'btcusdt,hbusdt';
    let current = 'htusdt';

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

        price = price.toString();
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
        var badgeText = formatPrice(price);

        chrome.browserAction.setBadgeText({
            text: badgeText
        });

        chrome.browserAction.setTitle({
            title: "To Da Moon"
        });
    }

    function getAllSymbols() {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open("GET", "https://api.huobi.pro/v1/common/symbols", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const infos = JSON.parse(xhr.responseText).data.filter((a) => a.state === 'online').map((a) => a.symbol);

                chrome.storage.local.set({
                        symbols: infos.join(',')
                    });
            }
        };
        xhr.send();
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
        chrome.storage.local.get(['symbols'], function (prefs) {
            if (prefs.symbols === undefined) {
                chrome.storage.local.set({
                    symbols: symbols,
                    current: current
                });
            }
        });
        chrome.storage.onChanged.addListener(onStorageChanged);
    }

    function onStorageChanged() {
        chrome.storage.local.get(['current'], function (prefs) {
            current = prefs.current;
            updateBadge();
        });
    }

    function updateBadge() {
        const symbol = current;
        console.log(`symbol is: ${symbol}`);

        var xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open("GET", `https://api.huobi.pro/market/detail?symbol=${symbol}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var price = response.tick.close;

                updateBadgeText(price);
            }
        };
        xhr.send();
    }

    setupBadge();
    setupStorage();
    getAllSymbols();
    setupInterval();

})();
