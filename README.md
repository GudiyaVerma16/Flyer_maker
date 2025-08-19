# 🎨 Flyer Maker

A modern, AI-powered flyer generation application that creates professional real estate flyers with beautiful templates and intelligent text enhancement.

## ✨ Features

- 🤖 **AI Text Enhancement** - Powered by Google Gemini API
- 🎯 **Professional Templates** - Multiple real estate flyer designs
- 🖼️ **Interactive Editor** - Real-time preview with Fabric.js canvas
- 📱 **Modern UI** - Built with Next.js 15, React 19, and Tailwind CSS
- 📥 **Export Options** - Download as PNG or PDF
- 🔧 **Microservices Architecture** - Scalable backend with separate AI and Flyer services

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Flyer_Maker
   ```

2. **Follow the setup guide**
   ```bash
   # See SETUP.md for detailed instructions
   ```

3. **Start the application**
   ```bash
   ./start.sh
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm
- Google Gemini API key

## 📖 Documentation

For detailed setup instructions, configuration, and troubleshooting, see **[SETUP.md](SETUP.md)**.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   AI Service    │    │  Flyer Service  │
│   Frontend      │◄──►│   (Port 5002)   │    │   (Port 5003)   │
│   (Port 3000)   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Use Cases

- **Real Estate Agents** - Create professional property flyers
- **Marketing Teams** - Generate promotional materials
- **Small Businesses** - Design marketing collateral
- **Educational Purposes** - Learn modern web development

## 🔧 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Fabric.js
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API
- **Architecture**: Microservices

