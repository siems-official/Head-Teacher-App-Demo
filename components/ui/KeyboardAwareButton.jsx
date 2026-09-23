import { cn } from "@/services";
import React, { useState, useEffect } from "react";
import { View, Keyboard } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function KeyboardAwareButton({ children, style }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const opacity = useSharedValue(1); // Control the opacity of the button

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      opacity.value = withTiming(0, { duration: 300 }); // Fade out button when keyboard appears
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      opacity.value = withTiming(1, { duration: 300 }); // Fade in button when keyboard disappears
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value, // Apply animated opacity
    };
  });

  if (isKeyboardVisible) return null;

  return (
    <View className={cn(isKeyboardVisible ? "hidden" : "")}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </View>
  );
}
