import { ArrowKeyboardRightIcon, cn, colors, FONTS, routes } from "@/services";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const AttendanceRoutineCard = ({ className, item }) => {
  const router = useRouter();

  return (
    <View
      className={cn(
        "w-full border border-neutral-300 rounded-xl relative overflow-hidden",
        className
      )}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        className="px-4 py-3 w-full bg-main-500 flex flex-row items-center justify-between text-sm !leading-[1.2]"
        android_ripple={colors.main800}
        onPress={() =>
          router.push({
            pathname: routes.attendanceList.path,
            params: {
              id: item?._id,
              subject_id: item?.subject_id?._id,
              class_id: item?.local_class_id?._id,
              section_id: item?.section_id?._id,
              day_id: item?.day_id?._id,
              period_id: item?.period_id?._id,
              group_id: item?.group_id?._id,
            },
          })
        }
      >
        <Text className="text-white-50" style={{ ...FONTS.inter600 }}>
          {item?.day_id?.day_name}
        </Text>
        <ArrowKeyboardRightIcon color="white" />
      </TouchableOpacity>

      <View className="p-4 flex flex-col gap-3">
        {/* class */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Class
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.local_class_id?.local_class_name}
            {`(${item?.section_id?.section_name})`}
          </Text>
        </View>
        {/* period */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Period
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.period_id?.period_name}
          </Text>
        </View>
        {/* subject */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Subject
          </Text>
          <Text
            className="text-sm !leading-[1.2] max-w-[200px] text-right"
            style={{ ...FONTS.inter600 }}
          >
            {item?.subject_id?.subject_name}
          </Text>
        </View>
        {/* start time */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Start time
          </Text>
          <Text
            className="text-sm !leading-[1.2] max-w-[200px] text-right"
            style={{ ...FONTS.inter600 }}
          >
            {item?.start_time}
          </Text>
        </View>
        {/* end time */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            End time
          </Text>
          <Text
            className="text-sm !leading-[1.2] max-w-[200px] text-right"
            style={{ ...FONTS.inter600 }}
          >
            {item?.end_time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AttendanceRoutineCard;
