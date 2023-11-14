"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Plane, OrbitControls, Ring, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'
import { stopPropagation } from "../level/SceneWrapper";

export default function DeviceBodyStructure({}) {


return (
    <group rotation={[0,0,0]}>
   

  <group  onClick={stopPropagation}>
    
    <RoundedBox args={[0.5,2,1.35]} position={[-0.25,0,0]} castShadow receiveShadow>
      <meshStandardMaterial color="lightgrey" />    
  
      </RoundedBox>
  
  
  
  
    <Box args={[0.49,.65,.3]} position={[-0.242,-0.44,0]} castShadow receiveShadow>
      <meshStandardMaterial color="grey"  />    
  
      </Box>
    </group>
  
  <Box args={[.001,.9,1.1]} position={[0,0.475,0]}>
        <meshStandardMaterial color={"#222222"} />
      </Box>
    </group>
)
}