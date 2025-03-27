import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string from Atlas
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB; // e.g., "tvtracker"
const collectionName = 'watched_shows';  // Collection name

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error; // Propagate the error for handling in the handler function
  }
}

export default async function handler(req, res) {
  try {
    const collection = await connectToDatabase();

    if (req.method === 'GET') {
      // Fetch watched shows
      const watchedShows = await collection.find({}).toArray();
      res.status(200).json(watchedShows);
    } else if (req.method === 'POST') {
      // Add a watched show
      const { show } = req.body;
      const result = await collection.insertOne(show);  // MongoDB automatically assigns _id
      res.status(201).json({ message: 'Show added to watched list', insertedId: result.insertedId });
    } else if (req.method === 'DELETE') {
      // Remove a watched show
      const { showId } = req.body;
      const result = await collection.deleteOne({ id: parseInt(showId) }); // Assuming showId is passed as a string; convert to int
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Show not found' });
      }
      res.status(200).json({ message: 'Show removed from watched list' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log('MongoDB connection closed');
  }
}