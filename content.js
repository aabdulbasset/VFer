
function mainFunction(test){
    let hq = RegExp('playable_url_quality_hd":"(.*?)","', 'g');
    let lq = RegExp('playable_url":"(.*?)","', 'g');
    let isFound = false
    for(let i=0;i<test.length;i++){
        // is there a lq link ?
        if(test[i].innerHTML.search(lq)>=0){
            let lqLink = lq.exec(test[i].innerHTML)
            let hqLink = null
            lqLink = lqLink[1].replaceAll("\\","")
            // is there a HQ link ?
            if(test[i].innerHTML.search(hq)>=0){
                hqLink = hq.exec(test[i].innerHTML)
                hqLink = hqLink[1].replaceAll("\\","")
            }
            console.log("Sending message")
            chrome.runtime.sendMessage({hqlink:hqLink,lqlink:lqLink})
            isFound=true
            break
        }
        
        
    }
    if(isFound == false){
        console.log(test)
        alert("Error happened, try again")
    }

}

fn1()
function fn1(){
    console.log("fired")
    let promise = new Promise((resolve,reject)=>{
        let test = 0
        let iterations=0
        while(true){
            test = document.getElementsByTagName("script")
            if(test.length>0){
                break
            }
            iterations +=1
            if(iterations >= 1000){
                reject("Not found")
            }
        }
        resolve(test)
    })
    //mainFunction()
    promise.then((test)=>{
        mainFunction(test)
    })
    
}
