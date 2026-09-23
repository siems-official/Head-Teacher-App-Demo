import { FONTS, getFormattedDateWithParam } from "@/services";
import { Fragment } from "react";
import { View, Text } from "react-native";

const NumberSubmissionExamStats = ({ params }) => {
  return (
    <Fragment>
      <View className="mx-4 flex flex-col gap-2">
        {/* SUBJECT */}
        <View className="flex flex-row items-center justify-between gap-5">
          <Text
            className="text-sm !leading-[1.4] text-black-700"
            style={{ ...FONTS.inter400, fontSize: 14 }}
          >
            Subject
          </Text>
          <Text
            className="text-sm !leading-[1.2] whitespace-pre-wrap max-w-[200px] text-right"
            style={{ ...FONTS.inter600, fontSize: 14 }}
          >
            {params?.subject || "N/A"}
          </Text>
        </View>
        {/* CLASS */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4] text-black-700"
            style={{ ...FONTS.inter400, fontSize: 14 }}
          >
            Class
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600, fontSize: 14 }}
          >
            {params?.class || "N/A"}
          </Text>
        </View>
        {/* SECTION */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4] text-black-700"
            style={{ ...FONTS.inter400, fontSize: 14 }}
          >
            Section
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600, fontSize: 14 }}
          >
            {params?.section || "N/A"}
          </Text>
        </View>
        {/* EXAM DATE */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4] text-black-700"
            style={{ ...FONTS.inter400, fontSize: 14 }}
          >
            Exam Date
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600, fontSize: 14 }}
          >
            {params?.exam_date
              ? getFormattedDateWithParam({
                  date: Number(params?.exam_date), //gives error without typecasting
                  formattingType: ".",
                })
              : "N/A"}
          </Text>
        </View>
      </View>

      <Text
        className="text-sm !leading-[1.4] text-black-700 mx-4 mt-5"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        {params?.exam_type_name} Mark View
      </Text>
    </Fragment>
  );
};

export default NumberSubmissionExamStats;
