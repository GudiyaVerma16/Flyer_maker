#!/bin/bash

echo "🚀 Starting AI Flyer Generator..."

# Check if Node.js version is 18+
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ is required. Current version: $(node -v)"
    echo "Please upgrade Node.js using: nvm install 18 && nvm use 18"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Function to install dependencies
install_deps() {
    local dir=$1
    local name=$2
    echo "📦 Installing dependencies for $name..."
    cd "$dir"
    if [ -d "node_modules" ]; then
        echo "   Dependencies already installed"
    else
        npm install
    fi
    cd ..
}

# Install dependencies for all services
echo "📦 Installing dependencies..."
install_deps "server/ai-service" "AI Service"
install_deps "server/flyer-service" "Flyer Service"
install_deps "client" "Frontend"

# Start AI Service
echo "🤖 Starting AI Service..."
cd server/ai-service
npm start &
AI_PID=$!
cd ../..

# Wait a moment for AI service to start
sleep 2

# Start Flyer Service
echo "📄 Starting Flyer Service..."
cd server/flyer-service
npm start &
FLYER_PID=$!
cd ../..

# Wait a moment for Flyer service to start
sleep 2

# Start Frontend
echo "🌐 Starting Frontend..."
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "🎉 All services started successfully!"
echo ""
echo "📡 Service URLs:"
echo "   AI Service:      http://localhost:5002"
echo "   Flyer Service:   http://localhost:5003"
echo "   Frontend:        http://localhost:3000"
echo ""
echo "🎯 Flyer Generator: http://localhost:3000/flyer-generator"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    kill $AI_PID 2>/dev/null
    kill $FLYER_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for all background processes
wait 