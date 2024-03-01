import { SafeAreaView, StyleSheet, View } from "react-native";
import { Shoe3D } from "./src/Shoe3D";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        <Shoe3D />
      </View>
      <View style={styles.detailContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },
  modalContainer: {
    height: "40%",
    overflow: "visible",
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
