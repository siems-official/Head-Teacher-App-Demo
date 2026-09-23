import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const AskMeLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white-50">
      <Slot />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default AskMeLayout;
