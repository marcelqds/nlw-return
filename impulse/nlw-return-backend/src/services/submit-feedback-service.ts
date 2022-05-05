import { IFeedbacksRepository } from '../repositories/feedbacks-repository';
import { IMailAdapter } from '../adapters/mail-adapter';

interface SubmitFeedbackServiceData{
    type: string;
    comment: string;
    screenshot?: string;
}


export class SubmitFeedbackService {
    private feedbacksRepository: IFeedbacksRepository;
    constructor(
        feedbacksRepository: IFeedbacksRepository,
        private mailAdapter: IMailAdapter,
    ){
        this.feedbacksRepository = feedbacksRepository;
    }

    async execute(request: SubmitFeedbackServiceData){
        const { type, comment, screenshot } = request;
        if(!type)throw new Error('Type is required.');
        if(!comment) throw new Error('Comment is required');
        
        if(screenshot && !screenshot.startsWith('data:image/png;base64'))
            throw new Error("Invalid screenshot format.");

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}`,
                `<p>Comentário: ${comment}`,
                `</div>`
            ].join('\n'),

        });
    }
}
