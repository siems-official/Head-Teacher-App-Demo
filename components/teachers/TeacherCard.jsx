import { View, Text, Linking } from "react-native";
import {
  chat,
  cn,
  FONTS,
  handleCallPress,
  handleChatPress,
  handleMailPress,
  mail,
  phoneCall,
  profileImage,
} from "@/services";
import { Image, TouchableOpacity } from "react-native";
import { Fragment } from "react";

const TeacherCard = ({ teacher, className = "" }) => {
  return (
    <View
      className={cn(
        "w-full !rounded-xl overflow-hidden border border-main-500",
        className
      )}
    >
      {/* TOP PORTION */}
      <View className="py-2 px-4 bg-main-500 flex flex-row items-center gap-2">
        <View
          className={cn(
            "flex items-center justify-center h-[46px] w-[46px] bg-white-50 !rounded-full border-2 border-white-50 relative z-[1]"
          )}
        >
          <Image
            source={
              teacher?.image
                ? {
                    uri: String(teacher?.image),
                  }
                : profileImage
            }
            className="h-full w-full rounded-full"
            height={200}
            width={200}
            alt={teacher?.name}
          />
        </View>
        <View className="flex flex-col">
          <Text
            className="text-base font-semibold text-white-50 max-w-[300px] line-clamp-1"
            style={{ ...FONTS.inter600 }}
          >
            {teacher?.full_name}{" "}
            {teacher?.highest_qualification && (
              <Text className="text-xs" style={{ ...FONTS.inter400 }}>
                ({teacher?.highest_qualification})
              </Text>
            )}
          </Text>
          <Text
            className="text-xs !leading-[1.24] text-white-100 capitalize"
            style={{ ...FONTS.inter400 }}
          >
            {teacher?.designation || "teacher"}
          </Text>
        </View>
      </View>

      {/* BOTTOM PORTION */}
      <View className="bg-white-50 p-4">
        {/* 1 */}
        <View className="flex flex-col gap-1 max-w-full">
          {teacher?.mobile_number && (
            <View className="flex flex-row items-center gap-2 justify-between">
              <Text
                className="text-xs text-black-600 flex-shrink"
                style={{ ...FONTS.inter400 }}
              >
                Contact No:
              </Text>
              <Text
                className="text-xs text-black-700 font-medium"
                style={{ ...FONTS.inter500 }}
              >
                {teacher?.mobile_number}
              </Text>
            </View>
          )}

          {teacher?.email && (
            <View className="flex flex-row items-center gap-2 justify-between">
              <Text
                className="text-xs text-black-600 flex-shrink"
                style={{ ...FONTS.inter400 }}
              >
                Contact Email:
              </Text>
              <Text
                className="text-xs text-black-700 font-medium"
                style={{ ...FONTS.inter500 }}
              >
                {teacher?.email}
              </Text>
            </View>
          )}
        </View>

        {/* 2 */}
        <View className="mt-4 flex flex-row items-center justify-end gap-2">
          {teacher?.mobile_number && (
            <Fragment>
              <TouchableOpacity
                activeOpacity={0.35}
                className="!rounded-lg h-fit w-fit flex items-center justify-center"
                onPress={() =>
                  handleCallPress({ number: teacher?.mobile_number })
                }
              >
                <Image source={phoneCall} className="h-6 w-6" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.35}
                className="!rounded-lg h-fit w-fit flex items-center justify-center"
                onPress={() =>
                  handleChatPress({ number: teacher?.mobile_number })
                }
              >
                <Image source={chat} className="h-6 w-6" />
              </TouchableOpacity>
            </Fragment>
          )}
          {teacher?.email && (
            <TouchableOpacity
              activeOpacity={0.35}
              className="!rounded-lg h-fit w-fit flex items-center justify-center"
              onPress={() => handleMailPress({ email: teacher?.email })}
            >
              <Image source={mail} className="h-6 w-6" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default TeacherCard;
