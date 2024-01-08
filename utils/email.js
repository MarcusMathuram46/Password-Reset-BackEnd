const nodemailer = require('nodemailer');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = require('./config');

const sendEmail = async (option) => {
    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASSWORD) {
        throw new Error('Email configuration values are missing or incorrect.');
    }

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        }
    });

    const emailOptions = {
        from: 'vishnu support <support@vishnu.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    };

    try {
        await transporter.sendMail(emailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
};

module.exports = sendEmail;
