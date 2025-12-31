import React, { useState, useEffect, useRef } from 'react';
import { Mic, MessageSquare, Phone, PhoneOff, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import elevenLabsService from '../services/elevenLabsService';
import '../styles/InterviewCoach.css';

const InterviewCoach = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Interview Coach. Ready to start your practice session?", timestamp: new Date() }
  ]);
  const [userInput, setUserInput] = useState('');
  const [aiState, setAiState] = useState('idle'); // idle, speaking, listening
  const [error, setError] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if ElevenLabs is configured
    setIsConfigured(elevenLabsService.isConfigured());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleCallToggle = async () => {
    if (!isCallActive) {
      // Starting call
      try {
        setError(null);
        setAiState('speaking');
        
        if (isConfigured) {
          // Real ElevenLabs integration
          await elevenLabsService.startConversation({
            onConnect: () => {
              console.log('Connected to ElevenLabs');
            },
            onMessage: (message) => {
              if (message.text) {
                addMessage(message.text);
              }
            },
            onStatusChange: (status) => {
              // Map ElevenLabs status to our state
              if (status === 'speaking') {
                setAiState('speaking');
              } else if (status === 'listening') {
                setAiState('listening');
              } else {
                setAiState('idle');
              }
            },
            onError: (err) => {
              setError('Connection error: ' + err.message);
              setAiState('idle');
            },
            onDisconnect: () => {
              setIsCallActive(false);
              setAiState('idle');
            }
          });
          
          setIsCallActive(true);
        } else {
          // Demo mode - mock responses
          console.log('🎭 Running in DEMO mode - ElevenLabs not configured');
          setTimeout(() => {
            addMessage("Great! Let's begin. Tell me about yourself and your background.");
            setAiState('listening');
          }, 2000);
          setIsCallActive(true);
        }
      } catch (err) {
        console.error('Failed to start call:', err);
        setError('Failed to start interview: ' + err.message);
        setAiState('idle');
      }
    } else {
      // Ending call
      try {
        if (isConfigured) {
          await elevenLabsService.endConversation();
        }
        setIsCallActive(false);
        setAiState('idle');
        addMessage('Interview session ended. Thank you for practicing!');
      } catch (err) {
        console.error('Error ending call:', err);
        setIsCallActive(false);
        setAiState('idle');
      }
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() && !isVoiceMode) {
      const userMessage = userInput;
      setUserInput('');

      try {
        if (isConfigured && isCallActive) {
          // Send to ElevenLabs
          setAiState('speaking');
          await elevenLabsService.sendTextMessage(userMessage);
          // Response will come through onMessage callback
        } else {
          // Demo mode - mock response
          setTimeout(() => {
            setAiState('speaking');
            const responses = [
              "That's interesting. Can you elaborate on that experience?",
              "Good point. How would you handle a challenging situation in that role?",
              "Tell me more about your approach to problem-solving.",
              "What motivates you in your professional life?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse);
            setTimeout(() => setAiState('listening'), 1500);
          }, 1000);
        }
      } catch (err) {
        console.error('Failed to send message:', err);
        setError('Failed to send message: ' + err.message);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="interview-container">
      {/* Left Panel - Messages */}
      <div className="left-panel">
        <div className="messages-header">
          <MessageSquare className="header-icon" />
          <h3>Interview Transcript</h3>
        </div>
        
        {/* Configuration Warning */}
        {!isConfigured && (
          <Alert className="config-warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Mode:</strong> Configure ElevenLabs in .env to connect your agent.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Display */}
        {error && (
          <Alert className="error-alert" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className="message-bubble">
              <p>{message.text}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Section */}
        <div className="input-section">
          <div className="mode-toggle">
            <div className="toggle-wrapper">
              <Mic className={`mode-icon ${isVoiceMode ? 'active' : ''}`} size={18} />
              <Switch
                checked={!isVoiceMode}
                onCheckedChange={(checked) => setIsVoiceMode(!checked)}
                className="mode-switch"
              />
              <MessageSquare className={`mode-icon ${!isVoiceMode ? 'active' : ''}`} size={18} />
            </div>
            <Label className="mode-label">
              {isVoiceMode ? 'Voice Mode' : 'Text Mode'}
            </Label>
          </div>
          
          {!isVoiceMode && isCallActive && (
            <div className="text-input-wrapper">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your response..."
                className="text-input"
                rows={3}
              />
              <Button 
                onClick={handleSendMessage}
                className="send-button"
                disabled={!userInput.trim()}
              >
                Send
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Center Section - AI Avatar */}
      <div className="center-section">
        <div className={`avatar-container ${aiState}`}>
          <div className="avatar-wrapper">
            <img 
              src="https://customer-assets.emergentagent.com/job_4e54eb34-129c-4c2e-9d74-396e5468cc5a/artifacts/fgte9n6q_WhatsApp%20Image%202025-12-31%20at%206.34.13%20PM.jpeg"
              alt="AI Interview Coach"
              className="avatar-image"
            />
            {aiState === 'speaking' && (
              <div className="waveform-ring">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
            )}
            {aiState === 'listening' && (
              <div className="pulse-ring"></div>
            )}
          </div>
        </div>
        <div className="avatar-label">
          <h2>AI Interview Coach</h2>
          {isCallActive && (
            <p className="status-indicator">
              {aiState === 'speaking' && '🔊 Speaking...'}
              {aiState === 'listening' && '🎤 Listening...'}
              {aiState === 'idle' && '⏸️ Ready'}
            </p>
          )}
        </div>
      </div>

      {/* Right Panel - Call Control */}
      <div className="right-panel">
        <div className="call-control">
          <Button
            onClick={handleCallToggle}
            className={`call-button ${isCallActive ? 'active' : ''}`}
            size="lg"
          >
            {isCallActive ? (
              <>
                <PhoneOff size={24} />
                <span>End Interview Call</span>
              </>
            ) : (
              <>
                <Phone size={24} />
                <span>Start Interview Call</span>
              </>
            )}
          </Button>
          
          {isCallActive && (
            <div className="call-status">
              <div className="status-dot"></div>
              <span>Call Active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewCoach;