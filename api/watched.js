import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string from Atlas
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB; // e.g., "tvtracker"
const collectionName = 'watched_shows';  // Collection name

let client; // Store the client instance
let collection; // Store the collection instance

async function connectToDatabase() {
  if (!client) { // Check if a client already exists
    client = new MongoClient(uri);
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      collection = client.db(dbName).collection(collectionName);
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }
  return collection;
}

// Replace with your actual username and password (for demonstration only!)
const ALLOWED_USERNAME = process.env.ALLOWED_USERNAME;
const ALLOWED_PASSWORD = process.env.ALLOWED_PASSWORD;

// Authentication middleware
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];

    if (username === ALLOWED_USERNAME && password === ALLOWED_PASSWORD) {
        return next();
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
}

export default async function handler(req, res) {
    try {
        const collection = await connectToDatabase();
        const { language } = req.query;  // Get language parameter from query
        console.log('language query: ', language)

        if (req.method === 'GET') {
            let query = {};
            if (language) {
                query = { language: language };
            }

            const watchedShows = await collection.find(query).toArray();
            res.status(200).json(watchedShows);
        } else if (req.method === 'POST') {
            authenticate(req, res, async () => { // Apply authentication
                const { show } = req.body;
                const result = await collection.insertOne(show);  // MongoDB automatically assigns _id
                res.status(201).json({ message: 'Show added to watched list', insertedId: result.insertedId });
            });
        } else if (req.method === 'DELETE') {
            authenticate(req, res, async () => { // Apply authentication
                const { showId } = req.body;
                const result = await collection.deleteOne({ id: parseInt(showId) }); // Assuming showId is passed as a string; convert to int
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: 'Show not found' });
                }
                res.status(200).json({ message: 'Show removed from watched list' });
            });
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
        // console.log('MongoDB connection closed');
    }
}