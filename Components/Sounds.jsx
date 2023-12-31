import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Sounds() {
  const up = require(`../assets/Sounds/up.wav`);
  const down = require(`../assets/Sounds/down.wav`);
  const direction = useSelector((state) => state.accelerationData.direction);
  const [sound, setSound] = useState();

  function stopSound() {
    setSound("");
  }

  async function playSound() {
    const soundDirection = direction === "accelerating upwards" ? up : down;
    const { sound } = await Audio.Sound.createAsync(
      soundDirection,
      {},
      ({ positionMillis, durationMillis }) => {
        if (positionMillis !== undefined && positionMillis === durationMillis)
          playSound();
      }
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    if (direction !== "steady") playSound();
    else stopSound();
  }, [direction]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return null;
}
