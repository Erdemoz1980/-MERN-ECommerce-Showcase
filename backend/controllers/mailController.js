const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const sendMail = asyncHandler ( async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'erdemozproductions@gmail.com',
      pass: "eklnqiwfznpluijj"
    }
  });

  const mailOptions = {
    from: email,
    to: 'erdemozproductions@gmail.com',
    subject: 'Erdemoz.io Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)
      res.status(500).json({success:false, message:'Failed to send email'})
    } else {
      console.log('Email Sent:' + info + response);
      res.status(200).json({success:true, message:'Email sent successfully!'})
    }
  })
 
})

module.exports = sendMail;
