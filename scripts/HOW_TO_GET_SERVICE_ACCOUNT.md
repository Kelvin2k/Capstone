# 🔑 How to Get Firebase Service Account Key

## Steps:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: **project-movie-40343**
3. Click on ⚙️ **Project Settings** (gear icon)
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Click **Generate Key** (a JSON file will download)
7. Rename the downloaded file to `service-account-key.json`
8. Move it to: `capstone/functions/service-account-key.json`

⚠️ **IMPORTANT**: Add this file to `.gitignore` to keep it secure!

## Alternative: Use simpler seed script without service account

If you want to skip this step, I can create a simpler version that uses the Firebase client SDK instead.
