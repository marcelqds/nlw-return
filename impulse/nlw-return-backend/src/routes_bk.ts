import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/feedbacks/submit-feedback-service';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { GetAllFeedbacksService } from './services/feedbacks/get-all-feedbacks-service';
import { GetIdFeedbackService } from './services/feedbacks/get-id-feedback-service';

export const routes = express.Router();

//https://spec.openapis.org/oas/v3.1.0#schemaObject

/**
* @swagger
* components:
*   schemas:
*       Feedback:
*           type: object
*           required:
*               - type
*               - comment
*           properties:
*               id:
*                type: string
*               type:
*                type: string
*               comment:
*                type: string
*               screenshot:
*                type: string
*           example:
*               type: ''
*               comment: ''
*               screenshot: ''
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
routes.post('/feedbacks', async (req, res) => {
    
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
*   parameters:
*     - name: skip
*       description: 'A partir de qual registro deseja trazer os dadose.'
*       in: query
*       schema:
*        type: integer
*        format: int32
*     - name: limit
*       in: query
*       description: 'Numero de registro que irá trazer a partir do valor inicial informado em "skip"'
*       schema:
*        type: integer
*        format: int32
*   responses:
*    200:
*     description: feedbacks
*     schema:
*      type: 'object' 
*/

routes.get('/feedbacks', async (req, res) => {
    let { skip, limit } = req.query;
    let page = skip && parseInt(skip.toString()) > 0 ? parseInt(skip.toString()) - 1 : 0;
    let _limit = limit && parseInt(limit.toString()) > 0 ? parseInt(limit.toString()) : 15;

    const getAllFeedbacksService = new GetAllFeedbacksService( new PrismaFeedbacksRepository());
    const feedbacks = await getAllFeedbacksService.execute({page, limit: _limit});
    return res.json(feedbacks);
});

routes.get('/feedbacks/:id', async (req, res) => {
    const { id } = req.params;
    const getIdFeedbackService = new GetIdFeedbackService( new PrismaFeedbacksRepository());
    const feedback = await getIdFeedbackService.execute(id);
    return res.json(feedback);
});


