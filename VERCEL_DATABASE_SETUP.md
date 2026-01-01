# Vercel Database Connection Setup Guide

## Problem
All database operations are failing because `DATABASE_URL` is not correctly set in Vercel environment variables.

## Solution

### Step 1: Get Your Connection String

Your Supabase connection details:
- **Host:** `db.gibinsemhuoyntxagloj.supabase.co`
- **Port:** `5432`
- **Database:** `postgres`
- **User:** `postgres`
- **Password:** `Cyber@Database@123`

### Step 2: Create Correct DATABASE_URL

**Important:** Password must be URL-encoded!
- `@` becomes `%40`
- So `Cyber@Database@123` becomes `Cyber%40Database%40123`

**Complete Connection String:**
```
postgresql://postgres:Cyber%40Database%40123@db.gibinsemhuoyntxagloj.supabase.co:5432/postgres
```

### Step 3: Set in Vercel

1. Go to **Vercel Dashboard**
2. Select your **project**
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL` or click **Add New**
5. **Key:** `DATABASE_URL`
6. **Value:** Paste this exact string:
   ```
   postgresql://postgres:Cyber%40Database%40123@db.gibinsemhuoyntxagloj.supabase.co:5432/postgres
   ```
7. Select environments: **Production**, **Preview**, **Development** (all three)
8. Click **Save**

### Step 4: Redeploy

After saving the environment variable:

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger auto-deploy

### Step 5: Verify

After redeploy, test:
- ✅ Contact form submission
- ✅ Newsletter subscription
- ✅ Admin user creation: `/api/admin/create-user`
- ✅ Blog posts display

## Alternative: Get from Supabase Dashboard

If you want to get the connection string directly from Supabase:

1. Go to **Supabase Dashboard**
2. Select your project
3. Go to **Project Settings** → **Database**
4. Scroll to **Connection string** section
5. Select **URI** format
6. Copy the connection string
7. Make sure password is URL-encoded
8. Paste in Vercel `DATABASE_URL`

## Common Mistakes

❌ **Wrong:** `postgresql://postgres:Cyber@Database@123@...` (password not encoded)
✅ **Correct:** `postgresql://postgres:Cyber%40Database%40123@...` (password encoded)

❌ **Wrong:** Spaces in connection string
✅ **Correct:** No spaces anywhere

❌ **Wrong:** Only set for Production
✅ **Correct:** Set for Production, Preview, AND Development

## Troubleshooting

If still not working:

1. **Check Supabase Status:** Make sure database is running (not paused)
2. **Verify Password:** Double-check password is `Cyber@Database@123`
3. **Check Encoding:** Make sure `@` is `%40` in the URL
4. **Redeploy:** Always redeploy after changing environment variables
5. **Check Logs:** Vercel → Deployments → Latest → Functions → Logs

---

**Once DATABASE_URL is correctly set, all features will work!**

