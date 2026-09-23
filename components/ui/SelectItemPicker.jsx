import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  UIManager,
  findNodeHandle,
  Dimensions,
  Platform,
} from "react-native";
import { Portal } from "react-native-portalize";
import { ArrowDownIcon, cn, FONTS } from "@/services";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Enable layout animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const SelectItemPicker = ({
  selected,
  setSelected,
  triggerButtonStyle,
  placeholder = "Class",
  label,
  disabled,
  options = [],
}) => {
  const triggerRef = useRef(null);
  const arrowRotation = useSharedValue(0); // 0 = down, 180 = up

  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState(null);

  const showDropdown = () => {
    if (triggerRef.current) {
      UIManager.measure(
        findNodeHandle(triggerRef.current),
        (_x, _y, _width, _height, pageX, pageY) => {
          setTriggerLayout({
            x: pageX,
            y: pageY,
            width: _width,
            height: _height,
          });
          setVisible(true);
          arrowRotation.value = withTiming(-180, {
            duration: 200,
            easing: Easing.ease,
          }); // rotate arrow icon
        }
      );
    }
  };

  const hideDropdown = () => {
    setVisible(false);
    arrowRotation.value = withTiming(0, { duration: 200, easing: Easing.ease }); // rotate arrow icon
  };

  // Rotation animation for arrow icon
  const animatedArrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${arrowRotation.value}deg` }],
    };
  });

  const renderLabel = () => {
    if (selected) {
      const selectedOption = options.find((item) => item.value === selected);
      return selectedOption ? selectedOption.label : placeholder;
    }
    return placeholder;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelected(item.value);
        hideDropdown();
      }}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {label && (
        <Text
          className="!leading-[1.2] text-black-700 mb-[6px]"
          style={{ ...FONTS.inter600, fontSize: 12 }}
        >
          {label}
        </Text>
      )}

      <TouchableOpacity
        ref={triggerRef}
        className={cn(
          "border border-neutral-300 rounded-lg px-4 flex flex-row items-center justify-between min-h-12 shrink-0",
          disabled ? "opacity-80 bg-neutral-200" : "bg-white-50"
        )}
        style={triggerButtonStyle}
        activeOpacity={0.5}
        onPress={showDropdown}
        disabled={disabled}
      >
        <Text
          className={cn(
            "text-sm !leading-[1.4]",
            !selected && "text-neutral-400"
          )}
          style={{ ...FONTS.inter400 }}
        >
          {renderLabel()}
        </Text>

        <Animated.View
          style={[
            {
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            },
            animatedArrowStyle,
          ]}
        >
          <ArrowDownIcon height={20} width={20} />
        </Animated.View>
      </TouchableOpacity>

      {visible && triggerLayout && (
        <Portal>
          <View style={StyleSheet.absoluteFill}>
            {/* Full screen tap to dismiss */}
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              activeOpacity={1}
              onPress={hideDropdown}
            />

            {/* Dropdown */}
            <Animated.View
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
              style={[
                styles.dropdown,
                {
                  top: triggerLayout.y + triggerLayout.height,
                  left: triggerLayout.x,
                  width: triggerLayout.width,
                  maxHeight: SCREEN_HEIGHT * 0.4,
                },
              ]}
            >
              {options.length > 0 ? (
                <FlatList
                  data={options}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.value}
                />
              ) : (
                <View style={styles.noOptions}>
                  <Text style={styles.itemText}>No options found</Text>
                </View>
              )}
            </Animated.View>
          </View>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 0,
    borderColor: "#EEEEEE",
    overflow: "hidden",
    elevation: 6, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemText: {
    ...FONTS.inter500,
    fontSize: 12,
    color: "#333",
  },
  noOptions: {
    padding: 16,
    alignItems: "center",
  },
});

export default SelectItemPicker;
