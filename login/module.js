import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
<<<<<<< Updated upstream
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDatabase, ref, set, child, get, onValue, update } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
=======
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDatabase, ref, set, child, get, onValue, update, push} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";
>>>>>>> Stashed changes

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

/*just in case if yall can't do async, can use sessionStorage to test first*/
export function readToDatabase(prop) {
	onValue(ref(db, prop), (snapshot) => {
		const data = snapshot.val();
		sessionStorage.setItem("data", data);
	});
}

/*call it in async function*/
export function readFromDatabase(prop) {
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
	return new Promise(resolve => {
		onValue(ref(db, prop), (snapshot) => {
			const data = snapshot.val();
			resolve(data);
		});
	});
}

<<<<<<< Updated upstream
export function loginGoogle() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			console.log(user);
			sessionStorage.setItem("currentUser", user.uid);
			//var check = checkIfUserExists(user.uid);
			const usersRef = ref(getDatabase());
			get(child(usersRef, 'users/' + user.uid)).then((snapshot) => {
				if (snapshot.exists()) {
					var result = true;
				} else {
					var result = false;
				}
				console.log(result);
				if (result == false) {
					var prop = "users/" + user.uid;
					var dt = { name: user.displayName, email: user.email, profile_picture: user.photoURL };
					writeToDatabase(prop, dt);
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

		})
=======
 export function loginGoogle(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    sessionStorage.setItem("currentUser",user.uid);
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
      var prop = "users/" + user.uid;
      var dt = {name:user.displayName,email:user.email,profile_picture:user.photoURL};
      writeToDatabase(prop,dt);
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

})}

export function loginEmail(email,pwd){
  signInWithEmailAndPassword(auth,email, pwd)
  .then((result) => {
    const user = result.user;
    console.log("login successfully");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+" "+errorMessage);
  });
}

export function resgiterWithEmail(email,pwd,username){
  createUserWithEmailAndPassword(auth,email,pwd)
  .then((result) => {
    const user = result.user;
    const uid = user.uid;
    var prop = "users/" + uid;
    var dt = {name:username,email:email,profile_picture:"img/default_profile_pic.png"};
    writeToDatabase(prop,dt);
    window.location.href="./requestAddress.html";

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+" "+errorMessage);
  });
}

export function writeToDatabase(key, data){
  set(ref(db, key), data);
  console.log("successfully added to database!");
>>>>>>> Stashed changes
}

export function writeToDatabase(key, data) {
	set(ref(db, key), data);
	console.log("successfully added to database!");
}

export function updateToDatabase(key, data) {
	update(ref(db, key), data);
	console.log("successfully update data!");
}

export function isUserSignedIn() {
	//console.log("hello");
	//const auth = getAuth();
	return new Promise(resolve => {
		onAuthStateChanged(auth, (user) => {
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

export function signOutUser() {
	signOut(auth).then(() => {
		// Sign-out successful.
		sessionStorage.clear();
		console.log("logout Successfully");
	}).catch((error) => {
		// An error happened.
		console.log(error.message);
	});

}
