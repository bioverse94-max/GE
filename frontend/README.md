# Frontend - AI Interview Coach

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- ElevenLabs API credentials (API Key and Agent ID)

### Installation

1. Install dependencies:
```bash
npm install
```
or
```bash
yarn install
```

### Environment Setup

1. Create a `.env` file in the `frontend/` directory
2. Add your ElevenLabs credentials:

```env
# ElevenLabs Configuration
# Get your API key from: https://elevenlabs.io/app/settings/api-keys
REACT_APP_ELEVENLABS_API_KEY=sk_your_api_key_here

# Get your Agent ID from: https://elevenlabs.io/app/conversational-ai
REACT_APP_ELEVENLABS_AGENT_ID=your_agent_id_here

# Optional: Branch ID if using branches
REACT_APP_ELEVENLABS_BRANCH_ID=your_branch_id_here
```

### Starting the Development Server

To start the frontend development server:

```bash
npm start
```
or
```bash
yarn start
```

The application will open in your browser at `http://localhost:3000` (or the next available port).

**Note:** The app connects directly to the ElevenLabs agent. No backend server is required as the ElevenLabs agent has a built-in database.

### Build for Production

To create a production build:

```bash
npm run build
```
or
```bash
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Features

- **Direct ElevenLabs Integration**: Connects directly to your ElevenLabs conversational AI agent
- **Voice & Text Modes**: Switch between voice and text input during interviews
- **Real-time Status**: Visual feedback showing when the AI is speaking, listening, or idle
- **Built-in Database**: Uses ElevenLabs agent's built-in database - no separate backend needed

