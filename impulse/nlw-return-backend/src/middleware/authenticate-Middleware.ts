import { TokenAdapters } from "../adapters/token-adapters";
//import env from "../../environment";
import { Request, NextFunction, Response} from 'express';

interface rolesInterface{
	[index:string] : string;
}

export const authorize = () => {
	return async function (req: Request, res:Response, next:NextFunction){		
		let token = req.headers.authorization;
		console.log(token);
		console.log("================");
		if(!token)
			return res.status(401).send({errors: ["É necessário se autenticar"]});

		try{
		let jsonToken = new TokenAdapters();
		let decodeToken = await jsonToken.decodeToken(token,"env.salt");			
		
		if(decodeToken.iat && Date.now() >= decodeToken.iat)
			return res.status(401).send({ message : "Token expirou, efetue acesso ao sistema."});
		
		return next();

		}catch(e){
			let message = "Token informado é inválido. Acesse o sistema via usuário/senha";			
			return res.status(401).send({errors: [message]});				
		}
	}
}