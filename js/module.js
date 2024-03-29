import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getDatabase, ref, set, child, get, onValue, update, push } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";

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

export function sendMailDatabase(prop, data) {
	// take in variable and update the values 
	const db = getDatabase();
	// var prop = 'Chats/'+receiveruid+"/chatRecent/"
	update(ref(db, prop,),
		data
	);
	console.log('Successfully update database')
}

export function updateChatDatabase(prop, data, senderName) {
	const db = getDatabase();
	push(ref(db, prop + '/mails/'),
		data
	);
	update(ref(db, prop),
		{ senderName }
	);
}

export function deleteChatRecent(prop) {
	// delete of chat recent, uncomment when final testing
	set(ref(db, prop),
		null
	);
}

/*just in case if yall can't do async, can use sessionStorage to test first*/
export function readToDatabase(prop) {
	onValue(ref(db, prop), (snapshot) => {
		const data = snapshot.val();
		sessionStorage.setItem("data", data);
	});
}

/*call it in async function*/
export function readFromDatabase(prop) {
	return new Promise(resolve => {
		onValue(ref(db, prop), (snapshot) => {
			const data = snapshot.val();

			resolve(data);
		});
	});
}

export async function requestAddress() {
	var prop = "users/" + user.uid;
	var dt = { name: user.displayName, email: user.email, profile_picture: user.photoURL };
	writeToDatabase(prop, dt);
}

export async function loginGoogle() {
	return new Promise(resolve => {
		signInWithPopup(auth, provider)
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
				get(child(usersRef, 'users/' + user.uid)).then((snapshot) => {
					if (snapshot.exists()) {
						var exist = true;
						window.location.href = "./homepage.html";
					} else {
						var exist = false;
					}
					//console.log(result);
					if (exist == false) {
						resolve(user);
					} else {
						resolve(false);
					}

					// ...
				}).catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;

					const errorMessage = error.message;
					console.log(errorCode + " " + errorMessage);
					
				});

			})
	});
}

export async function loginEmail(email, pwd) {

	return new Promise(resolve=>{signInWithEmailAndPassword(auth, email, pwd)
		.then((result) => {
			const user = result.user;
			console.log("login successfully");
			//window.location.href = "./homepage.html";
			resolve(user.uid);

		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode + " " + errorMessage);
			resolve(false);
		});
	});
}

export async function registerWithEmail(email, pwd, username) {
	return new Promise(resolve => {
		createUserWithEmailAndPassword(auth, email, pwd)
			.then((result) => {
				const user = result.user;
				const uid = user.uid;
				var dt = { displayName: username, email: email, photoURL: "https://firebasestorage.googleapis.com/v0/b/snail-mail-3e13f.appspot.com/o/images%2Fdefault_profile_pic.png?alt=media&token=debe0320-d002-49e5-b8fa-fa2f62003f21", uid: uid };
				resolve(dt);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode + " " + errorMessage);
				resolve(false);
			});
	});
}

export async function writeToDatabase(key, data){
  return new Promise(resolve => {set(ref(db, key), data).then((result)=>{
    console.log("successfully added to database!");
    resolve(true);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+" "+errorMessage);
    resolve(false);
  });
});
  
}


export async function updateToDatabase(key, data) {
	return new Promise(resolve => {
		update(ref(db, key), data).then(() => {
			console.log("Successfully updated to database!");
			resolve(true);
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode + " " + errorMessage);
			resolve(false);
		});
	});
}


export async function updateToProfileDatabase(key, data) {
	await update(ref(db, key), data)
	//console.log("successfully update data!");
}

export function updateUsername(key, data) {
	const changes = {};
	changes['/name/'] = data;
	update(ref(db, key), changes);
	console.log("successfully update data!");
}

export async function isUserSignedIn() {
	return new Promise(resolve => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				resolve(uid);
				// ...
			} else {
				
				resolve(false) 
			}
		});
	});
}

export function signOutUser() {
	signOut(auth).then(() => {
		sessionStorage.clear();
		console.log("logout Successfully");
		window.location.href = "./index.html";
	}).catch((error) => {
		console.log(error.message);
	});

}

export async function lol(userID,friendsObj){
	var property =  "users";
	var allUsers = await readFromDatabase(property);
	for(let eachUserID in allUsers){
		console.log(eachUserID);
	}

	//return Object.keys(allUsers);
}
