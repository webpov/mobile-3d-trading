"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getFuturesPricesList, getCurrentPrices, getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'
import CandleKLineChart from "@/model/tools/charts/CandleKLineChart"
import CloseupCandleKLineChart from "@/model/tools/charts/CloseupCandleKLineChart"
import SimCardSlot from "@/model/mix/SimCardSlot"
import * as THREE from 'three';


export function BounceSpinnerClicker({sceneState, sceneCalls,fullSpinCount, triggerModel, s__fullSpinCount, isSpinActive,s__isSpinActive,children, ...props}: any) {
  const $mainGroupRef:any = useRef()
  const triggerClickStart = (e:any) => {
    e.stopPropagation()
    // alert()
    s__isSpinActive(!isSpinActive)
    if (!isSpinActive) {
      sceneCalls.audioNotification("neutral","../sound/click33.wav")
      if (reachedHalfEnd) {
        s__reachedHalfEnd(false)
        $mainGroupRef.current.rotation.y = 0
        sceneCalls.audioNotification("neutral","../sound/404.wav")
      }

      // setTargetRotation(Math.PI/2)
    } else {
      sceneCalls.audioNotification("neutral","../sound/404.wav")
    }
  }

  const SPIN_SPEED = 3
  const LERP_SPEED = 0.05;
  const [targetRotation, setTargetRotation] = useState(0);
  const [reachedHalfEnd, s__reachedHalfEnd] = useState(false);

  useFrame((ctx, delta)=>{
    if (!$mainGroupRef.current) { return }
    if (!isSpinActive) {
      if ($mainGroupRef.current.rotation.y !== targetRotation) {
        const lerpedRotation = $mainGroupRef.current.rotation.y + (targetRotation - $mainGroupRef.current.rotation.y) * LERP_SPEED;
        $mainGroupRef.current.rotation.y =  lerpedRotation;
        if ($mainGroupRef.current.rotation.y > Math.PI*1.95){
            $mainGroupRef.current.rotation.y = 0
            if (reachedHalfEnd) {
              setTargetRotation(0)
              s__reachedHalfEnd(false)
              s__fullSpinCount(fullSpinCount+1)
            }
        } else {
          if ($mainGroupRef.current.rotation.y < Math.PI/2) {
            console.log("$mainGroupRef.current.rotation.y", $mainGroupRef.current.rotation.y)
            $mainGroupRef.current.rotation.y = 0
          }
        }
      } 
    return
  }
    


    $mainGroupRef.current.rotation.y += SPIN_SPEED * delta
    if ($mainGroupRef.current.rotation.y > Math.PI ) {
      setTargetRotation(Math.PI*2)
      // $mainGroupRef.current.rotation.z += Math.PI*2
      // $mainGroupRef.current.rotation.y = 0
      s__isSpinActive(false)
      s__reachedHalfEnd(true)
      sceneCalls.audioNotification("neutral","../sound/click58.wav")
    }
    // console.log("$mainGroupRef.current.rotation.y", $mainGroupRef.current.rotation.y)
  })

  return (<>
  <group onPointerDown={triggerClickStart}>
    {triggerModel}
  </group>
  <group ref={$mainGroupRef} >
    {children}
  </group>
  </>)
}