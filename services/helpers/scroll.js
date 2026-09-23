import { Easing, withSpring } from "react-native-reanimated";

export const handleScrollForAnimatedButton = ({
  event,
  translateY,
  lastScrollY,
}) => {
  const offsetY = event.nativeEvent.contentOffset.y;

  // Prevent downward animation if already at the top (e.g., within the first 10px)
  if (offsetY <= 10) {
    translateY.value = withSpring(0, {
      damping: 14,
      stiffness: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    lastScrollY.current = offsetY;
    return;
  }

  if (offsetY > lastScrollY.current) {
    translateY.value = withSpring(100, {
      damping: 10,
      stiffness: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  } else if (offsetY < lastScrollY.current) {
    translateY.value = withSpring(0, {
      damping: 14,
      stiffness: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }

  lastScrollY.current = offsetY;
};
