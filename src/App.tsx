import { Canvas } from '@react-three/fiber'
import { Experience } from '@/components/Experience'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { Leva } from 'leva'

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 2, 6],
        }}
      >
        <Experience />
      </Canvas>
    </>
  )
}

export default App
