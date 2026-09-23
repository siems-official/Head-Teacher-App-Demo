import BaseLayout from "@/components/shared/BaseLayout";
import CategoryCard from "@/components/shared/CategoryCard";
import { examGridData } from "@/services";
import { useRouter } from "expo-router";
import { View, useWindowDimensions } from "react-native";

const ExamScreen = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <BaseLayout title="Exam">
      <View className="flex-1 flex flex-row flex-wrap gap-3 mx-4">
        {examGridData.map(
          (
            { title, icon, url, bgScheme, rippleColor, hasNew, underDev },
            index
          ) => (
            <CategoryCard
              key={index}
              title={title}
              icon={icon}
              bgScheme={bgScheme}
              rippleColor={rippleColor}
              hasNew={hasNew}
              underDev={underDev}
              onPress={() => url && router.push(url)}
              style={{ width: width / 2 - 20 }}
            />
          )
        )}
      </View>
    </BaseLayout>
  );
};

export default ExamScreen;
