const db = require('./config/db');
const server = require('./server/server.js');

db.connect().then((msg) => {
	console.log(msg);
	server.start().then((msg) => console.log(msg)).catch(err => console.log(err));
}).catch(err => console.log(err));