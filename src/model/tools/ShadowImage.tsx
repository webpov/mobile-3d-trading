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
    const { scene: biglandscape01 } = useGLTF('../models/biglandscape.glb')

  return (<>
  
 
<group scale={[1,1,1]} position={[0,-2.25,-0.32]}>

<primitive object={biglandscape01} children-0-material-wireframe={true} 
children-0-material-emissive={"#3c3c3c"} 
children-0-material-color={"#000000"} 

/>
</group>
<group position={[0,3.75,0]}>
        <FollowFontText>
            {bounceMsg}
        </FollowFontText>
    </group>
  
  </>)
}
