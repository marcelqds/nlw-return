import { prisma } from '../../prisma';
import { 
        IFeedbacksRepository, 
        IFeedbackCreateData,
        IFeedbackResponse,
        IFeedbackQueryData,
        IFeedbackUpdateData,
    } from '../feedbacks-repository';


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
    
   async getAll( data: IFeedbackQueryData){
        const { page, limit } = data;

        const feedback = await prisma.feedback.findMany({
            skip: page,
            take: limit
        }) as IFeedbackResponse[];
        
        return feedback;
    }    
    
    async getId(id: string){
        const feedback = await prisma.feedback.findUnique({
            where:{
                id,
            }
        }) as IFeedbackResponse;
        
        return feedback;
    }

    async count(){
        return await prisma.feedback.count();
    }

    async updateState(data: IFeedbackUpdateData){
        const { id, state } = data;
        await prisma.feedback.update({
            where: {
                id,
            },
            data:{
                state
            }
        });
    }
}
