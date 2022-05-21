import express from 'express';
import { issuesRouter } from './issues-router';
import { feedbackRouter } from './feedback-router';
import { userRouter } from './user-router';
import { authRouter } from './auth-router';

export const routes = express.Router();

routes.use('/feedbacks', feedbackRouter);
routes.use('/issues', issuesRouter);
routes.use('/users', userRouter);
routes.use('/login', authRouter);
//routes.use('/logout', logoutRouter);
