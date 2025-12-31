# 🎙️ ElevenLabs Integration Setup Guide

## Step 1: Get Your ElevenLabs Credentials

### A. Get Your Agent ID
1. Go to [ElevenLabs Conversational AI Dashboard](https://elevenlabs.io/app/conversational-ai)
2. Find your agent in the list
3. Click on your agent to open settings
4. Copy the **Agent ID** (looks like: `abc123xyz...`)

### B. Get Your API Key
1. Go to [ElevenLabs API Keys](https://elevenlabs.io/app/settings/api-keys)
2. Click "Create new API key" or copy an existing one
3. Copy the **API Key** (starts with `sk_...`)

### C. Get Your Branch ID (Optional)
1. In your agent settings, if you're using branches
2. Copy the **Branch ID** (if applicable)

## Step 2: Install ElevenLabs SDK

In your local project:

```bash
cd frontend
yarn add @11labs/client
```

Or if using npm:
```bash
npm install @11labs/client
```

## Step 3: Configure Environment Variables

1. Create a file named `.env.local` in the `/frontend` folder
2. Add your credentials:

```env
# ElevenLabs Configuration
# Get your API key from: https://elevenlabs.io/app/settings/api-keys
REACT_APP_ELEVENLABS_API_KEY=sk_your_actual_api_key_here

# Get your Agent ID from: https://elevenlabs.io/app/conversational-ai
REACT_APP_ELEVENLABS_AGENT_ID=your_actual_agent_id_here

# Optional: Branch ID if using branches
REACT_APP_ELEVENLABS_BRANCH_ID=your_branch_id_here_if_needed
```

**Note:** No backend server is required. The app connects directly to the ElevenLabs agent which has a built-in database.

## Step 4: Remove Emergent Branding (When Running Locally)

The Emergent logo has been removed from `/app/frontend/public/index.html`.

When you copy the code locally, the cleaned version will have:
- ❌ No Emergent badge
- ❌ No Emergent scripts
- ❌ No tracking scripts
- ✅ Just your clean Interview Coach app

## Step 5: Restart Your Application

```bash
# Stop the current server (Ctrl+C)
# Then restart:
yarn start
```

## Step 6: Test the Integration

1. Open the app at `http://localhost:3000`
2. Click "Start Interview Call"
3. The app should connect to your ElevenLabs agent
4. Speak or type to interact

## Troubleshooting

### "Demo Mode" Warning Showing
- ✅ Check that `.env.local` file exists in `/frontend` folder
- ✅ Verify API key and Agent ID are correct
- ✅ Restart the development server after adding .env.local

### "Failed to start interview" Error
- ✅ Verify API key starts with `sk_`
- ✅ Check Agent ID is copied correctly
- ✅ Ensure agent is active in ElevenLabs dashboard
- ✅ Check browser console for detailed error messages

### No Audio
- ✅ Grant microphone permissions in browser
- ✅ Check browser supports Web Audio API (Chrome, Firefox, Edge)
- ✅ Verify ElevenLabs agent has voice configured

### Connection Issues
- ✅ Check internet connection
- ✅ Verify ElevenLabs service status
- ✅ Try refreshing the page

## Demo Mode vs Production Mode

### Demo Mode (No credentials configured)
- Shows warning banner
- Uses mock responses
- No real AI conversation
- Great for testing UI

### Production Mode (Credentials configured)
- No warning banner
- Real ElevenLabs agent
- Live voice conversation
- Full AI interview experience

## File Structure Reference

```
frontend/
├── .env.local                           # ← Add your credentials here
├── public/
│   └── index.html                       # ← Cleaned (no Emergent branding)
├── src/
│   ├── pages/
│   │   └── InterviewCoach.jsx          # ← Main component
│   ├── services/
│   │   └── elevenLabsService.js        # ← ElevenLabs integration
│   └── styles/
│       └── InterviewCoach.css
└── package.json
```

## Next Steps

1. ✅ Configure credentials in `.env.local`
2. ✅ Install ElevenLabs SDK: `yarn add @11labs/client`
3. ✅ Restart development server
4. ✅ Test the interview
5. 🚀 Deploy your app!

## Support

For ElevenLabs-specific issues:
- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [ElevenLabs Discord Community](https://discord.gg/elevenlabs)

For code issues, check:
- Browser console (F12)
- Network tab for API calls
- React DevTools for component state
