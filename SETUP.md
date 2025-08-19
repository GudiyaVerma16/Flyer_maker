# 🚀 AI Flyer Generator - Setup Guide

## Quick Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server/ai-service && npm install
cd ../flyer-service && npm install
```

### 2. Environment Setup

Create `.env.local` in the `client` directory:
```bash
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:5002
NEXT_PUBLIC_FLYER_SERVICE_URL=http://localhost:5003
```

Create `.env` in `server/ai-service`:
```bash
GEMINI_API_KEY=your-gemini-api-key
PORT=5002
```

### 3. Start the Application

**Option A: Use the orchestration script**
```bash
./start.sh
```

**Option B: Start manually**
```bash
# Terminal 1: AI Service
cd server/ai-service && npm start

# Terminal 2: Flyer Service
cd server/flyer-service && npm start

# Terminal 3: Frontend
cd client && npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **AI Service**: http://localhost:5002
- **Flyer Service**: http://localhost:5003

## 🎯 Features

✅ **AI Text Enhancement** - Powered by Google Gemini API  
✅ **Template System** - Multiple real estate flyer templates  
✅ **Interactive Editor** - Fabric.js canvas editor  
✅ **API-Driven Templates** - Templates fetched from backend  
✅ **Modern UI** - Next.js 15 + React 19 + Tailwind CSS  

## 🔧 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Fabric.js
- **Backend**: Node.js, Express.js, Google Generative AI
- **Architecture**: Microservices

## 📁 Project Structure

```
Flyer_Maker/
├── client/                 # Next.js frontend
├── server/                # Backend services
│   ├── ai-service/        # AI enhancement
│   └── flyer-service/     # Templates & generation
├── start.sh              # Service orchestration
└── README.md             # Detailed documentation
```

## 🆘 Troubleshooting

1. **Port conflicts**: Make sure ports 3000, 5002, 5003 are available
2. **Node.js version**: Requires Node.js 18+
3. **API keys**: Ensure Gemini API key is valid
4. **Dependencies**: Run `npm install` in each service directory
