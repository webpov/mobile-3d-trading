"use client"
import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WormHoleModel from "@/model/parts/WormHoleModel";
import { Fog } from "three";
import The3DPong from "@/model/npc/The3DPong";


export default function MiniGameStage({children}:{children:ReactNode}) {
  const searchParams = useSearchParams()
  const noAutoRotate = searchParams.has('norotate') || false
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [mounted, s__Mounted] = useState(false);
  const $pongGame:any = useRef()
  const onGameEnd = (val:number)=>{
    if (!$pongGame.current) {return}
    alert(`You've reached +${val} points \n Max Score: ${$pongGame.current.maxScore}`)
  }

  useEffect(() => {
      s__Mounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="flex-col tx-altfont-4  ">
      <Link href="/x" className="z-600 nodeco pl-8 Q_xs_pl-2 pos-abs top-0 mb-8 left-0 opaci-chov--50" 
        onClick={()=>s__Mounted(false)}
      >
        <div className="flex gap-1 pa-2 flex-justify-start" >
          <div className="tx-lx" > 🎱 </div>
        </div>
      </Link>
      <Canvas style={{width:"100vw",height:"100vh"}} shadows 
        camera={{fov:50,position:[isSmallDevice?8:6,1,0]}}
        gl={{ preserveDrawingBuffer: true, }}
        onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        <OrbitControls rotateSpeed={2} autoRotateSpeed={.15} autoRotate={!noAutoRotate} dampingFactor={.2}
            minAzimuthAngle={Math.PI*2}
            maxAzimuthAngle={Math.PI*2}
            minPolarAngle={0.5}
            maxPolarAngle={1.75}
        />
        <ambientLight intensity={0.02} />
        <pointLight position={[2,2,2]} />
        
        <group position={[0,0,-2]}>
            <The3DPong ref={$pongGame} calls={{endGame:onGameEnd}}  />
        </group>
      </Canvas>
    </div>
  )
}
