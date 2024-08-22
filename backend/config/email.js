const nodemailer = require("nodemailer");
require("dotenv").config();

// Configuração do serviço de e-mail (Gmail, Mailtrap, etc.)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar o e-mail de verificação
const sendVerificationEmail = async (userEmail, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Verificação de E-mail",
    html: `<h2>Verifique seu e-mail</h2>
           <p>Clique no link abaixo para verificar sua conta:</p>
           <a href="${process.env.SERVER_URL}/verify-email?token=${token}" 
           style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">
           Verificar E-mail
           </a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de verificação enviado com sucesso.");
  } catch (error) {
    console.log("Erro ao enviar o e-mail de verificação:", error);
  }
};

module.exports = { sendVerificationEmail };
