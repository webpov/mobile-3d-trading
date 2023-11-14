import { useFrame } from '@react-three/fiber';
import { useContext, useEffect, useRef, useState } from 'react';
import DynaText from '@/model/text/DynaText';
import { useTimeout } from 'usehooks-ts';
import { Sphere } from '@react-three/drei';

function JumpingBlobNotification({ msg = "", s__msg, }: any) {
  useEffect(() => {
    if (msg === "") return;
  }, [msg]);

  const onHide = () => {
    s__msg("");
  };

  if (msg !== "") {
    return <InnerNotification s__msg={s__msg} onHide={onHide} msg={msg} />;
  }
  return <></>;
}

function InnerNotification({ msg = "", s__msg, onHide }: any) {
  const $textGroup: any = useRef();
  const startTime = Date.now();

  useFrame((ctx, delta) => {
    if (!$textGroup.current) return;

    const elapsed = (Date.now() - startTime) / 1000; // Convert milliseconds to seconds
    const yOffset = Math.sin(elapsed * Math.PI) / 2;

    $textGroup.current.position.x = -yOffset;

    // Hide the notification after 3 seconds
    if (elapsed >= 3) {
      hide();
    }
  });

  const [visible, setVisible] = useState(true);

  const hide = () => {
    s__msg("");
    setVisible(false);
  };
  useTimeout(hide, 1000); // Hide after 3 seconds

  if (!msg) return <></>;

  return (
    <>
      <group position={[-0.58, 0.6, 0.25]} rotation={[0, 0, 0]}>
        <group ref={$textGroup}>
          <Sphere args={[0.06]}>
            <meshStandardMaterial color="gold" />
          </Sphere>
        </group>
      </group>
    </>
  );
}

export default JumpingBlobNotification;
