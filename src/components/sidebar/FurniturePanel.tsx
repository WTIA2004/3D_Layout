'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Furniture } from '@/types/furniture';

interface FurniturePanelProps {
  onAddFurniture: (type: string) => void;
  onUpdateColor: (id: string, color: string) => void;
  selectedItem: Furniture | null;
}

const furnitureTypes = ['Bed', 'Chair', 'Table', 'Plant'];

export const FurniturePanel = ({ onAddFurniture, onUpdateColor, selectedItem }: FurniturePanelProps) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Furniture</CardTitle>
        <CardDescription>
          Add new items or select an item in the scene to modify it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block">Add Furniture</Label>
          <div className="grid grid-cols-2 gap-2">
            {furnitureTypes.map(type => (
              <Button key={type} variant="outline" onClick={() => onAddFurniture(type)}>
                Add {type}
              </Button>
            ))}
          </div>
        </div>

        {selectedItem && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium">Edit Selected Item</h4>
            <div>
              <Label htmlFor="color-picker">Color</Label>
              <Input
                id="color-picker"
                type="color"
                value={selectedItem.color}
                onChange={(e) => onUpdateColor(selectedItem.id, e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
