import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import {Asset} from 'expo-asset';
import {Suspense, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {Text} from 'react-native';
import THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {TextureLoader} from 'three';
// import {useAnimatedSensor, SensorType} from 'react-native-reanimated';

export const Nike3d = () => {
  const Box = props => {
    const meshRef = useRef();
    const [active, setActive] = useState(false);

    useFrame((state, delta) => {
      if (active) {
        // meshRef.current.rotation.x += delta;
        meshRef.current.rotation.y += delta;
        // meshRef.current.rotation.z += delta;
      }
    });
    return (
      <mesh
        ref={meshRef}
        {...props}
        scale={active ? 1.5 : 0.5}
        onClick={event => setActive(!active)}>
        <boxGeometry />
        <meshStandardMaterial color={active ? 'green' : 'gray'} />
      </mesh>
    );
  };

  //   const Shoe = props => {
  //     const meshRef = useRef();
  //     const [base, normal, rough] = useLoader(TextureLoader, [
  //       require('../res/Airmax/textures/BaseColor.jpg'),
  //       require('../res/Airmax/textures/Normal.jpg'),
  //       require('../res/Airmax/textures/Roughness.png'),
  //     ]);
  //     const material = useLoader(MTLLoader, require('../res/Airmax/shoe.mtl'));
  //     const buffer = useLoader(
  //       THREE.FileLoader,
  //       require('../res/Airmax/shoe.obj'),
  //       loader => {
  //         material.preload();
  //         loader.setMaterials(material);
  //       },
  //     );
  //     useLayoutEffect(() => {
  //       obj.traverse(child => {
  //         if (child instanceof THREE.Mesh) {
  //           child.material.map = base;
  //           child.material.normalMap = normal;
  //           child.material.roughnessMap = rough;
  //         }
  //       });
  //     }, []);
  //     const obj = useMemo(
  //       () => new OBJLoader().parse(THREE.LoaderUtils.decodeText(buffer)),
  //       [buffer],
  //     );
  //     useFrame((state, delta) => {
  //       let {x, y, z} = props.animatedSensor.sensor.value;
  //       x = ~~(x * 100) / 5000;
  //       y = ~~(y * 100) / 5000;
  //       meshRef.current.rotation.x += x;
  //       meshRef.current.rotation.y += y;
  //     });
  //     return (
  //       <mesh rotation={[0.7, 0, 0]} ref={meshRef}>
  //         <primitive object={obj} scale={10} />
  //       </mesh>
  //     );
  //   };
  //   const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
  //     interval: 100,
  //   });

  return (
    <Canvas>
      <ambientLight />
      <pointLight
        position={[10, 10, 10]}
        intensity={1000}
        color="#fff"
        distance={100}
      />
      <Box />
      <Box position={[0, 2, 0]} />
      <Box position={[0, -2, 0]} />
      {/* <Suspense fallback={null}>
        <Shoe animatedSensor={animatedSensor} />
      </Suspense> */}
    </Canvas>
  );
};
