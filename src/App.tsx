import { Canvas } from '@react-three/fiber'
import { PostProcessing } from '@/components/PostProcessing'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { Leva } from 'leva'
import { Bvh } from '@react-three/drei'

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [1, 2, 6],
        }}
      >
        {/* <Bvh> */}
          <PostProcessing />
        {/* </Bvh> */}
      </Canvas>
    </>
  )
}

export default App
