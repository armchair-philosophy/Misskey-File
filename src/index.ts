import * as cluster from 'cluster';

if (cluster.isMaster) {
	console.log('Welcome to Misskey File');

	// Count the machine's CPUs
	const cpuCount = require('os').cpus().length;

	// Create a worker for each CPU
	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
} else {
	require('./server');
	require('./api-server');
}

// Listen for dying workers
cluster.on('exit', (worker: cluster.Worker) => {
	// Replace the dead worker,
	// we're not sentimental
	console.log(`\u001b[1;31m${worker.id} died :(\u001b[0m`);
	cluster.fork();
});
