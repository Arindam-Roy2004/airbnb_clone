// Migration script to add UUID hIds to existing homes
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return addhIdsToHomes();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

async function addhIdsToHomes() {
  try {
    const Home = mongoose.model('Home', new mongoose.Schema({
      houseName: String,
      price: Number,
      location: String,
      rating: Number,
      photoPath: String,
      description: String,
      hId: String
    }));

    // Find all homes without a hId
    const homesWithouthId = await Home.find({ 
      $or: [
        { hId: { $exists: false } },
        { hId: null },
        { hId: '' }
      ]
    });

    console.log(`Found ${homesWithouthId.length} homes without hIds`);

    if (homesWithouthId.length === 0) {
      console.log('All homes already have hIds!');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Add hId to each home
    let updated = 0;
    for (const home of homesWithouthId) {
      home.hId = uuidv4();
      await home.save();
      updated++;
      console.log(`Updated home "${home.houseName}" with hId: ${home.hId}`);
    }

    console.log(`\n✅ Successfully added hIds to ${updated} homes`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}
