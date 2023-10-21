"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Ring, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'

export default function SyncedClock({calls, state}:any) {
  const $cyl:any = useRef()
  const imgTexture = useTexture("./textures/ccc.jpg")
  const [spins, s__spins] = useState(0); 


  useFrame(()=>{
    if (!$cyl.current) return
    if (!state.points) return

    const elapsedMilliseconds = Date.now() - state.startRotationTime;

    const rotationAngle = (elapsedMilliseconds / 60000) * (2 * Math.PI);


    $cyl.current.rotation.x = -rotationAngle;
  })
  return <>

    <Ring args={[0,.1,8]} rotation={[0,Math.PI/2,0]} position={[0.051,0,0]} castShadow receiveShadow>
    <meshStandardMaterial map={imgTexture} />    

    </Ring>
    
    <Cylinder args={[0.2,0.11,.1,8]} rotation={[0,0,Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="lightgrey" />    
      </Cylinder>
    <group  ref={$cyl} position={[0,0.01,0]}>
      <Box args={[0.11,0.14,0.015]} position={[0,0.06,0]}>
      <meshStandardMaterial color="grey" />    

      </Box>
      </group>
  </>
}