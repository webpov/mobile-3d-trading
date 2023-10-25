"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Ring, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getFuturesPricesList, getCurrentPrices, getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'
import CandleKLineChart from "@/model/tools/charts/CandleKLineChart"
import CloseupCandleKLineChart from "@/model/tools/charts/CloseupCandleKLineChart"


export default function SceneConfig({sceneState, sceneCalls}: any) {
  
  return (<>
  <group >
    
      <Box args={[0.2,0.2,0.2]} position={[-0.25,.65,sceneState.isChartLoading ? -0.61 : -.7]}
        onClick={sceneCalls.setTimerChartLoading}
      >
          <meshStandardMaterial color="#ff9900" emissive={sceneState.isChartLoading ? "#996600" : "#000"} />
      </Box>
      <Cylinder args={[0.1,0.1,6.2]} position={[-0.25,-4,0]}>
        <meshStandardMaterial color="#999999" />

      </Cylinder>
      
      <Cylinder args={[0.15,0.15,0.2]} position={[-0.25,.3,-0.75]} rotation={[Math.PI/2,0,0]}>
        <meshStandardMaterial color="#009900" />

      </Cylinder>

      {sceneState.isChartLoading &&
    <pointLight castShadow args={[0xff9900, 1, 1.5]} position={[-0.5, .75, -2]}  />
  }

      
      </group>

  </>)
}
