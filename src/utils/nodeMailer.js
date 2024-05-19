import nodeMailer from 'nodemailer';
import objectConfig from '../config/objectConfig.js';

console.log("Email User:", objectConfig.EMAIL_USER);
console.log("App Password:", objectConfig.APP_PASSWORD);

// console.log(process.env.EMAIL, process.env.APP_PASSWORD);
const transport = nodeMailer.createTransport({
  service: 'gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: objectConfig.EMAIL_USER,
    pass: objectConfig.APP_PASSWORD,
  },
});

export default transport;