import { useGLTF, Clone } from '@react-three/drei'
import { Hamburger } from './Hamburger'
import { Fox } from './Fox'

export const Model: React.FC = () => {
  const model = useGLTF('./hamburger-draco.glb')
  return (
    <>
      <Clone object={model.scene} position-x={-4} scale={0.35} />
      <Clone object={model.scene} position-x={0} scale={0.35} />
      <Clone object={model.scene} position-x={4} scale={0.35} />
      <Hamburger position-x={8} scale={0.35} />
      <Fox />
    </>
  )
}

useGLTF.preload('./hamburger-draco.glb')
