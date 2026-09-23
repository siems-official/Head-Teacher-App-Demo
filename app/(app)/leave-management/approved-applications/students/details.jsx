import BaseLayout from "@/components/shared/BaseLayout";
import { colors, FONTS, secondTimestampToDate } from "@/services";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const ApprovedApplicationsStudentsDetailsScreen = () => {
  const params = useLocalSearchParams();
  const { approvedstudentApplications } = useSelector(
    (state) => state.leaveManagement
  );

  const selectedApplication = approvedstudentApplications?.data?.find(
    (item) => {
      return item._id === params?._id;
    }
  );

  const detailedData = [
    {
      label: "Name",
      value: selectedApplication?.student_id?.name_english || "N/A",
    },
    {
      label: "Class",
      value:
        selectedApplication?.student_id?.current_class?.local_class_name ||
        "N/A",
    },
    {
      label: "Section",
      value: selectedApplication?.current_section?.section_name || "N/A",
    },
    {
      label: "Roll",
      value: selectedApplication?.student_id?.current_roll_number || "N/A",
    },
    {
      label: "ID",
      value: selectedApplication?.student_id?.username || "N/A",
    },
    {
      label: "Contact",
      value: selectedApplication?.student_id?.mobile_number || "N/A",
    },
    {
      label: "Application Date",
      value:
        secondTimestampToDate(selectedApplication?.student_id?.createdAt) ||
        "N/A",
    },
    {
      label: "Leave Duration",
      value:
        `${secondTimestampToDate(selectedApplication?.start_date)}${
          selectedApplication?.end_date
            ? ` - ${secondTimestampToDate(selectedApplication?.end_date)}`
            : ""
        }` || "N/A",
    },
    {
      label: "Status",
      value: "Approved",
    },
    {
      label: "Reason",
      value: selectedApplication?.reason || "N/A",
    },
    {
      label: "Note",
      value: selectedApplication?.reason_description || "N/A",
    },
  ];

  return (
    <BaseLayout title="View Application">
      <Text
        className="mx-4 !leading-[1.4] text-black-700 mt-5"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Application Details
      </Text>

      <View className="border border-neutral-300 p-4 mx-4 mt-2 rounded-xl flex-col gap-2">
        {detailedData?.map((item, index) => (
          <View className="flex-row justify-between gap-4" key={index}>
            <Text
              className="text-black-700 !leading-[1.4]"
              style={{ ...FONTS.inter400, fontSize: 14 }}
            >
              {item.label}:
            </Text>
            <Text
              className="text-black-700 !leading-[1.2] max-w-[160px]"
              style={{
                ...FONTS.inter600,
                fontSize: 14,
                color:
                  item.label === "Status"
                    ? colors.statusSuccess
                    : colors.black700,
              }}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </BaseLayout>
  );
};

export default ApprovedApplicationsStudentsDetailsScreen;
