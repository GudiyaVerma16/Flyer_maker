"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Palette, Sparkles, Download } from "lucide-react";
import Link from "next/link";

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
            <Link href="/flyer-generator">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Create Flyer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Create Professional Real Estate Flyers
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate beautiful, professional flyers for your real estate listings with AI-powered text enhancement and stunning templates.
          </p>
          <Link href="/flyer-generator">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3">
              Start Creating
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>AI Text Enhancement</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Transform your basic property descriptions into compelling, professional marketing copy with AI assistance.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Beautiful Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose from professionally designed templates that showcase your properties in the best light.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Easy Export</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Download your flyers as high-quality PNG images or PDF files ready for printing and sharing.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-indigo-600 text-white border-0">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Your First Flyer?</h3>
              <p className="text-indigo-100 mb-6">
                Join thousands of real estate professionals who trust Flyer Maker for their marketing materials.
              </p>
              <Link href="/flyer-generator">
                <Button size="lg" variant="secondary" className="text-indigo-600 bg-white hover:bg-gray-100">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
