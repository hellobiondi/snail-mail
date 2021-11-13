import { getStorage, getDownloadURL, ref, uploadBytes, uploadString } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";

const storage = getStorage();

export function getImages(img) {

  return new Promise(resolve => {
    getDownloadURL(ref(storage, img))
    .then((url) => {
      resolve(url);
    })
    .catch((error) => {
      console.log(error.message);
    })
  });
}

export function uploadResizeImages(uid, item) {
  var reader = new FileReader();

  //image turned to base64-encoded Data URI.
  reader.readAsDataURL(item);
  reader.name = item.name;//get the image's name
  reader.size = item.size; //get the image's size
  return new Promise(resolve => {
    reader.onload = function (event) {
      var img = new Image();//create a image
      img.src = event.target.result;//result is base64-encoded Data URI
      img.name = event.target.name;//set name (optional)
      img.size = event.target.size;//set size (optional)
      var ou = new Promise(resolve => {
        img.onload = function (el) {
          var elem = document.createElement('canvas');//create a canvas

          //scale the image to 600 (width) and keep aspect ratio
          //var scaleFactor = resize_width / el.target.width;
          elem.width = 200;
          elem.height = 200;

          //draw in canvas
          var ctx = elem.getContext('2d');
          ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

          //get the base64-encoded Data URI from the resize image
          var srcEncoded = ctx.canvas.toDataURL('image/png', 1);
          const storageRef = ref(storage, uid + "/profilepic.jpeg");
          var output = new Promise(resolve => {
            uploadString(storageRef, srcEncoded, 'data_url').then((snapshot) => {
              console.log('Successfully uploaded!');
              resolve(uid + "/profilepic.jpeg");
            });

          });
          resolve(output);
        }
      });
      resolve(ou);
    }
  });

}

export function uploadImages(uid, file) {
  const storageRef = ref(storage, uid + "/profilepic.jpeg");
  const metadata = {
    contentType: 'image/jpeg',
  };

  return new Promise(resolve => {
    uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      resolve(uid + "/profilepic.jpeg");
    });
  });
}