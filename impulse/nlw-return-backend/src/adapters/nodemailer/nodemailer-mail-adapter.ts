import nodemailer from 'nodemailer';
import { IMailAdapter, ISendMailData } from '../mail-adapter';

export class NodemailerMailAdapter implements IMailAdapter{
    async sendMail(data: ISendMailData){
        const {subject,body } = data;

        let userTest = await nodemailer.createTestAccount();
        
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: userTest.user,
                pass: userTest.pass,
            }
        });

        let info = await transporter.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Marcelo <marcelqds@gmail.com>',
            subject,
            html:body,
        });

        console.log("Message sent: ",info.messageId);
        console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));   
    } 
}
