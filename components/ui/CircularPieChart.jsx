import { cn, FONTS } from "@/services";
import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function CircularProgress({
  percentage = 86,
  radius = 10,
  strokeWidth = 15,
  color = "#1DA1F2",
  textColor = "#1DA1F2",
  duration = 1000,
  backgroundColor = "#E5E7EB",
  innerWrapperClassName = "",
}) {
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate the strokeDashoffset based on the percentage
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  // Use React Native Animated API for animation
  const [offset, setOffset] = React.useState(circumference);

  React.useEffect(() => {
    // Animate the progress
    let animationFrame;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentOffset =
        circumference - (circumference - strokeDashoffset) * progress;
      setOffset(currentOffset);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [percentage]);

  return (
    <View className="flex items-center justify-center">
      <View
        className={cn(
          "relative w-28 h-28 flex items-center justify-center",
          innerWrapperClassName
        )}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${(radius + strokeWidth) * 2} ${
            (radius + strokeWidth) * 2
          }`}
        >
          {/* Background circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius - 8}
            strokeWidth={strokeWidth}
            stroke={backgroundColor}
            fill="transparent"
          />

          {/* Progress circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth + 15}
            stroke={color}
            fill="transparent"
            strokeLinecap="butt"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90, ${radius + strokeWidth}, ${
              radius + strokeWidth
            })`}
          />
        </Svg>

        {/* Percentage text in the center */}
        <View className="absolute flex items-center justify-center h-[64px] w-[64px] bg-white-50 rounded-full shadow-md">
          <Text
            className="text-sm font-bold"
            style={{ color: textColor, ...FONTS.inter600 }}
          >
            {percentage ? `${Math.round(percentage)}%` : `N/A`}
          </Text>
        </View>
      </View>
    </View>
  );
}
