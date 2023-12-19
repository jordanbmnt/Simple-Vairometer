import { useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setErrMsg, setLocationData } from "../Redux/locationSlice";

const alertRequest = (err, extraInfo = "Please grant permission in settings") =>
  Alert.alert(err, extraInfo, [
    {
      text: "Cancel",
      style: "cancel",
    },
    { text: "OK" },
  ]);

const requestPermission = async (dispatch) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    dispatch(setErrMsg("Permission to access location was denied"));
    return;
  }
  await Location.getCurrentPositionAsync({});
  await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 1000,
    },
    (newLocation) => {
      let { coords } = newLocation;
      dispatch(setLocationData(coords));
    },
    (error) =>
      alertRequest(error.message, "Issue occurred with watching position")
  );
};

export default function LocationView() {
  const { heading, latitude, longitude, speed } = useSelector(
    (state) => state.locationData.data
  );
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.locationData.errMsg);

  useEffect(() => {
    requestPermission(dispatch);
  }, []);

  if (errorMsg) {
    alertRequest(errorMsg);
  }

  return (
    <View>
      <View style={{ width: 300, height: 200, flexDirection: "row" }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Heading:</Text>
          <Text style={styles.paragraph}>{heading}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Speed:</Text>
          <Text style={styles.paragraph}>{speed}</Text>
        </View>
      </View>
      <View style={{ width: 300, height: 200, flexDirection: "row" }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Latitude:</Text>
          <Text style={styles.paragraph}>{latitude}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Longitude:</Text>
          <Text style={styles.paragraph}>{longitude}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    color: "#fff",
    borderColor: "white",
    borderWidth: 1,
    width: 150,
    height: 135,
    backgroundColor: "#040000",
  },
  paragraph: {
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
  },
  heading: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
});
