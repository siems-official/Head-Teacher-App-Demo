import useShouldUpdate from "@/hooks/useShouldUpdate";
import React from "react";
import { View, Text, Pressable, Linking } from "react-native";
import Modal from "react-native-modal";
import * as Application from "expo-application";

const AppUpdateDialog = () => {
  const { updateAvailable, latestVersion } = useShouldUpdate();

  return (
    <Modal
      isVisible={updateAvailable}
      backdropDismissable={false}
      avoidKeyboard={true}
      propagateSwipe={true}
    >
      <View className="h-fit w-full bg-white-50 flex flex-col justify-center items-center rounded-xl px-4 py-6">
        <Text className="text-xl font-bold text-black mb-2">
          Update Required
        </Text>
        <Text className="text-base text-center mb-4 text-zinc-600">
          A new version ({latestVersion}) is available. Please update to
          continue using the app.
        </Text>
        <Pressable
          onPress={() =>
            Linking.openURL(
              `https://play.google.com/store/apps/details?id=${Application.applicationId}`
            )
          }
          className="bg-black px-4 py-2 rounded-xl w-full flex items-center justify-center"
          android_ripple={{ color: "#ccc" }}
        >
          <Text className="text-white font-semibold">Update Now</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default AppUpdateDialog;
