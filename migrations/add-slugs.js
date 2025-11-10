// Migration script to add UUID slugs to existing homes
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return addSlugsToHomes();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

async function addSlugsToHomes() {
  try {
    const Home = mongoose.model('Home', new mongoose.Schema({
      houseName: String,
      price: Number,
      location: String,
      rating: Number,
      photoPath: String,
      description: String,
      slug: String
    }));

    // Find all homes without a slug
    const homesWithoutSlug = await Home.find({ 
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: '' }
      ]
    });

    console.log(`Found ${homesWithoutSlug.length} homes without slugs`);

    if (homesWithoutSlug.length === 0) {
      console.log('All homes already have slugs!');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Add slug to each home
    let updated = 0;
    for (const home of homesWithoutSlug) {
      home.slug = uuidv4();
      await home.save();
      updated++;
      console.log(`Updated home "${home.houseName}" with slug: ${home.slug}`);
    }

    console.log(`\n✅ Successfully added slugs to ${updated} homes`);
    
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
