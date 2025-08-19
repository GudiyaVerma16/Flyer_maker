'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

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
    <div className="grid grid-cols-1 gap-3">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedTemplate?.id === template.id
              ? 'ring-2 ring-blue-500 bg-blue-50'
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onSelectTemplate(template)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  {selectedTemplate?.id === template.id && (
                    <Check className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {template.width} × {template.height}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {template.backgroundColor}
                  </Badge>
                </div>
              </div>
              <div className="ml-4">
                <div
                  className="w-16 h-20 rounded border-2 border-gray-200"
                  style={{
                    backgroundColor: template.backgroundColor,
                    position: 'relative'
                  }}
                >
                  {/* Preview of template layout */}
                  <div className="absolute inset-1 space-y-1">
                    <div
                      className="h-2 rounded"
                      style={{ backgroundColor: template.accentColor }}
                    />
                    <div className="space-y-0.5">
                      <div
                        className="h-1 rounded"
                        style={{ backgroundColor: template.textColor, opacity: 0.3 }}
                      />
                      <div
                        className="h-1 rounded w-3/4"
                        style={{ backgroundColor: template.textColor, opacity: 0.2 }}
                      />
                    </div>
                    <div
                      className="h-1.5 rounded"
                      style={{ backgroundColor: template.accentColor, opacity: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 