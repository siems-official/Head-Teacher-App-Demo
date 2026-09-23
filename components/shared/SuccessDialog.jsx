import { View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { successGif } from "@/services";
import Button from "@/components/ui/Button";
import { Text } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { FONTS } from "@/services/assets/fonts";
import { StatusBar } from "expo-status-bar";

const SuccessDialog = ({
  isModalVisible,
  setModalVisible,
  title = "Successful!",
  message = "Application has been approved.",
  buttonText = "Close",
  onConfirm = () => {},
}) => {
  const handleConfirm = () => {
    setModalVisible(false);
    onConfirm();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      swipeDirection="right"
    >
      <View className="h-fit w-full bg-white-50 flex flex-col justify-center items-center rounded-xl px-4 py-6">
        <ExpoImage
          source={successGif}
          className="h-[150px] w-[150px]"
          height={150}
          width={150}
        />

        <Text
          className="text-black-700 !leading-[1.4]"
          style={{ ...FONTS.inter600, fontSize: 20 }}
        >
          {title}
        </Text>

        <Text
          className="text-sm font-normal !leading-[1.4] text-center text-black-600 mt-1"
          style={{ ...FONTS.inter400 }}
        >
          {message}
        </Text>

        <View className="flex flex-row mt-6 w-full">
          <Button
            title={buttonText}
            onPress={handleConfirm}
            buttonWrapperClassName="!flex-1 h-fit mr-1"
            className="py-3"
          />
        </View>
      </View>

      <StatusBar style="dark" backgroundColor={"#555555"} />
    </Modal>
  );
};

export default SuccessDialog;
