import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import Sounds from "./Sounds";

export default function AccelerometerComponent() {
  const [{ y }, setData] = useState({
    y: 0,
  });
  const [adjustedY, setAdjustedY] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [direction, setDirection] = useState("steady");

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    setAdjustedY(y.toFixed(2));
    if (adjustedY <= -0.5) setDirection("accelerating downwards");
    else if (adjustedY >= 0.5) setDirection("accelerating upwards");
    else setDirection("steady");
  }, [y]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Acceleration: {adjustedY}m/s²</Text>
      <Text style={styles.text}>
        You are currently{" "}
        {direction === "accelerating upwards"
          ? direction + "🛫"
          : direction === "accelerating downwards"
          ? direction + "🛬"
          : direction}
      </Text>
      <Sounds direction={direction} />
      <Text
        style={[
          styles.text,
          styles.plane,
          {
            transform: [{ rotate: `${adjustedY * 90}deg` }],
          },
        ]}
      >
        {"<<<<<<<<"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    margin: 5,
  },
  plane: {
    borderColor: "black",
    width: 190,
    height: 41,
    borderWidth: 1,
    margin: 100,
  },
});
