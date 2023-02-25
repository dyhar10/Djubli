const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('./envValue')

module.exports = {
	local: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		dialect: 'postgres',
		dialectOptions: {
			useUTC: true,
		},
		timezone: '+07:00',
	},
	development: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		dialect: 'postgres',
		dialectOptions: {
			useUTC: true,
		},
		timezone: '+07:00',
	},
}
