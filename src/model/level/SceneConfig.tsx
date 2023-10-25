"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getFuturesPricesList, getCurrentPrices, getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'
import CandleKLineChart from "@/model/tools/charts/CandleKLineChart"
import CloseupCandleKLineChart from "@/model/tools/charts/CloseupCandleKLineChart"


export default function SceneConfig({sceneState, sceneCalls}: any) {
  const lastCylinderRef:any = useRef();

  useFrame(() => {
    if (sceneState.isBuyOrderLoading && lastCylinderRef.current) {
      lastCylinderRef.current.rotation.y += 0.003; // Adjust the rotation speed as needed
    }
  });

  return (<>
  <group >
    
      <Box args={[0.2,0.2,0.2]} position={[-0.25,.65,sceneState.isChartLoading ? -0.64 : -.7]} castShadow
        onClick={sceneCalls.setTimerChartLoading}
      >
          <meshStandardMaterial color="#ff9900" emissive={sceneState.isChartLoading ? "#663300" : "#000"} />
      </Box>
      <Cylinder args={[0.1,0.1,6.2]} position={[-0.25,-4,0]}>
        <meshStandardMaterial color="#999999" />

      </Cylinder>
      
      <Box args={[0.15,0.3,0.2]} position={[-0.25,-.25,-.63]} castShadow
      rotation={[sceneState.points?.2:-0.2,0,0]}
        onClick={()=>sceneCalls.s__points(!sceneState.points ? 1 : 0)}
      >
          <meshStandardMaterial color="#eeeeee" />
      </Box>
      <Box args={[0.26,0.4,0.1]} position={[-0.25,-.25,-.63]} receiveShadow castShadow
      >
          <meshStandardMaterial color="#bbbbbb" />
      </Box>
      <Plane args={[0.08,0.12]} position={[-0.25,-.19,-.72]} rotation={[0.1,Math.PI,0]}>
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" />

      </Plane>
      {/* <Box args={[0.36,0.72,0.12]} position={[-0.25,.44,-.63]} castShadow
      >
          <meshStandardMaterial color="#aaaaaa" />
      </Box> */}
      {sceneState.buyScore &&
      <Cylinder args={[0.15,0.15,0.15,5]} position={[-0.25,.3,sceneState.isBuyOrderLoading?-.68:-0.75]} 
                ref={lastCylinderRef}

      rotation={[Math.PI/2,0,0]} 
        onClick={sceneCalls.trigger__isBuyOrderLoading}
        castShadow
      >
        <meshStandardMaterial color={sceneState.points?"#009900":"#999999"} emissiveIntensity={.1} emissive={sceneState.points?"#009900":"#000"} />

      </Cylinder>
    }
      {!sceneState.buyScore &&
      <Cylinder args={[0.15,0.15,0.15,5]} position={[-0.25,.3,-.68]} 

      rotation={[Math.PI/2,0,0]} 
        onClick={()=>alert("no funds")}
        castShadow
      >
        <meshStandardMaterial color={"#aaaaaa"}  />

      </Cylinder>
    }
      {sceneState.isChartLoading &&
        <pointLight  args={[0xff9900, 1, 1]} position={[0.1, .75, -.8]}  />
      }
      {sceneState.isBuyOrderLoading &&
        <pointLight  args={[0x00ff00, .6, .33]} position={[-0.25, .33, -.8]}  />
      }

      {sceneState.points &&
<spotLight castShadow args={[0xfffaf6, 1, 22, .06, 1]} position={[9, 9, -5]} />     
      }
      
      </group>

  </>)
}
