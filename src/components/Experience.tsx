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
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
} from '@react-three/drei'
import font from '@/assets/fonts/Ace-Records.ttf'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { DirectionalLightHelper } from 'three'

export const Experience: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null!)
  const cubeRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!)
  // useHelper(directionalLightRef, DirectionalLightHelper, 1)

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
    perfVisible: true,
  })

  const { contactShadowColor, contactShadowOpacity, contactShadowBlur } =
    useControls('contact shadows', {
      contactShadowColor: '#1d8f75',
      contactShadowOpacity: { value: 0.4, min: 0, max: 1 },
      contactShadowBlur: { value: 2.8, min: 0, max: 10 },
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
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={ 50 } samples={ 17 } focus={ 3.75 } /> */}

      <color attach='background' args={['ivory']} />
      {perfVisible && <Perf position={'top-left'} />}
      <OrbitControls makeDefault />

      {/* <AccumulativeShadows temporal frames={100} scale={10} /> */}
      {/* <RandomizedLight
        amount={8}
        radius={1}
        ambient={0.5}
        intensity={3}
        position={[1, 2, 3]}
        bias={0.001}
      /> */}
      {/* </AccumulativeShadows> */}

      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={contactShadowColor}
        opacity={contactShadowOpacity}
        blur={contactShadowBlur}
        frames={1}
      />

      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
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
            castShadow
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
          castShadow
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
      <mesh
        // receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
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
