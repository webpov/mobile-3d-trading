"use client"
import { Sphere } from "@react-three/drei";
import { useRef, useEffect, useState, forwardRef } from "react"
import { useRouter } from 'next/navigation'


import { SpinnerClicker } from "@/model/level/solarsystem/SpinnerClicker";
import { BounceSpinnerClicker } from "./BounceSpinnerClicker";


const SolarFidgetSpinner: any = forwardRef(({ sceneState, sceneCalls, isSpinActive, s__isSpinActive, fullSpinCount, s__fullSpinCount, ...props }: any, ref: any) => {
  const router = useRouter()
  const $systemSphere: any = useRef()
  const $worldSphere: any = useRef()
  const $sunSphere: any = useRef()
  const [isMoonSpinActive, s__isMoonisSpinActive] = useState(false);
  useEffect(() => {
    console.log("fullSpinCount", fullSpinCount)
    if (fullSpinCount == 0) { return }
    sceneCalls.audioNotification("neutral", "../sound/ping.wav")
  }, [fullSpinCount])


  return (<>
    <pointLight castShadow args={[0xfffaf6, .75, 40]} position={[3, 1, 2]} />
    <group  >
      <BounceSpinnerClicker {...{
        sceneCalls,
        isSpinActive,
        s__isSpinActive,
        fullSpinCount, s__fullSpinCount
      }}
        triggerModel={
          <group position={[0, -1, 0]} ref={$sunSphere} >
            <Sphere args={[1, 12, 12]}>
              <meshStandardMaterial color="gold"
                emissive={isSpinActive ? "#221100" : "#000"} />
            </Sphere>
          </group>
        }
      >
        <group >
          <group ref={$systemSphere} >
            <group position={[0, -1, 2.2]} ref={$worldSphere} >
              <SpinnerClicker {...{
                sceneCalls,
                isSpinActive: isMoonSpinActive,
                s__isSpinActive: s__isMoonisSpinActive,
                fullSpinCount, s__fullSpinCount
              }}
                triggerModel={
                  <Sphere args={[0.55, 12, 12]} castShadow receiveShadow>
                    <meshStandardMaterial color="orange" emissive={isMoonSpinActive ? "#332200" : "#000"} />
                  </Sphere>
                }
              >
                <Sphere args={[0.25, 12, 12]} position={[0, 0, .85]} castShadow receiveShadow
                  onClick={() => { router.push("/x/fidget?dof"); window.location.reload() }}
                >
                  <meshStandardMaterial color="silver" emissive={isSpinActive ? "#444444" : "#000"} />
                </Sphere>
              </SpinnerClicker>
            </group>
          </group >
        </group >
      </BounceSpinnerClicker>
      <pointLight castShadow args={[0xfffaf6, 1, 1]} position={[0, 0.2, 3.1]} />
    </group >

  </>)
})


SolarFidgetSpinner.displayName = 'SolarFidgetSpinner'
export default SolarFidgetSpinner