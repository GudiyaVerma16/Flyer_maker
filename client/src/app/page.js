"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Palette, Sparkles, Download } from "lucide-react";
import Link from "next/link";

// Updated for deployment with Render URLs
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Flyer Maker</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/flyer-generator" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Create Flyer
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Features
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Professional
            <span className="text-indigo-600"> Real Estate Flyers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate stunning, professional flyers for your property listings with AI-powered text enhancement and beautiful templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/flyer-generator">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Examples
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>AI-Powered Enhancement</CardTitle>
              <CardDescription>
                Automatically enhance your property descriptions with intelligent text generation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Professional Templates</CardTitle>
              <CardDescription>
                Choose from a variety of beautiful, customizable templates designed for real estate
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Easy Export</CardTitle>
              <CardDescription>
                Download your flyers in high-quality formats ready for printing and sharing
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Your First Flyer?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of real estate professionals who trust Flyer Maker for their marketing materials.
          </p>
          <Link href="/flyer-generator">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Create Flyer Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
