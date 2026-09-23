import { cn, colors, FONTS, routes } from "@/services";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const ClassTestExamListCard = ({ className, item }) => {
  const router = useRouter();

  return (
    <View
      className={cn(
        "w-full border border-main-200 rounded-xl relative overflow-hidden",
        className
      )}
    >
      <TouchableOpacity
        activeOpacity={0.75}
        className="px-6 py-3 w-full bg-main-100 flex flex-row items-center justify-between text-sm !leading-[1.2]"
        android_ripple={colors.main300}
        onPress={() =>
          router.push({
            pathname: routes.classTestView.path,
            // params: {
            //   subject: item?.subject_id?.subject_name,
            //   class: item?.local_class_id?.local_class_name,
            //   section: item?.section_id?.section_name,
            //   exam_id: item?._id,
            //   exam_type_id: item?.exam_type_id,
            //   exam_type_name: examTypeName,
            //   exam_date: item?.exam_date,
            //   id: item?._id,
            // },
          })
        }
      >
        <Text className="text-black-700" style={{ ...FONTS.inter600 }}>
          {"N/A"}
        </Text>
      </TouchableOpacity>

      <View className="p-4 flex flex-col gap-3">
        {/* subject */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-sm !leading-[1.4]"
            style={{ ...FONTS.inter400 }}
          >
            Subject
          </Text>
          <Text
            className="text-sm !leading-[1.2]"
            style={{ ...FONTS.inter600 }}
          >
            {item?.subject_id?.subject_name || "N/A"}
          </Text>
        </View>

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
            {item?.local_class_id?.local_class_name || "N/A"}
          </Text>
        </View>

        {/* section */}
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
            {item?.section_id?.section_name || "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ClassTestExamListCard;
