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
    name: 'House For Sale',
    description: 'Professional real estate flyer with modern design',
    width: 800,
    height: 1200,
    backgroundColor: '#1a1a2e',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    backgroundImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=1200&fit=crop&auto=format&q=80',
    layout: {
      header: {
        x: 50,
        y: 50,
        width: 700,
        height: 120,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(26, 26, 46, 0.9)',
        padding: 20,
        borderRadius: 10
      },
      companyName: {
        x: 50,
        y: 200,
        width: 700,
        height: 60,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffd700'
      },
      propertyFeatures: {
        x: 50,
        y: 300,
        width: 700,
        height: 300,
        fontSize: 18,
        lineHeight: 1.6,
        backgroundColor: 'rgba(26, 26, 46, 0.8)',
        padding: 20,
        borderRadius: 10
      },
      contactInfo: {
        x: 50,
        y: 650,
        width: 700,
        height: 100,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.9)',
        color: '#1a1a2e',
        padding: 15,
        borderRadius: 10
      },
      smallImages: {
        x: 50,
        y: 800,
        width: 700,
        height: 150,
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop',
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop'
        ]
      }
    }
  },
  {
    id: 'real-estate-2',
    name: 'Modern Home For Sale',
    description: 'Clean and contemporary home design',
    width: 800,
    height: 1200,
    backgroundColor: '#ffffff',
    textColor: '#2c3e50',
    accentColor: '#3498db',
    backgroundImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1200&fit=crop&auto=format&q=80',
    layout: {
      header: {
        x: 50,
        y: 50,
        width: 700,
        height: 120,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 20,
        borderRadius: 10,
        color: '#2c3e50'
      },
      description: {
        x: 50,
        y: 200,
        width: 700,
        height: 200,
        fontSize: 18,
        lineHeight: 1.6,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        color: '#2c3e50'
      },
      features: {
        x: 50,
        y: 450,
        width: 700,
        height: 250,
        fontSize: 16,
        lineHeight: 1.5,
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        padding: 20,
        borderRadius: 10,
        color: '#2c3e50'
      },
      smallImages: {
        x: 50,
        y: 750,
        width: 700,
        height: 150,
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop'
        ]
      },
      cta: {
        x: 50,
        y: 950,
        width: 700,
        height: 100,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#3498db',
        color: '#ffffff',
        padding: 20,
        borderRadius: 10
      }
    }
  },
  {
    id: 'real-estate-3',
    name: 'Luxury Modern Home',
    description: 'Elegant luxury property with premium features',
    width: 800,
    height: 1200,
    backgroundColor: '#ffffff',
    textColor: '#2c3e50',
    accentColor: '#27ae60',
    backgroundImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1200&fit=crop&auto=format&q=80',
    layout: {
      header: {
        x: 50,
        y: 50,
        width: 700,
        height: 120,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 20,
        borderRadius: 10,
        color: '#2c3e50'
      },
      description: {
        x: 50,
        y: 200,
        width: 700,
        height: 200,
        fontSize: 18,
        lineHeight: 1.6,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        color: '#2c3e50'
      },
      features: {
        x: 50,
        y: 450,
        width: 700,
        height: 250,
        fontSize: 16,
        lineHeight: 1.5,
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        padding: 20,
        borderRadius: 10,
        color: '#2c3e50'
      },
      smallImages: {
        x: 50,
        y: 750,
        width: 700,
        height: 150,
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=150&fit=crop',
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop'
        ]
      },
      cta: {
        x: 50,
        y: 950,
        width: 700,
        height: 100,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#27ae60',
        color: '#ffffff',
        padding: 20,
        borderRadius: 10
      }
    }
  },
  {
    id: 'interior-design',
    name: 'Crafting Dream Spaces',
    description: 'Interior design and renovation services',
    width: 800,
    height: 1200,
    backgroundColor: '#34495e',
    textColor: '#ffffff',
    accentColor: '#e74c3c',
    backgroundImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=1200&fit=crop&auto=format&q=80',
    layout: {
      header: {
        x: 50,
        y: 50,
        width: 700,
        height: 120,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(52, 73, 94, 0.9)',
        padding: 20,
        borderRadius: 10
      },
      aboutUs: {
        x: 50,
        y: 200,
        width: 700,
        height: 150,
        fontSize: 18,
        lineHeight: 1.6,
        backgroundColor: 'rgba(52, 73, 94, 0.8)',
        padding: 20,
        borderRadius: 10
      },
      services: {
        x: 50,
        y: 400,
        width: 700,
        height: 400,
        fontSize: 16,
        lineHeight: 1.5,
        backgroundColor: 'rgba(52, 73, 94, 0.7)',
        padding: 20,
        borderRadius: 10
      },
      serviceImages: {
        x: 50,
        y: 850,
        width: 700,
        height: 200,
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&h=150&fit=crop',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150&h=150&fit=crop'
        ]
      },
      cta: {
        x: 50,
        y: 1100,
        width: 700,
        height: 80,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#e74c3c',
        color: '#ffffff',
        padding: 15,
        borderRadius: 10
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
  console.log('=== PARSING CONTENT ===');
  console.log('Input content:', content);
  
  // Extract the actual content from the enhanced text
  let header = '';
  let highlights = [];
  let cta = '';
  
  // Extract header (e.g., "500 dollar 3 bedroom - For Sale!")
  const headerMatch = content.match(/\*\*([^*]+)\*\*\s*-\s*For\s*Sale/);
  if (headerMatch) {
    header = headerMatch[1].trim();
    console.log('Extracted header:', header);
  }
  
  // Extract bullet points from the enhanced text
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('•')) {
      highlights.push(trimmedLine);
      console.log('Found highlight:', trimmedLine);
    }
  }
  
  // Extract CTA (e.g., "Call Today for More Information!")
  const ctaMatch = content.match(/\*\*Call[^*]*\*\*/);
  if (ctaMatch) {
    cta = ctaMatch[0].replace(/\*\*/g, '');
    console.log('Extracted CTA:', cta);
  }
  
  // If no header found, try alternative patterns
  if (!header) {
    const altHeaderMatch = content.match(/([^-]+)\s*-\s*For\s*Sale/);
    if (altHeaderMatch) {
      header = altHeaderMatch[1].trim();
      console.log('Extracted header (alt):', header);
    }
  }
  
  // If no highlights found, try to extract from the content
  if (highlights.length === 0) {
    // Look for bullet points in the original content
    const bulletMatches = content.match(/•\s*([^•\n]+)/g);
    if (bulletMatches) {
      highlights = bulletMatches.map(h => h.trim());
      console.log('Extracted highlights from content:', highlights);
    }
  }
  
  // If no CTA found, try alternative patterns
  if (!cta) {
    const altCtaMatch = content.match(/Call[^!]*!/);
    if (altCtaMatch) {
      cta = altCtaMatch[0];
      console.log('Extracted CTA (alt):', cta);
    }
  }
  
  // If still no header found, use a default
  if (!header) {
    header = 'Beautiful Property For Sale';
  }
  
  // If still no highlights found, use defaults
  if (highlights.length === 0) {
    highlights = [
      '• Beautiful property with excellent features',
      '• Prime location with great amenities',
      '• Perfect for families and professionals',
      '• Don\'t miss this amazing opportunity!'
    ];
  }
  
  // If still no CTA found, use default
  if (!cta) {
    cta = 'Call today to schedule a private showing!';
  }
  
  const result = {
    header: header,
    companyName: 'Professional Real Estate',
    description: 'Discover your dream home with this amazing property offering excellent features and prime location.',
    highlights: highlights,
    location: 'Prime location with excellent amenities and easy access to shopping, schools, and transportation.',
    cta: cta,
    aboutUs: '',
    services: ''
  };

  console.log('Final parsed content:', result);
  console.log('=== END PARSING ===');
  return result;
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