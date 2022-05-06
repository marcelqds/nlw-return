import nodemailer from 'nodemailer';
import { IMailAdapter, ISendMailData } from '../mail-adapter';

export class NodemailerMailAdapter implements IMailAdapter{
    async sendMail(data: ISendMailData){
        const {subject,body } = data;
        //let userTest = await nodemailer.createTestAccount();
        
        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: "971e5466156270",
                pass: "1c67920f621252",
            }
        });

        const info = await transporter.sendMail({
            from: 'Equipe Feedback <support@feedback.com>',
            to: 'Marcelo <marcelqds@gmail.com>',
            subject,
            html:body,
        });
        console.log("Message sent: ",info.messageId);
        //console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));   
    } 
}
