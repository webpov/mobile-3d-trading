import { useFrame } from '@react-three/fiber';
import { useContext, useEffect, useRef, useState } from 'react';


import DynaText from '@/model/text/DynaText';
import { useTimeout } from 'usehooks-ts';

function PerfectSuccess({ msg = "", s__msg,  }: any) {
  useEffect(()=>{
      if (msg == "") return
      
  },[msg])
  const onHide = ()=>{
      s__msg("")
  }

  if (msg != "") {
      return <InnerNotification s__msg={s__msg}  onHide={onHide} msg={msg}  />
  }
  return <></>
}
function InnerNotification({ msg = "", s__msg, onHide }: any) {

  const $textGroup: any = useRef()
  useFrame((ctx, delta) => {
    if (!$textGroup.current) return
    $textGroup.current.position.y = Math.sin(Date.now() / 500) / 50 
  })

  
  const [visible, setVisible] = useState(true)

  const hide = ()=>{
      s__msg("")
      setVisible(false)
      // alert("asd")
      // onHide()
  }

  // useEffect(()=>{

  //   if (!msg) return
  //   useTimeout(hide, 4000)
  // },[msg])
  
    useTimeout(hide, 2000)
    if (!msg) return <></>

  return (<>
    <group position={[-.34, 0.3, 0]} rotation={[0,0,0]}>
      <group ref={$textGroup}>
        {/* <DynaText  
           text="Click " color="#fff" emissive="#999" font={0.2}
          position={[0, 0.35, 0]} rotation={[0, Math.PI/2, 0]}
        >
        </DynaText> */}
        <DynaText  
           text={msg} color="#fff" emissive="#999" font={0.12}
          position={[0, 0.2, 0]} rotation={[0, Math.PI/2, 0]}
        >
        </DynaText>
      </group>
    </group>
  </>)
}

export default PerfectSuccess