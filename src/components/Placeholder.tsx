import { MeshProps } from '@react-three/fiber'

type Props = MeshProps

export const Placeholder: React.FC<Props> = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial wireframe color={'red'} />
    </mesh>
  )
}
