import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbCqr_cv2OLklG0EEXdIK3kBLK49k8dCg",
  authDomain: "nlwr-e1ae7.firebaseapp.com",
  projectId: "nlwr-e1ae7",
  storageBucket: "nlwr-e1ae7.appspot.com",
  messagingSenderId: "1082336878322",
  appId: "1:1082336878322:web:ef9a87cf130e65eb087a6b"
};

export const appFirebase = initializeApp(firebaseConfig);
