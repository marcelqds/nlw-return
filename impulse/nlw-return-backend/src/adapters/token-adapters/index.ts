import { TokenInterfaceAdapters, PayloadInterface } from './token-interface-adapters';
import ExterToken from './jsonwebtoken';

export class TokenAdapters implements TokenInterfaceAdapters{
	public async generateToken(payload: PayloadInterface, salt:string) : Promise<string>{
		let jwt = new ExterToken();
		return await jwt.generateToken(payload,salt);		
	}

	public async decodeToken(token:string, salt:string) : Promise<PayloadInterface>{
		let jwt = new ExterToken();
		let resJwt:PayloadInterface = await jwt.decodeToken(token,salt) as PayloadInterface;
		return resJwt;
	}
}