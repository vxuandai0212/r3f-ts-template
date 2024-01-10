import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { CustomObject } from '@/components/CustomObject'
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei'
import font from '@/assets/fonts/Ace-Records.ttf'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export const Experience: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null!)
  const cubeRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)

  const { position, color, visible } = useControls('sphere', {
    position: {
      value: {
        x: -2,
        y: 0,
      },
      step: 0.01,
      joystick: 'invertY',
    },
    color: '#ff0000',
    visible: true,
  })

  const { perfVisible } = useControls({
    perfVisible: true
  })

  useFrame((state, delta) => {
    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle)
    // state.camera.position.z = Math.cos(angle)
    // state.camera.lookAt(0, 0, 0)
    cubeRef.current.rotation.y += delta
    // groupRef.current.rotation.y += delta
  })
  return (
    <>
      <color attach="background" args={['ivory']} />
      { perfVisible && <Perf position={"top-left"} /> }
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <PivotControls
          anchor={[0, 0, 0]}
          depthTest={false}
          lineWidth={4}
          axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
          scale={2}
        >
          <mesh
            ref={sphereRef}
            position={[position.x, position.y, 0]}
            visible={visible}
          >
            <sphereGeometry />
            <meshStandardMaterial color={color} />
            <Html
              position={[1, 1, 0]}
              wrapperClass='label'
              center
              distanceFactor={6}
              occlude={[sphereRef, cubeRef]}
            >
              That's a sphere
            </Html>
          </mesh>
        </PivotControls>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.5}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color={'red'} />
        </mesh>
        <TransformControls object={cubeRef} />
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color={'greenyellow'}
        />
        {/* <meshStandardMaterial color={'greenyellow'} /> */}
      </mesh>
      {/* <CustomObject /> */}
      <Float speed={5} floatIntensity={2}>
        <Text
          font={font}
          fontSize={1}
          color={'salmon'}
          position-y={2}
          maxWidth={2}
        >
          I LOVE R3F
        </Text>
      </Float>
    </>
  )
}
