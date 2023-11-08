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
import ToggleSwitch from "../parts/ToggleSwitch";

export default function CallToAction({sceneState, sceneCalls}: any) {
  const lastCylinderRef:any = useRef();

  useFrame(() => {
    if (sceneState.isBuyOrderLoading && lastCylinderRef.current) {
      lastCylinderRef.current.rotation.y += 0.003; // Adjust the rotation speed as needed
    }
  });

  return (<>
  <group >

  
      {sceneState.buyScore &&
      <Cylinder args={[0.15,0.15,0.15,5]} position={[0,.0,sceneState.isBuyOrderLoading?-.25:-0.2]} 
                ref={lastCylinderRef}

      rotation={[Math.PI/2,0,0]} 
        onClick={sceneCalls.trigger__isBuyOrderLoading}
        castShadow
      >
        <meshStandardMaterial color={sceneState.points?"#006600":"#999999"} emissiveIntensity={.1} 
        emissive={sceneState.isBuyOrderLoading?"#00ff00":"#000"} />

      </Cylinder>
    }
      {!sceneState.buyScore &&
      <Cylinder args={[0.15,0.15,0.15,5]} position={[0,.0,-.2]} 

      rotation={[Math.PI/2,0,0]} 
        onClick={()=>alert("no funds")}
        castShadow
      >
        <meshStandardMaterial color={"#aaaaaa"}  />

      </Cylinder>
    }
      {sceneState.isBuyOrderLoading &&
        <pointLight  args={[0x00ff00, 1, .33]} position={[0, .0, -.2]}  />
      }
      
      </group>

  </>)
}
