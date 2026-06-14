import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations";
import { speakText, stopSpeaking } from "../speechHelper";
import {
  analyzeMessage,
  autoDetectMessage,
  autoDetectFile,
  autoDetectCall,
} from "../api";

export default function HomeScreen({ navigation }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations.en;

  const [text, setText] = useState("");
  const [highlight, setHighlight] = useState("");
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    guidePage();

    return () => {
      isMountedRef.current = false;
      stopSpeaking();
    };
  }, [language]);

  const routeByRisk = (result) => {
    if (result.riskColor === "RED") {
      navigation.navigate("SOS", { result });
    } else {
      navigation.navigate("Result", { result });
    }
  };

  const guidePage = async () => {
    stopSpeaking();

    setHighlight("line1");
    await speakText(t.intro1, language);
    if (!isMountedRef.current) return;

    setHighlight("line2");
    await speakText(t.intro2, language);
    if (!isMountedRef.current) return;

    setHighlight("line3");
    await speakText(t.intro3, language);
    if (!isMountedRef.current) return;

    setHighlight("input");
    await speakText(t.inputPlaceholder, language);
    if (!isMountedRef.current) return;

    setHighlight("analyze");
    await speakText(t.analyze, language);
    if (!isMountedRef.current) return;

    setHighlight("autoMessage");
    await speakText(t.autoMessage, language);
    if (!isMountedRef.current) return;

    setHighlight("autoFile");
    await speakText(t.autoFile, language);
    if (!isMountedRef.current) return;

    setHighlight("autoCall");
    await speakText(t.autoCall, language);
    if (!isMountedRef.current) return;

    setHighlight("repeat");
    await speakText(t.repeat, language);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      Alert.alert(
        "Error",
        language === "kn"
          ? "ಮೊದಲು ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ"
          : "Please enter a message first"
      );
      return;
    }

    try {
      const result = await analyzeMessage(text);
      routeByRisk(result);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        language === "kn"
          ? "ಬ್ಯಾಕ್‌ಎಂಡ್ ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ"
          : "Could not connect to backend"
      );
    }
  };

  const handleAutoMessage = async () => {
    try {
      const result = await autoDetectMessage(language);
      routeByRisk(result);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        language === "kn"
          ? "ಸಂದೇಶ ಸ್ವಯಂ ಪತ್ತೆ ವಿಫಲವಾಗಿದೆ"
          : "Auto message detection failed"
      );
    }
  };

  const handleAutoFile = async () => {
    try {
      const result = await autoDetectFile(language);
      routeByRisk(result);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        language === "kn"
          ? "ಫೈಲ್ ಸ್ವಯಂ ಪತ್ತೆ ವಿಫಲವಾಗಿದೆ"
          : "Auto file detection failed"
      );
    }
  };

  const handleAutoCall = async () => {
    try {
      const result = await autoDetectCall(language);
      routeByRisk(result);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        language === "kn"
          ? "ಕಾಲ್ ಸ್ವಯಂ ಪತ್ತೆ ವಿಫಲವಾಗಿದೆ"
          : "Auto call detection failed"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.homeTitle}</Text>

      <Text style={[styles.line, highlight === "line1" && styles.highlightText]}>
        {t.intro1}
      </Text>

      <Text style={[styles.line, highlight === "line2" && styles.highlightText]}>
        {t.intro2}
      </Text>

      <Text style={[styles.line, highlight === "line3" && styles.highlightText]}>
        {t.intro3}
      </Text>

      <TextInput
        style={[styles.input, highlight === "input" && styles.highlight]}
        placeholder={t.inputPlaceholder}
        value={text}
        onChangeText={setText}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, highlight === "analyze" && styles.highlightButton]}
        onPress={handleAnalyze}
      >
        <Text style={styles.buttonText}>{t.analyze}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, highlight === "autoMessage" && styles.highlightButton]}
        onPress={handleAutoMessage}
      >
        <Text style={styles.buttonText}>{t.autoMessage}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, highlight === "autoFile" && styles.highlightButton]}
        onPress={handleAutoFile}
      >
        <Text style={styles.buttonText}>{t.autoFile}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, highlight === "autoCall" && styles.highlightButton]}
        onPress={handleAutoCall}
      >
        <Text style={styles.buttonText}>{t.autoCall}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.repeatButton, highlight === "repeat" && styles.highlightButton]}
        onPress={guidePage}
      >
        <Text style={styles.repeatText}>{t.repeat}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  line: {
    fontSize: 16,
    marginBottom: 8,
    color: "#374151",
  },
  highlightText: {
    color: "#dc2626",
    fontWeight: "bold",
    backgroundColor: "#fee2e2",
    padding: 6,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    marginTop: 15,
    marginBottom: 15,
  },
  highlight: {
    borderColor: "#ef4444",
    borderWidth: 3,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  highlightButton: {
    backgroundColor: "#dc2626",
    borderWidth: 3,
    borderColor: "#111827",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  repeatButton: {
    marginTop: 10,
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
  },
  repeatText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});