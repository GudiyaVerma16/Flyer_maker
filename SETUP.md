# Flyer Maker - Setup Guide

A modern flyer generation application with AI-powered text enhancement, built with Next.js, Node.js, and Express.js microservices.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Flyer_Maker
   ```

2. **Install dependencies for all services**
   ```bash
   # Install client dependencies
   cd client
   npm install
   cd ..
   
   # Install AI service dependencies
   cd server/ai-service
   npm install
   cd ../..
   
   # Install Flyer service dependencies
   cd server/flyer-service
   npm install
   cd ../..
   ```

3. **Set up environment variables**

   **Client Environment** (`client/.env.local`):
   ```bash
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:5002
   NEXT_PUBLIC_FLYER_SERVICE_URL=http://localhost:5003
   ```

   **AI Service Environment** (`server/ai-service/.env`):
   ```bash
   GEMINI_API_KEY=your-gemini-api-key
   PORT=5002
   ```

   **Flyer Service Environment** (`server/flyer-service/.env`):
   ```bash
   PORT=5003
   ```

4. **Start the application**

   **Option 1: Using the start script**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

   **Option 2: Manual startup**
   ```bash
   # Terminal 1: Start AI Service
   cd server/ai-service
   npm start
   
   # Terminal 2: Start Flyer Service
   cd server/flyer-service
   npm start
   
   # Terminal 3: Start Client
   cd client
   npm run dev
   ```

## 📁 Project Structure

```
Flyer_Maker/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   └── lib/          # Utility functions
│   ├── package.json
│   └── .env.local        # Frontend environment variables
├── server/
│   ├── ai-service/       # AI text enhancement service
│   │   ├── server.js
│   │   ├── package.json
│   │   └── .env         # AI service environment variables
│   └── flyer-service/    # Flyer generation service
│       ├── server.js
│       ├── package.json
│       └── .env         # Flyer service environment variables
├── start.sh              # Startup script
└── SETUP.md             # This file
```

## 🔧 Configuration

### Environment Variables

#### Client (.env.local)
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js (generate a random string)
- `NEXTAUTH_URL`: URL where the client is running
- `NEXT_PUBLIC_AI_SERVICE_URL`: URL of the AI service
- `NEXT_PUBLIC_FLYER_SERVICE_URL`: URL of the Flyer service

#### AI Service (.env)
- `GEMINI_API_KEY`: Your Google Gemini API key (required for AI text enhancement)
- `PORT`: Port for the AI service (default: 5002)

#### Flyer Service (.env)
- `PORT`: Port for the Flyer service (default: 5003)

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key and add it to `server/ai-service/.env`

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start all services using the script:**
   ```bash
   ./start.sh
   ```

2. **Or start manually:**
   ```bash
   # Terminal 1: AI Service
   cd server/ai-service && npm start
   
   # Terminal 2: Flyer Service  
   cd server/flyer-service && npm start
   
   # Terminal 3: Client
   cd client && npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - AI Service: http://localhost:5002
   - Flyer Service: http://localhost:5003

### Production Mode

For production deployment, you'll need to:

1. Build the client:
   ```bash
   cd client
   npm run build
   npm start
   ```

2. Set appropriate environment variables for production
3. Use a process manager like PM2 for the services

## 🎯 Features

### Frontend (Next.js)
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Template Selection**: Grid-based template preview with visual thumbnails
- **Real-time Preview**: Interactive flyer editor with Fabric.js canvas
- **Download Options**: Export flyers as PNG or PDF
- **AI Integration**: Text enhancement powered by Google Gemini

### AI Service (Node.js/Express)
- **Text Enhancement**: Automatically enhances user input for better flyer content
- **Structured Output**: Returns formatted text with headers, highlights, and CTAs
- **Error Handling**: Graceful fallbacks when AI service is unavailable

### Flyer Service (Node.js/Express)
- **Template Management**: Multiple professional flyer templates
- **Content Parsing**: Intelligent parsing of enhanced text into flyer sections
- **Background Images**: High-quality Unsplash images for each template
- **Layout System**: Flexible positioning and styling for all text elements

## 🔍 API Endpoints

### AI Service (Port 5002)
- `GET /health` - Health check
- `POST /api/ai/enhance-text` - Enhance text with AI

### Flyer Service (Port 5003)
- `GET /health` - Health check
- `GET /api/flyers/templates` - Get all available templates
- `GET /api/flyers/templates/:id` - Get specific template
- `POST /api/flyers/generate` - Generate flyer with content

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill processes using the ports
   sudo lsof -ti:3000 | xargs kill -9
   sudo lsof -ti:5002 | xargs kill -9
   sudo lsof -ti:5003 | xargs kill -9
   ```

2. **Node modules not found**
   ```bash
   # Reinstall dependencies
   cd client && npm install
   cd ../server/ai-service && npm install
   cd ../flyer-service && npm install
   ```

3. **Environment variables not loading**
   - Ensure `.env` files are in the correct locations
   - Check file permissions
   - Restart the services after changing environment variables

4. **AI service errors**
   - Verify your Gemini API key is valid
   - Check the API key has proper permissions
   - Ensure the key is correctly set in `server/ai-service/.env`

### Service Status Check

```bash
# Check if services are running
curl http://localhost:5002/health  # AI Service
curl http://localhost:5003/health  # Flyer Service
```



---


