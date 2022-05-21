import { IFeedbacksRepository } from '../../repositories/feedbacks-repository';

export class GetIdFeedbackService{
    constructor(private feedbacksRepository : IFeedbacksRepository){}

    async execute(id: string){
        const feedback = await this.feedbacksRepository.getId(id);
        return feedback;
    }
}
