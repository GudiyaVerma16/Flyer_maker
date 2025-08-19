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

const AI_SERVICE_URL = 'http://localhost:5002';
const FLYER_SERVICE_URL = 'http://localhost:5003';

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
      console.error('Error details:', error.response?.status, error.response?.data);
      toast.error(`Failed to load templates: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load templates on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  // Monitor templates state changes
  useEffect(() => {
    console.log('Templates state updated:', templates.length, 'templates');
    if (templates.length > 0) {
      console.log('First template:', templates[0].name);
    }
  }, [templates]);

  // Monitor selected template changes
  useEffect(() => {
    if (selectedTemplate) {
      console.log('Selected template:', selectedTemplate.name);
    }
  }, [selectedTemplate]);

  const testAPICall = async () => {
    console.log('=== MANUAL API TEST ===');
    try {
      const response = await axios.get('http://localhost:5003/api/flyers/templates');
      console.log('Manual test - Response:', response.data);
      alert(`API Test Success: Found ${response.data.templates?.length} templates`);
    } catch (error) {
      console.error('Manual test failed:', error);
      alert(`API Test Failed: ${error.message}`);
    }
  };

  const enhanceText = async () => {
    if (!userText.trim()) {
      toast.error('Please enter some text to enhance');
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/ai/enhance-text`, {
        text: userText,
        template: selectedTemplate?.id
      });

      if (response.data.success) {
        setEnhancedText(response.data.enhancedText);
        toast.success('Text enhanced successfully!');
      } else {
        toast.error('Failed to enhance text');
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast.error('Failed to enhance text. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateFlyer = async () => {
    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }

    if (!enhancedText.trim()) {
      toast.error('Please enhance your text first');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post(`${FLYER_SERVICE_URL}/api/flyers/generate`, {
        templateId: selectedTemplate.id,
        content: enhancedText
      });

      if (response.data.success) {
        setFlyerData(response.data.flyer);
        toast.success('Flyer generated successfully!');
      } else {
        toast.error('Failed to generate flyer');
      }
    } catch (error) {
      console.error('Error generating flyer:', error);
      toast.error('Failed to generate flyer. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setUserText('');
    setEnhancedText('');
    setFlyerData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Flyer Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create stunning flyers with AI-powered text enhancement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Step 1: Choose Template
                </CardTitle>
                <CardDescription>
                  Select a flyer template that matches your style
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-500 mb-4">Loading templates from API...</p>
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
                  <div>
                    <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded text-sm">
                      ✅ Loaded {templates.length} templates from API
                    </div>
                    <TemplateSelector
                      templates={templates}
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                  </div>
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
              <CardHeader>
                <CardTitle>Step 2: Enter Your Text</CardTitle>
                <CardDescription>
                  Describe your property or service in simple terms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TextInput
                  value={userText}
                  onChange={setUserText}
                  placeholder="Example: Beautiful large 3 bedroom, and swimming pool, 3400 sq ft, home for sale at Albany 12034"
                />
                <div className="mt-4">
                  <Button
                    onClick={enhanceText}
                    disabled={isEnhancing || !userText.trim()}
                    className="w-full"
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
                <CardHeader>
                  <CardTitle>Step 3: Enhanced Text</CardTitle>
                  <CardDescription>
                    Review and edit the AI-enhanced content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {enhancedText}
                    </pre>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={generateFlyer}
                      disabled={isGenerating}
                      className="flex-1"
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
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Flyer Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Flyer Editor</CardTitle>
                <CardDescription>
                  Customize your flyer with the interactive editor
                </CardDescription>
              </CardHeader>
              <CardContent>
                {flyerData ? (
                  <FlyerEditor
                    flyerData={flyerData}
                    onSave={(data) => {
                      setFlyerData(data);
                      toast.success('Flyer saved successfully!');
                    }}
                  />
                ) : (
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Generate a flyer to start editing</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>1.</strong> Select a template from the available options</p>
              <p><strong>2.</strong> Enter your property description (e.g., "Beautiful large 3 bedroom, and swimming pool, 3400 sq ft, home for sale at Albany 12034")</p>
              <p><strong>3.</strong> Click "Enhance with AI" to generate professional content</p>
              <p><strong>4.</strong> Click "Generate Flyer" to create your flyer</p>
              <p><strong>5.</strong> Use the editor to customize text, colors, and layout</p>
              <p><strong>6.</strong> Download your finished flyer</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 