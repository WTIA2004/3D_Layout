import type { ComponentType } from 'react';

export interface Furniture {
  id: string;
  component: ComponentType<any>;
  position: [number, number, number];
  color: string;
}
