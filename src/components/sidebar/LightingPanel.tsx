
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Lighting } from '@/types/lighting';

interface LightingPanelProps {
    onSetLighting: (type: Lighting) => void;
    currentLighting: Lighting;
}

const lightingTypes: Lighting[] = ['Natural', 'Warm', 'Cool', 'Spotlight', 'Backlight'];

export const LightingPanel = ({ onSetLighting, currentLighting }: LightingPanelProps) => {
    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Lighting</CardTitle>
                <CardDescription>
                    Adjust the lighting in the room.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
                {lightingTypes.map(type => (
                    <Button
                        key={type}
                        variant={currentLighting === type ? 'default' : 'outline'}
                        onClick={() => onSetLighting(type)}
                    >
                        {type}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};
