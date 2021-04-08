chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    var blacklistedWebsite = 'http : / / yourdomain . com /';
    if (sender.url == blacklistedWebsite)
        return;  
    console.log("Recieved", request, sender)
    chrome.system.cpu.getInfo(function(info){
        sendResponse(info)
    });
});