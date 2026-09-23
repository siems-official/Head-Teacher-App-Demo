import { useRouter } from "expo-router";
import { ArrowKeyboardRightIcon, cn, colors, FONTS, routes } from "@/services";
import { View, Text, TouchableOpacity } from "react-native";
import { getFormattedDateWithParam } from "@/services/helpers/dateTime";
import { useSelector } from "react-redux";

const ExamListCard = ({ className, item }) => {
  const router = useRouter();
  const { allExamTypes } = useSelector((state) => state.exam);

  const examTypeName = allExamTypes?.find(
    (et) => et?._id === item?.exam_type_id
  )?.exam_type_name;

  return (
    <View
      className={cn(
        "w-full border border-main-200 rounded-xl relative overflow-hidden",
        className
      )}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        className="px-6 py-3 w-full bg-main-100 flex flex-row items-center justify-between gap-5 text-sm !leading-[1.2]"
        android_ripple={colors.main300}
        onPress={() =>
          router.push({
            pathname:
              routes?.examResults.subRoutes.examList.subRoutes
                .examNumberSubmission.path,
            params: {
              subject_id: item?.subject_id?._id,
              subject: item?.subject_id?.subject_name,
              class_id: item?.local_class_id?._id,
              class: item?.local_class_id?.local_class_name,
              section_id: item?.section_id?._id,
              section: item?.section_id?.section_name,
              group_id: item?.group_id?._id,
              group: item?.group_id?.group_name,
              exam_id: item?._id,
              exam_type_id: item?.exam_type_id,
              exam_type_name: examTypeName,
              exam_date: item?.exam_date,
              id: item?._id,
            },
          })
        }
      >
        <Text className="text-black-700" style={{ ...FONTS.inter600 }}>
          {examTypeName}
        </Text>
        <ArrowKeyboardRightIcon color="#4F4F4F" />
      </TouchableOpacity>

      <View className="p-4 flex flex-col gap-3">
        {/* subject */}
        <View className="flex flex-row items-center justify-between gap-5">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Subject
          </Text>
          <Text
            className="text-sm !leading-[1.2] whitespace-pre-wrap max-w-[200px] text-right"
            style={{ ...FONTS.inter600 }}
          >
            {item?.subject_id?.subject_name || "N/A"}
          </Text>
        </View>

        {/* class */}
        <View className="flex flex-row items-center justify-between gap-5">
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
            {item?.local_class_id?.local_class_name || "N/A"}
          </Text>
        </View>

        {/* section */}
        <View className="flex flex-row items-center justify-between gap-5">
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
            {item?.section_id?.section_name || "N/A"}
          </Text>
        </View>

        {/* exam Date */}
        <View className="flex flex-row items-center justify-between gap-5">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Exam Date
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.exam_date
              ? getFormattedDateWithParam({
                  date: item?.exam_date,
                  formattingType: ".",
                })
              : "N/A"}
          </Text>
        </View>

        {/* number submission date */}
        <View className="flex flex-row items-center justify-between gap-5">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Number Submission Date
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.last_mark_input_date
              ? getFormattedDateWithParam({
                  date: item?.last_mark_input_date,
                  formattingType: ".",
                })
              : "N/A"}
          </Text>
        </View>

        {/* building Name */}
        <View className="flex flex-row items-center justify-between gap-5">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Building Name
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.building_name || "N/A"}
          </Text>
        </View>

        {/* room No. */}
        <View className="flex flex-row items-center justify-between gap-5">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Room No.
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.room_number || "N/A"}
          </Text>
        </View>

        {/* status */}
        <View className="flex flex-row items-center justify-between gap-5">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Status
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.status
              ? item?.status === "not_announced"
                ? "Not Announced"
                : "Announced"
              : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExamListCard;
