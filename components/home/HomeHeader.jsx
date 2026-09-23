import { View, Text } from "react-native";
import { Image } from "react-native";
import { useState } from "react";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import Button from "../ui/Button";
import { FONTS } from "@/services/assets/fonts";
import { questionMarkRed } from "@/services/assets/images";
import { LogoutIcon, NotificationIcon } from "@/services/assets/svgs";
import { cn, routes } from "@/services/config";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/slice";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleLogout = async () => {
    setModalVisible(false);
    await AsyncStorage.removeItem("auth");
    dispatch(logout());
    router.replace(routes.login.path);
  };

  const handleNotificationButtonPress = () => {
    if (disabled) return;

    setDisabled(true);

    Toast.show("Feature not accessible.", Toast.BOTTOM, Toast.LONG);
    // Re-enable after delay
    setTimeout(() => setDisabled(false), 1000);
    return;
  };

  return (
    <View className="px-4 pt-2">
      {/* Name and Actions */}
      <View className="flex flex-row justify-between items-center">
        <Text
          className="text-xl font-extrabold !leading-[1.2] text-white-50"
          style={{ ...FONTS.inter800 }}
        >
          Smart Pathshala
        </Text>

        <View className={cn("flex flex-row gap-[6px]")}>
          <View className="h-fit w-fit relative rounded-full z-[1]">
            <View className="absolute top-[1px] right-[1px] w-2 h-2 bg-red-500 rounded-full z-[2]" />
            <Button
              className="h-9 w-9"
              icon={<NotificationIcon className={"h-5 w-5"} />}
              onPress={handleNotificationButtonPress}
            />
          </View>
          <Button
            className="h-9 w-9"
            icon={<LogoutIcon className={"h-5 w-5"} />}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>

      {/* Logout Modal */}
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="right"
      >
        <View className="h-fit w-full bg-white-50 flex flex-col justify-center items-center rounded-xl px-4 py-6">
          <Image source={questionMarkRed} className="h-20 w-20" />

          <Text
            className="text-xl font-bold !leading-[1.4] text-center text-black-700 mt-6"
            style={{ ...FONTS.inter700 }}
          >
            You Want to Log Out?
          </Text>
          <Text
            className="text-sm font-normal !leading-[1.4] text-center text-black-600 mt-1"
            style={{ ...FONTS.inter400 }}
          >
            Logging out will end your session
          </Text>

          <View className="flex flex-row mt-6 w-full">
            <Button
              title="Cancel"
              variant="outlined"
              onPress={() => setModalVisible(false)}
              buttonWrapperClassName="!flex-1 h-fit mr-1"
              className="py-3 border-neutral-400"
              textClassName="text-black-700"
            />

            <Button
              title="Logout"
              onPress={handleLogout}
              buttonWrapperClassName="!flex-1 h-fit ml-1"
              className="py-3 bg-status-error"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeHeader;
