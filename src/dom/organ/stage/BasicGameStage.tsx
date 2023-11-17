"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import SceneWrapper from "@/model/level/SceneWrapper";
import { Box, GizmoHelper, GizmoViewcube, Html, MapControls, MeshTransmissionMaterial, OrbitControls, Plane, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react"
import { useLocalStorage, useMap, useMediaQuery } from "usehooks-ts"
import { getCurrentPrices, getPricesList, getRelevantChartData } from "../../../../script/util/helper/kline";
import SceneConfig from "@/model/level/SceneConfig";
import useSyncedUnixTimer from "../../../../script/util/hook/useSyncedUnixTimer";
import { useSearchParams } from "next/navigation";
import { TradingViewChart } from '@/model/tools/charts/TradingViewChart'
import CandleClickGame from '@/dom/organ/CandleClickGame'
import Image from "next/image";
import Link from "next/link";
import ToggleSwitch from "@/model/parts/ToggleSwitch";
import CallToAction from "@/model/level/CallToAction";
import SolarFidgetSpinner from "@/model/level/solarsystem/SolarFidgetSpinner";
import CircuitContainer from "@/model/npc/CircuitContainer"
import DeviceBodyStructure from "@/model/npc/DeviceBodyStructure";
import TopRightMenu from "../overlay/TopRightMenu";
import TextStartAll from "@/model/text/TextStartAll";
import PerfectSuccess from "@/model/text/PerfectSuccess";
import JumpingBlobNotification from "@/model/parts/JumpingBlobNotification";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber'
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Cylinder, useGLTF } from "@react-three/drei";
import ResetLocalStorageRedCube from "@/model/tools/ResetLocalStorageRedCube";
import AlertContainer from "../overlay/AlertContainer";
import { useControls } from 'leva'
import AudioContainer from "../overlay/AudioContainer";
import ShadowImage from "@/model/tools/ShadowImage";
import { Fog } from "three";


const BOUNCE_MESSAGES = [
  "Perfect!",
  "Nice!",
  "One More Time!",
  "Good!",
  "You got this!",
  "Good job!",
  "Awesome!",
  "Very good!",
]

export default function BasicGameStage({children}:{children:ReactNode}) {
  const searchParams = useSearchParams()
  const symbol_search = searchParams.get('symbol') || "BTCUSDT"
  const scalp_search = searchParams.get('scalp') || "1m"
  const timeframe_search = searchParams.get('timeframe') || "1h"
  const noAutoRotate = searchParams.has('norotate') || false
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [isBottomRightOpen, s__isBottomRightOpen] = useState(false)
  const [isTopRightOpen, s__isTopRightOpen] = useState(false)
  const dateNow = Date.now()
  const {
    lastPrices,
    isBuyOrderLoading, s__isBuyOrderLoading,
    isChartLoading, s__isChartLoading,
    points, s__points,
    startRotationTime, s__startRotationTime,
    shorttermList, s__shorttermList,
    fullfuttermList, s__fullfuttermList,
    trigger__isBuyOrderLoading,
    buyScore, s__buyScore,
    setTimerChartLoading,
    initFuturesTimeframe,
    midtermList, s__midtermList,
    fullmidtermList, s__fullmidtermList,
  } = useSyncedUnixTimer({state:{
    symbol:symbol_search,
    scalp:scalp_search,
    timeframe:timeframe_search,
  }})

  // const triggerGetPrices = async () => {
  //   const pricesList = await getPricesList()
  //   let pricesData = getRelevantChartData(pricesList)
  //   s__startRotationTime(pricesData.latestUnix)
  // }
  // const [sceneState, s__sceneState] = useState();
  const [isSpinActive, s__isSpinActive] = useState(false);
  const sceneState = useMemo(()=>{
    return {
      points,
      buyScore,
      startRotationTime,
      isChartLoading: isChartLoading,
      isBuyOrderLoading: isBuyOrderLoading,
      fullfuttermList, 
      shorttermList,
      midtermList,
      fullmidtermList,
    }
  },[points, startRotationTime, isChartLoading, isBuyOrderLoading]);
  const $solarSystem:any = useRef()
  const [LS_logsCout, s__LS_logsCout] = useLocalStorage("logsCount",0)
  const [msg, s__msg] = useState("");
  const [fullSpinCount, s__fullSpinCount] = useState(0);

  const [bounceMsg, s__bounceMsg] = useState("");
  const [clickedIndex, s__clickedIndex] = useState(0);
  const [mounted, s__Mounted] = useState(false);
  const [LS_maxScore, s__LS_maxScore] = useLocalStorage("scoreboard",0)
  const triggerStart = () => {
    const newScore = points+1
    calculateScore(newScore)
    s__points(newScore)
  }
  // const fullSpinCount = useMemo(()=>{
  //   if (!$solarSystem.current) { return }
    
  //   return $solarSystem.current.score
  // }, [$solarSystem?.current?.score])
  const calculateScore = (newValue: number) => {
    if (LS_maxScore > newValue) {
      return
    }
    s__LS_maxScore(newValue)
  }

  const singleFlick = (newState:any) => {
    // alert(newState.toString())
    s__LS_logsCout(LS_logsCout+1)
    s__bounceMsg(BOUNCE_MESSAGES[LS_logsCout+1])
    if (!newState) {
      s__buyScore(buyScore+1)
      
    } else {
      // alert()
      s__msg(BOUNCE_MESSAGES[Math.floor((LS_logsCout+1)/2)])
    }
    // if ()
  }

  useEffect(() => {
      // s__msg("testing")
      s__Mounted(true);
  }, []);

  const triggerStartClick = () => {
    
  }

  const limitOrbit = useMemo(()=>{
    if ( LS_logsCout > 1 ) {
      return {
        // minPolarAngle: -Math.PI,
        // maxPolarAngle: Math.PI,
        
        minPolarAngle: 1,
        maxPolarAngle: 2,
    
        minAzimuthAngle: 0,
        maxAzimuthAngle: Math.PI*1.99,
      }
    }

    if ( LS_logsCout == 0 ) {
      return {
        minPolarAngle: 1,
        maxPolarAngle: 2,
        minAzimuthAngle: 0.8,
        maxAzimuthAngle: Math.PI/1.35,
      }
    }
    if ( LS_logsCout == 1 ) {
      return {
        minPolarAngle: 1,
        maxPolarAngle: 2,
        minAzimuthAngle: 0,
        maxAzimuthAngle: Math.PI,
      }
    }
  },[LS_logsCout])
  const DEFAULT_ALERT_REF:any = [["error",""],["warn",""],["wait",""],["success",""],["neutral",""]]
  const [alertMap,alertMap__do]:any = useMap(DEFAULT_ALERT_REF)
  const triggerClickedStart = () => {
    if (!isSpinActive) {
      s__isSpinActive(!isSpinActive)
    } else {
      alert("wrong and before right threshold")
      s__isSpinActive(false)
    }
  }
  const alertNotification = (category="neutral", msg="")=>{
    alertMap__do.setAll(DEFAULT_ALERT_REF)
        setTimeout(()=>{alertMap__do.set(category, msg)},100)
    }
  useEffect(()=>{
    // triggerStartClick()
    if (fullSpinCount == 0) { return }
    console.log("asdasd isSpinActive", fullSpinCount)
    alertNotification("neutral", "+1 Point!")
    s__bounceMsg("+1 Point!")
    
  },[fullSpinCount])

  // const config = useControls({
  //   meshPhysicalMaterial: false,
  //   transmissionSampler: false,
  //   backside: false,
  //   samples: { value: 10, min: 1, max: 32, step: 1 },
  //   resolution: { value: 2048, min: 256, max: 2048, step: 256 },
  //   transmission: { value: 1, min: 0, max: 1 },
  //   roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
  //   thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
  //   ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
  //   chromaticAberration: { value: 0.06, min: 0, max: 1 },
  //   anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
  //   distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
  //   distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
  //   temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
  //   clearcoat: { value: 1, min: 0, max: 1 },
  //   attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
  //   attenuationColor: '#ffffff',
  //   color: '#c9ffa1',
  //   bg: '#839681'
  // })


  // const obj = useLoader(THREE.OBJLoader, '../models/landscape.obj')

  const audioNotification = (category = "neutral", src = "") => {
    const audio = new Audio(src);
    audio.play();
  };
  if (!mounted) return <></>;

  return (
    <div className="flex-col tx-altfont-4  ">
      
      <AudioContainer
                    {...{
                      s__src: (val: any) => audioNotification("neutral", val),
                      src: "./sound/magic.wav" // Set the audio source here
                    }}
                  />
      <AlertContainer {...{ s__msg: (val:any)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} />
      {LS_logsCout > 1 &&
    <div className="z-600  pl-8 Q_xs_pl-2 pos-abs top-0 mb-8 left-0 opaci-chov--50" 
    onClick={()=>alert("Funds: "+sceneState.buyScore)}>
      {!!buyScore && <>
        <div className="flex gap-1 pa-2 flex-justify-start" >
        <div className="tx-lx" >
        💰
        </div>
        <div className="tx-xl tx-white" >
          {buyScore}
        </div>
        </div>
        </>}
      {!buyScore && <>
        <div className="flex gap-1 pa-2 flex-justify-start" >
        <div className="tx-lx tx-white flex-center" >
        💰 <div className="tx-red opaci-50 tx-xxxl pos-abs">X</div>
        </div>
        </div>
        </>}
    </div>
    }
     {LS_logsCout == 0 &&     
     <button className={`
      z-600   bord-r-25 pl-8 Q_xs_pl-2 pos-abs bottom-0 mb-8 left-50p 
      ${!isSpinActive ? " border-white bg-glass-3 pointer tx-white bg-trans " : " border-red tx-muted bg-b-90 stopcursor"}
     `}

     onClick={()=>{triggerClickedStart()}}>
     <div className="flex-center">
      <div className="tx-xxl ">
      →
      </div>
        { <>
          <div className="flex gap-1 pa-2 flex-justify-start" >
          <div className="tx-lx" >
          
          </div>
          <div className="tx-xl " >
            Start {fullSpinCount}
          </div>
          </div>
          </>}
      </div>
      </button>
    }
      <div className="z-600  pt-4 pr-4 Q_xs_pr-2 pos-abs top-0 mb-8 flex-col right-0" >
             {LS_logsCout > 7 &&
<>
          <div className="flex gap-3 pa-2 flex-justify-center flex-align-center" >
          { isTopRightOpen && <>
            <TopRightMenu />
          </>}
          <div>
            

            <button className="tx-xl tx-white  pa-2 pb-3  nosat bg-trans noborder tx-shadow-5 opaci-chov--50" onClick={()=>{s__isTopRightOpen(!isTopRightOpen)}}>
            
            {!isTopRightOpen ? `🟰` : '✖️'}
            </button>
          </div>
          </div>
          </>}
        {/* {!buyScore && <>
          <div className="flex gap-1 pa-2 flex-justify-start" >
          <div className="tx-lx tx-white flex-center" >
          💰 <div className="tx-red opaci-50 tx-xxxl pos-abs">X</div>
          </div>
          </div>
          </>} */}
      </div>
      {LS_logsCout > 6 &&
      <div className="z-600  pr-8 Q_xs_pr-2 pos-abs bottom-0 mb-100 pb-8 right-0" >
        {/* <div className="tx-white">
          <CandleClickGame />
        </div> */}
        <div className="flex-col-r flex-justify-center flex-align-center">

        {isBottomRightOpen &&
        <div className=" pa-2  flex-col bg-w-20 bg-glass-10 bord-r-25 ">
          {!!lastPrices?.spotPrice &&
        <div className="flex-col gap-2 tx-md mb-4">
            <div>s: {!lastPrices?.spotPrice ? "..." : parseFloat(lastPrices?.spotPrice)}</div>
            <div className="opaci-50">
              f: {!lastPrices?.futurePrice ? "..." : parseFloat(lastPrices?.futurePrice)}</div>
          </div>
          }
        
          <div className="flex-col py-1">
            <div className="flex-center">
              <div className=" tx-lg">🕒</div>
              <div className=" tx-lg tx-white">{parseInt(`${(dateNow - startRotationTime) / 1000}`)}s</div>
              
            </div>
          </div>
          {/* <div className={`flex gap-1 py-1 tx-lg   ${points >= LS_maxScore ? 'tx-red' : ''}`}>
            <div className="Q_xs">⭐</div>
            <div className="Q_sm_x">Level:</div>
            <div>{ points }</div>
          </div> */}
          
          <div onClick={()=>alert("Funds: "+sceneState.buyScore)} 
          className={`tx-lg bg-black box-shadow-5-b bord-r-10 pa-2 tx-white flex opaci-chov--50 gap-1   ${points >= LS_maxScore ? 'tx-orange' : ''}`}>
            <div className="Q_xs">💰</div>
            <div className="Q_sm_x">Funds:</div>
            <div>{ buyScore }</div>
          </div>

            {/* {typeof window !== 'undefined'  && <>
              <div className="Q_md_x flex gap-1 opaci-50 tx-lg">
                <div>Goal:</div>
                <div>{ LS_maxScore }</div>
              </div>
              
              <div className="Q_xs_sm flex gap-1 opaci-50 tx-lg ">
                <div>🎯</div>
                <div>{ LS_maxScore }</div>
              </div>
            </>} */}
            {points == 0 &&
            <div className="opaci-chov--50 ">
              <button className=" pointer py-3 translate-y-50 tx-altfont-1 bord-r-10 flex-center px-3"
               onClick={triggerStart}>
                <div className="pos-abs tx-lgx  ">{points == 0 ? `►` : `+`}</div>
              </button>
            </div>
          }
          {children}
        </div>
          }
          {!isBottomRightOpen &&
          <div onClick={()=>{s__isBottomRightOpen(true)}} 
          className="pt-6 tx-white opaci-chov--50 pointer tx-xl pr-4 tx-right w-100">
            ⚙️
            </div>
            }
        </div>
        {isBottomRightOpen &&
          <div className="tx-right">
            <div onClick={()=>{s__isBottomRightOpen(false)}} 
            className=" pt-6 pr-4 tx-lx tx-white opaci-chov--50">✖️</div>
          </div>
          }
      </div>
}
      <Canvas style={{width:"100vw",height:"100vh"}} shadows 
      camera={{fov:50,position:[isSmallDevice?8:6,1,LS_logsCout > 10 ? -6 : -1]}}
      gl={{ preserveDrawingBuffer: true, }}
      onCreated={(state)=>{
        state.gl.setClearColor("#101319")
        state.scene.fog = new Fog("#101319",8,16)
      }}
    >
      {/* <Box args={[2,2,2]}>
      <MeshTransmissionMaterial
      temporalDistortion={1}
      distortionScale={1}
      
            backside
            backsideThickness={0.1}
            thickness={0.05}
            chromaticAberration={0.05}
            anisotropicBlur={1}
            clearcoat={1}
            clearcoatRoughness={1}
            envMapIntensity={2}
          />
      </Box> */}
      {LS_logsCout > 50 && 
<GizmoHelper   alignment="bottom-left" margin={[50, 50]} >
        <GizmoViewcube
          
          color="gray"
          
          strokeColor="white"
          textColor="black"
          
          hoverColor="#999"
          opacity={1}
          
        />
      </GizmoHelper>
       }
       {/* <MapControls /> */}
       {/* <color attach="background" args={['#000000']} />
              <fog attach="fog" args={['#999999', 1, 3]} />  */}
      <OrbitControls
        rotateSpeed={2}
        autoRotateSpeed={.15}
        autoRotate={!noAutoRotate}
        dampingFactor={.2}
        // {...limitOrbit}
       />
{/*       
      <Html occlude="blending"  transform distanceFactor={.9} rotation={[0,-Math.PI/2,0]}  
        position={[-.509,-0.05,0]}
      >
          <div className="z--1">
            <TradingViewChart />
          </div>
        </Html> */}

      <group rotation={[0,0,0]}>

      {LS_logsCout > 0 && <JumpingBlobNotification {...{msg, s__msg,  }} /> }
      <group position={[1,0,0]}>
        {fullSpinCount > 0 && <PerfectSuccess {...{msg: bounceMsg, s__msg: s__bounceMsg,  }} /> }
      </group>
      {/* {LS_logsCout <= 1 && <>
        <Plane args={[50,50]} rotation={[0,3.14/2,0]} position={[-.5,0,0]}>
        <meshStandardMaterial color="white" />
      </Plane>
      </>} */}
      {LS_logsCout == 0 && <>
      <TextStartAll {...{msg, s__msg,  }} /> 
      
      </>}
      <ambientLight intensity={0.02} />
      {/* <SceneEnv visible={LS_logsCout > 1} />  */}
      {/* {LS_logsCout > 6 && <group position={[0,0,0]}>
        <SceneConfig sceneState={sceneState} 
          sceneCalls={{s__buyScore, setTimerChartLoading,s__points, trigger__isBuyOrderLoading}} />
        </group> } */}
        
      {/* {LS_logsCout > 7 && <group position={[.25,-.4,-0.45]} rotation={[0,Math.PI/2,0]}>
        <CallToAction sceneState={sceneState} 
          sceneCalls={{s__buyScore, setTimerChartLoading,s__points, trigger__isBuyOrderLoading}} />
        </group> } */}

        
      <group position={[-0.5,0,0]}
      rotation={[0,-Math.PI/2,0]}>
        
      {/* {!LS_logsCout  &&
      <Plane args={[7,7]} rotation={[0,Math.PI,0]} castShadow receiveShadow>
        <meshStandardMaterial side={2} color={"white"} />
        </Plane>
        } */}


<group  position={[0,-3, 0]} scale={.8}>
  <ShadowImage {...{bounceMsg: bounceMsg && "Success!"}} />
</group>

        
        
 {
        <group position={[0,.8,0]} rotation={[0,Math.PI,0]}>
          <SolarFidgetSpinner sceneState={sceneState} ref={$solarSystem}
          sceneCalls={{triggerStartClick, audioNotification}}  
          {...{fullSpinCount, s__fullSpinCount, s__isSpinActive, isSpinActive}}
          />
        </group>
}

{
        <group position={[0,.8,0]}>
          <ResetLocalStorageRedCube sceneState={sceneState} sceneCalls={{triggerStartClick, s__isSpinActive}}  />
        </group>
}


      {/* <ToggleSwitch sceneState={sceneState} scale={3}
          sceneCalls={{s__buyScore, setTimerChartLoading,s__points, trigger__isBuyOrderLoading}}
          config={{isConfirmationNeeded:false}}
          callbacks={{singleFlick}}
          >
           
        
        </ToggleSwitch> */}
      </group>

      
      {/* <CircuitContainer visible={LS_logsCout < 9 && LS_logsCout > 4} /> */}
{/*       
      {LS_logsCout > 8 && 
  <>
  <Box args={[0.49,.7,0.5]} position={[-0.242,-0.44,0.4]} castShadow receiveShadow>
  <meshStandardMaterial color="grey"  />    

  </Box>
  <Box args={[0.49,.7,0.5]} position={[-0.242,-0.44,-0.4]} castShadow receiveShadow>
  <meshStandardMaterial color="grey"  />    

  </Box>
  </>
      }
       */}
{/*        
      {LS_logsCout > 9 && 
        <DeviceBodyStructure />
      }
      {LS_logsCout > 7 && <SceneWrapper sceneState={sceneState} 
        sceneCalls={{s__fullfuttermList,initFuturesTimeframe,
        s__midtermList, s__fullmidtermList,
        s__startRotationTime, s__shorttermList, s__isChartLoading}} /> } */}



        </group>
    </Canvas>
    </div>
  )
}
