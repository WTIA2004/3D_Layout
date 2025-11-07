import React, { forwardRef } from 'react';
import * as THREE from 'three';

const Table = forwardRef((props: any, ref: any) => {
  const { color, ...rest } = props;
  return (
    <mesh {...rest} ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1.5, 0.8, 0.8]} />
      <meshStandardMaterial color={new THREE.Color(color)} />
    </mesh>
  );
});

Table.displayName = 'Table';

export default Table;