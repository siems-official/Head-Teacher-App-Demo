import HeaderCommon from "@/components/shared/HeaderCommon";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const TeachersLayout = () => {
  return (
    <View className="flex-1 bg-white-50">
      <SafeAreaView className="flex-1">
        <HeaderCommon title="Teachers" showEditButton={false} />
        <Slot />
      </SafeAreaView>
      <StatusBar style="dark" />
    </View>
  );
};

export default TeachersLayout;
