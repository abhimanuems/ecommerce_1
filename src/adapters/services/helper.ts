import nodemailer from 'nodemailer';
import Email from "email-templates"
export default {
    otpGenerator: (): string => {
        let result: string = "";
        const characters: string = "0123456789";
        const charactersLength: number = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    sendMail : async (toEmail: string, mailSubject: string, templateName: string, locale: object): Promise<string> => {
        try {
            if (process.env.SEND_EMAIL === "true") {
                const configOption :any= {
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD
                    },
                };
                const transporter = nodemailer.createTransport(configOption);
                const email = new Email({
                    transport: transporter,
                    send: true,
                    preview: false,
                });
                const info = await email.send({
                    template: templateName,
                    message: {
                        from: `${process.env.COMPANY_EMAIL}`,
                        to: toEmail,
                        subject: mailSubject
                    },
                    locals: locale
                });
                console.log('Message sent: %s', info.messageId);
                return info.messageId + "id"
            } else {
                return "Email sending is disabled"; // Return message indicating email sending is disabled
            }
        } catch (err: any) {
            console.error("Error sending email:", err);
            return "Error sending email: " + err.message; // Return error message
        }
    }
}
