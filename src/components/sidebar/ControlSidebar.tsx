'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FurniturePanel } from './FurniturePanel';
import { LightingPanel } from './LightingPanel';
import type { Furniture } from '@/types/furniture';
import type { Lighting } from '@/types/lighting';

interface ControlSidebarProps {
  onAddFurniture: (type: string) => void;
  onUpdateColor: (id: string, color: string) => void;
  selectedItem: Furniture | null;
  onSetLighting: (type: Lighting) => void;
  currentLighting: Lighting;
}

export const ControlSidebar = ({ 
  onAddFurniture, 
  onUpdateColor, 
  selectedItem, 
  onSetLighting, 
  currentLighting,
}: ControlSidebarProps) => {
  return (
    <Card className="h-full w-full max-w-sm rounded-none border-0 border-l">
      <CardHeader>
        <CardTitle>Room Customization</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="furniture" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="furniture">Furniture</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
          </TabsList>
          <TabsContent value="furniture">
            <FurniturePanel 
              onAddFurniture={onAddFurniture}
              onUpdateColor={onUpdateColor}
              selectedItem={selectedItem}
            />
          </TabsContent>
          <TabsContent value="lighting">
            <LightingPanel onSetLighting={onSetLighting} currentLighting={currentLighting} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
