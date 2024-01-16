import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {
  EffectComposer,
  ToneMapping,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { Vector2 } from 'three'

export const PostProcessing: React.FC = () => {
  return (
    <>
      <color args={['#ffffff']} attach='background' />

      <EffectComposer disableNormalPass>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        />
        <Glitch
          delay={new Vector2(0.5, 1)}
          duration={new Vector2(0.1, 0.3)}
          strength={new Vector2(0.02, 0.04)}
          mode={GlitchMode.CONSTANT_WILD}
        />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} />
        <Bloom mipmapBlur luminanceThreshold={1.1} /> */}
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        />
        <ToneMapping />
      </EffectComposer>

      <Perf position='top-left' />

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={3.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color={'orange'} />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color={'mediumpurple'} />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={'greenyellow'} />
      </mesh>
    </>
  )
}
