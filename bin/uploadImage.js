import { storage } from "../config/firebaseConfig";
import generateRandomString from "./generateRandomString";
import curdate from "./getCurrentDate";

async function uploadImage(folderName, fileName, image, onSuccess) {

  if (!image) {
    return "";
  }

  const randomString = generateRandomString(8);
  const currentDate = curdate();
  const fName = randomString + "_" + currentDate + '_' + fileName;
  const storageRef = storage.ref(`${folderName}/${fName}`);
  const uploadTask = storageRef.put(image);
  let uploadedImageUrl = "";

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error.message);
    },
    async () => {
      const imageUrl = await storage
        .ref(folderName)
        .child(fName)
        .getDownloadURL();
      onSuccess(imageUrl);
    }
  );

  return { status: "success", imageUrl: uploadedImageUrl };
}

export default uploadImage;
