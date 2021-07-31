import Queue from "bull";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer";

import { PASS } from "../env.json";

import { todoService } from "../../service";
import { userService } from "../../service";

// 1. Initiating the Queue
const sendMailQueue = new Queue("sendMail", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});
const data = {
  email: "userid@domain.com",
};

// 3. Consumer
sendMailQueue.process(async (job, done) => {
  const todoId = job.data._id;
  const todo = await todoService.fetchOne(todoId);
  if (todo && !todo?.isCompleted) {
    const res = await userService.fetchOne(todo.createdByUserId);
    const data = { email: res.user.email, text: todo.name };
    return await sendMail(data);
  }
  done();
});
function sendMail(data: any) {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: '"Harsh" dhaulaharsh@gmail.com',
      to: data.email,
      subject: "Mail for incompleted TODO",
      html: `<b><u>Please complete you task named "${data.text}"</u></b>`,
    };

    nodemailer
      .createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,

        auth: {
          pass: process.env.PASS || PASS,
          user: "dhaulaharsh@gmail.com",
        },
      } as SMTPTransport.TransportOptions)
      .sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("eee", err);
          reject(err);
        } else {
          console.log("info", info);

          resolve(info);
        }
      });
  });
}

export default sendMailQueue;
