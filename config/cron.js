const {CronJob} = require('cron');

const Tasks = [
	{
		cronTime: '00 00 1 2 *',
		onTick() {
			console.log('Hello world');
		},
		start: false,
		timezone: 'Europe/Kiev'
	}
];

module.exports = {
	start() {
		Tasks.forEach((task) => {
			new CronJob(task).start();
		});
	}
};