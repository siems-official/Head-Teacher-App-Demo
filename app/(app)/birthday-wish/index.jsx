import BaseLayout from "@/components/shared/BaseLayout";
import CategoryCard from "@/components/shared/CategoryCard";
import HeaderCommon from "@/components/shared/HeaderCommon";
import { birthdayGridData, colors } from "@/services";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BirthdayWishScreen = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <BaseLayout title="Birthday Wish">
      <View className="flex-1 flex flex-row flex-wrap gap-3 mx-4">
        {birthdayGridData.map(
          (
            { title, icon, url, bgScheme, rippleColor, hasNew, underDev },
            index
          ) =>
            underDev ? (
              <Fragment key={index} />
            ) : (
              <CategoryCard
                key={index}
                title={title}
                icon={icon}
                bgScheme={bgScheme}
                rippleColor={rippleColor}
                hasNew={hasNew}
                onPress={() => url && router.push(url)}
                style={[{ width: width / 2 - 20 }]}
              />
            )
        )}
      </View>
    </BaseLayout>
  );
};

export default BirthdayWishScreen;
