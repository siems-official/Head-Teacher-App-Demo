import { colors } from "@/services";
import React, { useRef, useEffect, useState } from "react";
import { View, Modal, TouchableWithoutFeedback, Pressable } from "react-native";

const DropdownMenu = ({
  visible,
  handleOpen,
  handleClose,
  trigger,
  children,
  dropdownWidth = 150,
  left,
  right = 16,
}) => {
  const triggerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

  const positionLeft = position.x + position.width / 2 - dropdownWidth / 2;

  useEffect(() => {
    if (triggerRef.current && visible) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        setPosition({
          x: px,
          y: py,
          width: width,
        });
      });
    }
  }, [visible]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>
      {visible && (
        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View className="flex-1 justify-start items-start bg-transparent">
              <View
                className="absolute bg-white rounded-md p-2 shadow-lg"
                style={{
                  top: position.y,
                  left: left || positionLeft,
                  right: right,
                  width: dropdownWidth,
                }}
              >
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export const MenuOption = ({ onPress, onSelect, children }) => (
  <View onPress={onSelect} className="rounded-md">
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.neutral300 }}
      className="px-4 py-3 hover:bg-gray-200 bg-white-50 divide-x-2 divide-y-hairline"
    >
      {children}
    </Pressable>
  </View>
);

export default DropdownMenu;
