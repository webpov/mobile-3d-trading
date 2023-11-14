import * as THREE from 'three'
import { Html, Text } from '@react-three/drei';
import { MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'three';

export function FollowFontText ({
  theFont = '/fonts/marko.ttf',
  children,
  ...props
}:any)  {

  return (
        
        
        
    <Html {...props} occlude={true}>
    <div className="" style={{ color:"white", fontWeight: "800", textAlign: "center" }}>
      {children}
    </div>
  </Html>
  );
};


export function FollowText ({
  onClick= ()=> {},
  text="asd", position=new THREE.Vector3(), color , emissive="#000000", isSelected = false,font=0.35,
  ...props
}:any)  {

  const material = new THREE.MeshStandardMaterial({ color: color, emissive: emissive });



  return (
      <FollowFontText
        receiveShadow
        // castShadow
        onClick={onClick}
        material={material}
        position={position}
        rotation={props.rotation || [-Math.PI/2,0,0]}
        // rotation={[-Math.PI/2,0,0]}
        // {...props,}
        font='/font.ttf'
        fontSize={font}
        maxWidth={100}
        lineHeight={1}
        letterSpacing={-0.06}
        textAlign="center"

      >
        {text}
      </FollowFontText>
  );
};
export default FollowText