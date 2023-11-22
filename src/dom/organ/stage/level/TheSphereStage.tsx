"use client"
import { Box, Cylinder, OrbitControls, Sphere, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WormHoleModel from "@/model/parts/WormHoleModel";
import { Fog } from "three";
import The3DPong from "@/model/npc/The3DPong";
import { LoadingFullScreen } from "@/model/tools/LoadingFullScreen";


export default function TheSphereStage({children}:{children:ReactNode}) {
  const searchParams = useSearchParams()
  const noAutoRotate = searchParams.has('norotate') || false
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const screenSizeRelativeZoomDistance = isSmallDevice?2:1.5
  const [mounted, s__Mounted] = useState(false);
  const $pongGame:any = useRef()
  const onGameEnd = (val:number)=>{
    if (!$pongGame.current) {return}
    alert(`You've reached +${val} points \n Max Score: ${$pongGame.current.maxScore}`)
  }

  useEffect(() => {
      s__Mounted(true);
  }, []);

  if (!mounted) return <LoadingFullScreen />;

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
        camera={{fov:50,position:[0,0,screenSizeRelativeZoomDistance]}}
        gl={{ preserveDrawingBuffer: true, }}
        onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        <OrbitControls rotateSpeed={0.3} autoRotateSpeed={.15}  dampingFactor={.2} 
            enableZoom={false}
            enablePan={false}
            // minZoom={1}
            // maxZoom={1}
            autoRotate={!noAutoRotate}
            // minAzimuthAngle={Math.PI*2}
            // maxAzimuthAngle={Math.PI*2}
            minPolarAngle={Math.PI/4}
            maxPolarAngle={Math.PI*0.75}
        />
        <ambientLight intensity={0.02} />
        <pointLight position={[2,2,2]} castShadow />
        <pointLight position={[-1,1,-2]} intensity={0.02} castShadow />
        
            <Torus args={[0.6,0.05,4,10]} rotation={[0,0,Math.PI/2]} receiveShadow castShadow>
                <meshStandardMaterial color="white" />
            </Torus>
        <group position={[0,0.22,0]}>
            <Cylinder args={[0.39,0.505,0.2,8]}  >
                <meshStandardMaterial color="lightgrey" />
            </Cylinder>
        </group>
        <group position={[0,-0.22,0]}>
            <Cylinder args={[0.505,0.39,0.2,8]}  >
                <meshStandardMaterial color="lightgrey" />
            </Cylinder>
        </group>
        
        <group position={[0,0,0]}>
            {/* <The3DPong ref={$pongGame} calls={{endGame:onGameEnd}}  /> */}
            <Sphere args={[0.5,8,7]} receiveShadow castShadow>
                <meshStandardMaterial color="white" />
            </Sphere>
            <Sphere args={[0.51,8,7]}>
                <meshStandardMaterial color="grey" wireframe={true} />
            </Sphere>
        </group>
            <Sphere args={[5,5,4]}>
                <meshStandardMaterial wireframe={true} color="white" />
            </Sphere>
      </Canvas>
    </div>
  )
}
