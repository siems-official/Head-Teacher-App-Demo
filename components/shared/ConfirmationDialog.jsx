import { View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { colors, questionMarkRed } from "@/services";
import Button from "@/components/ui/Button";
import { Text } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { FONTS } from "@/services/assets/fonts";
import { StatusBar } from "expo-status-bar";

const ConfirmationDialog = ({
  isModalVisible,
  setModalVisible,
  title = "Are You Sure?",
  message = "You want to reject this application?",
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
          source={questionMarkRed}
          className="h-20 w-20"
          height={80}
          width={80}
        />

        <Text
          className="text-black-700 !leading-[1.4] mt-6"
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

        <View className="flex flex-row gap-2 mt-6 w-full">
          <Button
            title="Cancel"
            onPress={() => {
              setModalVisible(false);
            }}
            buttonWrapperClassName="!flex-1 h-fit"
            className="py-3 bg-transparent border border-neutral-400"
            textClassName="text-black-700"
            rippleColor={colors.neutral300}
          />
          <Button
            title="Reject"
            onPress={handleConfirm}
            buttonWrapperClassName="!flex-1 h-fit"
            className="py-3 bg-status-error border border-status-error"
          />
        </View>
      </View>

      <StatusBar style="dark" backgroundColor={"#555555"} />
    </Modal>
  );
};

export default ConfirmationDialog;
