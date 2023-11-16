"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, Sphere, Torus, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getFuturesPricesList, getCurrentPrices, getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'
import CandleKLineChart from "@/model/tools/charts/CandleKLineChart"
import CloseupCandleKLineChart from "@/model/tools/charts/CloseupCandleKLineChart"
import SimCardSlot from "@/model/mix/SimCardSlot"
import * as THREE from 'three'
import { FollowFontText } from "../text/FollowText";
import { ParticleEmitter } from '@/model/tools/ParticleEmitter'
export default function ShadowImage({sceneState, sceneCalls,bounceMsg,  ...props}: any) {
    const texture = useLoader(THREE.TextureLoader, "../textures/shad.png")
    const { scene: biglandscape01 } = useGLTF('../models/biglandscape.glb')
    // const { scene: objScene_landscape1 } = useGLTF('../models/landscape01.glb')
    // const { scene: objScene_landscape2 } = useGLTF('../models/landscape02.glb')


  return (<>
  
  {/* <Plane>
    <meshStandardMaterial map={texture} />
    </Plane> */}
    
    
    {/* <group scale={[1,1,1]} position={[0,1,0]}>

<primitive object={objScene_landscape1} children-0-material-wireframe={true} 
children-0-material-color={"#666666"} 
  
/>
</group> */}
 
 {/* <group position={[0, 6, 0]} rotation={[Math.PI/2, 0, 0]}>
          <ParticleEmitter radius={1.5} lineWidthStrip={0.03} />
        </group> */}
<group scale={[1,1,1]} position={[0,-2.25,-0.32]}>

<primitive object={biglandscape01} children-0-material-wireframe={true} 
children-0-material-emissive={"#222222"} 
children-0-material-color={"#000000"} 

/>
</group>
<Torus args={[4.5,3.3,24,48]} rotation={[Math.PI/2,0,0]} position={[0,-1.17,-0.32]}>
  <meshBasicMaterial color="#000000" />
</Torus>
    {/* <group scale={[4,4,4]} position={[0,-10,0]}>

    <primitive object={biglandscape} children-0-material-wireframe={true} 
children-0-material-color={"#bbb"} 
  
/>
</group> */}
<group position={[0,3.75,0]}>
        <FollowFontText>
            {bounceMsg}
        </FollowFontText>
    </group>
  {/* <group position={[0,-5,0]} scale={[1,0.6,1]}>
    
    <Torus args={[20,18,18,32]} rotation={[Math.PI/2,0,0]}>
        <meshStandardMaterial wireframe={true} color={"#666666"} />

    </Torus>
  </group> */}
  
  {/* <group position={[0,4,0]}>
<Cylinder castShadow receiveShadow args={[3.75, 1,]} >
  <meshStandardMaterial wireframe={true} color={"#666666"} />
</Cylinder>
  </group >
  
  <group position={[0,0.5,0]}>
<Cylinder castShadow receiveShadow args={[1, 3.75,]} >
  <meshStandardMaterial wireframe={true} color={"#666666"} />
</Cylinder>
  </group > */}
  </>)
}
