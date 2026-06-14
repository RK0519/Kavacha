import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LanguageProvider } from "./context/LanguageContext";

import LanguageScreen from "./screens/LanguageScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import SosScreen from "./screens/SosScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Language">
          <Stack.Screen name="Language" component={LanguageScreen} options={{ title: "Kavacha" }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
          <Stack.Screen name="Result" component={ResultScreen} options={{ title: "Result" }} />
          <Stack.Screen name="SOS" component={SosScreen} options={{ title: "Emergency" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}