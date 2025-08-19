const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyBfdjGyrH4JC7Gsyoae5-LCQRWXdAj5TAQ');

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'AI Service', timestamp: new Date().toISOString() });
});

// AI Text Enhancement endpoint
app.post('/api/ai/enhance-text', async (req, res) => {
  try {
    const { text, template } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        success: false, 
        message: 'Text input is required' 
      });
    }

    console.log('Enhancing text:', text);

    // Create a prompt for Gemini to enhance the text
    const prompt = `
    Please enhance the following real estate listing text to make it more professional, engaging, and suitable for a flyer. 
    The enhanced text should include:
    - A compelling headline
    - Property highlights in bullet points
    - Location benefits
    - Call-to-action
    
    Original text: "${text}"
    
    Please format the response as:
    - Headline (bold and engaging)
    - Property Highlights (bullet points)
    - Location section
    - Call-to-action section
    
    Make it professional but warm, highlighting the best features of the property.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();

    console.log('Enhanced text generated successfully');

    res.json({
      success: true,
      originalText: text,
      enhancedText: enhancedText,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enhancing text:', error);
    
    // Fallback response if AI fails
    const fallbackText = `
**${req.body.text}** - For Sale!

**Property Highlights:**
• Beautiful property with excellent features
• Prime location with great amenities
• Perfect for families and professionals
• Don't miss this amazing opportunity!

**Call Today for More Information!**
    `;

    res.json({
      success: true,
      originalText: req.body.text,
      enhancedText: fallbackText,
      timestamp: new Date().toISOString(),
      note: 'AI enhancement failed, using fallback text'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Service running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 AI Enhancement: http://localhost:${PORT}/api/ai/enhance-text`);
}); 