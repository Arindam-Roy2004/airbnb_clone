/**
 * Script to update hotel images in the database
 * Run with: node scripts/updateHotelImages.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Home = require('../models/home');

const MONGODB_URI = process.env.MONGODB_URI;

// Hotel images mapping - update photoPath for hotels
const hotelImageUpdates = [
  {
    houseName: 'Biva Hotel',
    newPhotoPath: '/uploads/biva_hotel.png'
  },
  {
    houseName: 'Bangali mahal',
    newPhotoPath: '/uploads/beachfront_villa.png'
  },
  {
    houseName: 'Village hostel',
    newPhotoPath: '/uploads/luxury_mountain_cabin.png'
  },
  {
    houseName: 'namo yatri',
    newPhotoPath: '/uploads/treehouse_retreat.png'
  },
];

// Sample hotels with beautiful images (for seeding new hotels)
const sampleHotels = [
  {
    houseName: 'Mountain Retreat Cabin',
    price: 8500,
    location: 'Manali, Himachal Pradesh',
    rating: 4.9,
    photoPath: '/uploads/luxury_mountain_cabin.png',
    description: 'Cozy A-frame cabin with stunning mountain views, fireplace, and modern amenities. Perfect for a peaceful getaway surrounded by pine forests and snow-capped peaks.'
  },
  {
    houseName: 'Oceanview Beach Villa',
    price: 15000,
    location: 'Goa',
    rating: 4.8,
    photoPath: '/uploads/beachfront_villa.png',
    description: 'Stunning beachfront villa with private infinity pool, direct beach access, and panoramic ocean views. Experience luxury living by the sea.'
  },
  {
    houseName: 'Urban Luxury Apartment',
    price: 12000,
    location: 'Mumbai',
    rating: 4.7,
    photoPath: '/uploads/modern_city_apartment.png',
    description: 'Elegant penthouse apartment with floor-to-ceiling windows overlooking the city skyline. Modern interiors, fully equipped kitchen, and premium amenities.'
  },
  {
    houseName: 'Jungle Treehouse',
    price: 6500,
    location: 'Wayanad, Kerala',
    rating: 4.9,
    photoPath: '/uploads/treehouse_retreat.png',
    description: 'Magical treehouse experience in the heart of the jungle. Rope bridge access, wraparound deck with stunning canopy views, and fairy light ambiance.'
  },
  {
    houseName: 'Lakeside Cottage',
    price: 5500,
    location: 'Nainital, Uttarakhand',
    rating: 4.6,
    photoPath: '/uploads/lakefront_cottage.png',
    description: 'Charming lakefront cottage with private dock and stunning lake views. Cozy interiors, fireplace, and peaceful surroundings perfect for relaxation.'
  }
];

async function updateHotelImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update existing hotels with broken images
    for (const update of hotelImageUpdates) {
      const result = await Home.findOneAndUpdate(
        { houseName: { $regex: new RegExp(update.houseName, 'i') } },
        { photoPath: update.newPhotoPath },
        { new: true }
      );

      if (result) {
        console.log(`✅ Updated ${result.houseName}: ${result.photoPath}`);
      } else {
        console.log(`❌ Hotel not found: ${update.houseName}`);
      }
    }

    console.log('\n--- Update complete ---\n');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

async function seedNewHotels() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const hotel of sampleHotels) {
      // Check if hotel already exists
      const existing = await Home.findOne({ houseName: hotel.houseName });
      if (existing) {
        console.log(`⏭️  Skipping ${hotel.houseName} (already exists)`);
        continue;
      }

      const newHome = new Home(hotel);
      await newHome.save();
      console.log(`✅ Created: ${hotel.houseName}`);
    }

    console.log('\n--- Seeding complete ---\n');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'update';

if (command === 'update') {
  console.log('🔄 Updating hotel images...\n');
  updateHotelImages();
} else if (command === 'seed') {
  console.log('🌱 Seeding new hotels...\n');
  seedNewHotels();
} else if (command === 'both') {
  console.log('🔄 Updating and seeding hotels...\n');
  updateHotelImages().then(() => seedNewHotels());
} else {
  console.log(`
Usage: node scripts/updateHotelImages.js [command]

Commands:
  update  - Update existing hotels with broken images (default)
  seed    - Add new sample hotels with beautiful images
  both    - Run both update and seed
  `);
}
