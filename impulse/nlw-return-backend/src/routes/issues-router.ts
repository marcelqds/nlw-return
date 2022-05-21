import express from 'express';
import { gitApi } from '../libs/git-api';
import { GetIdFeedbackService } from '../services/feedbacks/get-id-feedback-service';
import { authorize } from '../middleware/authenticate-Middleware';

export const issuesRouter = express.Router();

/**
* @swagger
* components:
*  schemas:
*   Issues:
*    type: object
*    required:
*     - id_feedback
*     - title
*     - body
*
*    properties:
*     id_feedback:
*       type: string
*     title:
*       type: string
*     body:
*       type: string
*     label:
*       type: string
*    example:
*     id_feedback: ""
*     title: ""
*     body: ""
*     label: ""
*/

/**
* @swagger
* tags:
*  name: Issues
*  description: Gerenciamento de issues.
*/

/**
* @swagger
* /issues:
*  post:
*   summary: Cria uma issue no repository do projet
*   tags: [Issues]
*   security: [{"tokenJWT"}]
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: "#/components/schemas/Issues"
*   responses:
*    201:
*     content:
*      type: object
*/
issuesRouter.post('/', authorize, async (req, res) => {
    const { title, body, id_feedback } = req.body;
    
    
    const headers = {
        authorization: "token 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"
    };
    
    const data = {
        title, body
    }

    const issue = await gitApi.post('/issues',{
        headers, 
        data
    });

    console.log(issue);
});

/*curl   -X POST   -H "Accept: application/vnd.github.v3+json" -H "Authorization: token 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"   https://api.github.com/repos/marcelqds/nlw-return/issues   -d '{"title":"Sistema não esta funcionando","labels":["bug","bug-web-abc"]}'*/
