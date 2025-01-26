import { ReactThreeFiber } from "@react-three/fiber";
import { Mesh, Material, BufferGeometry } from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>;
      coneGeometry: ReactThreeFiber.GeometryNode<
        BufferGeometry,
        typeof BufferGeometry
      >;
      cylinderGeometry: ReactThreeFiber.GeometryNode<
        BufferGeometry,
        typeof BufferGeometry
      >;
      planeGeometry: ReactThreeFiber.GeometryNode<
        BufferGeometry,
        typeof BufferGeometry
      >;
      circleGeometry: ReactThreeFiber.GeometryNode<
        BufferGeometry,
        typeof BufferGeometry
      >;
      meshStandardMaterial: ReactThreeFiber.MaterialNode<
        Material,
        typeof Material
      >;
      meshBasicMaterial: ReactThreeFiber.MaterialNode<
        Material,
        typeof Material
      >;
    }
  }
}
