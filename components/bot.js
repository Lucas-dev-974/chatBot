loadJSON(function () { console.log("Get json chat ok"); })
let convo = JSON.parse(localStorage.getItem('chatBotJson'))

this.chatwindow
this.chat
this.close_chat
this.open_chat
this.reload_chat

this.chat_was_opened = false

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
      // console.log(o.convo[o.standingAnswer].reply); //Typing show possible response
      // do this if answer found
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

          console.log(e);
      })

      console.log(typeof (o.convo));
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
  this.close_chat = $('#closeChat')
  this.reload_chat = $('#realoadChat')
  this.chat.css("display", 'none')
}

function addEvent() {
  this.open_chat.click(function () {  // Open chat Btn Event
    window.chat.css('display', 'block')
    window.open_chat.css('display', 'none')
    if (window.chat_was_opened === false) {
      if (localStorage.getItem('chatIntro') === '1') {
        window.chatWindow.talk(convo, 'Start')
      } else {
        window.chatWindow.talk(convo)
      }
      localStorage.setItem('chatIntro', 1)
      setTimeout(function () {
        localStorage.setItem('chatIntro', 0)
      }, 3600 * 1000)
      window.chat_was_opened = true
    }
  })

  this.close_chat.click(function () {  // Open chat Btn Event
    window.chat.css('display', 'none')
    window.open_chat.css('display', 'block')
  })

  this.reload_chat.click(function () {
    reload()
  })
}

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
// pass JSON to your function and you're done!
// chatWindow.talk(convo)



function closeChat() {
  this.chat.css('display', 'none')
  this.open_chat.css('display', 'block')
  reload()

}

function reload() {
  $('.bubble-wrap').html('')
  window.chatWindow.talk(convo, 'Start')
}

function AutoResponse(value) {
  console.log("function response automate");
  let div = document.createElement('div')
  div.setAttribute('class', 'bubble say')
  div.innerHTML = value
  console.log(div);
  $('.bubble-typing.imagine').remove()
  $('.bubble-wrap').append(div)

  this.chatWindow.talk(convo, 'AnotherQuestion')
}