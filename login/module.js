import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDatabase, ref, set, child, get} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTCrFgusQmwcWt-xwYCoe-8uJS_IHStxs",
  authDomain: "snail-mail-3e13f.firebaseapp.com",
  databaseURL: "https://snail-mail-3e13f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "snail-mail-3e13f",
  storageBucket: "snail-mail-3e13f.appspot.com",
  messagingSenderId: "831099037810",
  appId: "1:831099037810:web:76e84568bb017aa80a3aeb"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const db = getDatabase(app);

document.getElementById("loginGoogle").addEventListener("click",loginGoogle);

function loginGoogle(){
  //console.log(auth)
  //console.log(provider)
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    //var check = checkIfUserExists(user.uid);
    const usersRef = ref(getDatabase());
    get(child(usersRef, 'users/'+user.uid)).then((snapshot) => {
    if (snapshot.exists()) {
      var result = true;
    } else {
      var result = false;
    }
    console.log(result);
    if(result==false){
      writeToDatabase(user.uid,user.displayName, user.email, user.photoURL);
    }
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    
    const errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

})}

function writeToDatabase(uid, name, email, photo){
  set(ref(db, 'users/' + uid), {
    name: name,
    email: email,
    profile_picture : photo
  });
  console.log("successfully added to database!");
}
