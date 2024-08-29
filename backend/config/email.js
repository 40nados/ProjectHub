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
        subject: 'Email verification',
        html: `<html>
  <script src="https://kit.fontawesome.com/c834624e2c.js" crossorigin="anonymous"></script>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background: #121212; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #fff; text-align: center;">Welcome to ProjectHub!</h2>
            <img src="https://i.imgur.com/nA08KOc.png" alt = "logo" style="max-width: 100%; height: auto; border-radius: 10px"></img>
            <p style="font-size: 16px; color: #666666; text-align: center;">
              Thank you for regestering with us! Thank you for registering with us! To complete the registration process and activate your account, please click the button below.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.SERVER_URL}/verify-email?token=${token}" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
                Verify email <i class="fa-solid fa-envelope"></i>
              </a>
              
            </div>
            <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 30px;">
              <strong>If you haven't registered with us, please, ignore this email.</strong>
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
