import { getStorage, getDownloadURL, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

const storage = getStorage();

export function getImages(img){
    
    //const img = "images/default_profile_pic.png";
    return new Promise(resolve => {getDownloadURL(ref(storage, img))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      /*
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();*/
  
      // Or inserted into an <img> element
      //const img = document.getElementById('myimg');
      //img.setAttribute('src', url);
      resolve(url);
    })
    .catch((error) => {
      // Handle any errors
      console.log(error.message);
    })
  });
}

export function uploadImages(uid,file,filename){
  const storageRef = ref(storage, uid+"/"+filename);
  const metadata = {
    contentType: 'image/jpeg',
  };
  
  return new Promise(resolve => {uploadBytes(storageRef, file,metadata).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    resolve(uid+"/"+file);
  });
});}