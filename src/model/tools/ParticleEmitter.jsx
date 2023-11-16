import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import Random from 'canvas-sketch-util/random';
import { MeshLineMaterial } from './MeshLine'
import { MeshLine } from './MeshLine'

extend({ MeshLineMaterial })
extend({ MeshLine })


const radiusVariance = () => Random.range(0.2, 1);

function SparkLine({ curve, width, color, speed }) {
  const material = useRef();

  useFrame(() => {
    material.current.uniforms.dashOffset.value -= speed;
  });

  return (
    <mesh>
      <meshLine attach="geometry" points={curve} />
      <meshLineMaterial
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.95}
      />
    </mesh>
  );
}

export function ParticleEmitter({ count = 3, colors =
  // {
  // malevolentIllusion:
  // [
  //   '#c06995',
  //   '#de77c7',
  //   '#df86df',
  //   '#d998ee',
  //   '#ceadf4',
  //   '#c6bff9',
  // ]
  // ,
  // sunnyRainbow:
  // [
  //   '#fbe555',
  //   '#fb9224',
  //   '#f45905',
  //   '#be8abf',
  //   '#ffeed0',
  //   '#feff89',
  // ]
  [
    '#fbe555',
    '#fb9224',
    '#f45905',
    '#d998ee',
    '#ceadf4',
    '#c6bff9',
  ]
  // ,
// }
, radius = 0.3, lineWidthStrip = 0.001 }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, index) => {
        const pos = new THREE.Vector3(
          Math.sin(0) * radius * radiusVariance(),
          Math.cos(0) * radius * radiusVariance(),
          Math.sin(0) * Math.cos(0) * radius * radiusVariance()
        );
        const points = new Array(30).fill().map((_, index) => {
          const angle = (index / 20) * Math.PI * 2;

          return pos
            .add(
              new THREE.Vector3(
                Math.sin(angle) * radius * radiusVariance(),
                Math.cos(angle) * radius * radiusVariance(),
                Math.sin(angle) * Math.cos(angle) * radius * radiusVariance()
              )
            )
            .clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: colors[parseInt(colors.length * Math.random(), 10)],
          width: Math.max(lineWidthStrip, (0.002 * index) / 10),
          speed: Math.max(0.001, 0.0004 * Math.random()),
          curve,
        };
      }),
    [count, colors, radius]
  );

  return (
    <group position={[-radius * 2, -radius, 0]} scale={[1, 1.3, 1]}>
      {lines.map((props, index) => (
        <SparkLine key={index} {...props} />
      ))}
    </group>
  );
}