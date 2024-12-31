import * as express from "express";
import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";

import {firestore} from "firebase-admin";
import {log} from "firebase-functions/logger";
import DocumentData = firestore.DocumentData;

const mailFrom: string = "TODO_to_be_removed";
const mailPwd: string = "TODO_to_be_removed";
const mailHost: string = "TODO_to_be_removed";

export const sendEmail = async ({
  req: {body},
}: {
  req: express.Request;
}): Promise<DocumentData> => {
  const {to} = body;

  const mailOptions = {
    from: mailFrom,
    to,
    subject: "New Answer on DatePicker.xyz",
    html: "<p>Hey 👋</p><p>You’ve received a new response on <a href=\"https://datepicker.xyz\">DatePicker.xyz</a>! Check it out and stay on top of your schedule.</p>",
  };

  try {
    const transporter: Mail = nodemailer.createTransport({
      host: mailHost,
      port: 465,
      secure: true,
      auth: {
        type: "LOGIN",
        user: mailFrom,
        pass: mailPwd,
      },
    });

    await transporter.sendMail(mailOptions);

    return {success: true};
  } catch (err: unknown) {
    log(err);

    return {success: false};
  }
};
