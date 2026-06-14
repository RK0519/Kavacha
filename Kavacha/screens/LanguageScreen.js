import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations";
import { speakText, stopSpeaking } from "../speechHelper";

export default function LanguageScreen({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = translations[language];
  const [highlight, setHighlight] = useState("");

  useEffect(() => {
    playLanguageIntro();

    return () => {
      stopSpeaking();
    };
  }, []);

  const playLanguageIntro = () => {
    stopSpeaking();

    setHighlight("kn");
    speakText("ಕನ್ನಡಕ್ಕೆ ಒಂದನ್ನು ಒತ್ತಿರಿ", "kn");

    setTimeout(() => {
      setHighlight("en");
      speakText("Press 2 for English", "en");
    }, 3000);
  };

  const chooseLanguage = (lang) => {
    stopSpeaking();
    setLanguage(lang);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.selectLanguage}</Text>

      <TouchableOpacity
        style={[styles.button, highlight === "kn" && styles.highlightButton]}
        onPress={() => chooseLanguage("kn")}
      >
        <Text style={styles.buttonText}>1 - ಕನ್ನಡ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, highlight === "en" && styles.highlightButton]}
        onPress={() => chooseLanguage("en")}
      >
        <Text style={styles.buttonText}>2 - English</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.repeatButton} onPress={playLanguageIntro}>
        <Text style={styles.repeatText}>{t.repeat}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f7fb",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  highlightButton: {
    backgroundColor: "#dc2626",
    borderWidth: 3,
    borderColor: "#111827",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  repeatButton: {
    marginTop: 10,
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 14,
  },
  repeatText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});