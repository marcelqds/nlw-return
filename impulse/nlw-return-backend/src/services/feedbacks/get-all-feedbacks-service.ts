import { IFeedbacksRepository } from '../../repositories/feedbacks-repository';

interface SubmitFeedbackQueryData{
    page : number;
    limit : number;
}

export class GetAllFeedbacksService{
    constructor(private feedbacksRepository: IFeedbacksRepository){}
    
    async execute(data: SubmitFeedbackQueryData){
        const {page, limit} = data;
        return await this.feedbacksRepository.getAll({
            page, 
            limit
        });
    }   
}
