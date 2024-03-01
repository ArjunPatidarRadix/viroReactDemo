import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";
import THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from "three";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";

export const Shoe3D = () => {
  const Shoe = (props) => {
    const meshRef = useRef();
    const [base, normal, rough] = useLoader(TextureLoader, [
      require("../assets/Shoes/11741_shoes_v1_diffuse.jpg"),
      require("../assets/Shoes/11741_shoes_v1_specular.jpg"),
      require("../assets/Shoes/11741_shoes_v1_bump.jpg"),
    ]);
    const material = useLoader(
      MTLLoader,
      require("../assets/Shoes/11741_shoes_v1_l2.mtl")
    );
    useLayoutEffect(() => {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = base;
          child.material.specularMap = normal;
          child.material.bumpmap = rough;
        }
      });
    }, []);
    const obj = useLoader(
      OBJLoader,
      require("../assets/Shoes/11741_shoes_v1_l2.obj"),
      (loader) => {
        material.preload();
        loader.setMaterials(material);
      }
    );

    useFrame((state, delta) => {
      let { x, y, z } = props.animatedSensor.sensor.value;
      x = ~~(x * 110) / 6000;
      y = ~~(y * 110) / 6000;
      meshRef.current.rotation.x += x;
      meshRef.current.rotation.y += y;
    });
    return (
      <mesh rotation={[-1, 0, 0]} ref={meshRef}>
        <primitive object={obj} scale={0.4} position={props.position} />
      </mesh>
    );
  };
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });

  return (
    <Canvas>
      <ambientLight />
      <pointLight
        position={[10, 10, 10]}
        intensity={1000}
        color="#fff"
        distance={100}
      />
      {/* <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh> */}
      <Suspense fallback={null}>
        {/* <Shoe  position={[1, 2, 2]} /> */}
        <Shoe position={[0, 3, 0]} animatedSensor={animatedSensor} />
      </Suspense>
    </Canvas>
  );
};
