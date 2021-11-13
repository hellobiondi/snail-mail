import { isUserSignedIn } from "./module.js";

checkSignedIn();

async function checkSignedIn(){
    if(window.location.pathname.includes("/homepage.html") || window.location.pathname.includes("/friend.html")
    || window.location.pathname.includes("/games.html") || window.location.pathname.includes("/profile.html") 
    || window.location.pathname.includes("/chat.html") || window.location.pathname.includes("/connect4.html")
    || window.location.pathname.includes("/hangman.html")){
        console.log("checking in process")
        var check = await isUserSignedIn();
        if(!check){
            window.location.href="./index.html";
        }
    }
}
