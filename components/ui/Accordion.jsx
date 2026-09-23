import { ArrowDownIcon, cn, FONTS } from "@/services";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const Accordion = ({
  title,
  children,
  className,
  titleClassName = "",
  titleStyle,
  visibleContentClassName = "",
  expanded: controlledExpanded, // External control
  onToggle, // External toggle handler
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded = controlledExpanded ?? internalExpanded; // Use external state if provided
  const [contentHeight, setContentHeight] = useState(0); // State for measured height
  const height = useSharedValue(0); // Shared value for animation
  const rotation = useSharedValue(0); // Rotation for arrow icon

  const toggleAccordion = () => {
    if (onToggle) {
      onToggle(!expanded); // Call external handler
    } else {
      setInternalExpanded((prev) => !prev); // Internal state fallback
    }
    rotation.value = withTiming(expanded ? 0 : -180, { duration: 300 });
  };

  useEffect(() => {
    if (expanded) {
      height.value = withTiming(contentHeight + 28, { duration: 300 });
    } else {
      height.value = withTiming(0, { duration: 300 });
    }
  }, [expanded, contentHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
    ],
  }));

  return (
    <View
      className={cn(
        "mb-[10px] border border-neutral-300 rounded-xl",
        className
      )}
    >
      {/* Header */}
      <TouchableOpacity
        onPress={toggleAccordion}
        className="px-3 py-4 flex-row justify-between items-center"
      >
        <Text
          className={cn(
            "text-base font-semibold !leading-[1.2] text-black-700",
            titleClassName
          )}
          style={[titleStyle, { ...FONTS.inter600 }]}
        >
          {title}
        </Text>
        <Animated.View style={rotateStyle}>
          <ArrowDownIcon />
        </Animated.View>
      </TouchableOpacity>

      {/* Animated Content */}
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        {/* Hidden View to Measure Content Height */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            opacity: 0,
          }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height); // Update measured height
          }}
        >
          {children}
        </View>

        {/* Visible Content */}
        <View className={cn("p-4 pt-6 mb-0", visibleContentClassName)}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
