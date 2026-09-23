import { showVersionCode, versionCode } from "@/services/config";
import { View, Text } from "react-native";

const AppVersionBanner = () => {
  return (
    <View className="absolute bottom-0 left-0 w-full bg-white-50">
      {showVersionCode && (
        <Text className="text-center text-black-600 text-sm !leading-[1.2]">
          {`v${versionCode}`}
        </Text>
      )}
    </View>
  );
};

export default AppVersionBanner;
