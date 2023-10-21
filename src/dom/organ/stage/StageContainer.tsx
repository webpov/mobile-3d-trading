"use client"
import { SceneEnv } from "@/model/core/SceneEnv";
import SceneWrapper from "@/model/level/SceneWrapper";
import { Box, Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense, useEffect, useMemo, useState } from "react"
import { useLocalStorage, useMediaQuery } from "usehooks-ts"
import { getCurrentPrices, getPricesList, getRelevantChartData } from "../../../../script/util/helper/kline";
import SceneConfig from "@/model/level/SceneConfig";
import useSyncedUnixTimer from "../../../../script/util/hook/useSyncedUnixTimer";
import { useSearchParams } from "next/navigation";
import { TradingViewChart } from '@/model/tools/charts/TradingViewChart'

export default function StageContainer({children}:{children:ReactNode}) {
  const searchParams = useSearchParams()
  const symbol_search = searchParams.get('symbol') || "BTCUSDT"
  const scalp_search = searchParams.get('scalp') || "1m"
  const timeframe_search = searchParams.get('timeframe') || "1h"
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  // useEffect(()=>{
  //   if(!!points) return
  //   triggerGetPrices()
    
  // }),[]
  const dateNow = Date.now()
  const {
    lastPrices,
    isChartLoading, s__isChartLoading,
    points, s__points,
    startRotationTime, s__startRotationTime,
    shorttermList, s__shorttermList,
    fullfuttermList, s__fullfuttermList,
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
      startRotationTime,
      isChartLoading: isChartLoading,
      fullfuttermList, 
      shorttermList,
      midtermList,
      fullmidtermList,
    }
  },[points, startRotationTime, isChartLoading]);

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
    <div className="flex-col tx-altfont-1  ">
      <div className="pos-abs pa-2 bottom-0 mb-100 mr-8 right-0 flex-col bg-w-50 bord-r-25 z-600">
        {!!lastPrices?.spotPrice &&
      <div className="flex-col gap-2 tx-lx tx-roman">
          <div>{!lastPrices?.spotPrice ? "..." : parseInt(lastPrices?.spotPrice)}</div>
          <div>{!lastPrices?.futurePrice ? "..." : parseInt(lastPrices?.futurePrice)}</div>
        </div>
        }
      
        <div className="tx-roman">
          {parseInt(`${(dateNow - startRotationTime) / 1000}`)}s
        </div>
        <div className={`flex gap-1   ${points >= LS_maxScore ? 'tx-green' : ''}`}>
          <h2 className="Q_xs">⭐</h2>
          <h2 className="Q_sm_x">Points:</h2>
          <h2>{ points }</h2>
        </div>
          {typeof window !== 'undefined'  && <>
            <div className="Q_md_x flex gap-1 opaci-50 tx-lg">
              <h1>Goal:</h1>
              <h1>{ LS_maxScore }</h1>
            </div>
            
            <div className="Q_xs_sm flex gap-1 opaci-50 tx-sm">
              <h1>🎯</h1>
              <h1>{ LS_maxScore }</h1>
            </div>
          </>}
        <div className="opaci-chov--50">
          <button className="tx-xl pointer tx-altfont-1 bord-r-10 px-3" onClick={triggerStart}>
            <div className="Q_xs ">{points == 0 ? `+` : `+`}</div>
            <div className="Q_sm_x">{points == 0 ? `Start` : `+`}</div>
          </button>
        </div>
        {children}
      </div>

      <Canvas style={{width:"100vw",height:"100vh"}} shadows camera={{fov:40,position:[isSmallDevice?5:3,0,0]}}
      gl={{ preserveDrawingBuffer: true, }}
    >
      <OrbitControls />
{/*       
      <Html occlude="blending"  transform distanceFactor={.9} rotation={[0,-Math.PI/2,0]}  
        position={[-.509,-0.05,0]}
      >
          <div className="z--1">
            <TradingViewChart />
          </div>
        </Html> */}

      <SceneConfig  sceneCalls={{setTimerChartLoading}} />
      <SceneWrapper sceneState={sceneState} sceneCalls={{s__fullfuttermList,initFuturesTimeframe,
        s__midtermList, s__fullmidtermList,
        s__startRotationTime, s__shorttermList, s__isChartLoading}} />
      <SceneEnv />
    </Canvas>
    </div>
  )
}
