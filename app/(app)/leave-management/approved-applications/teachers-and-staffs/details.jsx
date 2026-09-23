import BaseLayout from "@/components/shared/BaseLayout";
import {
  colors,
  FONTS,
  formatTimestampToDate,
  secondTimestampToDate,
} from "@/services";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const ApprovedApplicationsTeachersDetailsScreen = () => {
  const params = useLocalSearchParams();
  const { approvedteacherStuffApplications } = useSelector(
    (state) => state.leaveManagement
  );

  const selectedApplication = approvedteacherStuffApplications?.data?.find(
    (item) => {
      return item._id === params?._id;
    }
  );

  const detailedData = [
    {
      label: "Name",
      value: selectedApplication?.teacher_id?.full_name,
    },
    {
      label: "Designation",
      value: "Teacher",
    },
    {
      label: "ID",
      value: selectedApplication?.teacher_id?.username,
    },
    {
      label: "Contact",
      value: selectedApplication?.teacher_id?.mobile_number,
    },
    {
      label: "Application Date",
      value: secondTimestampToDate(selectedApplication?.createdAt),
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
      value: selectedApplication?.reason,
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

export default ApprovedApplicationsTeachersDetailsScreen;
