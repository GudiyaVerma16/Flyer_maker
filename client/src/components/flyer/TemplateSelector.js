'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, MoreVertical } from 'lucide-react';

export default function TemplateSelector({ templates, selectedTemplate, onSelectTemplate }) {
  if (!templates || templates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        Loading templates...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-6">Select a Template</h2>
      
      <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedTemplate?.id === template.id
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onSelectTemplate(template)}
        >
            <CardContent className="p-0 overflow-hidden">
              {/* Template Preview */}
              <div className="relative">
                <div 
                  className="w-full h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${template.backgroundImage || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'})`,
                    backgroundColor: template.backgroundColor
                  }}
                >
                  {/* Overlay for text content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
                    {/* Header text */}
                    <div className="absolute top-4 left-4 right-4">
                    <div
                        className="text-white font-bold text-lg mb-1"
                        style={{ color: template.textColor }}
                      >
                        {template.name === 'House For Sale' ? 'HOUSE FOR SALE' : 
                         template.name === 'Modern Home For Sale' ? 'MODERN HOME For Sale' :
                         template.name === 'Luxury Modern Home' ? 'MODERN HOME For Sale' :
                         template.name}
                      </div>
                      
                      {template.name === 'House For Sale' && (
                        <div className="text-yellow-400 font-semibold text-sm">
                          Liseria & Co. Real Estate
                        </div>
                      )}
                    </div>

                    {/* Property features for real estate templates */}
                    {(template.name.includes('House') || template.name.includes('Home')) && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white text-xs space-y-1">
                          <div>• 3 Bedrooms • 2 Bathrooms</div>
                          <div>• Living Area • Modern Kitchen</div>
                          <div>• Swimming Pool • Storage</div>
                        </div>
                      </div>
                    )}

                    {/* Interior design content */}
                    {template.name === 'Crafting Dream Spaces' && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white text-xs space-y-1">
                          <div>• Kitchen Room • Office Room</div>
                          <div>• Living Room • Lobby</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action icons */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <MoreVertical className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedTemplate?.id === template.id && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Template info */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
                </div>
                <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {template.width} × {template.height}
                  </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
} 