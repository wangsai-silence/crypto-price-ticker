/* eslint-disable no-unused-vars, no-mixed-operators */

import './libs/bignumber.min.js';
import api from './exchanges/proxy.js';
import storage from './storage.js';

let currentSymbol = null;

function formatPrice(price) {
    const ranges = [
        { divider: 1e15, suffix: 'Q' },
        { divider: 1e12, suffix: 'T' },
        { divider: 1e9, suffix: 'B' },
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'K' }
    ];

    for (const r of ranges) {
        if (price >= r.divider) {
            return (Math.floor(10 * price / r.divider) / 10).toFixed(1) + r.suffix;
        }
    }

    let p = new BigNumber(price).toString(10);
    if (p.startsWith('0.0')) {
        p = '#' + p.replace(/^0\.0+/, '');
    }
    return p;
}

function updateBadgeText(price) {
    const badgeText = formatPrice(price);

    browser.action.setBadgeText({ text: badgeText });
    browser.action.setTitle({ title: String(price) });
}

async function updateBadge() {
    try {
        if (!currentSymbol) return;

        const ex = await storage.getExchange();
        const price = await api[ex].getPrice(currentSymbol);

        updateBadgeText(price);
    } catch (err) {
        console.error('updateBadge error:', err);
    }
}

async function initStorage() {
    try {
        const ex = await storage.getExchange();
        const symbol = await storage.getExchangeSymbol(ex);

        currentSymbol = symbol;
        updateBadge();
    } catch (err) {
        console.warn('storage init failed, using defaults');

        await storage.updateExchange('Huobi');
        await storage.updateExchangeSymbol('Huobi', 'btcusdt');
    }
}

function setupBadge() {
    browser.action.setBadgeBackgroundColor({
        color: '#F7931A'
    });

    browser.action.setBadgeText({
        text: '0'
    });
    browser.action.setBadgeTextColor({ color: '#000000' })
}

browser.alarms.create('', {
    periodInMinutes: 0.1 // ≈ 10 秒（Firefox 支持小数）
});

browser.alarms.onAlarm.addListener(alarm => {
    updateBadge();
});

browser.storage.onChanged.addListener(async () => {
    try {
        const ex = await storage.getExchange();
        currentSymbol = await storage.getExchangeSymbol(ex);
        updateBadge();
    } catch (e) {
        console.error(e);
    }
});

setupBadge();
initStorage();
