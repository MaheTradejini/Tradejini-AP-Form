import { sendEmail } from "../../utils/mail"


export async function POST() {
    const sender = {
        name: 'Tradejini',
        address: 'testmail@tradejini.com',
    }

    const receipients = [{
        name:'SKY',
        address: 'suryaganesh21032001@gmail.com',
    }]

    try {
        const emailOptions = {
            sender,
            receipients,
            subject: 'Welcome to our website!',
            message: `<h1>You are Welcome to our platform</h1>`
        };

        const result = await sendEmail(emailOptions);

        return Response.json({
            accepted: result.accepted,
        })
    } catch (error){
        console.error('Error sending email:', error);
        return Response.json({ message: 'Unable to send mail this time'}, {
            status: 500
        })
        
    }
}