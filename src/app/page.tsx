'use client';

import { useState } from 'react';
import { RoomScene } from '@/components/3d/RoomScene';
import { ControlSidebar } from '@/components/sidebar/ControlSidebar';
import Bed from '@/components/3d/models/Bed';
import Chair from '@/components/3d/models/Chair';
import Table from '@/components/3d/models/Table';
import Plant from '@/components/3d/models/Plant';
import type { Furniture } from '@/types/furniture';
import type { Lighting } from '@/types/lighting';

const initialFurniture: Furniture[] = [
  { id: 'bed1', component: Bed, position: [-3, 0.5, 0], color: '#A3B1C6' },
  { id: 'table1', component: Table, position: [2, 0.4, 0], color: '#C9D4E4' },
  { id: 'chair1', component: Chair, position: [2, 0.5, 1], color: '#8F9AAA' },
  { id: 'chair2', component: Chair, position: [2, 0.5, -1], color: '#8F9AAA' },
  { id: 'plant1', component: Plant, position: [-4, 0, -4], color: '#6B8E23' },
];

export default function Home() {
  const [furniture, setFurniture] = useState<Furniture[]>(initialFurniture);
  const [selected, setSelected] = useState<string | null>(null);
  const [lighting, setLighting] = useState<Lighting>('Natural');

  const addFurniture = (type: string) => {
    const newId = `${type.toLowerCase()}${Date.now()}`;
    let newFurniture: Omit<Furniture, 'id'> | null = null;

    let position: [number, number, number] = [0, 0, 0];

    switch (type) {
      case 'Bed':
        position = [0, 0.5, 0];
        newFurniture = { component: Bed, position, color: '#A3B1C6' };
        break;
      case 'Chair':
        position = [0, 0.5, 0];
        newFurniture = { component: Chair, position, color: '#8F9AAA' };
        break;
      case 'Table':
        position = [0, 0.4, 0];
        newFurniture = { component: Table, position, color: '#C9D4E4' };
        break;
      case 'Plant':
         position = [0, 0, 0];
        newFurniture = { component: Plant, position, color: '#6B8E23' };
        break;
    }

    if (newFurniture) {
      setFurniture(prev => [...prev, { id: newId, ...newFurniture! }]);
    }
  };

  const updateFurniturePosition = (id: string, position: [number, number, number]) => {
    setFurniture(prev =>
      prev.map(item => (item.id === id ? { ...item, position } : item))
    );
  };

  const updateFurnitureColor = (id: string, color: string) => {
    setFurniture(prev =>
      prev.map(item => (item.id === id ? { ...item, color } : item))
    );
  };
  
  const selectedItem = furniture.find(item => item.id === selected) || null;

  return (
    <main className="flex h-full w-full">
      <div className="flex-grow h-full">
        <RoomScene
          furniture={furniture}
          selected={selected}
          setSelected={setSelected}
          onUpdatePosition={updateFurniturePosition}
          lighting={lighting}
        />
      </div>
      <aside className="w-[400px] h-full">
        <ControlSidebar
          onAddFurniture={addFurniture}
          onUpdateColor={updateFurnitureColor}
          selectedItem={selectedItem}
          onSetLighting={setLighting}
          currentLighting={lighting}
        />
      </aside>
    </main>
  );
}
