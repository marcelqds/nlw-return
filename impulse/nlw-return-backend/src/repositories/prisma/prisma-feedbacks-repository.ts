import { prisma } from '../../prisma';
import { IFeedbacksRepository, IFeedbackCreateData } from '../feedbacks-repository';


export class PrismaFeedbacksRepository implements IFeedbacksRepository{
    async create( data: IFeedbackCreateData ){
        const {type, comment, screenshot } = data;

        const feedback = await prisma.feedback.create({
            data:{
                type,
                comment,
                screenshot
            }
        });             
    }
}
