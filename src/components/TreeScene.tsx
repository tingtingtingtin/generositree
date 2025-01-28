import { Canvas } from "@react-three/fiber";

const TreeModel = ({ onClick }: { onClick: () => void }) => (
  <mesh>
    <mesh onClick={onClick}>
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.9, 2, 32]} />
        <mesh position={[0.2, 0, 0.5]} rotation={[0, Math.PI / 6, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.2, 0, 0.6]} rotation={[0, Math.PI / 6, 0]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <meshStandardMaterial color="green" />
      </mesh>
      <coneGeometry args={[1, 2, 32]} />
      <meshStandardMaterial color="green" />
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
        <meshStandardMaterial color="brown" />
      </mesh>
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -1]}>
      <circleGeometry args={[30, 30]} />
      <meshBasicMaterial color="#15803d" />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.2, -2, 0]}>
      <circleGeometry args={[0.8, 32]} />
      <meshBasicMaterial color="black" opacity={0.3} transparent />
    </mesh>
  </mesh>
);

interface TreeSceneProps {
  handleTreeClick: () => void;
}

const TreeScene: React.FC<TreeSceneProps> = ({ handleTreeClick }) => (
  <Canvas>
    <ambientLight intensity={0.7} />
    <directionalLight position={[10, 4, 5]} intensity={1} />
    <TreeModel onClick={handleTreeClick} />
  </Canvas>
);

export default TreeScene;
