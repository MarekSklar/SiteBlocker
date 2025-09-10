// Load rules from JSON
fetch(chrome.runtime.getURL("config.json"))
  .then(response => response.json())
  .then(data => {
    start(data);
  })
  .catch(err => console.error("Failed to load config:", err));

function createIdGenerator(start = 1) {
    let current = start - 1; // private variable
    return function() {
        current += 1;
        return current;
    };
}
const getNextId = createIdGenerator();

function addRuleWH(site, redirect, whiteList) {
    function matchAllKeyWords(changeInfoUrl) {
        let redirect = true;
        whiteList.forEach(keyWord => {
            if (changeInfoUrl.includes(keyWord)) redirect = false;
        });
        return redirect;
    }

    whiteList.forEach(keyWord => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.url && changeInfo.url.includes(site) && matchAllKeyWords(changeInfo.url)) {
                chrome.tabs.update(tabId, { url: redirect });
            }
        });
    });
}

function addRuleBL(site, redirect, blackList) {
    blackList.forEach(keyWord => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.url && changeInfo.url.includes(site) && changeInfo.url.includes(keyWord)) {
                chrome.tabs.update(tabId, { url: redirect });
            }
        });
    });
}

function start(config) {

    config.sites.usesWhitelist.forEach(site => {
        addRuleWH(site[0], site[1], site[2]);
    });

    config.sites.usesBlacklist.forEach(site => {
        addRuleBL(site[0], site[1], site[2]);
    });
}

chrome.alarms.create("keepAlive", { periodInMinutes: 0.3 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "keepAlive") {
        // just a no-op to keep the worker awake
        console.log("Service worker is alive");
    }
});