// CandleClickGame.js (Game Component)

import React, { useState, useEffect } from 'react';
import useBinanceCandleData from './useBinanceCandleData';

const CandleClickGame = () => {
  const { candleData, loading } = useBinanceCandleData();
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => {
    setScore(0);
    setGameActive(true);
    const startTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeElapsed = (currentTime - startTime) / 1000;

      if (timeElapsed < 60) {
        // Check the last candle
        const lastCandle = candleData[candleData.length - 2];
        const closePrice = parseFloat(lastCandle[4]);
        const isGreenCandle = closePrice > parseFloat(lastCandle[1]);

        if (isGreenCandle) {
          setScore(score + 1);
        } else {
          setScore(score - 1);
        }
      } else {
        endGame(intervalId);
      }
    }, 1000); // Check every 1 second
  };

  const endGame = (intervalId) => {
    setGameActive(false);
    clearInterval(intervalId);
  };

  return (
    <div>
        {/* {JSON.stringify(candleData)} */}
      <h1>Candle Click Game</h1>
      <p>Score: {score}</p>
      {loading && <p>Loading candle data...</p>}
      {!gameActive && !loading && (
        <button onClick={startGame}>Start</button>
      )}
      {gameActive && (
        <button onClick={() => endGame()}>End</button>
      )}
    </div>
  );
};

export default CandleClickGame;
