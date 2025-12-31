# AI Interview Coach - Component Documentation

## Component Overview

The AI Interview Coach is a voice-first interview practice application with a clean, professional interface.

## File Structure

```
/app/frontend/src/
├── pages/
│   └── InterviewCoach.jsx          # Main component
├── styles/
│   └── InterviewCoach.css          # All styling
├── components/ui/                   # Shadcn components (already installed)
└── App.js                          # Router setup
```

## Features Implemented

### ✅ Layout
- **Left Panel**: Message transcript with scrollable history
- **Center**: Large AI avatar with animations
- **Right Panel**: Call control button
- **Bottom Left**: Voice/Text mode toggle with input

### ✅ Visual States
- **Idle State**: Static avatar, purple "Start Interview Call" button
- **Active Call**: Animated avatar, red "End Interview Call" button
- **Speaking State**: Waveform ring animation around avatar
- **Listening State**: Gentle pulsing animation

### ✅ Interactions
- Start/End call button
- Voice ↔ Text mode toggle
- Text input with send button (text mode only)
- Auto-scrolling message history
- Keyboard support (Enter to send in text mode)

### ✅ Design Elements
- Soft pastel gradient (lavender/purple/light blue)
- Glassmorphic panels with backdrop blur
- Smooth transitions and micro-animations
- Professional, calm atmosphere
- Rounded corners and subtle shadows

## Customization Guide

### Colors

To change the color theme, edit `/app/frontend/src/styles/InterviewCoach.css`:

```css
/* Background Gradient */
.interview-container {
  background: linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 50%, #ddd6fe 100%);
}

/* Accent Colors */
/* Purple: #8b5cf6, #7c3aed, #6d28d9 */
/* Replace these throughout the CSS file with your preferred colors */
```

### Avatar

To use a different avatar image, replace the URL in `/app/frontend/src/pages/InterviewCoach.jsx`:

```javascript
<img 
  src="YOUR_AVATAR_URL_HERE"
  alt="AI Interview Coach"
  className="avatar-image"
/>
```

### Messages

Default welcome message can be changed:

```javascript
const [messages, setMessages] = useState([
  { 
    id: 1, 
    text: "Your custom welcome message here", 
    timestamp: new Date() 
  }
]);
```

### Animation Speeds

Adjust animation durations in CSS:

```css
/* Waveform animation */
@keyframes waveExpand {
  /* Change duration: 2s to your preference */
}

/* Pulse animation */
@keyframes pulseGlow {
  /* Change duration: 1.5s to your preference */
}
```

## State Management

### Key State Variables

```javascript
// Call status
const [isCallActive, setIsCallActive] = useState(false);

// Input mode
const [isVoiceMode, setIsVoiceMode] = useState(true);

// Conversation history
const [messages, setMessages] = useState([...]);

// User text input
const [userInput, setUserInput] = useState('');

// AI status: 'idle' | 'speaking' | 'listening'
const [aiState, setAiState] = useState('idle');
```

## Adding New Features

### 1. Add Session Recording

```javascript
const [isRecording, setIsRecording] = useState(false);
const [recordedSessions, setRecordedSessions] = useState([]);

const saveSession = () => {
  const session = {
    id: Date.now(),
    messages: messages,
    duration: calculateDuration(),
    timestamp: new Date()
  };
  setRecordedSessions(prev => [...prev, session]);
};
```

### 2. Add Feedback System

```javascript
const [showFeedback, setShowFeedback] = useState(false);
const [feedback, setFeedback] = useState(null);

// After interview ends
const generateFeedback = async () => {
  const response = await axios.post(`${API}/interview/feedback`, {
    messages: messages
  });
  setFeedback(response.data);
  setShowFeedback(true);
};
```

### 3. Add Job Role Selection

```javascript
const [selectedRole, setSelectedRole] = useState('');

const roles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UI/UX Designer'
];

// Add dropdown in UI before starting interview
```

## Accessibility

### Current Implementation
- ✅ Keyboard navigation support
- ✅ Clear visual states
- ✅ Alt text on avatar image
- ✅ Semantic HTML structure

### Recommended Additions
- Add ARIA labels for screen readers
- Keyboard shortcuts for common actions
- Focus management for modals
- High contrast mode support

## Performance Notes

- Messages list auto-scrolls smoothly
- CSS animations use GPU acceleration (transform/opacity)
- Images loaded once and cached
- No unnecessary re-renders (React.memo if needed)

## Browser Support

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

Note: Web Speech API (if used) has limited browser support.

## Responsive Design

Current breakpoints:

```css
/* Tablet (≤1200px) */
@media (max-width: 1200px) {
  .left-panel { width: 280px; }
  .right-panel { width: 240px; }
  .avatar-wrapper { width: 240px; height: 240px; }
}

/* Mobile (≤900px) */
@media (max-width: 900px) {
  /* Stacks panels vertically */
}
```

## Troubleshooting

### Avatar not loading
- Check image URL is accessible
- Verify CORS headers if external URL
- Check browser console for errors

### Animations not smooth
- Ensure browser supports CSS transforms
- Check if hardware acceleration is enabled
- Reduce animation complexity if needed

### Messages not scrolling
- Verify `messagesEndRef` is attached
- Check for CSS overflow issues
- Ensure React refs are properly initialized

## Design Philosophy

This UI follows these principles:
- **Voice-first**: Primary interaction through voice
- **Minimal**: No unnecessary UI elements
- **Professional**: Calm, supportive atmosphere
- **Responsive**: Immediate visual feedback
- **Accessible**: Clear states and interactions

## Credits

- **Icons**: Lucide React (already installed)
- **UI Components**: Shadcn/ui (pre-configured)
- **Styling**: Custom CSS with Tailwind utilities
- **Avatar**: User-provided design reference
