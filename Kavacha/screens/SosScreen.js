import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from "react-native";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations";
import { speakText, stopSpeaking } from "../speechHelper";

export default function SosScreen({ route, navigation }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const result = route.params?.result;

  useEffect(() => {
    speakText(result?.voiceMessage || t.emergencyTitle, language);
    return () => stopSpeaking();
  }, []);

  const lostMoneySteps = result?.lostMoneySteps || [];

  const makeCall = async (number) => {
    const phoneUrl = `tel:${number}`;

    try {
      const supported = await Linking.canOpenURL(phoneUrl);

      if (supported) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert("Call not supported", `Please dial ${number} manually.`);
      }
    } catch (error) {
      Alert.alert("Call failed", `Please dial ${number} manually.`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.emergencyTitle}</Text>

      <TouchableOpacity style={styles.redBtn} onPress={() => makeCall("100")}>
        <Text style={styles.btnText}>{t.callPolice}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.darkBtn} onPress={() => makeCall("1930")}>
        <Text style={styles.btnText}>{t.callCyber}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.darkBtn} onPress={() => makeCall("18001234")}>
        <Text style={styles.btnText}>{t.callBank}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blueBtn} onPress={() => makeCall("112")}>
        <Text style={styles.btnText}>{t.trustedHelp}</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>{t.lostMoneyTitle}</Text>

      {lostMoneySteps.map((step, index) => (
        <Text key={index} style={styles.step}>{`${index + 1}. ${step}`}</Text>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.btnText}>{t.back}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff7ed",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  step: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  redBtn: {
    backgroundColor: "#dc2626",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  darkBtn: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  blueBtn: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  backBtn: {
    backgroundColor: "#059669",
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});