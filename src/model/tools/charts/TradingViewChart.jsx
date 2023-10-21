"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const TradingViewChart = () => {
  const myRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (!window) { return }
      // @ts-ignore
      new window.TradingView.widget({
        "width": 540,
        "height": 720,
        "symbol": "BITSTAMP:BTCUSD",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "container_id": "tradingview-widget-container"
      });
    };
    document.head.appendChild(script);

    return () => {
      // Clean up the TradingView widget script when the component is unmounted
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* <h1 className="ma-0 px-6 Q_xs_px-2 pa-0 tx-bold-2">TradingView Chart Widget</h1>
      <h3 className="ma-0 px-6 Q_xs_px-2 pa-0 tx-link">
        <Link href="https://www.tradingview.com/chart/" target="_blank">
          Tradingview.com/chart
        </Link>
      </h3> */}
      <div className="mt-">
        <div id="tradingview-widget-container" className="tradingview-widget-container mt-8 w-100" ref={myRef}></div>
      </div>
    </>
  );
};

export default TradingViewChart;
