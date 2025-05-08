module.exports = {
	apps: [
		{
			name: 'task-app',
			script: 'dist/src/main.js',
			env_production: { NODE_ENV: 'prod' }
		}
	]
};

