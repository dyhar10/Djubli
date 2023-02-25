require('dotenv').config()

module.exports = {
    ENV,
    NODE_ENV,
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
    DB_PORT,
    DB_NAME,
    SALT_ROUNDS,
    SECRET_KEY,
} = process.env
