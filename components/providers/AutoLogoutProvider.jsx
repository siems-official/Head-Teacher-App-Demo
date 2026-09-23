import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/slice";
import { useRouter } from "expo-router";
import { routes } from "@/services";

const AUTO_LOGOUT_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const BACKGROUND_TIME_KEY = "app_background_timestamp";

const AutoLogoutProvider = ({ children }) => {
  const dispatch = useDispatch();
  const appStateRef = useRef(AppState.currentState);
  const router = useRouter();
  const logoutTimerRef = useRef(null);
  const [appInitialized, setAppInitialized] = useState(false);

  // Function to handle the actual logout
  const performLogout = async () => {
    try {
      // console.log("Performing auto logout");
      await AsyncStorage.removeItem("auth");
      await AsyncStorage.removeItem(BACKGROUND_TIME_KEY); // Clear the timestamp on logout
      dispatch(logout());
      router.replace(routes.login.path);
    } catch (error) {
      console.error("Error during auto logout:", error);
    }
  };

  // Function to clear any existing logout timer
  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
      // console.log("Logout timer cleared");
    }
  };

  // Function to start a new logout timer
  const startLogoutTimer = () => {
    clearLogoutTimer(); // Clear any existing timer first

    // Set a new timer
    logoutTimerRef.current = setTimeout(() => {
      // console.log("Logout timer fired");
      performLogout();
    }, AUTO_LOGOUT_TIMEOUT);

    // console.log("Logout timer started");
  };

  // Save timestamp to AsyncStorage when app goes to background
  const saveBackgroundTime = async () => {
    try {
      const timestamp = Date.now().toString();
      await AsyncStorage.setItem(BACKGROUND_TIME_KEY, timestamp);
      // console.log(`Background timestamp saved: ${timestamp}`);
    } catch (error) {
      console.error("Error saving background timestamp:", error);
    }
  };

  // Check if we should log out based on the persisted timestamp
  const checkForAutoLogout = async () => {
    try {
      const timestampStr = await AsyncStorage.getItem(BACKGROUND_TIME_KEY);

      if (timestampStr) {
        const backgroundTime = parseInt(timestampStr);
        const currentTime = Date.now();
        const timeInBackground = currentTime - backgroundTime;

        // console.log(`App was in background for: ${timeInBackground}ms`);

        // Clear the timestamp regardless of outcome
        await AsyncStorage.removeItem(BACKGROUND_TIME_KEY);

        if (timeInBackground >= AUTO_LOGOUT_TIMEOUT) {
          // console.log("Background time exceeded timeout, logging out");
          performLogout();
          return true;
        } else {
          // console.log("Background time was less than timeout, not logging out");
        }
      }
    } catch (error) {
      console.error("Error checking for auto logout:", error);
    }
    return false;
  };

  // Initialize component and check for auto logout on mount
  useEffect(() => {
    const initializeProvider = async () => {
      await checkForAutoLogout();
      setAppInitialized(true);
    };

    initializeProvider();
  }, []);

  // Handle app state changes
  useEffect(() => {
    if (!appInitialized) return;

    const handleAppStateChange = async (nextAppState) => {
      // console.log(
      //   `App state changed from ${appStateRef.current} to ${nextAppState}`
      // );

      // App is going from active to background/inactive
      if (
        appStateRef.current === "active" &&
        (nextAppState === "background" || nextAppState === "inactive")
      ) {
        // console.log("Going to background");
        await saveBackgroundTime();
        startLogoutTimer();
      }

      // App is coming back to active state
      if (
        (appStateRef.current === "background" ||
          appStateRef.current === "inactive") &&
        nextAppState === "active"
      ) {
        // console.log("Coming back to foreground");
        await checkForAutoLogout();
        clearLogoutTimer();
      }

      // Update the ref with current state
      appStateRef.current = nextAppState;
    };

    // Register the event listener
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Cleanup function
    return () => {
      clearLogoutTimer();
      subscription.remove();
    };
  }, [appInitialized, dispatch]);

  // Wait until initialization is complete before rendering children
  if (!appInitialized) {
    return null; // Or a loading indicator if preferred
  }

  // Render the children components
  return children;
};

export default AutoLogoutProvider;
