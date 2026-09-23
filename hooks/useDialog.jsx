import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Modal from "react-native-modal";
import React, { Fragment, useState } from "react";
import { ClearIcon, cn, FONTS, questionMarkRed, successGif } from "@/services";
import Button from "../components/ui/Button";
import { Image } from "expo-image";

export const useDialog = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const Dialog = ({
    titleText,
    description,
    handleConfirm,
    confirmButtonText = "Confirm",
    successModal = false,
    deleteModal = false,
    infoModal = false,
    className,
    children,
  }) => (
    <Modal
      isVisible={isDialogVisible}
      onSwipeComplete={hideDialog}
      onBackdropPress={hideDialog}
      onBackButtonPress={hideDialog}
      swipeDirection="right"
      className={className}
    >
      {infoModal ? (
        <View className="w-full bg-white-50 rounded-xl px-4 py-6">
          {/* CLEAR BUTTON */}
          <TouchableOpacity
            className="flex flex-row justify-end"
            onPress={hideDialog}
          >
            <ClearIcon className="self-end" />
          </TouchableOpacity>

          {/* CHILDREN */}
          {children}
        </View>
      ) : (
        (successModal || deleteModal) && (
          <View className="h-fit w-full bg-white-50 flex flex-col justify-center items-center rounded-xl px-4 py-6">
            <Image
              source={successModal ? successGif : questionMarkRed}
              className={cn(successModal ? "h-[150px] w-[150px]" : "h-20 w-20")}
              height={150}
              width={150}
            />

            <Text
              className="text-xl font-bold !leading-[1.4] text-center text-black-700 mt-6"
              style={{ ...FONTS.inter700 }}
            >
              {titleText}
            </Text>
            <Text
              className="text-sm font-normal !leading-[1.4] text-center text-black-600 mt-1"
              style={{ ...FONTS.inter400 }}
            >
              {description}
            </Text>

            <View className="flex flex-row mt-6 w-full">
              {successModal && (
                <Button
                  title={confirmButtonText}
                  onPress={handleConfirm}
                  buttonWrapperClassName="!flex-1 h-fit ml-1"
                  className="py-3"
                />
              )}
              {deleteModal && (
                <Fragment>
                  <Button
                    title="Cancel"
                    variant="outlined"
                    onPress={hideDialog}
                    buttonWrapperClassName="!flex-1 h-fit mr-1"
                    className="py-3 border-neutral-400"
                    textClassName="text-black-700"
                  />

                  <Button
                    title={confirmButtonText}
                    onPress={handleConfirm}
                    buttonWrapperClassName="!flex-1 h-fit ml-1"
                    className="py-3 bg-status-error"
                  />
                </Fragment>
              )}
            </View>
          </View>
        )
      )}

      <StatusBar style="dark" backgroundColor={"#333333df"} />
    </Modal>
  );

  return {
    Dialog,
    showDialog,
    hideDialog,
    isDialogVisible,
  };
};
