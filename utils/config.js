require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    // Handle the error, throw an exception, or set a default URI if needed
}

module.exports = {
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_HOST,
    EMAIL_PORT,
};
