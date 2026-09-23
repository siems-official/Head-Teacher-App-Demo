import { FONTS } from "@/services/assets/fonts";
import { cn } from "@/services/config";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, Pressable, View } from "react-native";

const Button = ({
  title,
  iconButtonClassName = "", // Additional Tailwind classes for icon button if type is 'icon'
  icon,
  startIcon,
  endIcon,
  onPress, // Custom press handler
  route, // Navigation route
  variant = "default", // 'default' or 'outlined'
  navigation, // Optional navigation prop
  className = "", // Additional Tailwind classes
  buttonWrapperClassName = "", // Additional Tailwind classes for button wrapper
  buttonWrapperStyle = {}, // Additional styles for button wrapper
  textClassName = "", // Additional Tailwind classes for text
  textStyle = {}, // Additional styles for text
  rippleColor,
  disabled,
  ...props
}) => {
  const internalNavigation = useNavigation();

  const handlePress = (event) => {
    if (route) {
      (navigation || internalNavigation).navigate(route);
    } else if (onPress) {
      onPress(event);
    }
  };

  const isOutlined = variant === "outlined";

  return (
    <View
      className={cn(
        "w-fit h-fit overflow-hidden",
        icon ? "rounded-full" : "rounded-lg",
        buttonWrapperClassName
      )}
      style={buttonWrapperStyle}
    >
      <Pressable
        onPress={handlePress}
        android_ripple={
          rippleColor
            ? { color: rippleColor }
            : { color: isOutlined ? "#ccc" : "#fff" }
        }
        className={cn(
          "flex flex-row items-center justify-center rounded-lg w-full",
          isOutlined ? "border border-main-500 bg-transparent" : "bg-main-500",
          disabled ? "!bg-text-disabled" : "",
          icon ? "rounded-full" : "rounded-lg",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {icon ? (
          <View
            className={cn(
              "flex items-center justify-center h-9 w-9 shrink-0",
              iconButtonClassName
            )}
          >
            {icon && icon}
          </View>
        ) : (
          <View className="flex flex-row items-center gap-2">
            {startIcon && startIcon}
            {title && (
              <Text
                className={cn(
                  "text-lg font-medium",
                  isOutlined ? "text-main-500" : "text-white-50",
                  textClassName
                )}
                style={{ ...FONTS.inter500, ...textStyle }}
              >
                {title}
              </Text>
            )}
            {endIcon && endIcon}
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Button;
