"use client"
import { GizmoHelper, GizmoViewcube, OrbitControls, Plane, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { useLocalStorage, useMap, useMediaQuery } from "usehooks-ts"
import useSyncedUnixTimer from "../../../../script/util/hook/useSyncedUnixTimer";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SolarFidgetSpinner from "@/model/level/solarsystem/SolarFidgetSpinner";
import TopRightMenu from "../overlay/TopRightMenu";
import TextStartAll from "@/model/text/TextStartAll";
import PerfectSuccess from "@/model/text/PerfectSuccess";
import JumpingBlobNotification from "@/model/parts/JumpingBlobNotification";
import ResetLocalStorageRedCube from "@/model/tools/ResetLocalStorageRedCube";
import AlertContainer from "../overlay/AlertContainer";
import AudioContainer from "../overlay/AudioContainer";
import ShadowImage from "@/model/tools/ShadowImage";
import { Fog } from "three";
import TiltShiftEffects from '@/model/tools/tiltshift'
import { LoadingFullScreen } from "@/model/tools/LoadingFullScreen";

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

export default function BasicFidgetGameStage({children}:{children:ReactNode}) {
  const searchParams = useSearchParams()
  const isDOF = searchParams.has('dof')
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
      // alert("wrong and before right threshold")
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


  const audioNotification = (category = "neutral", src = "") => {
    const audio = new Audio(src);
    audio.play();
  };
  
  if (!mounted) return <LoadingFullScreen />;

  return (
    <div className="flex-col tx-altfont-4  ">
      
      <AudioContainer
                    {...{
                      s__src: (val: any) => audioNotification("neutral", val),
                      src: "./sound/magic.wav" // Set the audio source here
                    }}
                  />
      <AlertContainer {...{ s__msg: (val:any)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} />
      {
    <Link href="/x" className="z-600 nodeco pl-8 Q_xs_pl-2 pos-abs top-0 mb-8 left-0 opaci-chov--50" >
        <div className="flex gap-1 pa-2 flex-justify-start" >
        <div className="tx-lx" >
        🎱
        </div>
        
        </div>
      
    </Link>
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
      </div>
      {LS_logsCout > 6 &&
      <div className="z-600  pr-8 Q_xs_pr-2 pos-abs bottom-0 mb-100 pb-8 right-0" >
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
          <div onClick={()=>alert("Funds: "+sceneState.buyScore)} 
          className={`tx-lg bg-black box-shadow-5-b bord-r-10 pa-2 tx-white flex opaci-chov--50 gap-1   ${points >= LS_maxScore ? 'tx-orange' : ''}`}>
            <div className="Q_xs">💰</div>
            <div className="Q_sm_x">Funds:</div>
            <div>{ buyScore }</div>
          </div>

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
      {isDOF && <TiltShiftEffects />}
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
      <OrbitControls
        rotateSpeed={2}
        autoRotateSpeed={.15}
        autoRotate={!noAutoRotate}
        dampingFactor={.2}
       />

      <group rotation={[0,0,0]}>

      {LS_logsCout > 0 && <JumpingBlobNotification {...{msg, s__msg,  }} /> }
      <group position={[1,0,0]}>
        {fullSpinCount > 0 && <PerfectSuccess {...{msg: bounceMsg, s__msg: s__bounceMsg,  }} /> }
      </group>
      {LS_logsCout == 0 && <>
      <TextStartAll {...{msg, s__msg,  }} /> 
      
      </>}
      <ambientLight intensity={0.02} />
        
      <group position={[-0.5,0,0]}
      rotation={[0,-Math.PI/2,0]}>
        

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

      </group>

      

        </group>
    </Canvas>
    </div>
  )
}
