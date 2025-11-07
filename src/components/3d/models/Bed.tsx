import React, { forwardRef } from 'react';
import * as THREE from 'three';

const Bed = forwardRef((props: any, ref: any) => {
  const { color, ...rest } = props;
  return (
    <mesh {...rest} ref={ref} castShadow receiveShadow>
      <boxGeometry args={[2, 1, 1.5]} />
      <meshStandardMaterial color={new THREE.Color(color)} /> 
    </mesh>
  );
});

Bed.displayName = 'Bed';

export default Bed;