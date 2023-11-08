"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getFuturesPricesList, getCurrentPrices, getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'
import CandleKLineChart from "@/model/tools/charts/CandleKLineChart"
import CloseupCandleKLineChart from "@/model/tools/charts/CloseupCandleKLineChart"
import SimCardSlot from "@/model/mix/SimCardSlot"

export default function ToggleSwitch({sceneState, sceneCalls, callbacks, config, ...props}: any) {
  const lastCylinderRef:any = useRef();
  const [currentState, s__currentState] = useState(false)
  const triggerToggleClick = (e:any) => {
    e.stopPropagation()
    if (!currentState && config.isConfirmationNeeded) {
      const promptRes = prompt("Confirm action? (y/n)","y")
      
      if (!promptRes) {
        return
      }
    }
    s__currentState(!currentState)
    if (!!callbacks) {
      callbacks.singleFlick(!currentState)
    }
  }

  // const [currentState, s__currentState] = useState(false)



  return (<>
  <group {...props} onClick={triggerToggleClick}>

      
      <Box args={[0.05,0.05,0.35]} position={[0,0,0]} castShadow receiveShadow
      rotation={[currentState?.5:-0.5,0,0]}
        
      >
          <meshStandardMaterial color="#eeeeee" />
      </Box>
      <Box args={[0.07,0.15,0.15]} position={[0,0,0]} receiveShadow castShadow
      >
          <meshStandardMaterial color="#cccccc" />
      </Box>
      <Box args={[0.26,0.4,0.1]} position={[0,0,0]} receiveShadow castShadow
      >
          <meshStandardMaterial color="#bbbbbb" />
      </Box>

      <spotLight castShadow intensity={currentState ? 1 : 0.2} args={[0xfffaf6, .2, 40]} position={[3, 3, -1]} />

  </group >
  </>)
}
