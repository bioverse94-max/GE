/**
 * ElevenLabs Conversational AI Integration
 * Documentation: https://elevenlabs.io/docs/conversational-ai/overview
 */

class ElevenLabsService {
  constructor() {
    this.apiKey = process.env.REACT_APP_ELEVENLABS_API_KEY;
    this.agentId = process.env.REACT_APP_ELEVENLABS_AGENT_ID;
    this.branchId = process.env.REACT_APP_ELEVENLABS_BRANCH_ID;
    this.conversation = null;
    this.isConnected = false;
  }

  /**
   * Initialize and start conversation with ElevenLabs agent
   */
  async startConversation(callbacks = {}) {
    try {
      if (!this.apiKey || !this.agentId) {
        throw new Error(
          'Missing ElevenLabs credentials. Please check your .env.local file.'
        );
      }

      console.log('🎙️ Starting ElevenLabs conversation...');

      // Import ElevenLabs SDK dynamically
      const { Conversation } = await import('@11labs/client');

      // Initialize conversation
      this.conversation = await Conversation.startSession({
        agentId: this.agentId,
        branchId: this.branchId,
        apiKey: this.apiKey,
        onConnect: () => {
          console.log('✅ Connected to ElevenLabs agent');
          this.isConnected = true;
          if (callbacks.onConnect) callbacks.onConnect();
        },
        onDisconnect: () => {
          console.log('❌ Disconnected from ElevenLabs agent');
          this.isConnected = false;
          if (callbacks.onDisconnect) callbacks.onDisconnect();
        },
        onMessage: (message) => {
          console.log('📨 Agent message:', message);
          if (callbacks.onMessage) callbacks.onMessage(message);
        },
        onError: (error) => {
          console.error('❌ ElevenLabs error:', error);
          if (callbacks.onError) callbacks.onError(error);
        },
        onStatusChange: (status) => {
          console.log('🔄 Status changed:', status);
          // status can be: 'idle', 'speaking', 'listening'
          if (callbacks.onStatusChange) callbacks.onStatusChange(status);
        },
      });

      return this.conversation;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      throw error;
    }
  }

  /**
   * Send text message to agent (for text mode)
   */
  async sendTextMessage(text) {
    if (!this.conversation) {
      throw new Error('Conversation not started');
    }

    try {
      await this.conversation.sendUserInput(text);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  /**
   * End conversation
   */
  async endConversation() {
    if (this.conversation) {
      try {
        await this.conversation.endSession();
        console.log('✅ Conversation ended');
      } catch (error) {
        console.error('Error ending conversation:', error);
      }
      this.conversation = null;
      this.isConnected = false;
    }
  }

  /**
   * Check if credentials are configured
   */
  isConfigured() {
    return !!this.apiKey && !!this.agentId;
  }

  /**
   * Get current connection status
   */
  getConnectionStatus() {
    return this.isConnected;
  }
}

export default new ElevenLabsService();