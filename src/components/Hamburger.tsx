import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'
import { GLTF } from 'three/examples/jsm/Addons.js'

type Props = GroupProps

interface HamburgerGLTF extends GLTF {
  nodes: {
    bottomBun: Mesh
    meat: Mesh
    cheese: Mesh
    topBun: Mesh
  }
  materials: {
    BunMaterial: MeshStandardMaterial
    SteakMaterial: MeshStandardMaterial
    CheeseMaterial: MeshStandardMaterial
  }
}

export const Hamburger: React.FC<Props> = (props) => {
  const { nodes, materials } = useGLTF(
    './hamburger-draco.glb'
  ) as unknown as HamburgerGLTF
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.82, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        position={[0, 3.77, 0]}
      />
    </group>
  )
}

useGLTF.preload('./hamburger-draco.glb')
