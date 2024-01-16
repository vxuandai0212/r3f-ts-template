declare global {
  namespace JSX {
    interface IntrinsicElements {
      'portalShaderMaterial': ReactThreeFiber.Object3DNode<PortalShaderMaterial, typeof THREE.ShaderMaterial>;
    }
  }
}