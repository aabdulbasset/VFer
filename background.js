
function connect(){
    chrome.runtime.onConnect.addListener(function(port) {
        console.log("Connected")
    })
}

