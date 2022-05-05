import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

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

