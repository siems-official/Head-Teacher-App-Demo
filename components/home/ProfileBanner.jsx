import { View, Text } from "react-native";
import {
  homeHeaderProfileBannerBackground,
  profileImage,
} from "@/services/assets/images";
import { cn } from "@/services/config";
import { FONTS } from "@/services/assets/fonts";
import {
  EmailIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from "@/services/assets/svgs";
import { useSelector } from "react-redux";
import { Image } from "react-native";

const ProfileBanner = () => {
  const { user } = useSelector((state) => state.auth);
  const { instituteDetails } = useSelector((state) => state.institute);

  return (
    <View className={cn("py-4 px-5 !rounded-xl bg-main-500 relative")}>
      <Image
        source={homeHeaderProfileBannerBackground}
        className="absolute min-w-[137px] min-h-[63px] right-0 bottom-0"
      />
      <View className={cn("flex flex-row items-center")}>
        <View
          className={cn(
            "flex items-center justify-center h-[46px] w-[46px] bg-white-50 !rounded-full border-2 border-white-50 relative z-[1]"
          )}
        >
          <Image
            source={
              user?.teacher?.image
                ? { uri: user?.teacher?.image }
                : profileImage
            }
            className="h-full w-full rounded-full"
          />
        </View>
        <View className={cn("ml-2 flex flex-col gap-1 max-w-[82%]")}>
          <Text
            className="text-white-50 text-base font-semibold !leading-[1.2] uppercase w-full line-clamp-1"
            style={{ ...FONTS.inter600 }}
          >
            {user?.teacher?.full_name}
          </Text>
          <Text
            className="text-white-50 text-xs !leading-[1.2] line-clamp-1"
            style={{ ...FONTS.inter400 }}
          >
            {"Head Teacher"}
          </Text>
        </View>
      </View>
      <View className={cn("h-[1px] w-full bg-main-600 my-3")} />

      <View className="flex flex-row items-center gap-[6px]">
        <LocationMarkerIcon className="h-4 w-4" />
        <Text
          className="text-white-50 text-xs !leading-[1.2] line-clamp-1 max-w-[90%]"
          style={{ ...FONTS.inter400 }}
        >
          {instituteDetails?.institute_address || "N/A"}
        </Text>
      </View>

      <View className="flex flex-row items-center gap-[6px] mt-2">
        <EmailIcon className="h-4 w-4" />
        <Text
          className="text-white-50 text-xs !leading-[1.2] line-clamp-1 max-w-[90%]"
          style={{ ...FONTS.inter400 }}
        >
          {user?.teacher?.email || "N/A"}
        </Text>
      </View>

      <View className="flex flex-row items-center gap-[6px] mt-2">
        <PhoneIcon className="h-4 w-4" />
        <Text
          className="text-white-50 text-xs !leading-[1.2] uppercase line-clamp-1 max-w-[90%]"
          style={{ ...FONTS.inter400 }}
        >
          {user?.teacher?.mobile_number || "N/A"}
        </Text>
      </View>
    </View>
  );
};

export default ProfileBanner;
