import { SubmitFeedbackService } from '../../src/services/submit-feedback-service';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

       await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Descrição de exemplo',
            screenshot: 'data:image/png;base64asdfasfdtest.png'
        })).resolves.not.toThrow();
        
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able submit feedback without type', async ()=>{
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Descrição de exemplo',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    }); 

    it('should not be able submit feedback without comment', async () =>{
       await expect(submitFeedback.execute({
             type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64'   
        })).rejects.toThrow();
    });


    it('should not be able submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Descrição de exemplo',
            screenshot: 'data:image/asdfasda'
        })).rejects.toThrow();
    });
});



