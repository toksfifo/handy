console.log(5);

chrome.contextMenus.create({
  title: "Handy",
  onclick: callHandy,
  contexts: ["all"]
});

function callHandy(info, tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(response) {

  });
}