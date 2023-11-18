"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Ring, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'

export default function PendulumClock({calls, state}:any) {
  const $cyl:any = useRef()
  // const imgTexture = useTexture("./textures/ccc.jpg")
  const [spins, s__spins] = useState(0); 


  useFrame(()=>{
    if (!$cyl.current) return
    if (!state.points) return

    const elapsedMilliseconds = Date.now() - state.startRotationTime;

    // const rotationAngle = (elapsedMilliseconds / 60000) * (2 * Math.PI);
    const moveAmount =  -(elapsedMilliseconds / 60000) + 0.5

    if (moveAmount > -0.5 && moveAmount < 0.5) {
      $cyl.current.position.z = moveAmount
    }
  })
  return <>

    {/* <Ring args={[0,.1,12]} rotation={[0,Math.PI/2,0]} position={[0.051,0,0]} castShadow receiveShadow>
    <meshStandardMaterial map={imgTexture} />    

    </Ring>
    
    <Cylinder args={[0.13,0.11,.1,12]} rotation={[0,0,Math.PI/2]} castShadow receiveShadow>
        <meshStandardMaterial color="black" />    
      </Cylinder> */}
      
      <Box args={[0.005,0.01,1]} position={[0,0.04,0]} rotation={[0,0,1]}>
      <meshStandardMaterial color="lightgrey" />    

      </Box>
    <group  ref={$cyl} position={[0,0.01,.5]}>
      <Box args={[0.01,0.05,0.05]} position={[0,0.03,0]}>
      <meshStandardMaterial color="grey" />    

      </Box>
      </group>
  </>
}