"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import SceneWrapper from "@/model/level/SceneWrapper";
import { Box, GizmoHelper, GizmoViewcube, Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense, useEffect, useMemo, useState } from "react"
import { useLocalStorage, useMediaQuery } from "usehooks-ts"
import { getCurrentPrices, getPricesList, getRelevantChartData } from "../../../../script/util/helper/kline";
import SceneConfig from "@/model/level/SceneConfig";
import useSyncedUnixTimer from "../../../../script/util/hook/useSyncedUnixTimer";
import { useSearchParams } from "next/navigation";
import { TradingViewChart } from '@/model/tools/charts/TradingViewChart'
import CandleClickGame from '@/dom/organ/CandleClickGame'
import Image from "next/image";
import Link from "next/link";
export default function StageContainer({children}:{children:ReactNode}) {
  const searchParams = useSearchParams()
  const symbol_search = searchParams.get('symbol') || "BTCUSDT"
  const scalp_search = searchParams.get('scalp') || "1m"
  const timeframe_search = searchParams.get('timeframe') || "1h"
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [isBottomRightOpen, s__isBottomRightOpen] = useState(false)
  const [isTopRightOpen, s__isTopRightOpen] = useState(false)
  // useEffect(()=>{
  //   if(!!points) return
  //   triggerGetPrices()
    
  // }),[]
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

  const [mounted, s__Mounted] = useState(false);
  const [LS_maxScore, s__LS_maxScore] = useLocalStorage("scoreboard",0)
  const triggerStart = () => {
    const newScore = points+1
    calculateScore(newScore)
    s__points(newScore)
  }
  const calculateScore = (newValue: number) => {
    if (LS_maxScore > newValue) {
      return
    }
    s__LS_maxScore(newValue)
  }



  useEffect(() => {
    s__Mounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="flex-col tx-altfont-4  ">
    <div className="z-600  pl-8 Q_xs_pl-2 pos-abs top-0 mb-8 left-0" >
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
      <div className="z-600  pr-8 Q_xs_pr-2 pos-abs top-0 mb-8 flex-col right-0" >
        {<>
          <div className="flex gap-3 pa-2 flex-justify-center flex-align-center" >
          {isTopRightOpen && <>
          <div className="flex-row gap-3 Q_xs_sm_flex-col">
              <Link href={"https://webqub.vercel.app/"} className=" opaci-chov--50">
            <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
            <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webqublogo.jpg" width={48} height={48} />
            </div>
            </Link>
              <Link href={"https://wcity.vercel.app/"} className=" opaci-chov--50">
            <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
            <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webcitylogo.jpg" width={48} height={48} />
            </div>
            </Link>
              <Link href={"https://wcity.vercel.app/w"} className=" opaci-chov--50">
            <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
            <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webgamelogo.jpg" width={48} height={48} />
            </div>
            </Link>
            </div>
              <Link href={"https://webpov.vercel.app/"} className=" opaci-chov--50">
            <div className="tx-lx bg-white pa-1 pb-0 pt-2 bord-r-25" >
            <Image className="box-shadow-5-b bord-r-100p noverflow" alt="asd" src="/webpovlogo.jpg" width={64} height={64} />
            </div>
            </Link>
          </>}
          <div>
            

            <button className="tx-xl nosat bg-trans noborder tx-shadow-5 opaci-chov--50" onClick={()=>{s__isTopRightOpen(!isTopRightOpen)}}>
              ➕
            </button>
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
      <div className="z-600  pr-8 Q_xs_pr-2 pos-abs bottom-0 mb-8 pb-8 right-0" >
        {/* <div className="tx-white">
          <CandleClickGame />
        </div> */}
        <div className="flex-col-r flex-justify-center flex-align-center">

        {isBottomRightOpen &&
        <div className=" pa-2  flex-col bg-w-90 bord-r-25 ">
          {!!lastPrices?.spotPrice &&
        <div className="flex-col gap-2 tx-md mb-4">
            <div>s:{!lastPrices?.spotPrice ? "..." : parseInt(lastPrices?.spotPrice)}</div>
            <div className="opaci-50">f:{!lastPrices?.futurePrice ? "..." : parseInt(lastPrices?.futurePrice)}</div>
          </div>
          }
        
          <div className="">
            Delay: {parseInt(`${(dateNow - startRotationTime) / 1000}`)}s
          </div>
          <div className={`flex gap-1   ${points >= LS_maxScore ? 'tx-green' : ''}`}>
            <div className="Q_xs">*</div>
            <div className="Q_sm_x">Tickets:</div>
            <div>{ buyScore }</div>
          </div>
          <div className={`flex gap-1   ${points >= LS_maxScore ? 'tx-green' : ''}`}>
            <div className="Q_xs">⭐</div>
            <div className="Q_sm_x">Level:</div>
            <div>{ points }</div>
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
            <div className="opaci-chov--50">
              <button className="tx-xl pointer tx-altfont-1 bord-r-10 px-3" onClick={triggerStart}>
                <div className="Q_xs ">{points == 0 ? `+` : `+`}</div>
                <div className="Q_sm_x">{points == 0 ? `Start` : `+`}</div>
              </button>
            </div>
          }
          {children}
        </div>
          }
          {!isBottomRightOpen &&
          <div onClick={()=>{s__isBottomRightOpen(true)}} 
          className="pt-6 tx-white opaci-chov--50 pointer tx-lg pr-4 tx-right w-100">
            Settings
            </div>
            }
        </div>
        {isBottomRightOpen &&
          <div className="tx-right">
            <div onClick={()=>{s__isBottomRightOpen(false)}} 
            className=" pt-6 pr-4 tx-lg tx-white opaci-chov--50">Close</div>
          </div>
          }
      </div>

      <Canvas style={{width:"100vw",height:"100vh"}} shadows 
      camera={{fov:40,position:[isSmallDevice?5:3,0,-2]}}
      gl={{ preserveDrawingBuffer: true, }}
    >
      
<GizmoHelper  alignment="bottom-left" margin={[50, 50]} >
        <GizmoViewcube
          
          color="gray"
          
          strokeColor="white"
          textColor="black"
          
          hoverColor="#999"
          opacity={1}
          
        />
      </GizmoHelper>
      
      <OrbitControls
        rotateSpeed={2}
        autoRotateSpeed={.05}
        autoRotate={true}
        dampingFactor={.05}
        // maxAzimuthAngle={1}
        // minPolarAngle={1}
        // maxPolarAngle={2}
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
      <SceneEnv />
      <group position={[0,0,0]}>
        <SceneConfig sceneState={sceneState} 
          sceneCalls={{s__buyScore, setTimerChartLoading,s__points, trigger__isBuyOrderLoading}} />
        </group>
      <SceneWrapper sceneState={sceneState} 
        sceneCalls={{s__fullfuttermList,initFuturesTimeframe,
        s__midtermList, s__fullmidtermList,
        s__startRotationTime, s__shorttermList, s__isChartLoading}} />
        </group>
    </Canvas>
    </div>
  )
}
