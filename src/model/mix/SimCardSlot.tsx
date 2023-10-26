import React, { useRef, forwardRef } from "react";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SimCardSlot = forwardRef((props:any, ref) => {
  const $textGroup:any = useRef();

  useFrame((ctx, delta) => {
    if (!$textGroup.current) return;
    $textGroup.current.position.y = Math.sin(Date.now() / 500) / 50;
    $textGroup.current.rotation.x += 0.01;
    $textGroup.current.rotation.y += 0.019;
  });

  return (
    <>
      <Sphere args={[0.1, 6, 6]} scale={[1, 0.5, 1]}>
        <meshStandardMaterial color="lightgrey" />
      </Sphere>

      {!props.sceneState.isBuyOrderLoading &&
        <pointLight  args={[0xff9900, 1, .8]} position={[0.05, .7, 0]}  />
      }
      <group position={[0, 0.25, 0]}>
        <group ref={$textGroup}>
          <Sphere args={[0.075, 6, 6]} scale={[0.8, 1.15, 1]} onClick={()=>alert("Funds: "+props.sceneState.buyScore)}>
          <meshStandardMaterial color="#ffdda0" emissive={!props.sceneState.isBuyOrderLoading && props.sceneState.buyScore > 0 ? "#ff9900" : "#000"} />
            {/* <meshStandardMaterial color="lightgrey" /> */}
          </Sphere>
        </group>
      </group>
    </>
  );
});
SimCardSlot.displayName = "SimCardSlot"
export default SimCardSlot;
