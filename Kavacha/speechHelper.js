import * as Speech from "expo-speech";

export const stopSpeaking = () => {
  Speech.stop();
};

export const speakText = (text, language = "en") => {
  if (!text) return Promise.resolve();

  return new Promise((resolve) => {
    Speech.stop();

    Speech.speak(text, {
      language: language === "kn" ? "kn-IN" : "en-US",
      rate: 0.7,
      pitch: 1.0,
      onDone: () => resolve(),
      onStopped: () => resolve(),
      onError: () => resolve(),
    });
  });
};