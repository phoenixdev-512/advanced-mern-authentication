import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT= process.env.MAILTRAP_ENDPOINT;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "phoenix",
};
const recipients = [
  {
    email: "abhaybs1729@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);