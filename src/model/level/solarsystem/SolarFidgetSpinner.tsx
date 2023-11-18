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
import { SpinnerClicker } from "./SpinnerClicker";
import { BounceSpinnerClicker } from "./BounceSpinnerClicker";
import { useRouter } from 'next/navigation'


const SolarFidgetSpinner:any = forwardRef(({sceneState, sceneCalls, isSpinActive, s__isSpinActive, fullSpinCount, s__fullSpinCount, ...props}:any,ref:any) => {
  const router = useRouter()
  const $systemSphere:any = useRef()
  const $worldSphere:any = useRef()
  const $sunSphere:any = useRef()
  // const [fullSpinCount, s__fullSpinCount] = useState(0);
  // const [isSpinActive, s__isSpinActive] = useState(false);
  const [isMoonSpinActive, s__isMoonisSpinActive] = useState(false);

  useImperativeHandle(ref, ()=>{
    return {
      // score: () => (fullSpinCount),
    }

  })

  // const moonnormal = useTexture("../public/moonnormal.jpg")
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
  // if (!$systemSphere.current) { return }
  // if (!$worldSphere.current) { return }
  // if (!$sunSphere.current) { return }

  // $systemSphere.current.rotation.y += delta
  // $worldSphere.current.rotation.y += delta * 2
  // $sunSphere.current.rotation.y -= delta / 1.2
})

useEffect(()=>{

  console.log("fullSpinCount", fullSpinCount)
  if (fullSpinCount == 0) { return }
  sceneCalls.audioNotification("neutral","../sound/ping.wav")

},[fullSpinCount])
  return (<>

  
  <pointLight castShadow  args={[0xfffaf6, .75, 40]} position={[3, 1, 2]} />
<group  >
      <BounceSpinnerClicker {...{sceneCalls,
        isSpinActive,
        s__isSpinActive,
        
        // isSpinActive,
        // s__isSpinActive,
        fullSpinCount, s__fullSpinCount}}
        triggerModel={
          <group position={[0,-1,0]} ref={$sunSphere} >
          <Sphere args={[1,12,12]}>
            <meshStandardMaterial color="gold"
              emissive={isSpinActive ? "#221100" : "#000"} />
          </Sphere>
          </group>
          }
      >
        

  <group >
      
  {/* <group position={[0,-1,0]} visible={isMoonSpinActive && isSpinActive}>
        <Sphere args={[3.5]}>
          <meshStandardMaterial side={1} color="grey" />
        </Sphere>
        </group> */}
    <group ref={$systemSphere} >
        

        
<group position={[0,-1,2.2]} ref={$worldSphere} >
<SpinnerClicker {...{
        // isSpinActive: isSpinActive,
        // s__isSpinActive: sceneCalls.s__isSpinActive,
        sceneCalls,
        isSpinActive: isMoonSpinActive,
        s__isSpinActive: s__isMoonisSpinActive,
        fullSpinCount, s__fullSpinCount}}
        triggerModel={
          <Sphere args={[0.55,12,12]} castShadow receiveShadow>
                    <meshStandardMaterial color="orange" emissive={isMoonSpinActive ? "#332200" : "#000"} />
                  </Sphere>
          }
      >
        <Sphere args={[0.25,12,12]} position={[0,0,.85]} castShadow receiveShadow 
          onClick={()=>{router.push("/x/fidget?dof"); window.location.reload()}}
        >
          <meshStandardMaterial color="silver" emissive={isSpinActive ? "#444444" : "#000"} />
        </Sphere>
        </SpinnerClicker>
        </group>


    </group >
  </group >
      </BounceSpinnerClicker>
        <pointLight castShadow args={[0xfffaf6, 1, 1]} position={[0, 0.2, 3.1]} />     
    </group >

  </>)
})

SolarFidgetSpinner.displayName = 'SolarFidgetSpinner'

export default SolarFidgetSpinner