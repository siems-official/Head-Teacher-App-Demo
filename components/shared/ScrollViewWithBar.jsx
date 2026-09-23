import { colors } from "@/services";
import React, { forwardRef, useRef, useState } from "react";
import { ScrollView, View, Animated } from "react-native";

const ScrollViewWithBar = forwardRef(
  (
    {
      children,
      horizontal = true,
      scrollbarTrackColor = "#e5e7eb", // Light gray (equivalent to gray-200)
      className,
      contentContainerStyle,
      ...props
    },
    ref
  ) => {
    const scrollViewRef = useRef(null);
    const [scrollViewWidth, setScrollViewWidth] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    // Calculate scrollbar dimensions
    const scrollIndicatorSize =
      contentWidth > 0 ? scrollViewWidth * (scrollViewWidth / contentWidth) : 0;

    const scrollIndicatorPosition = Animated.multiply(
      scrollX,
      scrollViewWidth / contentWidth
    );

    return (
      <View className={`relative ${className || ""}`}>
        <ScrollView
          ref={(node) => {
            // pass ref up to parent
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;

            // store for internal use if needed
            scrollViewRef.current = node;
          }}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          overScrollMode="always"
          onContentSizeChange={(width) => setContentWidth(width)}
          onLayout={(event) =>
            setScrollViewWidth(event.nativeEvent.layout.width)
          }
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          contentContainerStyle={contentContainerStyle}
          {...props}
        >
          {children}
        </ScrollView>

        {/* Custom Scrollbar */}
        {contentWidth > scrollViewWidth && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 6,
              backgroundColor: scrollbarTrackColor,
              borderRadius: 6,
            }}
          >
            <Animated.View
              style={{
                width: scrollIndicatorSize,
                height: 6,
                backgroundColor: `${colors.main500}4f`,
                borderRadius: 6,
                transform: [{ translateX: scrollIndicatorPosition }],
              }}
            />
          </View>
        )}
      </View>
    );
  }
);

ScrollViewWithBar.displayName = "ScrollViewWithBar";

export default ScrollViewWithBar;
