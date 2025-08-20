'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import FlyerEditor from '@/components/flyer/FlyerEditor';
import TemplateSelector from '@/components/flyer/TemplateSelector';
import TextInput from '@/components/flyer/TextInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Wand2, Download, Save, RefreshCw } from 'lucide-react';

const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:5002';
const FLYER_SERVICE_URL = process.env.NEXT_PUBLIC_FLYER_SERVICE_URL || 'http://localhost:5003';


console.log('Environment check:');
console.log('AI_SERVICE_URL:', AI_SERVICE_URL);
console.log('FLYER_SERVICE_URL:', FLYER_SERVICE_URL);
console.log('process.env.NEXT_PUBLIC_AI_SERVICE_URL:', process.env.NEXT_PUBLIC_AI_SERVICE_URL);
console.log('process.env.NEXT_PUBLIC_FLYER_SERVICE_URL:', process.env.NEXT_PUBLIC_FLYER_SERVICE_URL);

export default function FlyerGenerator() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userText, setUserText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [flyerData, setFlyerData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadTemplates = async () => {
    console.log('=== LOADING TEMPLATES ===');
    setIsLoading(true);
    
    try {
      console.log('Making API call to:', `${FLYER_SERVICE_URL}/api/flyers/templates`);
      const response = await axios.get(`${FLYER_SERVICE_URL}/api/flyers/templates`);
      console.log('API Response status:', response.status);
      console.log('API Response headers:', response.headers);
      console.log('API Response data:', response.data);
      console.log('Response data type:', typeof response.data);
      console.log('Response success:', response.data?.success);
      console.log('Response templates:', response.data?.templates);
      console.log('Templates length:', response.data?.templates?.length);
      
      if (response.data && response.data.success && response.data.templates && response.data.templates.length > 0) {
        console.log('✅ Setting templates from API:', response.data.templates.length);
        setTemplates(response.data.templates);
        setSelectedTemplate(response.data.templates[0]);
        toast.success(`Loaded ${response.data.templates.length} templates from API`);
        console.log('✅ Templates set successfully!');
      } else {
        console.error('❌ No templates in response or invalid response structure');
        console.error('Full response:', JSON.stringify(response.data, null, 2));
        toast.error('No templates found in API response');
      }
    } catch (error) {
      console.error('❌ Failed to load templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  const testAPICall = async () => {
    try {
      const response = await axios.get(`${FLYER_SERVICE_URL}/health`);
      console.log('Health check response:', response.data);
      toast.success('API is working!');
    } catch (error) {
      console.error('Health check failed:', error);
      toast.error('API health check failed');
    }
  };

  const enhanceText = async () => {
    if (!userText.trim()) return;

    setIsEnhancing(true);
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/ai/enhance-text`, {
        text: userText
      });

      if (response.data && response.data.success) {
        setEnhancedText(response.data.enhancedText);
        toast.success('Text enhanced successfully!');
      } else {
        toast.error('Failed to enhance text');
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast.error('Failed to enhance text');
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateFlyer = async () => {
    if (!selectedTemplate || !enhancedText.trim()) return;

    setIsGenerating(true);
    try {
      const response = await axios.post(`${FLYER_SERVICE_URL}/api/flyers/generate`, {
        templateId: selectedTemplate.id,
        content: enhancedText
      });

      if (response.data && response.data.success) {
        setFlyerData(response.data.flyer);
        toast.success('Flyer generated successfully!');
      } else {
        toast.error('Failed to generate flyer');
      }
    } catch (error) {
      console.error('Error generating flyer:', error);
      toast.error('Failed to generate flyer');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Flyer Generator</h1>
          <p className="text-gray-600">Create professional flyers with AI-powered text enhancement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Template Selection and Input */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-500 mb-4">Loading templates...</p>
                    <div className="space-y-2">
                      <Button onClick={loadTemplates} variant="outline" size="sm" className="w-full">
                        Retry Loading
                      </Button>
                      <Button onClick={testAPICall} variant="secondary" size="sm" className="w-full">
                        Test API Call
                      </Button>
                    </div>
                  </div>
                ) : templates.length > 0 ? (
                    <TemplateSelector
                      templates={templates}
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No templates available</p>
                    <div className="space-y-2">
                      <Button onClick={loadTemplates} variant="outline" size="sm" className="w-full">
                        Retry Loading
                      </Button>
                      <Button onClick={testAPICall} variant="secondary" size="sm" className="w-full">
                        Test API Call
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Text Input */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter property details
                    </label>
                    <textarea
                  value={userText}
                      onChange={(e) => setUserText(e.target.value)}
                      placeholder="Enter property details (e.g., address, price, features)"
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                  </div>
                  
                  <Button
                    onClick={enhanceText}
                    disabled={isEnhancing || !userText.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  >
                    {isEnhancing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Enhance with AI
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Text Display */}
            {enhancedText && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Enhanced Text</h3>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {enhancedText}
                    </pre>
                  </div>
                    <Button
                      onClick={generateFlyer}
                      disabled={isGenerating || !selectedTemplate}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Generate Flyer
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Flyer Editor */}
          <div className="space-y-6">
            {flyerData ? (
            <Card>
                <CardContent className="p-6">
                  <FlyerEditor flyerData={flyerData} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Generate</h3>
                    <p className="text-gray-500">
                      Select a template, enter your details, and generate your flyer
                    </p>
                  </div>
              </CardContent>
            </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
