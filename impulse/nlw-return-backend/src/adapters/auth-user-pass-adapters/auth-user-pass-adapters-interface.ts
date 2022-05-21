export interface IRequestSignupData{
    email: string;
    password: string;
}
export interface IRequestLoginData{
    email: string;
    password: string;
}

export interface AuthUserPassAdaptersInterface{
    login: (data: IRequestLoginData) => Promise<void>;
    signup: (data:IRequestSignupData) => Promise<void>;
    signout: () => Promise<void>;
}