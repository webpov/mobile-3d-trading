import { Box, Cylinder, OrbitControls, Sphere, RoundedBox, useTexture } from "@react-three/drei";

export default function DeviceAntenna () {
    return <>
        
    <Cylinder args={[.01,.03,1,6]} position={[0,.25,0]}>
    <meshStandardMaterial color="grey" />

    </Cylinder>
      <Sphere args={[.1,6,6]} scale={[1,.5,1]}  >
        <meshStandardMaterial color="lightgrey" />
      </Sphere>
    </>
}