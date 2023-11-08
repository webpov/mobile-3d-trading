"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Plane, OrbitControls, Ring, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'

export default function CircuitContainer({...props}) {

    const circuitTexture = useTexture("./textures/circuit.jpeg")

return (
    <group rotation={[0,0,0]} {...props}>
    <group rotation={[0,Math.PI/2,0]}>

<Plane position={[0,-.3,-0.348]} args={[.714,0.535]} > 
  <meshStandardMaterial  map={circuitTexture} />
</Plane>
    </group>
  <Box args={[0.5,.88,1.36]} position={[-0.242,-0.44,0]} castShadow receiveShadow>
    <meshStandardMaterial color="grey" transparent={true} opacity={.5} />    

    </Box>
    </group>
)
}