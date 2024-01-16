import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { Color, Mesh, ShaderMaterial } from 'three'
import { GLTF } from 'three/examples/jsm/Addons.js'
import portalVertexShader from '@/assets/shaders/portal/vertex.glsl'
import portalFragmentShader from '@/assets/shaders/portal/fragment.glsl'
import { Object3DNode, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

type PortalShaderMaterialType = typeof ShaderMaterial & {
  key: string
  uTime: number
  uColorStart: THREE.Color
  uColorEnd: THREE.Color
}

const PortalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new Color('#ffffff'),
    uColorEnd: new Color('#000000'),
  },
  portalVertexShader,
  portalFragmentShader
)

extend({ PortalShaderMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    portalShaderMaterial: Object3DNode<
      PortalShaderMaterialType,
      PortalShaderMaterialType
    >
  }
}

interface PortalGLTF extends GLTF {
  nodes: {
    baked: Mesh
    poleLightA: Mesh
    poleLightB: Mesh
    portalLight: Mesh
  }
}

export const PortalScene: React.FC = () => {
  const { perfVisible } = useControls({
    perfVisible: true,
  })

  const { nodes } = useGLTF('./model/portal.glb') as unknown as PortalGLTF

  const bakedTexture = useTexture('./model/baked.jpg')
  bakedTexture.flipY = false

  const portalMaterial = useRef<PortalShaderMaterialType>(null!)

  useFrame((_state, delta) => {
    portalMaterial.current.uTime += delta
  })

  return (
    <>
      <color args={['#030202']} attach={'background'} />

      {perfVisible && <Perf position={'top-left'} />}

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color={'#ffffe5'} />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color={'#ffffe5'} />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalShaderMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  )
}
