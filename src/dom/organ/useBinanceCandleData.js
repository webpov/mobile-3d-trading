import { useState, useEffect } from 'react';

const useBinanceCandleData = () => {
  const [candleData, setCandleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        const response = await fetch(
          'https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1m'
        );
        if (response.ok) {
          const data = await response.json();
          setCandleData(data);
          setLoading(false);
        } else {
          // Handle error here
          setLoading(false);
        }
      } catch (error) {
        // Handle error here
        setLoading(false);
      }
    };

    fetchCandleData();
  }, []);

  return { candleData, loading };
};

export default useBinanceCandleData;
