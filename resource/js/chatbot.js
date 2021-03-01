loadJSON(function() { console.log('ChatBot: Récupération du chat OK') });

// Variables
this.chatWindow
this.chat
this.closeBtn
this.openBtn
this.reloadBtn

this.chatOpenend = false

initChat()
addEvent()

function initChat(){
    this.chatWindow = new Bubbles( document.getElementById("chat"), "chatWindow" )
    this.chat       = $('#chatbot')
    this.openBtn    = $('#openChat')
    this.closeBtn   = $('#closeChat')
    this.reloadBtn  = $('#realoadChat')
    
    this.chat.css("display", 'none')
}

function addEvent(){
    this.openBtn.click(function(){  // Open chat Btn Event
        window.chat.css('display', 'block')
        window.openBtn.css('display', 'none')
        if(window.chatOpenend === false){
            
            if(localStorage.getItem('chatIntro') === '1'){
                window.chatWindow.talk(JSON.parse(localStorage.getItem('chatBotJson')), 'Start')
            }else{
                window.chatWindow.talk(JSON.parse(localStorage.getItem('chatBotJson')))
            }
            localStorage.setItem('chatIntro', 1)
            setTimeout(function(){
                localStorage.setItem('chatIntro', 0)
            }, 3600 * 1000 )
            window.chatOpenend = true
        }
    })

    this.closeBtn.click(function(){  // Open chat Btn Event
        window.chat.css('display', 'none')
        window.openBtn.css('display', 'block')
    })

    this.reloadBtn.click(function(){
        let div = document.createElement('div')
        $('.bubble-wrap').html('')
        $('.bubble-wrap').append(div)
        window.chatWindow.talk(JSON.parse(localStorage.getItem('chatBotJson')), 'Start')
    })
}

function loadJSON(callback) {   
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/resource/scenario.json', true);
    xobj.onreadystatechange = function (response) {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
            localStorage.setItem('chatBotJson', xobj.responseText)
        }
    };
    xobj.send(null);  
}

$('#btntest').click(function(){
    test()
})
function keyWordSearch(key){
    let data = JSON.parse(localStorage.getItem('chatBotJson'))
    Object.keys(data).forEach(function(k){
        let question = data[k]
        let keys = key.split(' ')
        keys.forEach(key => {
            question.says.forEach(element => {
                console.log(typeof(element));
                if(element.includes(key)){
                    console.log(key);
                    console.log('ok');
                }
            })
        })
    });
}