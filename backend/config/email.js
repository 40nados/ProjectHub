const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuração do serviço de e-mail (Gmail, Mailtrap, etc.)
const transporter = nodemailer.createTransport({
    service: 'gmail',
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
        subject: 'Verificação de E-mail',
        html: `<html>
  <script src="https://kit.fontawesome.com/c834624e2c.js" crossorigin="anonymous"></script>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background: #121212; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #fff; text-align: center;">Bem-vindo(a) ao ProjectHub!</h2>
            <img src="https://i.imgur.com/nA08KOc.png" alt = "logo" style="max-width: 100%; height: auto; border-radius: 10px"></img>
            <p style="font-size: 16px; color: #666666; text-align: center;">
              Obrigado por se registrar conosco! Para concluir o processo de registro e ativar sua conta, por favor, clique no botão abaixo.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.SERVER_URL}/verify-email?token=${token}" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
                Verificar E-mail <i class="fa-solid fa-envelope"></i>
              </a>
              
            </div>
            <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 30px;">
              <strong>Se você não se registrou conosco, por favor, ignore este e-mail.</strong>
            </p>
          </div>
        </body>
      </html>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        //console.log("E-mail de verificação enviado com sucesso.");
    } catch (error) {
        //console.log("Erro ao enviar o e-mail de verificação:", error);
    }
};

module.exports = { sendVerificationEmail };
