import { ArrowKeyboardRightIcon, cn, colors, FONTS, routes } from "@/services";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const EnrollmentCard = ({ item, className }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const subject = item?.subjects?.find(
    (s) => s.teacher_id === user?.teacher?._id
  );

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
            pathname: routes.enrollmentList.path,
            params: {
              section_id: item?.section_id?._id,
              class_id: item?.local_class_id?._id,
              institute_id: item?.institute_id,
              subject_id: subject?.subject_id?._id || subject?.subject_id,
            },
          })
        }
      >
        <Text className="text-white-50" style={{ ...FONTS.inter600 }}>
          Class: {item?.local_class_id?.local_class_name}
        </Text>
        <ArrowKeyboardRightIcon color="white" />
      </TouchableOpacity>

      <View className="p-4 flex flex-col gap-3">
        {/* period */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Section
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.section_id?.section_name}
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
            {subject?.subject_id?.subject_name || "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EnrollmentCard;
