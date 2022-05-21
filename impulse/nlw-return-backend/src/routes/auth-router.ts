import { triggerAsyncId } from 'async_hooks';
import express from 'express';
import { AuthUserPassAdapters } from '../adapters/auth-user-pass-adapters';
import { TokenAdapters } from '../adapters/token-adapters';

export const authRouter = express.Router();

/**
* @swagger
* components: 
*  schemas:
*   Auth:
*    type: object
*    required:
*     - email
*     - password
*    properties:
*     email:
*       type: string
*       format: email
*     password:
*      type: string
*      format: password
*    example:
*     email : ""
*     password: ""
*
* tags:
*  name: Auth
*  description: Gerenciamento de autenticação
*/

/**
* @swagger
* /login:
*  post:
*   tags: [Auth]
*   summary: Permite acesso a área logada.
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: "#/components/schemas/Auth"
*   responses:
*    200:
*     description: OK
*     content:
*      application/json:
*       schema:
*        properties:
*         token:
*          type: string
*        example:
*         token: "asadfasfdlasdjfasjhka"
*/

authRouter.post('/', async (req, res) => {
    const {email, password} = req.body;
        
    const authUser = new AuthUserPassAdapters();
    await authUser.login({email, password});
    const tokenAdapters = new TokenAdapters();
    const token = await tokenAdapters.generateToken({email,},"Marcelo_Queiroz");

    return res.status(200).json({token});
    
});

/*userRouter.get('/',(req, res) => {
    return res.json({ token : ""});
});*/
