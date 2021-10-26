import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDatabase, ref, set, child, get, onValue, update, push} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

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

export function updateChatDatabase(prop,sender,datetime,content) {
  const db = getDatabase();
  push(ref(db, prop + '/chatHistory/'+sender+'/mails'), {
    datetime,content
  });

  // delete of chat recent, uncomment when final testing
  // set(ref(db, prop + '/chatRecent/'+sender ),null
  // );
}

/*just in case if yall can't do async, can use sessionStorage to test first*/
export function readToDatabase(prop){
  onValue(ref(db, prop), (snapshot) => {
    const data = snapshot.val();
    sessionStorage.setItem("data",data);
  });
}

/*call it in async function*/
export function readFromDatabase(prop){
  /*call this function in this way:
  retrieve chatHistory 
    - prop = "Chats/"+ uid +"/chatHistory" to get the whole list of chatHistory the user has
    
  retrieve chatRecent 
    - prop = "Chats/" + uid + "/chatRecent" to get the whole list of chatRecent including those havent received by the user
    - do check the currentDate with the expected_received_date, if >= expected, shows the mail in Recently received div box

  retrieve profile
    - prop = "users/" + uid

  retrieve game id
    - prop = "users/" + uid +"/activegames"
    return an object {gameid1:game1info,gameid2:game2info,...}

  retrieve games
    - prop = "games/gamename/" + gameID to get the info for the game of the user

  var data = readFromDatabase(prop);
  */
    return new Promise(resolve=>{onValue(ref(db,prop), (snapshot) => {
      const data = snapshot.val();
      
      resolve(data);
    });
  });
}

export async function requestAddress(){
  var prop = "users/" + user.uid;
  var dt = {name:user.displayName,email:user.email,profile_picture:user.photoURL};
  writeToDatabase(prop,dt);
}

 export async function loginGoogle(){
  return new Promise(resolve => {signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    //console.log(user);
    //sessionStorage.setItem("currentUser",user.uid);
    //var check = checkIfUserExists(user.uid);
    const usersRef = ref(getDatabase());
    get(child(usersRef, 'users/'+user.uid)).then((snapshot) => {
    if (snapshot.exists()) {
      var exist = true;
      window.location.href="./homepage.html";
    } else {
      var exist = false;
    }
    //console.log(result);
    if(exist==false){
      //var data ={uid:user.uid,name:user.displayName,email:user.email,profile_picture:user.photoURL};
      resolve(user);
      //writeToDatabase(prop,dt);
      //window.location.href="./requestAddress.html";
    }else{
      resolve(false);
    }
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    
    const errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
    // The email of the user's account used.
    //const email = error.email;
    // The AuthCredential type that was used.
    //const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

})});}

export function loginEmail(email,pwd){
  signInWithEmailAndPassword(auth,email, pwd)
  .then((result) => {
    const user = result.user;
    console.log("login successfully");
    window.location.href="./homepage.html";
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+" "+errorMessage);
  });
}

export async function registerWithEmail(email,pwd,username){
  return new Promise(resolve => {createUserWithEmailAndPassword(auth,email,pwd)
  .then((result) => {
    const user = result.user;
    const uid = user.uid;
    //var prop = "users/" + uid;
    var dt = {displayName:username,email:email,photoURL:"https://firebasestorage.googleapis.com/v0/b/snail-mail-3e13f.appspot.com/o/images%2Fdefault_profile_pic.png?alt=media&token=debe0320-d002-49e5-b8fa-fa2f62003f21",uid:uid};
    resolve(dt);
    //writeToDatabase(prop,dt);
    //window.location.href="./requestAddress.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+" "+errorMessage);
    resolve(false);
  });
});}

export function writeToDatabase(key, data){
  set(ref(db, key), data);
  console.log("successfully added to database!");
}

export function updateToDatabase(key,data){
  update(ref(db,key),data);
  console.log("successfully update data!");
}

export function isUserSignedIn(){
  //console.log("hello");
  //const auth = getAuth();
  return new Promise(resolve=>{onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      
      //console.log("current user:"+uid);//see if this appears in console, if yes meant user currently signed in
      resolve(uid);
      // ...
    } else {
      console.log("Please login again");
    }
  });
});
}

export function signOutUser(){
  signOut(auth).then(() => {
    // Sign-out successful.
    sessionStorage.clear();
    console.log("logout Successfully");
  }).catch((error) => {
    // An error happened.
    console.log(error.message);
  });
  
}
