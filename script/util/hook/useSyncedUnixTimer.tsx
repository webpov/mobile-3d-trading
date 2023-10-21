import { useEffect, useState } from "react";
import { getCurrentPrices, getFuturesPricesList, getPricesList, getRelevantChartData } from "../helper/kline";

export default function useSyncedUnixTimer({state,calls}:any) {
    const [startRotationTime, s__startRotationTime] = useState(0); 
    const [points, s__points] = useState(0)
    const [lastPrices, s__lastPrices] = useState<any>()
  const [isChartLoading, s__isChartLoading] = useState(true)
    
    const [fullmidtermList, s__fullmidtermList] = useState<any>([])
    const [fullfuttermList, s__fullfuttermList] = useState<any>([])
    const [shorttermList, s__shorttermList] = useState<any>([])
    const [midtermList, s__midtermList] = useState<any>([])
    
    const [delayMsecs, s__delayMsecs] = useState(5000)
  
    
    const triggerGetLastPrice = async () => {
      let currentData:any = await getCurrentPrices(state.symbol)
      // console.log(JSON.stringify(currentData))
      // console.log("shorttermList", shorttermList)
      if (!!fullfuttermList && fullfuttermList.length == 500) {
        const newArray = [...fullfuttermList];
        // Change the last position's "futurePrice" with the value from currentData
        // console.log(`last price ${newArray[newArray.length - 1][4]} new price ${parseFloat(currentData.futurePrice)}`)
        const diff = Math.abs(newArray[newArray.length - 1][4] - parseFloat(currentData.futurePrice))
        console.log("next", newArray[newArray.length - 1][0] + 60000)
        const timeDiff = startRotationTime + 60000 - Date.now() 
        console.log("timeDiff", timeDiff)
        if (diff > 10 || timeDiff < 0) {
          console.log("timeDiff < 0",)
          s__startRotationTime(startRotationTime + 60000)
          await initFuturesTimeframe()
          setTimerChartLoading()

          // s__points(points+1)
          // setTimeout(()=>{
          //   s__points(1)

          // },3000)
        }
      }
      s__lastPrices(currentData)
    }
  
    const setTimerChartLoading = async () => {
      if (isChartLoading) return
      s__isChartLoading(true)
      setTimeout(()=>{
        s__isChartLoading(false)
      },1500)
    }

    const fetchProperUnix = async () => {
      
      const pricesList = await getPricesList("1m", state.symbol)
      let pricesData = getRelevantChartData(pricesList)
      s__startRotationTime(pricesData.latestUnix)
    }
    const initMid = async () => {

      let midTermPricesList = await getPricesList("1h",state.symbol)
      let midTermPricesData = getRelevantChartData(midTermPricesList)
      s__midtermList(midTermPricesData.closingPrices)
      s__fullmidtermList(midTermPricesList)
    }
    useEffect(() => {
      if (points == 0) {
        initFuturesTimeframe()
        initMid()
        
        return
      }
      
      // setTimerChartLoading()
      console.log("asd",startRotationTime)
      let timeoutId:any = null;
    
      const repeatAction = () => {
        triggerGetLastPrice();
        timeoutId = setTimeout(repeatAction, delayMsecs); // Schedule the next repetition
      };
    
      if (points) {
        timeoutId = setTimeout(repeatAction, delayMsecs); // Initial trigger
      }
    
      return () => {
        clearTimeout(timeoutId);
      };
    }, [points, startRotationTime, delayMsecs]);
  
    const initFuturesTimeframe = async () => {
      let futTermPricesList = await getFuturesPricesList("1m", state.symbol)
      s__fullfuttermList(futTermPricesList)
      let futTermPricesData = getRelevantChartData(futTermPricesList)
      s__startRotationTime(futTermPricesData.latestUnix)
      // s__scopeStart(futTermPricesData.oldestUnix)
      s__shorttermList(futTermPricesData.closingPrices)
      // s__futtermVolumeList(futTermPricesData.volumeList)
      // console.log(sceneState.fullfuttermList, futTermPricesData)
      s__isChartLoading(false)
    }
    return {
      initFuturesTimeframe,
      setTimerChartLoading,
      midtermList, s__midtermList,
      isChartLoading, s__isChartLoading,
      fullmidtermList, s__fullmidtermList,
      fullfuttermList, s__fullfuttermList,
      lastPrices, s__lastPrices,
      points, s__points,
      startRotationTime, s__startRotationTime,
      shorttermList, s__shorttermList
    }
  }