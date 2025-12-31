# ElevenLabs Integration Guide

## Overview
The AI Interview Coach frontend is **fully integrated** with ElevenLabs Conversational AI. The app connects directly to your ElevenLabs agent - no backend server is required as the ElevenLabs agent has a built-in database.

## Architecture

### Direct Integration
- **Frontend** → **ElevenLabs Agent** (via `@11labs/client` SDK)
- No backend server needed
- Built-in database handled by ElevenLabs agent

### Main Components

#### 1. ElevenLabs Service (`frontend/src/services/elevenLabsService.js`)
Handles all communication with the ElevenLabs agent:
- `startConversation()` - Initializes connection to agent
- `sendTextMessage()` - Sends text input (for text mode)
- `endConversation()` - Closes the connection
- Event callbacks for connection status, messages, and errors

#### 2. Interview Coach Component (`frontend/src/pages/InterviewCoach.jsx`)
Main UI component that:
- Manages call state (active/inactive)
- Toggles between voice and text modes
- Displays conversation messages
- Shows AI status (idle/speaking/listening)
- Handles user input

## How It Works

### Starting a Conversation

```javascript
await elevenLabsService.startConversation({
  onConnect: () => {
    // Connection established
  },
  onMessage: (message) => {
    // Agent sent a message
    addMessage(message.text);
  },
  onStatusChange: (status) => {
    // Status: 'idle', 'speaking', or 'listening'
    setAiState(status);
  },
  onError: (error) => {
    // Handle errors
  },
  onDisconnect: () => {
    // Connection closed
  }
});
```

### Voice Mode
- Automatically streams audio to/from ElevenLabs agent
- Real-time voice conversation
- Status updates reflect agent state

### Text Mode
- User types responses
- Sent via `sendTextMessage()`
- Agent responses come through `onMessage` callback

## Visual Feedback States

### AI Avatar States
The avatar shows visual feedback based on agent status:

1. **Idle** (`aiState = 'idle'`)
   - No animations
   - Static avatar
   - Status: "⏸️ Ready"

2. **Speaking** (`aiState = 'speaking'`)
   - Waveform ring animation
   - Pulsing glow effect
   - Status: "🔊 Speaking..."

3. **Listening** (`aiState = 'listening'`)
   - Gentle pulse animation
   - Breathing effect
   - Status: "🎤 Listening..."

## Environment Variables

Required in `frontend/.env`:

```env
REACT_APP_ELEVENLABS_API_KEY=sk_your_api_key_here
REACT_APP_ELEVENLABS_AGENT_ID=your_agent_id_here
REACT_APP_ELEVENLABS_BRANCH_ID=your_branch_id_here  # Optional
```

## Configuration

### Demo Mode vs Production Mode

**Demo Mode** (no credentials configured):
- Shows warning banner
- Uses mock responses
- No real AI conversation
- Great for testing UI

**Production Mode** (credentials configured):
- No warning banner
- Real ElevenLabs agent connection
- Live voice conversation
- Full AI interview experience

## Current Implementation Status

✅ **Fully Integrated**
- ElevenLabs SDK installed and configured
- Service layer implemented
- UI components connected
- Voice and text modes working
- Status tracking functional
- Error handling in place

## Testing

Test the integration by:
1. Configure `.env` with your ElevenLabs credentials
2. Start the development server: `yarn dev`
3. Open the app at `http://localhost:3000`
4. Click "Start Interview Call"
5. Verify connection to ElevenLabs agent
6. Test voice mode (speak into microphone)
7. Test text mode (switch toggle, type responses)
8. Check message display in left panel
9. Confirm avatar animations sync with AI state

## Troubleshooting

### "Demo Mode" Warning Showing
- ✅ Check that `.env` file exists in `/frontend` folder
- ✅ Verify API key and Agent ID are correct
- ✅ Restart the development server after adding .env

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
- ✅ Check browser console for errors

## File Structure

```
frontend/
├── .env                          # ← Your ElevenLabs credentials
├── src/
│   ├── pages/
│   │   └── InterviewCoach.jsx   # ← Main component
│   ├── services/
│   │   └── elevenLabsService.js  # ← ElevenLabs integration
│   └── styles/
│       └── InterviewCoach.css   # ← Styling
└── package.json
```

## Notes

- The avatar image is loaded from the uploaded asset URL
- All animations are CSS-based (no external libraries needed)
- Component is fully responsive for desktop
- No backend server required - everything runs client-side
- Database is handled by ElevenLabs agent

## Support

For ElevenLabs-specific issues:
- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [ElevenLabs Conversational AI Docs](https://elevenlabs.io/docs/conversational-ai/overview)
- [ElevenLabs Discord Community](https://discord.gg/elevenlabs)

For code issues, check:
- Browser console (F12)
- Network tab for API calls
- React DevTools for component state
