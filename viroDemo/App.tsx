import { ViroARSceneNavigator } from "@viro-community/react-viro";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HelloWorldSceneAR } from "./src/HelloWorldSceneAR";
import { NewScene } from "./src/NewScene";

export default () => {
  const [object, setObject] = useState("ironman");
  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: NewScene,
        }}
        style={styles.f1}
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setObject("ironman")}
        >
          <Text style={styles.btnText}>Ironman</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setObject("skull")}>
          <Text style={styles.btnText}>Skull</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setObject("cube")}>
          <Text style={styles.btnText}>Cube</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  mainView: { flex: 1 },
  controls: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  btn: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
  },
});
