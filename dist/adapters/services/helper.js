"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_templates_1 = __importDefault(require("email-templates"));
exports.default = {
    otpGenerator: () => {
        let result = "";
        const characters = "0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    sendMail: (toEmail, mailSubject, templateName, locale) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (process.env.SEND_EMAIL === "true") {
                const configOption = {
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD
                    },
                };
                const transporter = nodemailer_1.default.createTransport(configOption);
                const email = new email_templates_1.default({
                    transport: transporter,
                    send: true,
                    preview: false,
                });
                const info = yield email.send({
                    template: templateName,
                    message: {
                        from: `${process.env.COMPANY_EMAIL}`,
                        to: toEmail,
                        subject: mailSubject
                    },
                    locals: locale
                });
                console.log('Message sent: %s', info.messageId);
                return info.messageId + "id";
            }
            else {
                return "Email sending is disabled"; // Return message indicating email sending is disabled
            }
        }
        catch (err) {
            console.error("Error sending email:", err);
            return "Error sending email: " + err.message; // Return error message
        }
    })
};
