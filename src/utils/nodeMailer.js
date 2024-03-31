import nodeMailer from 'nodemailer';
import objectConfig from '../config/objectConfig.js'; 



console.log(process.env.EMAIL, process.env.APP_PASSWORD);
const transport = nodeMailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: objectConfig.EMAIL_USER,
    pass: objectConfig.APP_PASSWORD,
  },
});

export default transport;