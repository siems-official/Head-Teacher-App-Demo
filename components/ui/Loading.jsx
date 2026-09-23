import { StatusBar } from "expo-status-bar";
import { View, Image, ActivityIndicator } from "react-native";
import AppVersionBanner from "../shared/AppVersionBanner";
import { colors } from "@/services/assets/colors";
import { appIcon } from "@/services/assets/images";
import { LinearGradient } from "expo-linear-gradient";

const Loading = () => {
  return (
    <View className="flex-1 bg-white-50 relative">
      <LinearGradient
        colors={["#FFF", "#FFE9C9"]}
        locations={[0.0308, 0.8334]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.39, y: 0.92 }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={appIcon} className="w-24 h-24" />
        <ActivityIndicator
          size="small"
          color={colors.black800}
          className="mt-10"
        />
      </LinearGradient>

      <AppVersionBanner />

      <StatusBar style="dark" backgroundColor={"transparent"} />
    </View>
  );
};

export default Loading;
