import { View, Text, StyleSheet } from "react-native";
import { useState, useMemo } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { cn, FONTS } from "@/services";
import { colors } from "@/services";

const SelectField = ({ className, label, subLabel, data, placeholder }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // Memoize dropdown styles
  const dropdownStyle = useMemo(
    () => [styles.dropdown, isFocus && { borderColor: colors.main500 }],
    [isFocus]
  );

  return (
    <View className={cn(className, "mb-2")}>
      <Text
        className="text-sm font-semibold text-black-700 mb-2 !leading-[1.2]"
        style={{ ...FONTS.inter600 }}
      >
        {label} <Text className="text-xs">{subLabel}</Text>
      </Text>

      <Dropdown
        style={dropdownStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder || (!isFocus ? "Select item" : "...")}
        value={value}
        onFocus={() => setIsFocus(true)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    maxHeight: 48,
    height: 46,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 12,
    color: colors.text300,
    ...FONTS.inter400,
  },
  selectedTextStyle: {
    fontSize: 12,
    ...FONTS.inter400,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default SelectField;
