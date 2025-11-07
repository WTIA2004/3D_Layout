import React, { forwardRef } from 'react';
import * as THREE from 'three';

const Chair = forwardRef((props: any, ref: any) => {
  const { color, ...rest } = props;
  return (
    <mesh {...rest} ref={ref} castShadow receiveShadow>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color={new THREE.Color(color)} />
    </mesh>
  );
});

Chair.displayName = 'Chair';

export default Chair;