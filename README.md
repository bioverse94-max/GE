# AI Interview Coach

A React-based frontend application that connects directly to ElevenLabs Conversational AI agents for interactive interview coaching sessions.

## Features

- 🎙️ **Direct ElevenLabs Integration** - Connects directly to your ElevenLabs agent (no backend required)
- 🗣️ **Voice & Text Modes** - Switch between voice and text input during interviews
- 📊 **Real-time Status** - Visual feedback showing when the AI is speaking, listening, or idle
- 💾 **Built-in Database** - Uses ElevenLabs agent's built-in database
- 🎨 **Modern UI** - Beautiful, responsive interface with real-time animations

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- ElevenLabs API credentials (API Key and Agent ID)

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

4. Create `.env` file in the `frontend/` directory:
   ```env
   REACT_APP_ELEVENLABS_API_KEY=sk_your_api_key_here
   REACT_APP_ELEVENLABS_AGENT_ID=your_agent_id_here
   REACT_APP_ELEVENLABS_BRANCH_ID=your_branch_id_here  # Optional
   ```

5. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
.
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── services/     # ElevenLabs service integration
│   │   ├── components/   # UI components
│   │   └── styles/       # CSS styles
│   ├── public/           # Static assets
│   └── package.json      # Dependencies
├── .gitignore            # Root gitignore
└── README.md             # This file
```

## Documentation

- [Frontend README](frontend/README.md) - Frontend setup and usage
- [ElevenLabs Setup Guide](ELEVENLABS_SETUP.md) - Detailed setup instructions
- [ElevenLabs Integration Guide](ELEVENLABS_INTEGRATION.md) - Technical integration details

## Getting Your ElevenLabs Credentials

1. **API Key**: Get from [ElevenLabs API Keys](https://elevenlabs.io/app/settings/api-keys)
2. **Agent ID**: Get from [ElevenLabs Conversational AI Dashboard](https://elevenlabs.io/app/conversational-ai)
3. **Branch ID** (Optional): If using branches in your agent

## Architecture

- **Frontend** → **ElevenLabs Agent** (via `@11labs/client` SDK)
- No backend server required
- Built-in database handled by ElevenLabs agent

## Environment Variables

All environment variables are configured in `frontend/.env`:

- `REACT_APP_ELEVENLABS_API_KEY` - Your ElevenLabs API key
- `REACT_APP_ELEVENLABS_AGENT_ID` - Your agent ID
- `REACT_APP_ELEVENLABS_BRANCH_ID` - Optional branch ID

## Build for Production

```bash
cd frontend
npm run build
```

The build artifacts will be stored in the `frontend/build/` directory.

## Support

- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [ElevenLabs Conversational AI Docs](https://elevenlabs.io/docs/conversational-ai/overview)

## License

[Your License Here]

