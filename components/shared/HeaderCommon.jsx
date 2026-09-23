import { View, Text, Pressable } from "react-native";
import Button from "../ui/Button";
import { BackArrowIcon, EditIcon, FONTS } from "@/services";
import { useRouter } from "expo-router";

const HeaderCommon = ({ showEditButton = true, title = "" }) => {
  const router = useRouter();

  return (
    <View className="flex flex-row justify-between items-center px-4 min-h-[56px]">
      <Button
        icon={<BackArrowIcon className={"h-5 w-5 shrink-0"} />}
        className="bg-transparent h-10 w-10"
        rippleColor="#ccc"
        onPress={() => router.back()}
      />
      <Text
        className="text-lg font-semibold !leading-[1.4]"
        style={{ ...FONTS.inter600 }}
      >
        {title}
      </Text>

      {/* Balancer */}
      {showEditButton ? (
        <View className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
          <Pressable
            android_ripple={{ color: "#ccc" }}
            onPress={() => router.push("profile/edit")}
            className="h-full w-full rounded-full bg-transparent flex items-center justify-center"
          >
            <View className="h-7 w-7 rounded-full overflow-hidden border border-main-500 flex items-center justify-center">
              <EditIcon />
            </View>
          </Pressable>
        </View>
      ) : (
        <View className="h-10 w-10" />
      )}
    </View>
  );
};

export default HeaderCommon;
