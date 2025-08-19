'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function TextInput({ value, onChange, placeholder }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="property-description">Property Description</Label>
      <Textarea
        id="property-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] resize-none"
        maxLength={500}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Describe your property in simple terms</span>
        <span>{value.length}/500</span>
      </div>
    </div>
  );
} 