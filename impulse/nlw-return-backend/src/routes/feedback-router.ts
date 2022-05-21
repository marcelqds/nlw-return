import express from 'express';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from '../services/feedbacks/submit-feedback-service';
import { NodemailerMailAdapter } from '../adapters/nodemailer/nodemailer-mail-adapter';
import { GetAllFeedbacksService } from '../services/feedbacks/get-all-feedbacks-service';
import { GetIdFeedbackService } from '../services/feedbacks/get-id-feedback-service';
import { authorize } from '../middleware/authenticate-Middleware';

export const feedbackRouter = express.Router();

//https://spec.openapis.org/oas/v3.1.0#schemaObject

/**
* @swagger
* components:
*  schemas:
*   Feedback:
*    type: object
*    required:
*     - type
*     - comment
*    properties:
*     id:
*      type: string
*     type:
*      type: string
*     comment:
*      type: string
*     screenshot:
*      type: string
*      format: base64
*    example:
*     type: ''
*     comment: ''
*     screenshot: ''
*  securitySchemes:  
*   tokenJWT:
*    type: http
*    scheme: bearer
*    bearerFormat: JWT
*/

/**
*
*@swagger
*
*tags:
*   name: Feedback
*   description: Gerenciamento de feedbacks.
*/

/**
* @swagger
* /feedbacks:
*   post:
*     summary: "Cria um novo feedback"
*     tags: [Feedback]
*     requestBody:
*       content:
*        application/json:
*         schema:
*          type: 'object'
*          $ref: '#/components/schemas/Feedback'
*     responses:
*       201:
*           description: 'Sem conteúdo'
*       401:
*           description: 'Dados ínvalidos'
*       
*/
feedbackRouter.post('', async (req, res) => {
    
    const {type, comment, screenshot } = req.body;    
        

    const submitFeedbackService = new SubmitFeedbackService(
        new PrismaFeedbacksRepository(), 
        new NodemailerMailAdapter()
    );
    const feedback = await submitFeedbackService.execute(
        {
            type, 
            comment, 
            screenshot
        }
    );
    return res.status(201).send();
});


/**
*@swagger
*
* /feedbacks:
*  get:
*   summary: Retorna lista de feedbacks
*   tags: [Feedback]
*   security: [{"tokenJWT"}]
*   parameters:
*     - name: skip
*       description: 'A partir de qual registro deseja trazer os dados.'
*       in: query
*       schema:
*        type: integer
*        format: int32
*     - name: limit
*       in: query
*       description: 'Quantidade de registros que irá trazer a partir do valor inicial informado em "skip"'
*       schema:
*        type: integer
*        format: int32
*   responses:
*    200:
*     description: Retorna uma lista de feedbacks
*     content:
*      appliction/json:
*       schema:
*        items: 
*         $ref: '#/components/schemas/Feedback'
*    401:
*     description: Não autorizado
*/

feedbackRouter.get('', authorize, async (req, res) => {
    let { skip, limit } = req.query;
    let page = skip && parseInt(skip.toString()) > 0 ? parseInt(skip.toString()) - 1 : 0;
    let _limit = limit && parseInt(limit.toString()) > 0 ? parseInt(limit.toString()) : 15;

    const getAllFeedbacksService = new GetAllFeedbacksService( new PrismaFeedbacksRepository());
    const feedbacks = await getAllFeedbacksService.execute({page, limit: _limit});
    return res.json(feedbacks);
});

/**
* @swagger
*
* /feedbacks/{id}:
*  get:
*   tags: [Feedback]
*   security: [{"tokenJWT"}]
*   summary: Retorna um feedback
*   parameters:
*    - name: id
*      in: path
*      type: string
*      required: true
*   responses:
*    200:
*     description: 'Retorna um objeto de feedback'
*     content:
*      application/json:
*       schema:
*        type: 'object'
*        $ref: '#/components/schemas/Feedback'
*    401:
*     description: Não autorizado
*/
feedbackRouter.get('/:id', authorize, async (req, res) => {
    const { id } = req.params;
    console.log("id: ", id);
    const getIdFeedbackService = new GetIdFeedbackService( new PrismaFeedbacksRepository());
    const feedback = await getIdFeedbackService.execute(id);
    return res.json(feedback);
});

/**
* @swagger
* /feedbacks/{id}/state:
*  put:
*   tags: [Feedback]
*   security: [{"tokenJWT"}]
*   summary: Atualiza o estado do feedback
*   parameters:
*    - name: id
*      in: path
*      type: int
*   responses:
*    201:
*     description: Sem conteudo
*     content:
*      type: object
*/
feedbackRouter.patch('/:id/state', authorize, async (req, res) =>{
    res.sendStatus(201);
});
