"use client"
import { useGLTF } from "@react-three/drei";

export default function WormHoleModel({sceneState, sceneCalls,  ...props}: any) {
  const { scene: biglandscape01 } = useGLTF('../models/wormhole.glb')
  return (<>
    <group scale={[1,1,1]} position={[0,4,0]}>
      <primitive object={biglandscape01} children-0-material-wireframe={true} 
        children-0-material-emissive={"#222222"} 
        children-0-material-color={"#000000"} 
      />
    </group>
  </>)
}
