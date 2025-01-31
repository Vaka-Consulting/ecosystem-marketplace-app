// Importing MongoDB package to manage database connections and operations.
import * as mongoDB from "mongodb";

// Defining a variable to hold the database connection instance.
export let _db: mongoDB.Db;

// Function to return the database connection instance.
// If the connection is not already established, it will call `connectToDatabase()` to establish the connection.
// Returns a promise that resolves to the MongoDB database instance.
export async function db(): Promise<mongoDB.Db> {
    return new Promise<mongoDB.Db>((res, rej) => {
        if (_db == undefined) {
            return connectToDatabase().then(e => res(e));
        }
        return res(_db);
    });
}

// Function to establish a connection to the MongoDB database using AWS IAM credentials.
// It constructs the MongoDB URI using environment variables for AWS credentials and database details.
// Once connected, it assigns the connected database instance to the `_db` variable and logs the successful connection.
// Returns the MongoDB database instance.
export async function connectToDatabase(): Promise<mongoDB.Db> {

    // Retrieve AWS credentials and database connection details from environment variables.
    const id = process.env.AWS_ACCESS_KEY_ID || '';
    const secret = process.env.AWS_SECRET_ACCESS_KEY || '';
    const token = process.env.AWS_SESSION_TOKEN || '';
    const server = process.env.DB_SERVER_NAME || '';
    const db = process.env.DB_NAME || 'explorer';

    // Construct the MongoDB URI using AWS IAM authentication.
    const AWS_IAM_URI = `mongodb+srv://${encodeURIComponent(id)}:${encodeURIComponent(secret)}@${server}/${db}?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:${encodeURIComponent(token)}`;

    // Initialize the MongoClient with either the URI from environment variables or the constructed AWS IAM URI.
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_URI || AWS_IAM_URI);

    // Connect to the MongoDB server.
    await client.connect();

    // Assign the connected database to the `_db` variable and log the connection.
    _db = client.db(process.env.DB_NAME);
    console.log(`Successfully connected to database: ${_db.databaseName} `);

    return _db;
}
