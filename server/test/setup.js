const { createConnection, getSqljsManager } = require('typeorm');
const sql = require('sql.js');
require('ts-node/register');

module.exports = async () => {
	const database = new sql.Database();
	const connection = await createConnection({
		type: 'sqljs',
		database: database.export(),
		synchronize: false,
		migrationsRun: true,
		migrations: [`${__dirname}/../src/migration/*{.ts,.js}`],
		entities: [
			`${__dirname}/../src/**/*.entity{.ts,.js}`,
		]
	});

	const manager = await getSqljsManager();
	const rawDb = manager.exportDatabase();
  // Set reference to mongod in order to close the server during teardown.
	global.__SQLJS__ = rawDb;
	await connection.close();
};
