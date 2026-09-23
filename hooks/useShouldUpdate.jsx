import * as Application from "expo-application";
import VersionCheck from "react-native-version-check";
import { useEffect, useState } from "react";
import { AppState, BackHandler } from "react-native";

// version comparison helper
const isOutdated = (current, latest) => {
  const cur = current.split(".").map(Number);
  const lat = latest.split(".").map(Number);
  for (let i = 0; i < Math.max(cur.length, lat.length); i++) {
    if ((cur[i] || 0) < (lat[i] || 0)) return true;
    if ((cur[i] || 0) > (lat[i] || 0)) return false;
  }
  return false;
};

const useShouldUpdate = () => {
  const currentVersion = Application.nativeApplicationVersion;
  const [checkingUpdate, setCheckingUpdate] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState(null);

  useEffect(() => {
    let backHandler = null;

    const checkVersion = async () => {
      try {
        const playstoreVersion = await VersionCheck.getLatestVersion({
          provider: "playStore",
          packageName: Application.applicationId,
        });

        if (isOutdated(currentVersion, playstoreVersion)) {
          setUpdateAvailable(true);
          setLatestVersion(playstoreVersion);

          // Add back handler only if update is available and not already added
          if (!backHandler) {
            backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              () => true // Prevent back action
            );
          }
        } else {
          setUpdateAvailable(false);
          setLatestVersion(null);

          // Remove back handler if no update is needed
          if (backHandler) {
            backHandler.remove();
            backHandler = null;
          }
        }
      } catch (err) {
        console.log("Version check error:", err);
        // On error, don't block the back button
        if (backHandler) {
          backHandler.remove();
          backHandler = null;
        }
        setUpdateAvailable(false);
        setLatestVersion(null);
      } finally {
        setCheckingUpdate(false);
      }
    };

    checkVersion();

    // Listen for app resume
    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active") {
          checkVersion();
        }
      }
    );

    // Cleanup function
    return () => {
      appStateSubscription?.remove();
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, [currentVersion]); // Add currentVersion as dependency

  return { checkingUpdate, updateAvailable, latestVersion };
};

export default useShouldUpdate;
