import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import KeyboardAwareButton from "@/components/ui/KeyboardAwareButton";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/services/assets/colors";
import { appIcon, cn, FONTS, loginValidationRules, routes } from "@/services";
import { router } from "expo-router";
import Toast from "react-native-simple-toast";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import InputField from "@/components/ui/InputField";
import { useLoginMutation } from "@/store/auth/api";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      instituteId: "",
      userCode: "",
      password: "",
    },
  });
  const { width } = Dimensions.get("window");
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const [rememberMe, setRememberMe] = useState(false);

  // On mount: checks AsyncStorage
  useEffect(() => {
    const loadRememberMe = async () => {
      try {
        const value = await AsyncStorage.getItem("remember_me");
        const savedCreds = await AsyncStorage.getItem("login_credentials");
        const remember = JSON.parse(value);

        setRememberMe(remember === true);

        if (remember && savedCreds) {
          const { instituteId, userCode, password } = JSON.parse(savedCreds);
          setValue("instituteId", instituteId);
          setValue("userCode", userCode);
          setValue("password", password);
        }
      } catch (e) {
        console.error("Failed to load login credentials", e);
      }
    };

    loadRememberMe();
  }, []);

  // Toggle and persist
  const toggleCheckbox = async () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    await AsyncStorage.setItem("remember_me", JSON.stringify(newValue));

    if (!newValue) {
      await AsyncStorage.removeItem("login_credentials");
    }
  };

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      const loginData = {
        entity_type: "teacher",
        institute_id: data.instituteId,
        username: data.userCode,
        password: data.password,
      };

      if (rememberMe) {
        await AsyncStorage.setItem(
          "login_credentials",
          JSON.stringify({
            instituteId: data.instituteId,
            userCode: data.userCode,
            password: data.password,
          })
        );
      } else {
        await AsyncStorage.removeItem("login_credentials");
      }

      login(loginData)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            if (res?.data?.teacher?.role === "head_teacher") {
              Toast.show(
                "Welcome to Smart Paathshala",
                Toast.BOTTOM,
                Toast.LONG,
                {
                  backgroundColor: colors.statusSuccess,
                }
              );
              router.replace(routes.home.path);
            } else {
              Toast.show(
                "Not authorized as head teacher!",
                Toast.BOTTOM,
                Toast.LONG,
                {
                  backgroundColor: colors.statusError,
                }
              );
            }
          }
        })
        .catch((err) => {
          Toast.show(
            err?.data?.message ||
              err?.error ||
              err?.message ||
              "Network error. Please try again.",
            Toast.BOTTOM,
            Toast.LONG,
            {
              backgroundColor: colors.statusError,
            }
          );
        });
    } else {
      console.log("Error:", errors);
    }
  };

  return (
    <View className="flex-1 bg-white-50 relative">
      <SafeAreaView className="flex-1">
        <View className="mt-3 mb-5 mx-4">
          <Text
            className="text-xl font-bold !leading-[1.1]"
            style={{ ...FONTS.inter700 }}
          >
            Sign In
          </Text>
        </View>

        <ScrollView
          scrollEventThrottle={16}
          overScrollMode="always"
          scrollToOverflowEnabled={false}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={true}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View className="px-4 pt-6 flex flex-col justify-center items-center">
            <Image source={appIcon} className="w-[130px] h-[130px] py-10" />
            <Text
              className="text-2xl font-bold !leading-[1.4] mt-2"
              style={{ ...FONTS.inter700 }}
            >
              Welcome Back!
            </Text>
            <Text
              className="text-sm font-bold !leading-[1.1] mt-2 text-black-600"
              style={{ ...FONTS.inter400 }}
            >
              Please sign in to continue
            </Text>
          </View>

          <View className={cn("flex flex-col items-stretch gap-3 mt-16")}>
            <InputField
              label="Institute ID"
              placeholder="Enter your institute id"
              name="instituteId"
              control={control}
              error={errors.instituteId}
              validationRules={loginValidationRules.instituteId}
            />
            <InputField
              label="Usercode"
              placeholder="Enter your usercode"
              name="userCode"
              control={control}
              error={errors.userCode}
              validationRules={loginValidationRules.userCode}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              name="password"
              control={control}
              error={errors.password}
              validationRules={loginValidationRules.password}
            />

            <TouchableOpacity
              onPress={toggleCheckbox}
              className="flex flex-row items-center gap-2 mt-1"
              activeOpacity={0.8}
            >
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                style={{ height: 16, width: 16 }}
                color={rememberMe ? colors.main500 : colors.neutral400}
              />
              <Text style={{ ...FONTS.inter400, fontSize: 12 }}>
                Remember me
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <KeyboardAwareButton>
          <View className="absolute bottom-6 left-4 w-full">
            <Button
              title="Sign In"
              className="w-full flex-grow"
              style={{ width: width - 28 }}
              buttonWrapperClassName="w-full min-h-[48px]"
              onPress={handleSubmit(onSubmit)}
              disabled={isLoginLoading || errors.length > 0}
            />
          </View>
        </KeyboardAwareButton>
      </SafeAreaView>

      <StatusBar style="dark" backgroundColor={colors.white50} />

      {isLoginLoading && <LoadingOverlay />}
    </View>
  );
};

export default LoginScreen;
