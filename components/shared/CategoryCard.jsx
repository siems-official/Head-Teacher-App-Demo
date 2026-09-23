import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { useState } from "react";
import { cn } from "@/services/config";
import { FONTS } from "@/services/assets/fonts";
import Toast from "react-native-simple-toast";

const CategoryCard = ({
  title,
  icon,
  bgScheme,
  rippleColor,
  hasNew,
  underDev,
  index,
  onPress,
  style,
  className,
}) => {
  const [disabled, setDisabled] = useState(false);

  const handlePress = () => {
    if (disabled) return;
    setDisabled(true);

    // Handle under development case
    if (underDev) {
      Toast.show("Feature not accessible.", Toast.BOTTOM, Toast.LONG);
      // Re-enable after delay
      setTimeout(() => setDisabled(false), 1000);
      return;
    }

    onPress?.();
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <View
      className={cn(
        "h-auto flex-shrink !rounded-lg overflow-hidden",
        className
      )}
      style={style}
      key={index}
    >
      <Pressable
        android_ripple={{ color: rippleColor }}
        style={{ backgroundColor: bgScheme }}
        className="w-full !rounded-lg p-3 flex flex-col items-center gap-8 relative"
        onPress={handlePress}
      >
        {hasNew && (
          <View className="absolute top-2 right-2 bg-status-alert h-5 w-5 !rounded-full flex items-center justify-center overflow-hidden">
            <Text
              className="text-[10px] font-bold text-white-50 flex-shrink max-w-fit text-center"
              style={{ ...FONTS.inter700 }}
            >
              {hasNew}
            </Text>
          </View>
        )}

        <Image
          source={icon}
          className="w-[52px] h-[52px]"
          height={300}
          width={300}
        />

        <Text
          className="text-sm font-semibold !leading-[1.2] text-black-700"
          style={{ ...FONTS.inter600 }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default CategoryCard;
