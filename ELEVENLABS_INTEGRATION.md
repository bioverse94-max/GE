# ElevenLabs Integration Guide

## Overview
This guide explains how to connect the AI Interview Coach frontend to your existing ElevenLabs backend.

## Frontend Structure

### Main Component: `/app/frontend/src/pages/InterviewCoach.jsx`

The component manages:
- **Call State**: `isCallActive` - tracks if interview is in progress
- **Mode Toggle**: `isVoiceMode` - switches between voice and text input
- **AI State**: `aiState` - tracks AI status (idle/speaking/listening)
- **Messages**: `messages` - stores conversation history

## Integration Points

### 1. Start Interview Call
**Location**: `handleCallToggle()` function

```javascript
const handleCallToggle = () => {
  setIsCallActive(!isCallActive);
  if (!isCallActive) {
    // TODO: Initialize ElevenLabs agent connection here
    // Example:
    // await initElevenLabsAgent();
    // await startConversation();
    
    setAiState('speaking');
  } else {
    // TODO: End ElevenLabs agent connection
    // await endElevenLabsAgent();
    
    setAiState('idle');
  }
};
```

### 2. Voice Mode (ElevenLabs Integration)
When `isVoiceMode === true`:
- Connect to ElevenLabs Agent API
- Handle real-time audio streaming
- Update `aiState` based on agent status
- Add agent messages to `messages` array

**Recommended Integration**:
```javascript
// Add ElevenLabs event listeners
elevenLabsAgent.on('speaking', () => {
  setAiState('speaking');
});

elevenLabsAgent.on('listening', () => {
  setAiState('listening');
});

elevenLabsAgent.on('message', (text) => {
  setMessages(prev => [...prev, {
    id: Date.now(),
    text: text,
    timestamp: new Date()
  }]);
});
```

### 3. Text Mode (Fallback)
When `isVoiceMode === false`:
- User can type responses in textarea
- Send text to your backend API
- Receive text responses from ElevenLabs
- Display in messages panel

**Text Input Handler**:
```javascript
const handleSendMessage = async () => {
  if (userInput.trim() && !isVoiceMode) {
    // TODO: Send text to your ElevenLabs backend
    // const response = await axios.post(`${API}/interview/message`, {
    //   message: userInput
    // });
    
    // Add AI response to messages
    // setMessages(prev => [...prev, {
    //   id: Date.now(),
    //   text: response.data.reply,
    //   timestamp: new Date()
    // }]);
    
    setUserInput('');
  }
};
```

## Visual Feedback States

### AI Avatar States
The avatar automatically shows visual feedback:

1. **Idle** (`aiState = 'idle'`)
   - No animations
   - Static avatar

2. **Speaking** (`aiState = 'speaking'`)
   - Waveform ring animation
   - Pulsing glow effect
   - Status: "🔊 Speaking..."

3. **Listening** (`aiState = 'listening'`)
   - Gentle pulse animation
   - Breathing effect
   - Status: "🎤 Listening..."

## Backend Integration Checklist

### Required Backend Endpoints (if using REST API approach)

1. **Start Interview Call**
   ```
   POST /api/interview/start
   Response: { sessionId: string, status: string }
   ```

2. **Send Text Message** (for text mode)
   ```
   POST /api/interview/message
   Body: { sessionId: string, message: string }
   Response: { reply: string }
   ```

3. **End Interview Call**
   ```
   POST /api/interview/end
   Body: { sessionId: string }
   ```

### WebSocket Approach (Recommended for Real-time)

```javascript
// Connect to ElevenLabs WebSocket
const ws = new WebSocket('wss://your-backend-url/interview');

ws.onopen = () => {
  console.log('Connected to ElevenLabs agent');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'speaking') {
    setAiState('speaking');
  } else if (data.type === 'listening') {
    setAiState('listening');
  } else if (data.type === 'message') {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: data.text,
      timestamp: new Date()
    }]);
  }
};
```

## Environment Variables

Add to `/app/frontend/.env`:
```
REACT_APP_BACKEND_URL=<your-backend-url>
REACT_APP_ELEVENLABS_WS_URL=<websocket-url>
```

## Current Mock Behavior

The frontend currently has mock responses for demonstration:
- Clicking "Start Interview Call" triggers mock AI question
- Switching to text mode allows typing (with mock responses)
- All animations and state management are functional

## Next Steps

1. Replace mock responses in `handleCallToggle()` with actual ElevenLabs API calls
2. Implement WebSocket or REST API connection to your backend
3. Add error handling for network failures
4. Implement session management
5. Add transcript saving functionality

## Testing

Test the integration by:
1. Starting an interview call
2. Verifying audio input/output works
3. Testing voice ↔ text mode switching
4. Checking message display in left panel
5. Confirming avatar animations sync with AI state

## Notes

- The avatar image is loaded from the uploaded asset URL
- All animations are CSS-based (no external libraries needed)
- Component is fully responsive for desktop
- Follows the design specifications provided
