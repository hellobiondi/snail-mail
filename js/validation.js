import { isUserSignedIn } from "./module.js";

checkSignedIn();

async function checkSignedIn(){
    if(window.location.href=="homepage.html" || window.location.href=="friend.html" 
    || window.location.href=="games.html" || window.location.href=="profile.html" || window.location.href=="chat.html"){
    var check = await isUserSignedIn();
    if(!check){
        window.location.href="index.html";
    }
    }
}

// <script src=".js/validation.js" type="module"></script> put this in all html files
