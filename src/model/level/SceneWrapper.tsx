"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import { Box, Cylinder, OrbitControls, Ring, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo } from "react"
import { useLocalStorage } from "usehooks-ts"
import { getFuturesPricesList, getCurrentPrices, getPricesList, getRelevantChartData } from '@/../script/util/helper/kline'
import SyncedClock from "../npc/SyncedClock";
import LoadingBar from "../npc/LoadingBar";
import CandleKLineChart from "@/model/tools/charts/CandleKLineChart"
import CloseupCandleKLineChart from "@/model/tools/charts/CloseupCandleKLineChart"


export default function SceneWrapper({sceneState, sceneCalls}: any) {
  const [showFutures, s__showFutures] = useState(true)
  // const [fullfuttermList, s__fullfuttermList] = useState([])
  const [shorttermCubeSize, s__shorttermCubeSize] = useState(0.004)
  const [midtermCubeSize, s__midtermCubeSize] = useState(0.004)
  // const [shorttermList, s__shorttermList] = useState([])
  const [futChopAmount, s__futChopAmount] = useState(0)
  const [scopeStart, s__scopeStart] = useState(0)

  
  const triggerToggleShortCube = (e:any) => {
    let newSize = shorttermCubeSize == 0.004 ? 0.008 : 0.004
    s__shorttermCubeSize(newSize)
    e.stopPropagation()
  }
  

  const lastOf = useMemo(()=>{
    
    return [...sceneState.shorttermList].slice(-32) 
  },[sceneState.shorttermList])
  // useEffect(()=>{
  //   sceneCalls.initFuturesTimeframe()
    
  //   setTimeout(() => {
  //     sceneCalls.s__isChartLoading(false)
  //   }, 2000);
  // },[sceneState.isChartLoading, sceneCalls.s__fullfuttermList])
  return (<>
    <group position={[0.0, 0.8, 0]} >
      <LoadingBar state={{startRotationTime:sceneState.startRotationTime,points:sceneState.points}} calls={{s__startRotationTime:sceneCalls.s__startRotationTime}}>
  
    </LoadingBar>
    </group>
  {/* <group position={[0.0, 0.8, -0.4]} >
    <SyncedClock state={{startRotationTime:sceneState.startRotationTime,points:sceneState.points}} calls={{s__startRotationTime:sceneCalls.s__startRotationTime}}>

  </SyncedClock>
  </group> */}

  
  <RoundedBox args={[0.5,2,1.35]} position={[-0.25,0,0]} castShadow receiveShadow>
    <meshStandardMaterial color="lightgrey" />    

    </RoundedBox>
  <Box args={[0.5,.8,1.36]} position={[-0.242,0.37,0]} castShadow receiveShadow>
    <meshStandardMaterial color="grey" transparent={true} opacity={.5} />    

    </Box>
  {!sceneState.isChartLoading && showFutures && !!sceneState.fullfuttermList && sceneState.fullfuttermList.length > 0 &&
        <group position={[0.0, -0.75, 0.5]} rotation={[0, Math.PI / 2, 0]} onClick={triggerToggleShortCube}>
         
         <group position={[0,0.2,0]}>
         <CandleKLineChart cubeSize={shorttermCubeSize} closingContextPrices={sceneState.shorttermList} 
              yRange={[0,0.5]}
              chopStart={futChopAmount}
            fullArray={sceneState.fullfuttermList} 
          />
          </group>
  {!!sceneState.fullmidtermList && sceneState.fullmidtermList.length > 0 &&
          <group position={[0,-0.15,0]}>
         <CandleKLineChart cubeSize={midtermCubeSize} closingContextPrices={sceneState.midtermList} 
              yRange={[0,0.5]}
              chopStart={futChopAmount}
            fullArray={sceneState.fullmidtermList} 
          />
          </group>
}
          <group position={[-18.85,.9,0]}>
            <CloseupCandleKLineChart cubeSize={.08} closingContextPrices={lastOf} 
              yRange={[0,0.6]}
              chopStart={500-32}
              fullArray={sceneState.fullfuttermList} 
            />
          </group>
        </group>
      }

  </>)
}