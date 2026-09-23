import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCommon from "./HeaderCommon";
import { StatusBar } from "expo-status-bar";
import { cn, colors } from "@/services";

const BaseLayout = ({ title, showEditButton = false, className, children }) => {
  return (
    <View className={cn("flex-1 bg-white-50 relative", className)}>
      <SafeAreaView className="flex-1 relative bg-white-50">
        <HeaderCommon title={title} showEditButton={showEditButton} />

        {children}
      </SafeAreaView>

      <StatusBar style="dark" backgroundColor={colors.white50} />
    </View>
  );
};

export default BaseLayout;
