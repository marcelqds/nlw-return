export interface PayloadInterface{
	email : string;
	iat?: Date | number;
}

export interface TokenInterfaceAdapters{
	generateToken(payload:PayloadInterface, salt: string) : Promise<string>;	
	decodeToken(token:string, salt:string) : Promise<PayloadInterface>;
}

