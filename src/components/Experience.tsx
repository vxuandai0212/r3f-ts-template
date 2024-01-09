import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { CustomObject } from '@/components/CustomObject'
import { OrbitControls } from '@react-three/drei'

export const Experience: React.FC = () => {
  const cubeRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
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
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color={'orange'} />
        </mesh>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.5}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color={'red'} />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} />
      </mesh>
      <CustomObject />
    </>
  )
}
