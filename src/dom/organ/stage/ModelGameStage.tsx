"use client"
import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WormHoleModel from "@/model/parts/WormHoleModel";
import { Fog } from "three";
import { LoadingFullScreen } from "@/model/tools/LoadingFullScreen";
import TiltShiftEffects from "@/model/tools/tiltshift";


export default function ModelGameStage({children}:{children:ReactNode}) {
  const searchParams = useSearchParams()
  const isDOF = searchParams.has('dof')
  const noAutoRotate = searchParams.has('norotate') || false
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [mounted, s__Mounted] = useState(false);

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
        camera={{fov:50,position:[isSmallDevice?8:6,1,0]}}
        gl={{ preserveDrawingBuffer: true, }}
        onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        <OrbitControls rotateSpeed={0.75} autoRotateSpeed={.25} autoRotate={!noAutoRotate} 
          dampingFactor={.01} maxPolarAngle={1.65} minPolarAngle={1.125}
        />
        {isDOF && <TiltShiftEffects />}
        <ambientLight intensity={0.02} />
        <pointLight position={[2,2,2]} />
        <pointLight position={[-1,1,-3]} intensity={0.05} />
        <group rotation={[0,0,0]}>
          <group position={[0,0,0]}>
            <Box rotation={[1,1,1]}> <meshStandardMaterial color="white" /> </Box>
            <group position={[0,-3, 0]} > <WormHoleModel /> </group>
          </group>    
        </group>
      </Canvas>
    </div>
  )
}
