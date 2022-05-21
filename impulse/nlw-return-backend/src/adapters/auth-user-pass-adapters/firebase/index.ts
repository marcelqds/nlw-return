import "./app-firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthUserPassAdaptersInterface, IRequestLoginData, IRequestSignupData } from "../auth-user-pass-adapters-interface";


export class FirebaseAdapters implements AuthUserPassAdaptersInterface{
  async login(data : IRequestLoginData){
    const {email, password} = data;

    const auth = getAuth();    
    const authLogin = await signInWithEmailAndPassword(auth, email, password);
    console.log(authLogin);
    
    /*  .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });*/
  }

  async signup(data: IRequestSignupData){
    const {email, password} = data;

    const auth = getAuth();
    const authCreate = await createUserWithEmailAndPassword(auth, email, password);
    console.log(authCreate);

  }

  async signout(){
    
    const auth = getAuth();
    const authCreate = await signOut(auth);
    console.log(authCreate);

  }
}

/*


import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});


*/