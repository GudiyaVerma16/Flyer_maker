'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, Text } from 'fabric';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Save, Type, Palette, RotateCcw } from 'lucide-react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

export default function FlyerEditor({ flyerData, onSave }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!flyerData) return;

    const canvas = new Canvas(canvasRef.current, {
      width: flyerData.width,
      height: flyerData.height,
      backgroundColor: flyerData.backgroundColor
    });

    fabricCanvasRef.current = canvas;

    // Create flyer content
    createFlyerContent(canvas, flyerData);

    // Handle object selection
    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', () => setSelectedObject(null));

    setIsLoading(false);

    return () => {
      canvas.dispose();
    };
  }, [flyerData]);

  const createFlyerContent = (canvas, data) => {
    const { layout, content } = data;

    // Clear existing content
    canvas.clear();

    // Add header
    if (content.header) {
      const header = new Text(content.header, {
        left: layout.header.x,
        top: layout.header.y,
        width: layout.header.width,
        fontSize: layout.header.fontSize,
        fontWeight: layout.header.fontWeight,
        fill: data.textColor,
        textAlign: layout.header.textAlign,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(header);
    }

    // Add highlights
    if (content.highlights && content.highlights.length > 0) {
      const highlightsText = content.highlights.join('\n');
      const highlights = new Text(highlightsText, {
        left: layout.highlights.x,
        top: layout.highlights.y,
        width: layout.highlights.width,
        fontSize: layout.highlights.fontSize,
        fill: data.textColor,
        lineHeight: layout.highlights.lineHeight,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(highlights);
    }

    // Add location
    if (content.location) {
      const location = new Text(content.location, {
        left: layout.location.x,
        top: layout.location.y,
        width: layout.location.width,
        fontSize: layout.location.fontSize,
        fontWeight: layout.location.fontWeight,
        fill: data.textColor,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(location);
    }

    // Add CTA
    if (content.cta) {
      const cta = new Text(content.cta, {
        left: layout.cta.x,
        top: layout.cta.y,
        width: layout.cta.width,
        fontSize: layout.cta.fontSize,
        fontWeight: layout.cta.fontWeight,
        fill: data.accentColor,
        textAlign: layout.cta.textAlign,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(cta);
    }

    canvas.renderAll();
  };

  const handleSelection = (e) => {
    const activeObject = e.selected?.[0];
    if (activeObject && activeObject.type === 'text') {
      setSelectedObject(activeObject);
      setFontSize(activeObject.fontSize || 16);
      setTextColor(activeObject.fill || '#000000');
    }
  };

  const updateSelectedText = (property, value) => {
    if (!selectedObject) return;

    selectedObject.set(property, value);
    fabricCanvasRef.current.renderAll();
    onSave(flyerData);
  };

  const downloadAsPNG = () => {
    if (!fabricCanvasRef.current) return;

    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1
    });

    const link = document.createElement('a');
    link.download = `flyer-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  };

  const downloadAsPDF = () => {
    if (!fabricCanvasRef.current) return;

    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1
    });

    const pdf = new jsPDF({
      orientation: flyerData.width > flyerData.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [flyerData.width, flyerData.height]
    });

    pdf.addImage(dataURL, 'PNG', 0, 0, flyerData.width, flyerData.height);
    pdf.save(`flyer-${Date.now()}.pdf`);
  };

  const resetCanvas = () => {
    if (fabricCanvasRef.current && flyerData) {
      createFlyerContent(fabricCanvasRef.current, flyerData);
      setSelectedObject(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Canvas Container */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="block mx-auto"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Text Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Type className="h-4 w-4" />
              Text Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Slider
                id="font-size"
                min={8}
                max={72}
                step={1}
                value={[fontSize]}
                onValueChange={([value]) => {
                  setFontSize(value);
                  updateSelectedText('fontSize', value);
                }}
                disabled={!selectedObject}
              />
              <div className="text-xs text-gray-500">{fontSize}px</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  updateSelectedText('fill', e.target.value);
                }}
                disabled={!selectedObject}
                className="h-10"
              />
            </div>

            <div className="text-xs text-gray-500">
              {selectedObject ? 'Click and drag text to move it' : 'Select text to edit'}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Palette className="h-4 w-4" />
              Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={downloadAsPNG}
              className="w-full"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PNG
            </Button>
            
            <Button
              onClick={downloadAsPDF}
              className="w-full"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>

            <Button
              onClick={resetCanvas}
              className="w-full"
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Layout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Editing Tips:</strong></p>
            <p>• Click on any text to select and edit it</p>
            <p>• Drag text to reposition it</p>
            <p>• Use the controls above to change font size and color</p>
            <p>• Download your flyer as PNG or PDF</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 