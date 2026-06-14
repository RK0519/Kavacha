import React, { useContext, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations";
import { speakText, stopSpeaking } from "../speechHelper";

export default function ResultScreen({ route, navigation }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { result } = route.params;

  useEffect(() => {
    if (result.riskColor === "RED") {
      speakText(t.resultRed, language);
    } else if (result.riskColor === "YELLOW") {
      speakText(t.resultYellow, language);
    } else {
      speakText(t.resultGreen, language);
    }

    return () => stopSpeaking();
  }, []);

  const bgColor =
    result.riskColor === "RED"
      ? "#fecaca"
      : result.riskColor === "YELLOW"
      ? "#fde68a"
      : "#bbf7d0";

  const translatedResult =
    result.result === "FRAUD"
      ? language === "kn"
        ? "ವಂಚನೆ"
        : "FRAUD"
      : result.result === "SUSPICIOUS"
      ? language === "kn"
        ? "ಸಂದೇಹಾಸ್ಪದ"
        : "SUSPICIOUS"
      : language === "kn"
      ? "ಸುರಕ್ಷಿತ"
      : "GENUINE";

  const translatedAction =
    result.action === "Emergency SOS"
      ? language === "kn"
        ? "ತುರ್ತು ಎಸ್‌ಒಎಸ್"
        : "Emergency SOS"
      : result.action === "Consult Support"
      ? language === "kn"
        ? "ಸಹಾಯ ಪಡೆಯಿರಿ"
        : "Consult Support"
      : language === "kn"
      ? "ಯಾವುದೇ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ"
      : "No action needed";

  const translatedRisk =
    result.riskLevel === "HIGH"
      ? language === "kn"
        ? "ಹೆಚ್ಚು"
        : "HIGH"
      : result.riskLevel === "MEDIUM"
      ? language === "kn"
        ? "ಮಧ್ಯಮ"
        : "MEDIUM"
      : language === "kn"
      ? "ಕಡಿಮೆ"
      : "LOW";

  const openDetectedNumber = async () => {
    const number = result.phoneNumber || result.detectedPhone;
    if (!number) return;

    try {
      await Linking.openURL(`tel:${number}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>{t.resultTitle}</Text>

      {/* CALL: SHOW ONLY NUMBER */}
      {result.type === "call" && (result.phoneNumber || result.detectedPhone) ? (
        <>
          <Text style={styles.label}>
            {language === "kn" ? "ಪತ್ತೆಯಾದ ಫೋನ್ ಸಂಖ್ಯೆ" : "Detected Phone Number"}
          </Text>

          <TouchableOpacity onPress={openDetectedNumber}>
            <Text style={[styles.box, styles.phoneBox]}>
              {result.phoneNumber || result.detectedPhone}
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      {/* MESSAGE / FILE: SHOW FULL CONTENT */}
      {result.type !== "call" && (result.input || result.autoDetectedText) ? (
        <>
          <Text style={styles.label}>
            {language === "kn" ? "ಪತ್ತೆಯಾದ ವಿಷಯ" : "Detected Content"}
          </Text>
          <Text style={styles.box}>{result.input || result.autoDetectedText}</Text>
        </>
      ) : null}

      {/* FILE NAME */}
      {result.type === "file" && result.fileName ? (
        <>
          <Text style={styles.label}>
            {language === "kn" ? "ಫೈಲ್ ಹೆಸರು" : "File Name"}
          </Text>
          <Text style={styles.box}>{result.fileName}</Text>
        </>
      ) : null}

      <Text style={styles.result}>{translatedResult}</Text>

      <Text style={styles.label}>{t.score}</Text>
      <Text style={styles.value}>{result.score}</Text>

      <Text style={styles.label}>{t.riskLevel}</Text>
      <Text style={styles.value}>{translatedRisk}</Text>

      <Text style={styles.label}>{t.detected}</Text>
      <Text style={styles.box}>
        {result.detectedWords?.length ? result.detectedWords.join(", ") : "None"}
      </Text>

      <Text style={styles.label}>{t.action}</Text>
      <Text style={styles.value}>{translatedAction}</Text>

      {result.riskColor === "YELLOW" && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ca8a04" }]}
          onPress={() => navigation.navigate("SOS", { result })}
        >
          <Text style={styles.buttonText}>{t.support}</Text>
        </TouchableOpacity>
      )}

      {result.riskColor === "GREEN" && (
        <Text style={styles.safeText}>{t.safe}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2563eb" }]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>{t.back}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  result: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    marginTop: 4,
  },
  box: {
    fontSize: 16,
    marginTop: 6,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
  },
  phoneBox: {
    color: "#2563eb",
    fontWeight: "700",
  },
  button: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  safeText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    color: "#166534",
  },
});