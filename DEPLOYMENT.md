# 🚀 Render.com Deployment Guide

This guide will help you deploy your Airbnb-like application to Render.com for free.

## ✅ Prerequisites

- [x] Code pushed to GitHub ✓
- [x] MongoDB Atlas account (for database)
- [ ] Render.com account (free)

---

## 📋 Step-by-Step Deployment

### 1️⃣ **Prepare MongoDB Atlas** (if not already done)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you don't have one)
3. **Important:** Add `0.0.0.0/0` to IP Whitelist
   - Go to **Network Access** → **Add IP Address**
   - Click **"Allow Access from Anywhere"** → **Confirm**
4. Get your connection string:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/airbnb`)
   - Replace `<password>` with your actual password

---

### 2️⃣ **Sign Up for Render**

1. Go to [Render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (easiest option)
4. Authorize Render to access your repositories

---

### 3️⃣ **Create a Web Service**

1. From Render Dashboard, click **"New +"** → **"Web Service"**

2. **Connect Your Repository:**
   - Find your GitHub repository in the list
   - Click **"Connect"**

3. **Configure the Service:**
   
   | Field | Value |
   |-------|-------|
   | **Name** | `airbnb-clone` (or your choice) |
   | **Region** | Choose closest to you |
   | **Branch** | `main` (or `master`) |
   | **Root Directory** | Leave blank |
   | **Environment** | `Node` |
   | **Build Command** | `npm install && npm run tailwind:build` |
   | **Start Command** | `npm start` |
   | **Instance Type** | **Free** |

4. Click **"Advanced"** to add environment variables

---

### 4️⃣ **Add Environment Variables**

Click **"Add Environment Variable"** and add these:

| Key | Value | Example |
|-----|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/airbnb` |
| `NODE_ENV` | `production` | `production` |

**Important:** Make sure your `MONGODB_URI` includes:
- Your actual password (not `<password>`)
- Database name at the end (e.g., `/airbnb`)

---

### 5️⃣ **Deploy**

1. Click **"Create Web Service"**
2. Render will start building your app (takes 2-5 minutes)
3. Watch the logs for any errors
4. Once you see `Server running on address http://localhost:XXXXX`, you're live! 🎉

---

## 🌐 **Access Your App**

Your app will be available at:
```
https://airbnb-clone.onrender.com
```
(Replace `airbnb-clone` with your chosen name)

---

## 🔧 **Important Notes**

### **Free Tier Limitations:**
- ⚠️ **Spins down after 15 minutes of inactivity**
- First request after spin-down takes ~30 seconds to wake up
- 512 MB RAM
- 750 hours/month (plenty for a portfolio project)

### **File Uploads:**
- ✅ Work perfectly on Render (persistent disk)
- Images stay even after app restarts
- Located in `public/uploads/` directory

### **Auto-Deploys:**
- Every push to your `main` branch triggers automatic redeployment
- Takes ~2 minutes per deployment

---

## 🐛 **Troubleshooting**

### **App Not Starting:**
1. Check Render logs for errors
2. Verify `MONGODB_URI` is correct
3. Ensure MongoDB IP whitelist includes `0.0.0.0/0`

### **Database Connection Failed:**
```
Error: connect ECONNREFUSED
```
**Solution:** 
- Go to MongoDB Atlas → Network Access
- Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)

### **Images Not Loading:**
```
Cannot GET /uploads/image.jpg
```
**Solution:** 
- Push `.gitkeep` file (already added)
- Ensure `public/uploads/` directory exists

### **Session Issues:**
```
Session data not persisting
```
**Solution:** 
- Verify `MONGODB_URI` environment variable is set
- Check MongoDB connection in logs

---

## 🔄 **Update Your App**

To deploy updates:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically detect the push and redeploy (takes ~2 min).

---

## 💰 **Cost**

- **Render Free Tier:** $0/month
- **MongoDB Atlas Free Tier:** $0/month
- **Total:** $0/month 🎉

---

## 🎯 **Next Steps After Deployment**

1. Test all features:
   - ✅ Sign up / Login
   - ✅ Add a property (with image upload)
   - ✅ Edit a property
   - ✅ Delete a property
   - ✅ View properties
   - ✅ Add to favorites
   - ✅ Create booking

2. Share your live URL:
   - Add to your resume
   - Share on LinkedIn
   - Add to your GitHub repo README

3. Monitor your app:
   - Check Render logs for errors
   - Monitor MongoDB Atlas for usage

---

## 📞 **Need Help?**

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

**Your app is production-ready! 🚀**
