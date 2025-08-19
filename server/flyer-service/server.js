const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Flyer templates
const flyerTemplates = [
  {
    id: 'real-estate-1',
    name: 'Modern Real Estate',
    description: 'Clean and professional real estate flyer',
    width: 800,
    height: 1200,
    backgroundColor: '#ffffff',
    textColor: '#2c3e50',
    accentColor: '#3498db',
    layout: {
      header: {
        x: 50,
        y: 50,
        width: 700,
        height: 100,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      highlights: {
        x: 50,
        y: 200,
        width: 700,
        height: 400,
        fontSize: 16,
        lineHeight: 1.5
      },
      location: {
        x: 50,
        y: 650,
        width: 700,
        height: 100,
        fontSize: 18,
        fontWeight: 'bold'
      },
      cta: {
        x: 50,
        y: 800,
        width: 700,
        height: 150,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
      }
    }
  },
  {
    id: 'real-estate-2',
    name: 'Luxury Property',
    description: 'Elegant luxury property flyer',
    width: 800,
    height: 1200,
    backgroundColor: '#f8f9fa',
    textColor: '#1a1a1a',
    accentColor: '#d4af37',
    layout: {
      header: {
        x: 50,
        y: 50,
        width: 700,
        height: 120,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      highlights: {
        x: 50,
        y: 220,
        width: 700,
        height: 450,
        fontSize: 18,
        lineHeight: 1.6
      },
      location: {
        x: 50,
        y: 720,
        width: 700,
        height: 120,
        fontSize: 20,
        fontWeight: 'bold'
      },
      cta: {
        x: 50,
        y: 900,
        width: 700,
        height: 180,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
      }
    }
  },
  {
    id: 'real-estate-3',
    name: 'Family Home',
    description: 'Warm and inviting family home flyer',
    width: 800,
    height: 1200,
    backgroundColor: '#fff5f5',
    textColor: '#2d3748',
    accentColor: '#e53e3e',
    layout: {
      header: {
        x: 50,
        y: 50,
        width: 700,
        height: 100,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      highlights: {
        x: 50,
        y: 180,
        width: 700,
        height: 420,
        fontSize: 17,
        lineHeight: 1.5
      },
      location: {
        x: 50,
        y: 650,
        width: 700,
        height: 100,
        fontSize: 19,
        fontWeight: 'bold'
      },
      cta: {
        x: 50,
        y: 800,
        width: 700,
        height: 160,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
      }
    }
  }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Flyer Service', timestamp: new Date().toISOString() });
});

// Get all templates
app.get('/api/flyers/templates', (req, res) => {
  try {
    res.json({
      success: true,
      templates: flyerTemplates,
      count: flyerTemplates.length
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch templates'
    });
  }
});

// Get template by ID
app.get('/api/flyers/templates/:id', (req, res) => {
  try {
    const template = flyerTemplates.find(t => t.id === req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    res.json({
      success: true,
      template
    });
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch template'
    });
  }
});

// Generate flyer data (returns template with content)
app.post('/api/flyers/generate', (req, res) => {
  try {
    const { templateId, content } = req.body;
    
    if (!templateId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Template ID and content are required'
      });
    }

    const template = flyerTemplates.find(t => t.id === templateId);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Parse content into sections
    const sections = parseContentIntoSections(content);
    
    const flyerData = {
      ...template,
      content: sections,
      generatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      flyer: flyerData
    });

  } catch (error) {
    console.error('Error generating flyer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate flyer'
    });
  }
});

// Helper function to parse content into sections
function parseContentIntoSections(content) {
  const lines = content.split('\n').filter(line => line.trim());
  
  let header = '';
  let highlights = [];
  let location = '';
  let cta = '';

  let currentSection = 'header';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      // Bold text - likely header
      header = trimmedLine.replace(/\*\*/g, '');
      currentSection = 'highlights';
    } else if (trimmedLine.includes('Highlights:') || trimmedLine.includes('Property Highlights:')) {
      currentSection = 'highlights';
    } else if (trimmedLine.includes('Location') || trimmedLine.includes('Prime Location')) {
      currentSection = 'location';
      location = trimmedLine;
    } else if (trimmedLine.includes('Call') || trimmedLine.includes('Don\'t miss') || trimmedLine.includes('Dream Home')) {
      currentSection = 'cta';
      cta = trimmedLine;
    } else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
      // Bullet points
      highlights.push(trimmedLine);
    } else if (currentSection === 'highlights' && trimmedLine) {
      highlights.push(trimmedLine);
    } else if (currentSection === 'location' && trimmedLine) {
      location += ' ' + trimmedLine;
    } else if (currentSection === 'cta' && trimmedLine) {
      cta += ' ' + trimmedLine;
    }
  }

  return {
    header: header || 'Beautiful Property For Sale',
    highlights: highlights.length > 0 ? highlights : ['• Amazing property features', '• Prime location', '• Don\'t miss this opportunity!'],
    location: location || 'Prime location with excellent amenities',
    cta: cta || 'Call today to schedule a private showing!'
  };
}

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
  console.log(`🚀 Flyer Service running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`📄 Templates: http://localhost:${PORT}/api/flyers/templates`);
  console.log(`🎨 Generate: http://localhost:${PORT}/api/flyers/generate`);
}); 