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
  const $systemSphere:any = useRef()
  const $worldSphere:any = useRef()
  // const sunmap = useTexture("./textures/sunmap.jpg")
  // const earthmap = useTexture("./textures/smallworld.jpg")
  // const spacemap = useTexture("./textures/space.jpg")
  // const moonmap = useTexture("./textures/moonmap.jpg")

    const triggerResetEverything = async (e:any) => {
        e.stopPropagation()
        if (!window) return
        // let logoutRes = await fetch("/api/auth/logout",{method:"DELETE"})
        window.localStorage.clear()
        window.location.reload()
      }
useFrame((ctx, delta)=>{
  if (!$systemSphere.current) { return }
  if (!$worldSphere.current) { return }

  $systemSphere.current.rotation.y += delta
  $worldSphere.current.rotation.y += 0.01
})
  return (<>
  <group >

  <Box args={[0.1,0.1,0.1]} position={[0,0,0]} onClick={triggerResetEverything}>
        <meshStandardMaterial emissive={"#900"} />
      </Box>
{/*       
  <group position={[0,-1,0]} >
        <Sphere args={[10]}>
          <meshStandardMaterial side={1} map={spacemap} emissiveMap={spacemap} />
        </Sphere>
        </group>
    <group ref={$systemSphere} >
        {
        <group position={[0,-1,0]} >
        <Sphere args={[1]}>
          <meshStandardMaterial map={sunmap} />
        </Sphere>
        </group>
        } */}

        
{/* <group position={[0,-1,2.5]} ref={$worldSphere} >
<Sphere args={[0.5]}>
          <meshStandardMaterial map={earthmap} />
        </Sphere>
        <Sphere args={[0.25]} position={[0,0,1]}>
          <meshStandardMaterial map={moonmap} />
        </Sphere>
        </group> */}


    {/* </group > */}
  </group >
  </>)
}
