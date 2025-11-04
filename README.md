# 🏠 AirBnB Clone - Full-Stack Application

A feature-rich AirBnB clone application built with Node.js, Express, MongoDB, and EJS templating engine. This project includes user authentication, role-based access control, booking management, and a modern responsive UI.

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ User signup with role selection (Guest/Host)
- ✅ Secure login with session management
- ✅ Password validation and hashing
- ✅ Role-based navigation and access control
- ✅ Session persistence with MongoDB
- ✅ Logout functionality

### 🏡 Host Features
- ✅ Add new homes with details (name, price, location, rating, photos, description)
- ✅ View all hosted homes in dashboard
- ✅ Edit existing home details
- ✅ Delete homes from listing
- ✅ Host-only routes with middleware protection
- ✅ View bookings for hosted properties (coming soon)

### 🌍 Guest Features
- ✅ Browse all available homes
- ✅ View detailed home information with images and amenities
- ✅ Add homes to favourites
- ✅ View and manage favourite homes list
- ✅ Remove homes from favourites
- ✅ Make bookings with date selection
- ✅ View all bookings with status tracking
- ✅ Cancel bookings
- ✅ Dynamic price calculation based on nights

### 🎨 UI/UX Features
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Role-based navigation (different menus for guests/hosts)
- ✅ Beautiful login/signup pages with error handling
- ✅ Interactive booking form with real-time price updates
- ✅ Status badges for bookings (confirmed/pending/cancelled)
- ✅ Empty states with CTAs
- ✅ Form validation and user feedback
- ✅ Mobile-friendly responsive layouts

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- Express Session (session management)
- connect-mongodb-session (session store)
- bcrypt (password hashing)
- express-validator (form validation)

**Frontend:**
- EJS (Embedded JavaScript templating)
- Tailwind CSS (utility-first CSS framework)
- Font Awesome (icons)
- Vanilla JavaScript (client-side interactions)
- HTML5

**Database:**
- MongoDB Atlas (Cloud Database)
- Collections: Users, Homes, Bookings

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
   SESSION_SECRET=your-super-secret-session-key-here
   ```
   
   > **Important:** Replace the MongoDB URI with your actual connection string and use a strong random string for SESSION_SECRET.

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
│   ├── authController.js # Authentication logic (signup, login, logout)
│   ├── hostController.js # Host-specific operations
│   ├── storeController.js# Guest operations and bookings
│   └── errors.js         # Error handling
├── models/               # Mongoose models
│   ├── user.js          # User schema (with roles and favourites)
│   ├── home.js          # Home/Property schema
│   └── booking.js       # Booking schema
├── routes/               # Express routes
│   ├── authRouter.js    # Auth routes (signup, login, logout)
│   ├── hostRouter.js    # Host routes (protected)
│   └── storeRouter.js   # Guest routes
├── views/                # EJS templates
│   ├── auth/            # Authentication pages
│   │   ├── login.ejs   # Login page
│   │   └── signup.ejs  # Signup page with role selection
│   ├── host/            # Host pages (add/edit/list homes)
│   ├── store/           # Guest pages
│   │   ├── home-list.ejs      # Browse homes
│   │   ├── home-detail.ejs    # Home details
│   │   ├── favourite-list.ejs # Favourites
│   │   ├── reserve.ejs        # Booking form
│   │   └── bookings.ejs       # View bookings
│   └── partials/        # Reusable components
│       ├── head.ejs     # HTML head with Tailwind
│       ├── nav.ejs      # Role-based navigation
│       ├── favourites.ejs# Favourite button
│       └── delete.ejs   # Delete button
├── public/               # Static files
│   ├── output.css       # Compiled Tailwind CSS
│   └── home.css         # Custom styles
├── utils/                # Utility functions
│   └── pathUtil.js      # Path helpers
├── middleware/           # Custom middleware (coming soon)
├── app.js                # Express app setup & middleware
├── .env                  # Environment variables (not in repo)
├── .gitignore
├── nodemon.json         # Nodemon configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies and scripts
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String,        // Required
  lastName: String,
  email: String,            // Required, unique
  password: String,         // Hashed with bcrypt
  role: String,             // 'guest' or 'host', default: 'guest'
  favourites: [ObjectId],   // Array of Home IDs
  bookings: [ObjectId],     // Array of Booking IDs (optional)
  createdAt: Date,
  updatedAt: Date
}
```

### Homes Collection
```javascript
{
  _id: ObjectId,
  houseName: String,        // Required
  price: Number,            // Required (per night)
  location: String,         // Required
  rating: Number,           // Required (1-5)
  photoPath: String,         // Image URL
  description: String,      // Property description
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId,           // Reference to User
  home: ObjectId,           // Reference to Home
  checkInDate: Date,        // Required
  checkOutDate: Date,       // Required
  numberOfGuests: Number,   // Required
  totalPrice: Number,       // Calculated (nights × price)
  status: String,           // 'pending', 'confirmed', 'cancelled'
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/airbnb` |
| `PORT` | Server port | No (default: 3000) | `3000` |
| `SESSION_SECRET` | Secret key for session encryption | Yes | `my-super-secret-key-12345` |

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

### Authentication Routes
- `GET /signup` - Signup page
- `POST /signup` - Create new user account (with role selection)
- `GET /login` - Login page
- `POST /login` - Authenticate user and create session
- `POST /logout` - Destroy session and logout

### Store Routes (Guest)
- `GET /` - Homepage with all homes
- `GET /homes` - Browse all available homes
- `GET /home-detail/:homeId` - View detailed home information
- `GET /favourites` - View favourite homes (requires login)
- `POST /favourites` - Add home to favourites (requires login)
- `POST /favourites/delete/:homeId` - Remove from favourites (requires login)
- `GET /reserve/:homeId` - Booking form page (requires login)
- `POST /book/:homeId` - Create new booking (requires login)
- `GET /bookings` - View all user bookings (requires login)
- `POST /cancel-booking/:bookingId` - Cancel a booking (requires login)

### Host Routes (Protected - Host Only)
- `GET /host/add-home` - Add new home form (requires host role)
- `POST /host/add-home` - Create new home (requires host role)
- `GET /host/host-home-list` - View all hosted homes (requires host role)
- `GET /host/edit-home/:homeId` - Edit home form (requires host role)
- `POST /host/edit-home/:homeId` - Update home (requires host role)
- `POST /host/delete-home/:homeId` - Delete home (requires host role)

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


