'use client';

import { Suspense, useRef, useEffect, useMemo, Fragment } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, Environment } from '@react-three/drei';
import Loader from './Loader';
import * as THREE from 'three';
import type { Furniture } from '@/types/furniture';
import type { Lighting } from '@/types/lighting';

interface RoomSceneProps {
  furniture: Furniture[];
  selected: string | null;
  setSelected: (id: string | null) => void;
  onUpdatePosition: (id: string, position: [number, number, number]) => void;
  lighting: Lighting;
}

const LightingSetup = ({ type }: { type: Lighting }) => {
  const lightRef = useRef<any>();

  useEffect(() => {
    if (lightRef.current && lightRef.current.target) {
        lightRef.current.target.position.set(0, 0, 0);
        lightRef.current.target.updateMatrixWorld();
    }
  }, [type]);

  const lightingOptions = {
    Warm: <ambientLight intensity={1.5} color="#FFDAB9" />,
    Cool: <ambientLight intensity={1.5} color="#E0FFFF" />,
    Natural: (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight 
                position={[5, 10, 7.5]} 
                intensity={1.2} 
                castShadow 
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-bias={-0.0005}
            />
            <directionalLight position={[-5, 5, -5]} intensity={0.3} />
        </>
    ),
    Backlight: (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 3, -5]} intensity={1.5} castShadow />
      </>
    ),
    Spotlight: (
      <>
        <ambientLight intensity={0.4} />
        <spotLight
          ref={lightRef}
          position={[5, 5, 5]}
          angle={0.4}
          penumbra={0.2}
          intensity={5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      </>
    ),
  };
  
  return lightingOptions[type] || <Fragment />;
};

const SceneContent = ({ furniture, selected, setSelected, onUpdatePosition, lighting }: RoomSceneProps) => {
  const controlsRef = useRef<any>(null);
  const sceneObjects = useMemo(() => new Map<string, THREE.Object3D>(), []);

  const selectedObject = selected ? sceneObjects.get(selected) : undefined;
  
  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      const onDragEnd = () => {
        if (selected && controls.object) {
          const { x, y, z } = controls.object.position;
          onUpdatePosition(selected, [x, y, z]);
        }
      };

      const onDraggingChanged = (event: any) => {
        if (!event.value) {
          onDragEnd();
        }
      };

      controls.addEventListener('dragging-changed', onDraggingChanged);
      return () => {
        controls.removeEventListener('dragging-changed', onDraggingChanged);
      };
    }
  }, [selected, onUpdatePosition, sceneObjects]);

  return (
    <>
      <LightingSetup type={lighting} />
      <Environment preset="sunset" />
        
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        onClick={() => setSelected(null)}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      {/* Walls */}
      <mesh position={[-5, 2.5, 0]} onClick={() => setSelected(null)} receiveShadow>
        <boxGeometry args={[0.1, 5, 10]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>
      <mesh position={[0, 2.5, -5]} onClick={() => setSelected(null)} receiveShadow>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {furniture.map(({ id, component: Component, position, color }) => (
        <Component
          key={id}
          ref={(el: THREE.Object3D) => {
            if (el) sceneObjects.set(id, el);
            else sceneObjects.delete(id);
          }}
          position={position}
          color={color}
          onClick={(e: any) => {
            e.stopPropagation();
            setSelected(id);
          }}
          castShadow
          receiveShadow
        />
      ))}

      {selectedObject && (
        <TransformControls ref={controlsRef} object={selectedObject} showY={false} mode="translate" />
      )}
      <OrbitControls makeDefault enabled={!selected} />
    </>
  );
};


const RoomScene = (props: RoomSceneProps) => {
  return (
    <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 5, 5] }}>
      <Suspense fallback={<Loader />}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
};

export { RoomScene };
