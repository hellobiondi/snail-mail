import { getStorage, getDownloadURL, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

const storage = getStorage();

export function getImages(img){
    
    return new Promise(resolve => {getDownloadURL(ref(storage, img))
    .then((url) => {
      resolve(url);
    })
    .catch((error) => {
      console.log(error.message);
    })
  });
}

export function uploadImages(uid,file){
  const storageRef = ref(storage, uid+"/profilepic.jpeg");
  const metadata = {
    contentType: 'image/jpeg',
  };
  
  return new Promise(resolve => {uploadBytes(storageRef, file,metadata).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    resolve(uid+"/profilepic.jpeg");
  });
});}