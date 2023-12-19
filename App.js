import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AccelerometerComponent from "./Components/Accelerometer";
import { useKeepAwake } from "expo-keep-awake";
import LocationView from "./Components/Location";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

export default function App() {
  useKeepAwake();
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <LocationView />
        <AccelerometerComponent />
        <StatusBar style='light' />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000110",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});
