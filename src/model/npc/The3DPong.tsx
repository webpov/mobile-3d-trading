import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import DynaText from "../text/DynaText";

export const The3DPong:any = forwardRef(({calls}:any,ref:any) => {
  const [computerPosition, setComputerPosition] = useState(new THREE.Vector3(0, 0.8, 0));
  const [ballPosition, setBallPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [ballYVelocity, setBallYVelocity] = useState(0.02);
  const [ballXVelocity, setBallZVelocity] = useState(0);
  const [playerPaddlePosition, setPlayerPaddlePosition] = useState(new THREE.Vector3(0, -0.8, 0));
  const [score, s__score] = useState(-1)
  const [lastScore, s__Lastscore] = useState(0)
  const $theBall: any = useRef(null);
  const $playerPaddle: any = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  // Function to update the position of the ball
  useImperativeHandle(ref,()=>{
    return {
        maxScore: lastScore,
    }
  })
  const updateBallPosition = () => {
    if (score < 0) return;
    if (!$theBall.current) return;
    let newBallPosition = $theBall.current.position;
    newBallPosition.x += ballXVelocity;
    newBallPosition.y += ballYVelocity;
    // Check for collision with the walls
    if (newBallPosition.y > 0.7 || newBallPosition.y < -0.7) {
      if (newBallPosition.y < -0.7) {
        newBallPosition.y = -0.64;
        const paddleCenter = $playerPaddle.current.position.x; // Assuming playerPaddle is the paddle the ball collides with
        const distanceFromCenter = newBallPosition.x - paddleCenter;
        if (distanceFromCenter >= -0.25 && distanceFromCenter <= 0.25) {
          s__score(score + 1)
        }
        if (distanceFromCenter >= 0 && distanceFromCenter <= 0.25) {
          setBallZVelocity((score / 100) + (distanceFromCenter / 2 * (Math.random() / 2 + 0.5)));
        } else if (distanceFromCenter <= 0 && distanceFromCenter >= -0.25) {
          setBallZVelocity((score / 100) + (distanceFromCenter / 2 * (Math.random() / 2 + 0.5)));
        } else {
          calls.endGame(score)
          s__Lastscore(score < lastScore ? lastScore : score)
          s__score(-1)
          setBallZVelocity(0);
          return
        }
      } else if (newBallPosition.y > 0.7) {
        newBallPosition.y = 0.64;
        setComputerPosition({ ...newBallPosition });
      }
      setBallYVelocity(-ballYVelocity);
    }
    if (newBallPosition.x > 1 || newBallPosition.x < -1) {
      setBallZVelocity(-ballXVelocity);
    }
    // newBallPosition.y = Math.sin(newBallPosition.y+0.8)
    setBallPosition(newBallPosition);
  };
  const startGame = () => {
    setBallZVelocity((Math.random() - 0.5) / 10)
    s__score(0)
    $theBall.current.position.set(0, 0, 0)
  }
  useFrame(({ mouse }, delta) => {
    if (score < 0) return;
    // Call the update functions inside the animation frame loop
    updateBallPosition();
    handleMouseMove(mouse)
  });
  const handleMouseMove = (event: any) => {
    let clientX = event.x / window.innerHeight
    setMouseX(clientX);
    let newPosition = $playerPaddle.current.position;
    newPosition.x = clientX * 1000
    setPlayerPaddlePosition(newPosition);
  };


  return (
    <>
      {/* SCORE */}
      <group position={[0.5, -0.25, 2.5]} rotation={[0, Math.PI, 0]} >
        <DynaText color={"#0099ff"} text={score < 0 ? "Click the \n BLUE Button \n to Play" : score} font={score < 0 ? 0.1 : 0.4}
          onClick={startGame}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          position={[0.05, -0.774, 1]}
        />
        {lastScore > 0 &&
          <DynaText color={"#ff9900"} text={lastScore} font={0.65} position={[0.9, -0.76, 0.9]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
          />
        }
      </group>

      {/* FRAME */}
      <group position={[0, -1.1, 1.45]}>
        <Box args={[1.8, 0.12, 1.4]} castShadow receiveShadow>
          <meshStandardMaterial color="#eee" />
        </Box>
      </group>
      {/* SCREEN */}
      <group position={[0, -0., 0.9]}>
        <Box args={[2.1, 1.62, 0.15]} castShadow receiveShadow>
          <meshStandardMaterial color="#333" />
        </Box>
      </group>
      {/* SCREEN */}

      <group position={[0, 0, 1]}>
        {/* START BUTTON */}
        <Box args={[0.6, 0.2, 0.3]} castShadow receiveShadow position={[0.5, -1.01, 0.95]}
          onClick={startGame}
        >
          <meshStandardMaterial color={"#0099ff"} />
        </Box>

        {/* BALL */}
        <Box args={[0.1, 0.1, 0.1]} castShadow receiveShadow ref={$theBall} scale={0.9}>
          <meshStandardMaterial color="#009900" />
        </Box>
        {/* END OF BALL */}

        {/* PLAYER PADDLE */}
        <Box args={[0.3, 0.1, 0.1]} position={[playerPaddlePosition.x, -0.75, 0]}
          castShadow receiveShadow ref={$playerPaddle}>
          <meshStandardMaterial color="#ff9900" />
        </Box>
        {/* END OF PLAYER PADDLE */}

        {/* COMPUTER PADDLE */}
        <Box args={[0.3, 0.1, 0.1]} castShadow position={[computerPosition.x, 0.75, 0]}
          receiveShadow>
          <meshStandardMaterial color="#ff0000" />
        </Box>
        {/* END OF COMPUTER PADDLE */}
      </group>
    </>
  );
})

The3DPong.displayName = "The3DPong"

export default The3DPong