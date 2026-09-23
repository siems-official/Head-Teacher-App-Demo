// import {  colors, InVisibleIcon, VisibleIcon } from "@/services";
import { Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { useState } from "react";
import { cn, colors, FONTS } from "@/services";
import { InVisibleIcon, VisibleIcon } from "@/services";

const InputField = ({
  className,
  name,
  label,
  placeholder,
  subLabel,
  control,
  error,
  validationRules,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <View className={cn(className, "mb-2")}>
      <Text
        className="text-sm font-semibold text-black-700 mb-2 !leading-[1.2]"
        style={{ ...FONTS.inter600 }}
      >
        {label} <Text className="text-xs">{subLabel}</Text>{" "}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        render={({ field: { onChange, onBlur, value } }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              className={cn(
                "rounded-lg border overflow-hidden flex flex-row items-center",
                error ? "border-red-500" : "border-neutral-300",
                name === "password" ? "ps-3" : "px-3"
              )}
            >
              <TextInput
                className={`w-full flex-shrink rounded-lg py-3 h-12 text-black-700 placeholder:text-white-400 text-sm !leading-[1.4]`}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={name === "password" && !isPasswordVisible}
                {...props}
              />

              {name === "password" && (
                <View className="flex items-center justify-center h-12 w-12 !rounded-md overflow-hidden">
                  <Pressable
                    android_ripple={{ color: colors.neutral300 }}
                    className="absolute right-0 h-full flex items-center justify-center w-full"
                    onPress={handleTogglePasswordVisibility}
                  >
                    {isPasswordVisible ? <VisibleIcon /> : <InVisibleIcon />}
                  </Pressable>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        )}
      />
      {error && (
        <Text
          className="text-xs text-red-500 mt-1"
          style={{ ...FONTS.inter400 }}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default InputField;
