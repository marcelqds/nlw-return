import { TokenInterfaceAdapters, PayloadInterface } from '../token-interface-adapters';
import {sign, verify} from 'jsonwebtoken';

export default class JsonWebToken implements TokenInterfaceAdapters{
	public async generateToken(payload: PayloadInterface, salt:string) : Promise<string>{
		return await sign(payload,salt);
	}

	public async decodeToken(token:string, salt:string) : Promise<PayloadInterface>{
		return await verify(token,salt) as PayloadInterface;		 
	}
}
