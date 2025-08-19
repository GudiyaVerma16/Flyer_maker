'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, Text, Image } from 'fabric';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Save, Palette, RotateCcw } from 'lucide-react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

export default function FlyerEditor({ flyerData, onSave }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
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

    setIsLoading(false);

    return () => {
      canvas.dispose();
    };
  }, [flyerData]);

  const createFlyerContent = (canvas, data) => {
    // Set background
    if (data.backgroundImage) {
      console.log('Loading background image:', data.backgroundImage);
      
      // Create a new image element to preload
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        console.log('Background image loaded successfully');
        const fabricImage = new Image(img, {
          left: 0,
          top: 0,
          scaleX: data.width / img.width,
          scaleY: data.height / img.height
        });
        canvas.backgroundImage = fabricImage;
        canvas.renderAll();
      };
      
      img.onerror = (error) => {
        console.error('Failed to load background image:', error);
        console.log('Falling back to background color:', data.backgroundColor);
        canvas.backgroundColor = data.backgroundColor;
        canvas.renderAll();
      };
      
      img.src = data.backgroundImage;
    } else {
      console.log('No background image, using color:', data.backgroundColor);
      canvas.backgroundColor = data.backgroundColor;
      canvas.renderAll();
    }

    const layout = data.layout;
    const content = data.content;

    console.log('Creating flyer content:', { layout, content });

    // Add header (main title)
    if (content.header && layout.header) {
      const header = new Text(content.header, {
        left: layout.header.x,
        top: layout.header.y,
        width: layout.header.width,
        fontSize: layout.header.fontSize,
        fontWeight: layout.header.fontWeight,
        fill: layout.header.color || data.textColor,
        textAlign: layout.header.textAlign,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(header);
      console.log('Added header:', content.header);
    }

    // Add company name (for real estate templates)
    if (content.companyName && layout.companyName) {
      const companyName = new Text(content.companyName, {
        left: layout.companyName.x,
        top: layout.companyName.y,
        width: layout.companyName.width,
        fontSize: layout.companyName.fontSize,
        fontWeight: layout.companyName.fontWeight,
        fill: layout.companyName.color || data.accentColor,
        textAlign: layout.companyName.textAlign,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(companyName);
      console.log('Added company name:', content.companyName);
    }

    // Add description
    if (content.description && layout.description) {
      const description = new Text(content.description, {
        left: layout.description.x,
        top: layout.description.y,
        width: layout.description.width,
        fontSize: layout.description.fontSize,
        fill: layout.description.color || data.textColor,
        lineHeight: layout.description.lineHeight,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(description);
      console.log('Added description:', content.description);
    }

    // Add highlights/property features
    if (content.highlights && content.highlights.length > 0) {
      const highlightsText = content.highlights.join('\n');
      const highlightsLayout = layout.propertyFeatures || layout.highlights || layout.features;
      
      if (highlightsLayout) {
        const highlights = new Text(highlightsText, {
          left: highlightsLayout.x,
          top: highlightsLayout.y,
          width: highlightsLayout.width,
          fontSize: highlightsLayout.fontSize,
          fill: highlightsLayout.color || data.textColor,
          lineHeight: highlightsLayout.lineHeight,
          fontFamily: 'Arial, sans-serif'
        });
        canvas.add(highlights);
        console.log('Added highlights:', highlightsText);
      }
    }

    // Add location
    if (content.location) {
      const locationLayout = layout.location || layout.contactInfo;
      if (locationLayout) {
        const location = new Text(content.location, {
          left: locationLayout.x,
          top: locationLayout.y,
          width: locationLayout.width,
          fontSize: locationLayout.fontSize,
          fontWeight: locationLayout.fontWeight,
          fill: locationLayout.color || data.textColor,
          textAlign: locationLayout.textAlign,
          fontFamily: 'Arial, sans-serif'
        });
        canvas.add(location);
        console.log('Added location:', content.location);
      }
    }

    // Add CTA
    if (content.cta && layout.cta) {
      const cta = new Text(content.cta, {
        left: layout.cta.x,
        top: layout.cta.y,
        width: layout.cta.width,
        fontSize: layout.cta.fontSize,
        fontWeight: layout.cta.fontWeight,
        fill: layout.cta.color || data.accentColor,
        textAlign: layout.cta.textAlign,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(cta);
      console.log('Added CTA:', content.cta);
    }

    // Add about us section (for interior design template)
    if (content.aboutUs && layout.aboutUs) {
      const aboutUs = new Text(content.aboutUs, {
        left: layout.aboutUs.x,
        top: layout.aboutUs.y,
        width: layout.aboutUs.width,
        fontSize: layout.aboutUs.fontSize,
        fill: layout.aboutUs.color || data.textColor,
        lineHeight: layout.aboutUs.lineHeight,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(aboutUs);
      console.log('Added about us:', content.aboutUs);
    }

    // Add services section (for interior design template)
    if (content.services && layout.services) {
      const services = new Text(content.services, {
        left: layout.services.x,
        top: layout.services.y,
        width: layout.services.width,
        fontSize: layout.services.fontSize,
        fill: layout.services.color || data.textColor,
        lineHeight: layout.services.lineHeight,
        fontFamily: 'Arial, sans-serif'
      });
      canvas.add(services);
      console.log('Added services:', content.services);
    }

    canvas.renderAll();
    console.log('Flyer content created successfully');
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

      {/* Instructions */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Download Options:</strong></p>
            <p>• Download your flyer as PNG for web use</p>
            <p>• Download as PDF for printing</p>
            <p>• Reset layout to restore original positioning</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 