import {
  Viro3DObject,
  ViroARScene,
  ViroAmbientLight,
  ViroAnimations,
  ViroBox,
  ViroMaterials,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@viro-community/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export const HelloWorldSceneAR = (props: {
  sceneNavigator: { viroAppProps: any };
}) => {
  const [runAnimation, setRunAnimation] = useState(true);
  const [rotation, setRotation] = useState([-45, 50, 40]);
  const [position, setPosition] = useState([0, -0.4, -1]);

  let data = props.sceneNavigator.viroAppProps;

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  ViroMaterials.createMaterials({
    wood: {
      diffuseTexture: require("../res/wood2.jpg"),
    },
    teserract: {
      diffuseTexture: require("../res/teserract.jpeg"),
    },
  });

  ViroAnimations.registerAnimations({
    rotate3: {
      duration: 500,
      properties: { rotateX: "+=30", rotateY: "+=20", rotateZ: "+=10" },
    },
    rotate2: {
      duration: 500,
      properties: { rotateX: "+=30", rotateY: "+=20" },
    },
    rotate: {
      duration: 500,
      properties: { rotateY: "+=30" },
    },
  });
  const PauseAnimation = () => {
    setRunAnimation(!runAnimation);
  };
  const rotateObj = (rotateState, rotationFactor, source) => {
    let currentRotation = [
      rotation[0] - rotationFactor,
      rotation[1] - rotationFactor,
      rotation[2] - rotationFactor,
    ];
    setRotation(currentRotation);
  };
  const moveObj = (newPosition) => {
    setPosition(newPosition);
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={"Hello"}
        scale={[0.2, 0.2, 0.2]}
        position={[0, 0.3, -1]}
        style={styles.helloWorldTextStyle}
      />
      <ViroAmbientLight color="#fff" />
      {data?.object === "ironman" ? (
        <Viro3DObject
          source={require("../res/IronMan/IronMan.obj")}
          position={[0, -0.75, -1.7]}
          scale={[0.005, 0.005, 0.005]}
          type="OBJ"
          rotation={[30, 15, 0]}
          animation={{
            name: "rotate",
            loop: true,
            run: runAnimation,
            interruptible: true,
          }}
          onClick={() => {
            PauseAnimation();
          }}
        />
      ) : data?.object === "skull" ? (
        <Viro3DObject
          source={require("../res/skull/12140_Skull_v3_L2.obj")}
          position={position}
          scale={[0.005, 0.005, 0.005]}
          type="OBJ"
          rotation={[-45, 65, 35]}
          onRotate={rotateObj}
          onDrag={moveObj}
        />
      ) : (
        <>
          <ViroBox
            height={1}
            length={1}
            width={1}
            position={[0, 0, -1]}
            scale={[0.2, 0.2, 0.2]}
            materials={["wood"]}
            animation={{
              name: "rotate3",
              loop: true,
              run: runAnimation,
            }}
            onClick={() => {
              PauseAnimation();
            }}
          />
          <ViroBox
            height={1}
            length={1}
            width={1}
            position={[0, -0.5, -1]}
            scale={[0.2, 0.2, 0.2]}
            materials={["teserract"]}
            animation={{
              name: "rotate2",
              loop: true,
              run: runAnimation,
            }}
            onClick={() => {
              PauseAnimation();
            }}
          />
        </>
      )}
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
