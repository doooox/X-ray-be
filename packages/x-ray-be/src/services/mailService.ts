import { existsSync } from "fs";
import nodemailer from "nodemailer";
import { renderFile } from "ejs";
import { EventEmitter } from "events";

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5290246d05cae9",
        pass: "07d030d6582ff3",
    },
});


export const sendMail = async (
    to: string,
    subject: string,
    text: string,
    file: string,
    image: string,
    variable: object = {}
) => {
    const path = `${process.cwd()}/packages/x-ray-be/email/${file}.ejs`;

    if (!existsSync(path)) {
        console.warn("Template not found");
        return;
    }

    const htmlRender = await renderFile(path, variable, {
        async: true,
    });

    try {

        const message = {
            from: "NoReplay@mail.com",
            to: to,
            subject,
            text,
            html: htmlRender,
            attachments: [
                {
                    filename: "xray.png",
                    path: image,
                },
            ],
        };
        await transport.sendMail(message);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};


