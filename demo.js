

const { MongoClient } = require('mongodb');

async function main() {
	const uri =  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";

	const client = new MongoClient(uri);

	try {
	   await client.connect();
	   await listDatabases(client);
	} catch (e) {
	   console.error(e);
        } finally {
	   await client.close();
        }    
}

main().catch(console.error);

async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases();
	databasesList.databases.forEach(db => {
		console.log(`- ${db.name}`);
	})
}

