import { Box } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function CandleKLineChart({
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
    const distanceBetweenCandles = cubeSize * 3; // Additional space for wicks
    const yRangeSize = yRange[1] - yRange[0];
    // const maxValue = Math.max(...fullArray.map((candle) => candle[2]));
    // const minValue = Math.min(...fullArray.map((candle) => candle[3]));
    // const minValue = minMaxValue[0]
    // const maxValue = minMaxValue[1]
    const minValue =  Math.min(...closingContextPrices)
    const maxValue =  Math.max(...closingContextPrices)

    let colors = new Float32Array(count * 3); // Create colors array dynamically
    
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
    
      // Create and position the candlestick body
      // const bodyHeight =
      //   ((fullArray[i][4] - fullArray[i][1]) /
      //     (maxValue - minValue)) *
      //   yRangeSize;
      // const bodyY = y + bodyHeight / 2;
      // temp.scale.set(cubeSize * scaleSize[0] / 3, bodyHeight, cubeSize * scaleSize[1] * 2);
      // temp.position.set(x / 3, bodyY, 0);
      // temp.updateMatrix();
      // refCandles.current.setMatrixAt(i, temp.matrix);
    
      // Create and position the wick
      const wickHeight =
        ((fullArray[i][2] - fullArray[i][3]) /
          (maxValue - minValue)) *
        yRangeSize;
      const wickY = y + wickHeight / 2;
      temp.scale.set(cubeSize * scaleSize[0] / 3, wickHeight, cubeSize * scaleSize[1]/2 * (i == 499 ? 10 : 1));
      temp.position.set(x / 3, wickY, 0);
      temp.updateMatrix();
      refCandles.current.setMatrixAt(i + count, temp.matrix);
    
      // Determine body and wick colors based on whether it closed higher or lower
      const currentClose = fullArray[i][4];
      const previousClose = fullArray[i][1];
      // const previousClose = i > 0 ? fullArray[i - 1][4] : currentClose;
    
      // const bodyColor = currentClose >= previousClose ? new THREE.Color(0xffaa33) : new THREE.Color(0x0099ff);
      const wickColor = currentClose < previousClose ? new THREE.Color(0x990000) : new THREE.Color(0x009900);
    
      // refCandles.current.setColorAt(i, bodyColor);
      refCandles.current.setColorAt(i + count, wickColor);
    }
    
    refCandles.current.instanceMatrix.needsUpdate = true;

    // Set the buffer attribute with the colors
    refCandles.current.geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(colors, 3)
    );
  }, [fullArray, yRange, closingContextPrices, chopStart]);

  return (<>
  {/* <Box></Box> */}
    <group position={[0, 0, 0]} visible={!!fullArray.length}>
      <instancedMesh ref={refCandles} args={[null, null, count * 2]} castShadow receiveShadow>
        <boxBufferGeometry />
        <meshStandardMaterial vertexColors={vertexColorsRefresher} />
      </instancedMesh>
    </group>
    </>);
}

export default CandleKLineChart;
