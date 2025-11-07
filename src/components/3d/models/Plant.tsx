import React, { forwardRef } from 'react';
import * as THREE from 'three';

const Plant = forwardRef((props: any, ref: any) => {
    const { color, ...rest } = props;
    return (
        <group {...rest} ref={ref} castShadow receiveShadow>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
            <meshStandardMaterial color={'#8B4513'} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color={new THREE.Color(color)} />
        </mesh>
        </group>
    );
});

Plant.displayName = 'Plant';

export default Plant;