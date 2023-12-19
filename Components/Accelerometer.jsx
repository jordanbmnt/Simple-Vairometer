import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import Sounds from "./Sounds";
import { useDispatch, useSelector } from "react-redux";
import { setAdjustedY, setDirection } from "../Redux/accelerometerSlice";

export default function AccelerometerComponent() {
  const adjustedY = useSelector((state) => state.accelerationData.adjustedY);
  const direction = useSelector((state) => state.accelerationData.direction);
  const dispatch = useDispatch();
  const [{ y }, setData] = useState({
    y: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    dispatch(setAdjustedY(y.toFixed(2)));
    if (adjustedY <= -0.5) dispatch(setDirection("accelerating downwards"));
    else if (adjustedY >= 0.5) dispatch(setDirection("accelerating upwards"));
    else dispatch(setDirection("steady"));
  }, [y]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const currentColor =
    direction === "accelerating downwards"
      ? "#ff3500"
      : direction === "accelerating upwards"
      ? "#00ff27"
      : "white";

  const onDirectionChangeStyle = {
    color: currentColor,
    borderColor: currentColor,
    fontSize: direction === "steady" ? 50 : 60,
    backgroundColor: direction === "steady" ? "transparent" : "#040000",
  };

  return (
    <View style={[styles.container, onDirectionChangeStyle]}>
      <Text style={styles.heading}>Acceleration:</Text>
      <Text style={[styles.text, onDirectionChangeStyle]}>{adjustedY}m/s²</Text>
      <Sounds />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    width: 300,
    height: 200,
    zIndex: 10,
    marginTop: 10,
    borderRadius: 30,
  },
  text: {
    textAlign: "center",
    margin: 10,
    fontSize: 50,
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    textDecorationLine: "underline",
  },
});
