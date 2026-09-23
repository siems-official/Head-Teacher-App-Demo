import { useRouter } from "expo-router";
import { useWindowDimensions, View } from "react-native";
import CategoryCard from "../shared/CategoryCard";
import { quickAccessGridData } from "@/services/assets/data";
import { Fragment } from "react";

const QuickAccessGrid = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <View className="flex-1 flex flex-row flex-wrap gap-3">
      {quickAccessGridData.map(
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
              // underDev={underDev}
              onPress={() => url && router.push(url)}
              style={[
                { width: width / 2 - 20 },
                // underDev && { filter: "grayscale(1)" },
              ]}
            />
          )
      )}
    </View>
  );
};

export default QuickAccessGrid;
