const {CronJob} = require('cron');

// const transferService = require('../transfer/transfer.js')();

const Tasks = [
	{
		cronTime: '00 00 1 2 *',
		onTick() {
			console.log('Transfer started');
			// transferService.transferRegions();
			// transferService.transferCategories();
			// transferService.transferEnterprises();
		},
		start: false,
		timezone: 'Europe/Kiev'
	}
];

module.exports = {
	start() {
		// Tasks.forEach((task) => {
		// 	new CronJob(task).start();
		// });
	}
};