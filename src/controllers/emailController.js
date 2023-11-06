const nodemailer = require('nodemailer');
require('dotenv').config(); // Para carregar as variáveis de ambiente do arquivo .env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
  </head>
  <body>
      <h1 style="text-align: center;">OLÁ!</h1>
      <p style="text-align: center;"><span style="font-size: 18pt;">Parece que (você ou alguém) está tentando recuperar sua senha.</span></p>
      <p style="text-align: center;"><span style="font-size: 18pt;">Segue abaixo o código de recuperação.</span></p>
      <h2 style="text-align: center;"><span style="font-size: 18pt; background-color: #c2e0f4;">123456</span></h2>
      <p style="text-align: center;">&nbsp;</p>
      <p>&nbsp;</p>
  </body>
  </html>
`;
 
  const mailOptions = {
    from: `Recuperação de senha <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html, 
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Flha no envio' });
  }
};

module.exports = {
  sendEmail,
};
