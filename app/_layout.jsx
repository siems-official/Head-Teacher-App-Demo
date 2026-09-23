import React, { useEffect } from "react";
import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "@/styles/global.css";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Host } from "react-native-portalize";
import AutoLogoutProvider from "@/components/providers/AutoLogoutProvider";
import AppUpdateDialog from "@/components/update/AppUpdateDialog";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Thin": require("../assets/fonts/Inter-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded || error) {
    return null;
  }

  return (
    <Provider store={store}>
      <AutoLogoutProvider>
        <Host>
          <Slot />
          <AppUpdateDialog />
        </Host>
      </AutoLogoutProvider>
    </Provider>
  );
};

export default RootLayout;
