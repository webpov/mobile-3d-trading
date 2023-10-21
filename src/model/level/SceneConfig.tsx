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
    
  <Box args={[0.2,0.2,0.2]} position={[-0.3,.4,-.7]} onClick={sceneCalls.setTimerChartLoading}>
          <meshStandardMaterial color="#ff9900" />
      </Box>
        </group>

  </>)
}
