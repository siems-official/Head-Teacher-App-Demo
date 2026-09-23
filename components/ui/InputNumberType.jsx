import React from "react";
import { TextInput } from "react-native";

const InputNumberType = ({ value, onChangeText, ...props }) => {
  // Wrapingp external handler to sanitize input before calling parent
  const handleTextChange = (text) => {
    const onlyNums = text.replace(/[^0-9]/g, "");
    onChangeText(onlyNums);
  };

  // This handles keypress events to prevent non-numeric input
  const handleKeyPress = (e) => {
    const key = e.nativeEvent.key;
    // Only allows numeric keys (0-9) and special keys like backspace
    const isNumber = /^[0-9]$/.test(key);
    const isSpecialKey = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ].includes(key);

    if (!isNumber && !isSpecialKey) {
      // Prevents the input of non-numeric characters
      e.preventDefault();
    }
  };
  return (
    <TextInput
      value={value}
      keyboardType="numeric"
      onChangeText={handleTextChange}
      onKeyPress={handleKeyPress}
      maxLength={props.maxLength || 10}
      {...props}
    />
  );
};

export default InputNumberType;
