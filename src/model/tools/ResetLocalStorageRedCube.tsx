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

export default function ResetLocalStorageRedCube({sceneState, sceneCalls,  ...props}: any) {
  


    const triggerResetEverything = async (e:any) => {
        e.stopPropagation()
        if (!window) return
        // let logoutRes = await fetch("/api/auth/logout",{method:"DELETE"})
        window.localStorage.clear()
        window.location.reload()
      }

  return (<>
  <group >

      
  <Box args={[0.1,0.1,0.1]} position={[0,0,0]} onClick={triggerResetEverything}>
        <meshStandardMaterial emissive={"#f00"} />
      </Box>
  </group >
  </>)
}
