import express from 'express';
import { AuthUserPassAdapters } from '../adapters/auth-user-pass-adapters';
import { TokenAdapters } from '../adapters/token-adapters';

export const userRouter = express.Router();

/**
* @swagger
* components: 
*  schemas:
*   Users:
*    type: object
*    required:
*     - email
*     - password
*     - confirmPassword
*    properties:
*     email:
*       type: string
*       format: email
*     password:
*      type: string
*      format: password
*     confirmPassword:
*      type: string
*      format: password
*    example:
*     email : ""
*     password: ""
*     confirmPassword: ""
*
* tags:
*  name: Users
*  description: Gerenciamento de usuários
*/

/**
* @swagger
* /users:
*  post:
*   tags: [Users]
*   summary: Cria um novo usuário.
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: "#/components/schemas/Users"
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
userRouter.post('/', async (req, res) => {
   const { email, password, confirmPassword } = req.body;
   if(password !== confirmPassword) return res.status(401).json({message : "Senhas diferentes"});
    const authUser = new AuthUserPassAdapters();
    await authUser.signup({email, password});

    const tokenAdapters = new TokenAdapters();
    const token = await tokenAdapters.generateToken({email,},"env.salt");

    return res.status(200).json({token});
});

