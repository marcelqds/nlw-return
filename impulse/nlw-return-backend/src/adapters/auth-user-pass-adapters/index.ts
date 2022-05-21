import { AuthUserPassAdaptersInterface, IRequestLoginData, IRequestSignupData } from "./auth-user-pass-adapters-interface";
import { FirebaseAdapters } from "./firebase";

export class AuthUserPassAdapters implements AuthUserPassAdaptersInterface{
    async login(data: IRequestLoginData){
        const { email, password } = data;
        const firebaseAdapters = new FirebaseAdapters();
        await firebaseAdapters.login({email,password});
    }

    async signup(data: IRequestSignupData){
        const { email, password } = data;
        const firebaseAdapters = new FirebaseAdapters();
        await firebaseAdapters.signup({email, password});
    }

    async signout(){
        const firebaseAdapters = new FirebaseAdapters();
        await firebaseAdapters.signout();
    }
}
