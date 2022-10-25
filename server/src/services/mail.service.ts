import { config } from "config";
import nodemailer from "nodemailer";

export const sendEmail = async (
  toEmail: string,
  subject: string,
  text: string
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: config.fromEmail,
      pass: config.password,
    },
  });

  try {
    const result = transporter.sendMail({
      from: config.fromEmail,
      to: toEmail,
      subject: subject,
      text: text,
    });
    return result;
  } catch (err) {
    return err;
  }
};
