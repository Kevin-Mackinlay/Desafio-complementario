import nodeMailer from 'nodemailer';
const objectConfig = require("../config/objectConfig.js");



// console.log(process.env.EMAIL, process.env.APP_PASSWORD);
const transport = nodeMailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: objectConfig.EMAIL_USER,
    pass: objectConfig.MAIL_PASSWORD,
  },
});

export default transport;