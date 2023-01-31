import nodemailer from "nodemailer";

const transportOptions: nodemailer.TransportOptions = {
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER as unknown as string,
    pass: process.env.EMAIL_PASS as unknown as string,
  },
};

function sendEmail(reciever: string, subject: string, message: string) {
  const transporter = nodemailer.createTransport(transportOptions);

  const options = {
    from: process.env.EMAIL_USER as unknown as string,
    to: reciever,
    subject,
    html: message,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      throw new Error(`${err}`);
    }
  });
}

export default sendEmail;
