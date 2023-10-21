import { Stars } from "@react-three/drei";


export function SceneEnv({pageState}:any) {
  return (<>
      <color attach="background" args={["#111111"]} /> 		
      <ambientLight intensity={0.05} />
      <spotLight  castShadow args={[0xffffff, 1, 100]} position={[2, 2, 2]} />     
  </>)
}