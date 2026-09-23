// components/SearchField.jsx
import { cn, SearchIcon } from "@/services";
import { TextInput, View } from "react-native";

const SearchField = ({
  value,
  onChangeText,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  iconColor = "#6B7280", // Tailwind gray-500
}) => {
  return (
    <View
      className={cn(
        "flex-row items-center bg-white border border-gray-300 rounded-[4px] ps-2 py-0",
        className
      )}
    >
      <SearchIcon color={iconColor} height={16} width={16} />
      <TextInput
        className={cn("ml-2 flex-1 text-base text-gray-800", inputClassName)}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF" // Tailwind gray-400
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchField;
