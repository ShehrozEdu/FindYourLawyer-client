import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faTimes, 
  faPaperPlane,
  faLightbulb,
  faChartLine,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import apiService from '../../utility/apiService';
import { toast } from 'react-toastify';

const AdminAIAssistant = ({ dashboardStats, isOpen: externalIsOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  
  // Sync with external control
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);
  
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize Gemini AI (should be moved to backend for security)
  const genAI = new GoogleGenerativeAI(
    process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyCsPQI899HN0gY6k1fX5BJ3hZ-dy28xoiE"
  );

  // List of models to try in order of preference
  const availableModels = [
    'gemini-2.5-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro'
  ];

  // Helper function to try multiple models
  const tryGenerateContent = async (prompt) => {
    let lastError = null;
    
    for (const modelName of availableModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        console.log(`Admin AI: Model ${modelName} failed:`, error.message);
        lastError = error;
        // Continue to next model
        continue;
      }
    }
    
    // If all models failed, throw the last error
    throw lastError || new Error('All models failed');
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate context-aware suggestions when stats change
  useEffect(() => {
    if (dashboardStats && isOpen && messages.length === 0) {
      // Add a small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        generateInitialSuggestions();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [dashboardStats, isOpen]);

  // Generate initial suggestions based on dashboard stats
  const generateInitialSuggestions = async () => {
    if (!dashboardStats) return;

    const contextPrompt = `You are an AI assistant for a legal services platform admin panel. 
    Analyze the following dashboard statistics and provide 3-5 actionable insights or recommendations:
    
    Dashboard Statistics:
    - Total Users: ${dashboardStats.users?.total} (Lawyers: ${dashboardStats.users?.lawyers}, Clients: ${dashboardStats.users?.clients})
    - New Users This Week: ${dashboardStats.users?.newThisWeek}
    - Total Cases: ${dashboardStats.cases?.total}
    - Cases by Status: Pending: ${dashboardStats.cases?.byStatus?.pending}, In Progress: ${dashboardStats.cases?.byStatus?.in_progress}, Completed: ${dashboardStats.cases?.byStatus?.completed}, Cancelled: ${dashboardStats.cases?.byStatus?.cancelled}
    - Total Revenue: ₹${dashboardStats.revenue?.total?.toLocaleString()}
    - Monthly Revenue: ₹${dashboardStats.revenue?.monthly?.toLocaleString()}
    - Revenue Trend: ${dashboardStats.revenue?.trend}
    - Average Rating: ${dashboardStats.reviews?.averageRating}
    - Total Reviews: ${dashboardStats.reviews?.total} (Visible: ${dashboardStats.reviews?.visible}, Pending: ${dashboardStats.reviews?.pending})
    - Upcoming Bookings: ${dashboardStats.bookings?.upcoming}
    
    Provide insights in a concise format, focusing on:
    1. Areas needing attention
    2. Growth opportunities
    3. Potential issues
    4. Optimization recommendations
    
    Format as a numbered list with brief, actionable items.`;

    try {
      // Try multiple models until one works
      const text = await tryGenerateContent(contextPrompt);
      
      // Extract suggestions from response
      const lines = text.split('\n').filter(line => line.trim());
      const suggestedActions = lines
        .filter(line => /^\d+[\.\)]/.test(line.trim()) || line.includes('•') || line.includes('-'))
        .slice(0, 5)
        .map(line => line.replace(/^\d+[\.\)]\s*/, '').replace(/^[•\-]\s*/, '').trim());
      
      setSuggestions(suggestedActions);
      
      // Add welcome message with suggestions
      setMessages([{
        text: `👋 **Admin Assistant Ready**\n\nI've analyzed your dashboard statistics. Here are some insights:\n\n${text}`,
        fromUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Admin AI: Error generating suggestions:', error);
      // Show user-friendly error message with detailed troubleshooting
      const errorMsg = error.message || 'Model not available';
      setMessages([{
        text: `⚠️ **Unable to generate AI insights**\n\n**Error:** ${errorMsg}\n\n**Troubleshooting Steps:**\n\n1. **Check API Key:**\n   - Verify your API key is valid\n   - Ensure it has access to Gemini models\n   - Get a new key from: https://makersuite.google.com/app/apikey\n\n2. **Enable API in Google Cloud:**\n   - Go to: https://console.cloud.google.com/\n   - Enable "Generative Language API"\n   - Ensure billing is enabled\n\n3. **Model Availability:**\n   - Your API key may not have access to newer models\n   - Try using the original Gemini AI page to test: /gemini\n\n4. **Alternative:**\n   - You can still ask questions manually below\n   - The AI will try to respond if models become available\n\n**Note:** This feature requires a valid Google Gemini API key with proper permissions.`,
        fromUser: false,
        timestamp: new Date()
      }]);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = input.trim();
    const newUserMessage = { 
      text: userMessage, 
      fromUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build context-aware prompt
      const contextData = dashboardStats ? `
Current Platform Statistics:
- Users: ${dashboardStats.users?.total} (${dashboardStats.users?.lawyers} lawyers, ${dashboardStats.users?.clients} clients)
- Cases: ${dashboardStats.cases?.total} total (${dashboardStats.cases?.byStatus?.pending} pending, ${dashboardStats.cases?.byStatus?.in_progress} in progress)
- Revenue: ₹${dashboardStats.revenue?.total?.toLocaleString()} total, ₹${dashboardStats.revenue?.monthly?.toLocaleString()} this month (trend: ${dashboardStats.revenue?.trend})
- Reviews: ${dashboardStats.reviews?.total} total, ${dashboardStats.reviews?.averageRating} avg rating, ${dashboardStats.reviews?.pending} pending verification
- Bookings: ${dashboardStats.bookings?.upcoming} upcoming
` : '';

      const systemPrompt = `You are an AI assistant for a legal services platform admin panel. 
You help admins make data-driven decisions and optimize platform operations.

${contextData}

User Question: ${userMessage}

Provide a helpful, actionable response. If the question relates to the platform statistics above, use that context. 
Be concise but thorough. Format your response using markdown for better readability.`;

      // Try multiple models until one works
      const responseText = await tryGenerateContent(systemPrompt);

      const newBotMessage = { 
        text: responseText, 
        fromUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error('Admin AI: Error fetching response:', error);
      const errorMessage = error.message || 'Unknown error';
      
      // Check if it's a model availability issue
      if (errorMessage.includes('404') || errorMessage.includes('not found')) {
        toast.error('Gemini models not available. Check API key permissions.');
        setMessages(prev => [...prev, {
          text: `⚠️ **Model Not Available**\n\n**Error:** ${errorMessage}\n\n**All models tried:** ${availableModels.join(', ')}\n\n**This means:**\n- Your API key doesn't have access to Gemini models, OR\n- The Generative Language API is not enabled, OR\n- Billing is not set up for your Google Cloud project\n\n**Quick Fix:**\n1. Get a new API key: https://makersuite.google.com/app/apikey\n2. Enable API: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com\n3. Ensure billing is enabled\n\n**Test your key:** Try the /gemini page to see if it works there.`,
          fromUser: false,
          timestamp: new Date()
        }]);
      } else {
        toast.error('Failed to get AI response. Please try again.');
        setMessages(prev => [...prev, {
          text: `❌ **Error:** ${errorMessage}\n\nPlease try again. If the problem persists, check your API key configuration.`,
          fromUser: false,
          timestamp: new Date()
        }]);
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'What actions should I prioritize today?',
    'Why did revenue change this month?',
    'Which areas need immediate attention?',
    'How can I improve user engagement?',
    'What are the top concerns this week?'
  ];

  return (
    <>
      {/* Floating Action Button - Only show if not controlled externally */}
      {externalIsOpen === undefined && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-[#2bcdc0] hover:bg-[#25b8ac] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Open AI Assistant"
          style={{ 
            width: '56px', 
            height: '56px',
            boxShadow: '0 4px 12px rgba(43, 205, 192, 0.4)'
          }}
        >
          <FontAwesomeIcon icon={faRobot} className="text-2xl" />
        </button>
      )}

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="bg-gmeshMain text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faRobot} />
              <h3 className="font-semibold">AI Admin Assistant</h3>
            </div>
            <button
              onClick={handleClose}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faLightbulb} className="text-4xl text-gmeshMain mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Ask me anything about your platform!
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Quick Questions:
                  </p>
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(q)}
                      className="block w-full text-left text-sm text-gmeshBlue hover:text-gmeshMain hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.fromUser
                      ? 'bg-gmeshMain text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                    {message.text}
                  </ReactMarkdown>
                  <p className={`text-xs mt-1 ${
                    message.fromUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gmeshMain"></div>
                <span className="text-sm">Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && messages.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                <FontAwesomeIcon icon={faLightbulb} className="mr-1" />
                Suggested Actions:
              </p>
              <div className="space-y-1">
                {suggestions.slice(0, 3).map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(`Tell me more about: ${suggestion}`)}
                    className="block w-full text-left text-xs text-gmeshBlue hover:text-gmeshMain hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors truncate"
                    title={suggestion}
                  >
                    • {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your platform..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gmeshMain bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-gmeshMain hover:bg-gmeshMain/90 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAIAssistant;

