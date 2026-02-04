# 🏠 Airbnb Clone (StayEase) - Full-Stack Application

A feature-rich Airbnb clone application built with Node.js, Express, MongoDB, and EJS templating engine. This production-ready application includes user authentication, role-based access control, property management, booking system, file uploads, and a modern responsive UI.

**🌐 Live Demo:** [https://www.stayease.page/](https://www.stayease.page/)

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ User signup with role selection (Guest/Host)
- ✅ Secure login with session management
- ✅ Password validation and hashing
- ✅ Role-based navigation and access control
- ✅ Session persistence with MongoDB
- ✅ Logout functionality

### 🏡 Host Features
- ✅ Add new homes with details (name, price, location, rating, description)
- ✅ Upload property images (file upload with Multer)
- ✅ View all hosted homes in dashboard
- ✅ Edit existing home details and images
- ✅ Delete homes with automatic image cleanup
- ✅ Host-only routes with middleware protection

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
- bcryptjs (password hashing)
- express-validator (form validation)
- Multer (file upload handling)

**Frontend:**
- EJS (Embedded JavaScript templating)
- Tailwind CSS v3.4 (utility-first CSS framework)
- Vanilla JavaScript (client-side interactions)
- HTML5 & CSS3

**Database:**
- MongoDB Atlas (Cloud Database)
- Collections: Users, Homes, Bookings, Sessions

**Deployment:**
- Render.com (Web Service)
- MongoDB Atlas (Database hosting)
- Git/GitHub (Version control)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arindam-Roy2004/airbnb_clone.git
   cd airbnb_clone
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
   NODE_ENV=development
   ```
   
   > **Important:** Replace the MongoDB URI with your actual connection string from MongoDB Atlas.

4. **Build Tailwind CSS**
   ```bash
   npm run tailwind:build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   This will start both the Express server and Tailwind CSS in watch mode.

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

This application is deployed on [Render.com](https://render.com). For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

**Quick Deployment Steps:**
1. Push code to GitHub
2. Create a Web Service on Render
3. Set environment variables (`MONGODB_URI`, `NODE_ENV=production`)
4. Deploy automatically from GitHub

**Build Command:** `npm install && npm run tailwind:build`  
**Start Command:** `npm start`

## 📁 Project Structure

```
airbnb_clone/
├── controllers/              # Route controllers
│   ├── authController.js    # Authentication (signup, login, logout)
│   ├── hostController.js    # Host operations (add/edit/delete homes)
│   ├── storeController.js   # Guest operations (browse, favourites, bookings)
│   └── errors.js            # Error handling (404 page)
├── models/                   # Mongoose models
│   ├── user.js              # User schema (roles, favourites, bookings)
│   ├── home.js              # Property schema
│   └── booking.js           # Booking schema
├── routes/                   # Express routes
│   ├── authRouter.js        # Auth routes (signup, login, logout)
│   ├── hostRouter.js        # Host routes (protected, role-based)
│   └── storeRouter.js       # Guest routes (browse, favourites, bookings)
├── views/                    # EJS templates
│   ├── auth/                # Authentication pages
│   │   ├── login.ejs        # Login page
│   │   └── signup.ejs       # Signup page with role selection
│   ├── host/                # Host dashboard pages
│   │   ├── edit-home.ejs    # Edit property form
│   │   ├── home-added.ejs   # Success confirmation
│   │   └── host-home-list.ejs # List of hosted properties
│   ├── store/               # Guest pages
│   │   ├── index.ejs        # Homepage with all properties
│   │   ├── home-list.ejs    # Browse properties
│   │   ├── home-detail.ejs  # Property details
│   │   ├── favourite-list.ejs # Favourites list
│   │   ├── reserve.ejs      # Booking form
│   │   └── bookings.ejs     # View bookings
│   ├── partials/            # Reusable components
│   │   ├── head.ejs         # HTML head with Tailwind CSS
│   │   ├── nav.ejs          # Role-based navigation
│   │   ├── favourites.ejs   # Favourite button component
│   │   └── delete.ejs       # Delete button component
│   ├── 404.ejs              # 404 error page
│   └── input.css            # Tailwind CSS source
├── public/                   # Static files
│   ├── output.css           # Compiled Tailwind CSS
│   ├── home.css             # Custom styles
│   └── uploads/             # Uploaded property images
│       └── .gitkeep         # Preserve directory in git
├── utils/                    # Utility functions
│   ├── pathUtil.js          # Path helpers
│   ├── fileUpload.js        # Multer configuration
│   └── fileHelper.js        # File deletion utility
├── app.js                    # Express app setup & middleware
├── .env                      # Environment variables (not in repo)
├── .gitignore               # Git ignore rules
├── nodemon.json             # Nodemon configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
└── DEPLOYMENT.md            # Deployment guide
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
  photoPath: String,        // Image path (e.g., '/uploads/1234567890-image.jpg')
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
  checkIn: Date,            // Check-in date
  checkOut: Date,           // Check-out date
  totalPrice: Number,       // Calculated (nights × price per night)
  status: String,           // 'confirmed', 'pending', 'cancelled'
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/airbnb` |
| `PORT` | Server port | No (default: 3000) | `3000` |
| `NODE_ENV` | Environment mode | No | `development` or `production` |

## 📝 Available Scripts

```bash
# Start the server (production)
npm start

# Start the server with nodemon and Tailwind watch (development)
npm run dev

# Run Tailwind CSS in watch mode
npm run tailwind

# Build Tailwind CSS (minified for production)
npm run tailwind:build
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
- `GET /host/add-home` - Add new property form (requires host role)
- `POST /host/add-home` - Create new property with image upload (requires host role)
- `GET /host/host-home-list` - View all hosted properties (requires host role)
- `GET /host/edit-home/:homeId` - Edit property form (requires host role)
- `POST /host/edit-home/:homeId` - Update property with optional image update (requires host role)
- `POST /host/delete-home/:homeId` - Delete property and associated image (requires host role)

## 🎯 Key Features Implemented

### ✅ Completed Features
- ✅ User authentication with bcrypt password hashing
- ✅ Role-based access control (Guest/Host)
- ✅ Session management with MongoDB store
- ✅ Image upload with Multer (file validation, size limits)
- ✅ Automatic image cleanup on delete/update
- ✅ Complete booking system with price calculation
- ✅ Favourites functionality
- ✅ CRUD operations for properties
- ✅ Responsive UI with Tailwind CSS
- ✅ Error handling and validation
- ✅ Production deployment on Render

## 🔮 Future Enhancements

- ⏳ User profiles and avatars
- ⏳ Property reviews and ratings system
- ⏳ Advanced search and filters (location, price range, amenities)
- ⏳ Payment gateway integration
- ⏳ Email notifications
- ⏳ Admin dashboard for platform management
- ⏳ Real-time chat between hosts and guests
- ⏳ Property availability calendar

