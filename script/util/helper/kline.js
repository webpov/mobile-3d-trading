import { ShortHardcodedKLines } from "@/../script/constant/klines"

export const getCurrentPrices = async (symbol="BTCUSDT") => {
  try {
    const spotSymbol = symbol ; // Assuming the spot symbol is named based on the provided symbol
    const futureSymbol = symbol ; // Assuming the future symbol is named based on the spot symbol

    const [spotPrice, futurePrice] = await Promise.all([
      fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${spotSymbol}`),
      fetch(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${futureSymbol}`)
    ]);

    const [spotPriceData, futurePriceData] = await Promise.all([
      spotPrice.json(),
      futurePrice.json()
    ]);

    return {
      spotPrice: parseFloat(spotPriceData.price),
      futurePrice: parseFloat(futurePriceData.price)
    };
  } catch (e) {
    console.log("FETCH FAILED");
    return null;
  }
};

export const getFuturesPricesList = async (timeframe, requestToken, startTime) => {
  const t = timeframe || "1m";
  const theToken = requestToken || "BTCUSDT"; // Replace with the appropriate futures trading pair symbol.

  const urlBase = `https://fapi.binance.com/fapi/v1/klines?interval=${t}&symbol=${theToken}&startTime=${startTime || ''}`;
  
  let theList = null;
  try {
    const theListRes = await fetch(urlBase);
    theList = await theListRes.json();
  } catch (e) {
    console.log("FETCH FAILED");
    // Handle the error appropriately.
  }

  return theList;
}

export const getPricesList = async (timeframe, requestToken, startUnixDate) => {
    let t = timeframe || "1m"
    let theToken = requestToken || "BTCUSDT"
  // let startUnixDate = getRandomUnixDate()
    // let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&startTime=${startUnixDate}&symbol=`
    let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`
    urlBase += theToken
    let theList = null
    try {
      const theListRes = await fetch(urlBase)
      theList = await theListRes.json()
    } catch (e) {
      console.log("FETCH FAILED")
      theList = ShortHardcodedKLines
    }
  
    return theList
  }
  
export const getRelevantChartData = (priceList) => {
  
  let theLastIndex = priceList.length < 500 ? priceList.length-1 : 499
  let latestUnix = parseInt( priceList[theLastIndex][0] )
  let oldestUnix =  parseInt(priceList[0][0])
  const volumeList = priceList.map((item) => parseFloat(item[5])); // Extract volume data

  // console.log("latestUnix, oldestUnix", latestUnix, oldestUnix)

  // s__liveUnix(latestUnix - 2)
  // s__diffUnix(oldestUnix - latestUnix)
  
  // console.log("closingPrices", priceList)
  const closingPrices = priceList.map((item) => parseFloat(item[4]));
  // s__pricesList(closingPrices)
  // console.log("closingPrices", closingPrices)
  return {
    latestUnix,
    oldestUnix,
    closingPrices,
    volumeList, // Include volume in the returned object

  }
}
