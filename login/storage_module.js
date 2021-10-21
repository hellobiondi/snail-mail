import { getStorage, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

export function getImages(){
    const storage = getStorage();
    const img = "images/default_profile_pic.png";
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