chrome.runtime.onMessage.addListener(function(msg) {
    console.log(msg)
    //Change button visibility accordingly
    if(msg.lqlink != null){
        document.querySelector("#copyLQ").classList.remove("button")
        document.querySelector("#lqlink").setAttribute("value",msg.lqlink)
    }
    if(msg.hqlink != null){
        document.querySelector("#copyHQ").classList.remove("button")
        document.querySelector("#hqlink").setAttribute("value",msg.hqlink)
    }
    
});  

async function oncomplete(){
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("injecting")
    chrome.scripting.executeScript({files:["content.js"], target: {tabId: tab.id}})
    chrome.webNavigation.onCompleted.removeListener(oncomplete)
}
document.getElementById("copy").addEventListener("click",async (e)=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.webNavigation.onCompleted.addListener(oncomplete)
    
    let isFacebook = tab.url.search(".+(facebook.com).+")
    if(isFacebook>=0){
        //Connection with the extension
          
        //reload tab because facebook leaks
        chrome.tabs.reload(tab.id)
        //wait till tab is fully loaded and inject our cutie.js
        
    }
})


document.getElementById("copyHQ").addEventListener("click",()=>{
    let link = document.querySelector("#hqlink")
    link.select()
    navigator.clipboard.writeText(link.value);

})
document.getElementById("copyLQ").addEventListener("click",()=>{
    let link = document.querySelector("#lqlink")
    link.select()
    navigator.clipboard.writeText(link.value);
})