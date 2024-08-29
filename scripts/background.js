function getTabUrl() {
  const videoId = document.URL.split("=").at(-1);
  chrome.storage.local.clear();
  chrome.storage.local.set({ videoId: videoId });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        function: getTabUrl,
      })
      .then(() => {
        chrome.tabs.create({ url: `index.html` });
      });
  }
});
