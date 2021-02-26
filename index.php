<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>
    
<div>
    <img id="openChat" src="./log.jpeg" alt="logo" width="50px" class="m-2 rounded-circle float-right" style="position: absolute; bottom: 10px; right: 10px; cursor: pointer;"/>
    <div id="chatbot">
        <div class="d-flex w-100">
            <div class="col py-4">
                <img id="logoChat" src="./log.jpeg" alt="logo" width="50px" class="m-2 float-right"/>
            </div>
            <img id="closeChat" src="./cancel.svg"  alt="close" width="5%" class="m-2" style="cursor: pointer;"/>
        </div>
        <div id="chat">  </div>
    </div>
</div>


<!-- import the JavaScript ChatBot -->
<script src="./resource/js/Bubbles.js"></script>
<script src="./resource/js/chatbot.js"></script>

<style>
    #chatbot{
        position: absolute; 
        bottom: 20px; 
        right: 20px; 
        background-color: #262626;
        transition: all 0.2s;
        width: 400px;
    }

    #logoChat{
        position: absolute;
        left: 40%;
        top: 10px;
        border-radius: 50%;
    }

    .bubble-container{
        border-radius: 10px;
       
    }
    .bubble-wrap{
        height: 550px !important;
        background : #E9E9E9;  
        padding: 10px; 
        overflow-y: auto;
        padding-top: 20px;
    }

    .bubble-button{
        margin: 6px;
        cursor: pointer;
        font-size: 10px;
    }.bubble-button > a{
        color: inherit;
    }

    .chatbot-title-conv{
        font-weight: bold;
        margin-bottom: 5px;
    }

    .bubble-content{
        font-size: 12px;
        line-height: 1 !important;
    }

    body{
        line-height: 1;
    }
 
   
</style>

</body>
</html>