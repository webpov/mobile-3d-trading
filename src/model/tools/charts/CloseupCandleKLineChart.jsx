import { Box } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function CloseupCandleKLineChart({
  chopStart = 490,
  count = 500,
  temp = new THREE.Object3D(),
  fullArray = [],
  yRange = [0, 1],
  scaleSize = [1, 1, 1],
  cubeSize = 0.02,
  closingContextPrices = [],
}) {
  const refCandles = useRef(null);
  const [vertexColorsRefresher, s__vertexColorsRefresher] = useState(false);

  
  useEffect(() => {
    const distanceBetweenCandles = cubeSize * 3; 
    const yRangeSize = yRange[1] - yRange[0];
    const minValue =  Math.min(...closingContextPrices)
    const maxValue =  Math.max(...closingContextPrices)

    let colors = new Float32Array(count * 3); 
    
    for (let i = chopStart; i < count; i++) {
      const scaleValues = [
        cubeSize * scaleSize[0],
        cubeSize * scaleSize[1],
        cubeSize * scaleSize[2],
      ];
      temp.scale.set(...scaleValues);
      const x = i * (distanceBetweenCandles / 2);
      const y =
        ((fullArray[i][3] - minValue) * yRangeSize) /
          (maxValue - minValue) +
        yRange[0];
    
      const candleBodyHeight =
        ((fullArray[i][2] - fullArray[i][3]) /
          (maxValue - minValue)) *
        yRangeSize;
      const candleY = y + candleBodyHeight / 2;
      temp.scale.set(cubeSize * scaleSize[0] / 3, candleBodyHeight, cubeSize * scaleSize[1]/2 * (i == 499 ? 10 : 1));
      temp.position.set(x / 3, candleY, 0);
      temp.updateMatrix();
      refCandles.current.setMatrixAt(i + count, temp.matrix);
    
      const currentClose = fullArray[i][4];
      const previousClose = fullArray[i][1];
    
      const candleColor = currentClose < previousClose ? new THREE.Color(0x990000) : new THREE.Color(0x009900);
    
      refCandles.current.setColorAt(i + count, candleColor);
    }
    refCandles.current.instanceMatrix.needsUpdate = true;

    refCandles.current.geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(colors, 3)
    );
  }, [fullArray, closingContextPrices, chopStart]);

  

  return (<>
    <group position={[0, 0, 0]} visible={!!fullArray.length}>
      <instancedMesh ref={refCandles} args={[null, null, count * 2]} castShadow receiveShadow>
        <boxBufferGeometry />
        <meshStandardMaterial vertexColors={vertexColorsRefresher} />
      </instancedMesh>
    </group>
    </>);
}

export default CloseupCandleKLineChart;
