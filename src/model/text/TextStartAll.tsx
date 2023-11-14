import { useFrame } from '@react-three/fiber';
import { useContext, useRef, useState } from 'react';


import DynaText from '@/model/text/DynaText';
import { useTimeout } from 'usehooks-ts';

function TextStartAll({ msg = "", s__msg, onHide }: any) {

  const $textGroup: any = useRef()
  useFrame((ctx, delta) => {
    if (!$textGroup.current) return
    $textGroup.current.position.y = Math.sin(Date.now() / 500) / 50 
    // console.log("Math.sin(Date.now() / 500) / 50 ", Math.sin(Date.now() / 500) / 50 )
  })

  
  // const [visible, setVisible] = useState(true)

  // const hide = ()=>{
  //     s__msg("")
  //     setVisible(false)
  //     // alert("asd")
  //     // onHide()
  // }

  // useTimeout(hide, 4000)
  
  // if (!msg) return <></>

  return (<>
    <group position={[-.34, 0.1, 0]} rotation={[0,0,0]}>
      <group ref={$textGroup}>
        <DynaText  
           text="Click " color="#fff" emissive="#999" font={0.15}
          position={[0, 0.38, 0]} rotation={[0, Math.PI/2, 0]}
        >
        </DynaText>
        <DynaText  
           text="HERE" color="#fff" emissive="#999" font={0.15}
          position={[0, 0.25, 0]} rotation={[0, Math.PI/2, 0]}
        >
        </DynaText>
      </group>
    </group>
  </>)
}

export default TextStartAll