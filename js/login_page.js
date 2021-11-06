document.getElementById("sign_in").addEventListener("click",signInPage);
document.getElementById("sign_up").addEventListener("click",signUpPage);

function signInPage(){
    
    if(this.classList.contains("unselected")){
        this.classList.replace("unselected","selected");
        document.getElementById("sign_up").classList.replace("selected","unselected");

        document.getElementById("signUpBox").classList.add("d-none");
        document.getElementById("signInBox").classList.remove("d-none");
    }
}

function signUpPage(){
    
    if(this.classList.contains("unselected")){
        this.classList.replace("unselected","selected");
        document.getElementById("sign_in").classList.replace("selected","unselected");

        document.getElementById("signUpBox").classList.remove("d-none");
        document.getElementById("signInBox").classList.add("d-none");
    }

}


