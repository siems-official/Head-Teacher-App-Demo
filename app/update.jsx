import Button from "@/components/ui/Button";
import { appIcon, FONTS } from "@/services";
import {
  View,
  Text,
  Image,
  Linking,
  Platform,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Application from "expo-application";
import { StatusBar } from "expo-status-bar";

const AppUpdateScreen = () => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-white-50 relative">
      <SafeAreaView className="flex-1 flex flex-col justify-center items-center">
        <View className="px-4 pt-6 flex flex-col justify-center items-center">
          <Image source={appIcon} className="w-[80px] h-[80px] py-10" />
          <Text
            className="text-2xl font-bold !leading-[1.4] mt-20 text-black-900"
            style={{ ...FONTS.inter700 }}
          >
            Update Available!
          </Text>
          <Text
            className="text-sm font-bold !leading-[1.1] mt-2 text-black-600"
            style={{ ...FONTS.inter400 }}
          >
            Please update to latest version to continue.
          </Text>

          <Button
            title="Update"
            className="w-full flex-grow"
            style={{ width: width - 28 }}
            buttonWrapperClassName="w-full min-h-[48px] mt-4"
            onPress={() =>
              Linking.openURL(
                Platform.OS === "android" &&
                  `https://play.google.com/store/apps/details?id=${Application.applicationId}`
              )
            }
          />
        </View>
      </SafeAreaView>

      <StatusBar style="dark" />
    </View>
  );
};

export default AppUpdateScreen;
