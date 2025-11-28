# Gemini API Setup Guide for Admin AI Assistant

## Current Issue
The AI Assistant is showing a 404 error because your API key doesn't have access to Gemini models. This guide will help you fix it.

## Quick Fix Steps

### Step 1: Get a New API Key
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the new API key

### Step 2: Enable Generative Language API
1. Go to: https://console.cloud.google.com/
2. Select your project (or create a new one)
3. Go to "APIs & Services" > "Library"
4. Search for "Generative Language API"
5. Click on it and press "Enable"

### Step 3: Enable Billing (Required)
1. Go to: https://console.cloud.google.com/billing
2. Link a billing account to your project
3. **Note:** Google provides free tier credits, so you won't be charged unless you exceed limits

### Step 4: Update API Key in Code

**Option A: Environment Variable (Recommended)**
1. Create/update `.env` file in `FindYourLawyer-client/`
2. Add: `REACT_APP_GEMINI_API_KEY=your_new_api_key_here`
3. Restart your development server

**Option B: Temporary (For Testing)**
1. Open `FindYourLawyer-client/src/components/Admin/AdminAIAssistant.jsx`
2. Replace the API key on line 39 with your new key
3. **⚠️ Warning:** Don't commit this to git! Use environment variables instead.

## Verify Setup

1. Test your API key at: https://makersuite.google.com/app/apikey
2. Try the `/gemini` page in your app to see if it works
3. If that works, the Admin AI Assistant should work too

## Available Models

The code will automatically try these models in order:
1. `gemini-2.5-flash` (newest, fastest)
2. `gemini-1.5-flash` (fast, efficient)
3. `gemini-1.5-pro` (better quality)
4. `gemini-pro` (legacy, may not work)

## Troubleshooting

### Still Getting 404 Errors?
- ✅ Verify API key is correct
- ✅ Check that Generative Language API is enabled
- ✅ Ensure billing is enabled
- ✅ Try creating a new API key
- ✅ Wait a few minutes after enabling API (propagation delay)

### API Key Works on /gemini but not Admin Panel?
- Check browser console for errors
- Verify the API key is the same in both places
- Clear browser cache and refresh

### Billing Concerns?
- Google provides free tier: 60 requests/minute
- First 15 requests/month are free
- Check usage at: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

## Security Best Practices

**⚠️ IMPORTANT:** Never commit API keys to git!

1. Use environment variables
2. Add `.env` to `.gitignore`
3. For production, use secure backend endpoint (recommended)

## Need Help?

- Google AI Studio: https://makersuite.google.com/
- API Documentation: https://ai.google.dev/docs
- Support: https://support.google.com/cloud

