# **Deployment & Debug Guide – Infinity-X Platform**

## 📋 Contents

1. [Database Setup](#database-setup)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Code Updates](#code-updates)
4. [Creating Super Admin](#creating-super-admin)
5. [Deployment](#deployment)
6. [Testing](#testing)

---

## **1. Database Setup**

### **MongoDB Atlas (Free)**

1. **Create an Account:**

   * Go to: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   * Create a free account

2. **Create a Cluster:**

   * Choose “Create a FREE cluster”
   * Choose the region closest to you (e.g., Frankfurt)
   * Wait for the cluster to be created (2–3 minutes)

3. **Configure Access:**

   * Go to **Database Access**
   * Add a new user (username + password)
   * Save the credentials somewhere safe

4. **Allow Connections:**

   * Go to **Network Access**
   * Click **Add IP Address**
   * Choose **Allow Access from Anywhere (0.0.0.0/0)**

5. **Get the Connection URI:**

   * Go to **Database**
   * Click **Connect**
   * Choose **Connect your application**
   * Copy the string that starts with `mongodb+srv://...`
   * Replace `<password>` with your real password

---

## **2. Environment Variables Setup**

### **On Render**

1. Go to Render Dashboard:
   [https://dashboard.render.com](https://dashboard.render.com)

2. Select **`infinityx-backend`**

3. Open **Environment**

4. Add the following variables:

| Key         | Value               | Notes                  |
| ----------- | ------------------- | ---------------------- |
| `MONGO_URI` | `mongodb+srv://...` | From MongoDB Atlas     |
| `DB_NAME`   | `future_system`     | Database name          |
| `NODE_ENV`  | `production`        | Production environment |
| `PORT`      | `10000`             | Already configured     |

5. Click **Save Changes**

---

## **3. Code Updates**

### Files that must be updated:

---

### **3.1 Update `Login.jsx`**

Replace the content of `dashboard-x/src/pages/Login.jsx` with `Login_FIXED.jsx`:

```bash
cd dashboard-x/src/pages
mv Login.jsx Login_OLD.jsx
mv Login_FIXED.jsx Login.jsx
```

---

### **3.2 Add Signup Page**

Copy `Signup.jsx` into `pages`:

```bash
# The file already exists at:
# dashboard-x/src/pages/Signup.jsx
```

---

### **3.3 Update `App.jsx`**

Add a route for Signup:

```jsx
// inside dashboard-x/src/App.jsx
import Signup from './pages/Signup';

// Add this line inside <Routes>:
<Route path="/signup" element={<Signup />} />
```

---

### **3.4 Add Registration Endpoint to Backend**

Add the code from `REGISTER_ENDPOINT.mjs` into `backend/server.mjs`, right after the `/api/auth/login` endpoint.

---

## **4. Creating Super Admin**

### **Method 1: Using the Script (Recommended)**

```bash
cd backend
npm install
node scripts/create-super-admin.mjs
```

The script will ask you for:

* API URL (press Enter for default)
* Email
* Password
* Phone (optional)

---

### **Method 2: Using curl**

```bash
curl -X POST https://api.xelitesolutions.com/api/auth/bootstrap-super-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@xelitesolutions.com",
    "password": "YourStrongPassword123"
  }'
```

---

## **5. Deployment**

### **5.1 Push Code to GitHub**

```bash
cd project-root
git add .
git commit -m "Fix: Update authentication system"
git push origin main
```

---

### **5.2 Deploy Frontend on Cloudflare**

Automatically deploys when pushing to GitHub (if connected).

Or deploy manually:

```bash
cd dashboard-x
pnpm install
pnpm run build

# Then upload the dist/ folder to Cloudflare Pages
```

---

### **5.3 Deploy Backend on Render**

Deploys automatically on GitHub push.

Or manually from Render Dashboard:

* Open **infinityx-backend**
* Click **Manual Deploy → Deploy latest commit**

---

## **6. Testing**

### **6.1 Test Backend**

```bash
curl https://api.xelitesolutions.com
```

You should get:

```
{"ok":true,"service":"InfinityX Backend / Future Systems Core","msg":"Running",...}
```

---

### **6.2 Test Login**

```bash
curl -X POST https://api.xelitesolutions.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrPhone": "admin@xelitesolutions.com",
    "password": "YourPassword"
  }'
```

Expected:

```
{"ok":true,"sessionToken":"...","user":{...}}
```

---

### **6.3 Test Frontend**

1. Open: [https://xelitesolutions.com](https://xelitesolutions.com)
2. Login page should appear
3. Enter Email + Password
4. You should be redirected to the Dashboard

---

## 🔧 Troubleshooting

### **Issue: Backend not running**

**Fix:**

1. Check environment variables in Render
2. Check Render Logs
3. Ensure `MONGO_URI` is correct

---

### **Issue: Frontend not connecting to Backend**

**Fix:**

1. Check `.env` in `dashboard-x`:

```
VITE_API_BASE_URL=https://api.xelitesolutions.com
```

2. Ensure backend is running
3. Check CORS in `backend/server.mjs`

---

### **Issue: Cannot log in**

**Fix:**

1. Make sure Super Admin is created
2. Check email + password
3. Open browser console for errors

---

## 📞 Support

If you face issues:

1. Check Render logs
2. Check browser Console
3. Check Network tab in DevTools

---

## ✅ Final Checklist

* [ ] MongoDB Atlas setup complete
* [ ] Environment variables added in Render
* [ ] Code updated on GitHub
* [ ] Super Admin created
* [ ] Backend running
* [ ] Frontend running
* [ ] Login working

---

**All set! 🎉**
