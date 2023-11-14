"use client";

import { Sphere, Stars, useHelper, useTexture } from "@react-three/drei";
import { useRef } from "react";


export function SceneEnv({...props}:any) {
  // const imgTexture = useTexture("./textures/whiteroomhdriblur.jpg")
  
  return (<group {...props}>
      {/* <Sphere args={[9,24,24]}>
        <meshStandardMaterial emissiveMap={imgTexture}  map={imgTexture} side={1} />    
    </Sphere> */}
      <ambientLight intensity={0.02} />
      <spotLight castShadow args={[0xfffaf6, .2, 40]} position={[9, 9, 5]} />     


  </group>)
}