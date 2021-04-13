loadJSON(function () { console.log("Get json chat ok"); })
let convo = JSON.parse(localStorage.getItem('chatBotJson'))

this.chat_was_opened = (localStorage.getItem('chatIntro')) ? localStorage.getItem('chatIntro') : false
this.open_chat, this.open_chat2
this.chatwindow
this.close_chat
this.reload_chat
this.chat

initChatComponents()
addEvent()


function initChatComponents() {
  chatWindow = new Bubbles(document.getElementById("chat"), "chatWindow", {
    inputCallbackFn: function (o) {
      var miss = function () {
        chatWindow.talk(
          {
            "i-dont-get-it": {
              says: [
                "Désoler je ne comprends pas votre requête, veuillez taper des mots clés ou choisir une réponse parmi cel proposé"
              ],
              reply: o.convo[o.standingAnswer].reply
            }
          },
          "i-dont-get-it"
        )
      }
      // Si il y'a un match avec la recherce alors ->
      var match = function (key) {
        setTimeout(function () {
          chatWindow.talk(convo, key) // restart current convo from point found in the answer
        }, 600)
      }

      // sanitize text for search function
      var strip = function (text) {
        return text.toLowerCase().replace(/[\s.,\/#!$%\^&\*;:{}=\-_'"`~()]/g, "")
      }

      // search function
      var found = false
      o.convo[o.standingAnswer].reply.forEach(function (e, i) {
        strip(e.question).includes(strip(o.input)) && o.input.length > 0
          ? (found = e.answer)
          : found ? null : (found = false)
      })

      for (const [key, value] of Object.entries(o.convo)) {
        strip(key).includes(strip(o.input)) && o.input.length > 0 ? 
        (found = key) : found ? null : (found = false) 
        if(found) break
      }


      found ? match(found) : miss()
    }
  })
  this.chat = $('#chatbot')
  this.open_chat = $('#openChat')
  this.open_chat2 = $('#openChat2')

  this.close_chat = $('#closeChat')
  this.reload_chat = $('#realoadChat')
  this.chat.css("display", 'none')
}

function addEvent() {
  (this.open_chat).click(() => { openChat() })

  this.close_chat.click(() => {  // Open chat Btn Event
    window.chat.css('display', 'none')
    window.open_chat.css('display', 'block')
  })

  this.reload_chat.click(() => { reload() })
}

// Ouvrir le chat
function openChat(){
  this.chat.css('display', 'block')
  this.open_chat.css('display', 'none')
  let historique = (localStorage.getItem('chat-bubble-interactions')) ? JSON.parse(localStorage.getItem('chat-bubble-interactions')) : null

  if(historique){ // Si une conversation existe déjà alors on l'affiche
    let last = historique.length - 1
    if(historique[last].reply == ""){
      let key = this.get_key(historique[last].say)
      historique.pop() // Remove last element 
      this.chatWindow.talk(convo, key)
    }

    //  ---------------- Scroll when changin page -------------
    // let chat_content = $('#chat .bubble-wrap')
    // let chat_typing  = $("#chat .bubble-wrap .bubble-typing .imagine")

    // // Parcour l'historique de la conversation pour y afficher les élements
    // historique.forEach((element) => {
    //   var div  = document.createElement('div')
    //   var span = document.createElement('span')
    //   span.setAttribute('class', "bubble-content")

    //   if(element.reply == "reply reply-pick"){
    //     div.setAttribute('class', 'bubble reply say bubble-picked')
    //   }else{
    //     div.setAttribute('class', 'bubble say')
    //   }

    //   // Ajout de l'historique de la conv au chat
    //   span.innerHTML += (element.say)
    //   div.append(span)
    //   chat_content.insertBefore(div, chat_typing)
    // })

  }else{
    this.chatWindow.talk(convo, 'ice')
    
  }
}

// Function to load scenario
function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '/scenario.json', true);
  xobj.onreadystatechange = function (response) {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
      localStorage.setItem('chatBotJson', xobj.responseText)
    }
  };
  xobj.send(null);
}

function closeChat() {
  this.chat.css('display', 'none')
  this.open_chat.css('display', 'block')
  reload()
}

function reload() {
  localStorage.removeItem("chat-bubble-interactions")
  $('.bubble-wrap').html('')
  window.chatWindow.talk(convo, 'Start2')
 
}

function AutoResponse(value) {
  let div = document.createElement('div')
  div.setAttribute('class', 'bubble say')
  div.innerHTML = value
  $('.bubble-typing.imagine').remove()
  $('.bubble-wrap').append(div)
}


function get_key(phrase){
  for(const [key, value] of Object.entries(convo)){
    if(value.says[0] === phrase){
      return key
    }
  }
}

