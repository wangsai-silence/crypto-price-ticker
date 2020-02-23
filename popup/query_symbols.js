(function() {
    function addItems() {
        chrome.storage.local.get(['symbols'], function (prefs) {
                if (prefs === undefined || prefs.symbols == undefined) {
                    return;
                }

                const symbols = prefs.symbols.split(',');
                symbols.forEach((symbol) => {
                    var opt = document.createElement('option');
                    opt.value = symbol;
                    opt.innerHTML = symbol;

                    document.getElementById('symbols').appendChild(opt);
                });

                chrome.storage.local.get(['current'], (prefs) => {
                    if (prefs === undefined || prefs.current == undefined) {
                        return;
                    }

                    const index = symbols.indexOf(prefs.current);
                    const option = document.getElementById('symbols').options[index];
                    if (option !== undefined) {
                        option.selected = true;
                    }
                });

            });

    }

    document.addEventListener('DOMContentLoaded', addItems);
    document.getElementById('symbols').addEventListener('change', (event) => {
        const select = event.target;
        const opt = select.options[select.selectedIndex];
        console.log('current symbol change to:', opt.value);
        chrome.storage.local.set({
            current: opt.value
        });
    });
})();
