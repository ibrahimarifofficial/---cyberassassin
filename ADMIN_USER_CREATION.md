# Admin User Creation Guide

## How to Create Admin User

### Method 1: Using Browser (GET Request)

Simply visit this URL in your browser:
```
https://your-domain.com/api/admin/create-user
```

This will create/update the admin user with default credentials:
- **Email:** `admin@cyberassassin.com`
- **Password:** `Cyberassassin@AdminPanel@123456`

### Method 2: Using POST Request

#### Using cURL (Terminal/Command Prompt):

```bash
curl -X POST https://your-domain.com/api/admin/create-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cyberassassin.com",
    "password": "Cyberassassin@AdminPanel@123456"
  }'
```

#### Using JavaScript/Fetch:

```javascript
fetch('https://your-domain.com/api/admin/create-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@cyberassassin.com',
    password: 'Cyberassassin@AdminPanel@123456'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

#### Using Postman:

1. Open Postman
2. Create a new POST request
3. URL: `https://your-domain.com/api/admin/create-user`
4. Headers: 
   - Key: `Content-Type`
   - Value: `application/json`
5. Body (select "raw" and "JSON"):
```json
{
  "email": "admin@cyberassassin.com",
  "password": "Cyberassassin@AdminPanel@123456"
}
```
6. Click "Send"

#### Using PowerShell (Windows):

```powershell
$body = @{
    email = "admin@cyberassassin.com"
    password = "Cyberassassin@AdminPanel@123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-domain.com/api/admin/create-user" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

## Default Credentials

After creating the admin user, you can login with:

- **Login URL:** `/admin/thecyberassassindashboardlogin2026-xyxyxz-01111`
- **Email:** `admin@cyberassassin.com`
- **Password:** `Cyberassassin@AdminPanel@123456`

## Security Notes

⚠️ **Important:** 
- Old credentials (`admin@cyber.com` / `admin`) are now blocked and will NOT work
- Only the new secure credentials will work
- Make sure to keep your credentials secure

## Dashboard URL

After login, you will be redirected to:
```
/admin/thecyberassassindashboard2026-xyxyxz-01111
```

The old `/admin/dashboard` URL will show a 404 error.

