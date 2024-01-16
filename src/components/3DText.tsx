import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useMemo, useRef } from 'react'
import { MeshMatcapMaterial, TorusGeometry } from 'three'

export const Experience: React.FC = () => {
  const donuts = useRef<THREE.Mesh[]>([])

  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  const torusGeometry = useMemo(() => {
    return new TorusGeometry(1, 0.6, 16, 32)
  }, [])

  const meshMatcapMaterial = useMemo(() => {
    return new MeshMatcapMaterial({
      matcap: matcapTexture,
    })
  }, [])

  const { perfVisible } = useControls({
    perfVisible: true,
  })

  useFrame((_state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.5
    }
  })

  return (
    <>
      {perfVisible && <Perf position={'top-left'} />}

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          font={'./fonts/Ace Records_Regular.json'}
        >
          HELLO R3F
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

      {[...Array(100)].map((_, index) => (
        <mesh
          ref={(element) => {
            donuts.current.push(element!)
          }}
          geometry={torusGeometry}
          material={meshMatcapMaterial}
          key={index}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}

      {/* <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Model />
      </Suspense> */}
    </>
  )
}
