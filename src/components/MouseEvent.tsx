import { OrbitControls, useGLTF, meshBounds } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export const MouseEvent: React.FC = () => {
  const cube = useRef<
    THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>
  >(null!)
  const hamburger = useGLTF('./hamburger.glb')

  useFrame((_state, delta) => {
    cube.current.rotation.y += delta * 0.2
  })

  const eventHandler = () => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
  }

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={3.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2} onClick={(event) => event.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color={'orange'} />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color={'mediumpurple'} />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} />
      </mesh>

      <primitive object={hamburger.scene} scale={0.25} position-y={0.5} 
        onClick={(event: any) => {
          console.log(event.object.name);
          event.stopPropagation()
        }}
      />
    </>
  )
}
