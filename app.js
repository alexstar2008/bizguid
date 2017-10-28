const db = require('./config/db');
const server = require('./server/server.js');
const cron = require('./config/cron');
db.connect().then((msg) => {
	console.log(msg);
	server.start().then((msg) => {
		console.log(msg);
		cron.start();
	}).catch(err => console.log(err));
}).catch(err => console.log(err));