# AirBnB Clone - Backend Project

A full-stack AirBnB clone application built with Node.js, Express, MongoDB, and EJS templating engine.

## 🚀 Features

### Host Features
- ✅ Add new homes with details (name, price, location, rating, photos, description)
- ✅ View all hosted homes
- ✅ Edit existing home details
- ✅ Delete homes from listing

### Guest Features
- ✅ Browse all available homes
- ✅ View detailed home information
- ✅ Add homes to favourites
- ✅ View favourite homes list
- ✅ Remove homes from favourites

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- EJS (Embedded JavaScript templating)

**Frontend:**
- Tailwind CSS
- HTML5

**Database:**
- MongoDB Atlas (Cloud Database)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yt-code
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/airbnb?retryWrites=true&w=majority
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run Tailwind CSS in watch mode** (in a separate terminal)
   ```bash
   npm run tailwind
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
yt-code/
├── controllers/           # Route controllers
│   ├── hostController.js
│   ├── storeController.js
│   └── errors.js
├── models/               # Database models
│   ├── home.js
│   └── favourites.js
├── routes/               # Express routes
│   ├── hostRouter.js
│   └── storeRouter.js
├── views/                # EJS templates
│   ├── host/            # Host pages
│   ├── store/           # Guest pages
│   └── partials/        # Reusable components
├── public/               # Static files
│   └── output.css       # Compiled Tailwind CSS
├── utils/                # Utility functions
│   ├── databaseUtil.js  # MongoDB connection
│   └── pathUtil.js
├── app.js                # Express app setup
├── .env                  # Environment variables
├── .gitignore
└── package.json
```

## 🗄️ Database Schema

### Homes Collection
```javascript
{
  _id: ObjectId,
  houseName: String,
  price: String,
  location: String,
  rating: String,
  photoUrl: String,
  description: String
}
```

### Favourites Collection
```javascript
{
  _id: ObjectId,
  homeId: String  // References homes._id
}
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `PORT` | Server port (default: 3000) | No |

## 📝 Available Scripts

```bash
# Start the server (production)
npm start

# Start the server with nodemon (development)
npm run dev

# Run Tailwind CSS in watch mode
npm run tailwind

# Build Tailwind CSS once
npm run build:css
```

## 🌐 API Endpoints

### Store Routes (Guest)
- `GET /` - Homepage with all homes
- `GET /homes/:homeId` - View home details
- `GET /favourites` - View favourite homes
- `POST /favourites` - Add home to favourites
- `POST /favourites/delete/:homeId` - Remove from favourites

### Host Routes
- `GET /host/add-home` - Add new home form
- `POST /host/add-home` - Create new home
- `GET /host/host-home-list` - View all hosted homes
- `GET /host/edit-home/:homeId` - Edit home form
- `POST /host/edit-home/:homeId` - Update home
- `POST /host/delete-home/:homeId` - Delete home

## 🚧 Ongoing Development

### Current Status: ✅ MVP Complete

### Recently Completed
- ✅ Migrated from local JSON storage to MongoDB Atlas
- ✅ Implemented CRUD operations for homes
- ✅ Added favourites functionality
- ✅ Converted callbacks to promises
- ✅ Added description field to homes
- ✅ Improved error handling

### In Progress
- 🔄 User authentication system
- 🔄 Image upload functionality
- 🔄 Booking system

### Planned Features
- ⏳ User profiles
- ⏳ Reviews and ratings
- ⏳ Search and filters
- ⏳ Payment integration
- ⏳ Responsive design improvements
- ⏳ Admin dashboard

## 🐛 Known Issues

- None at the moment

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
