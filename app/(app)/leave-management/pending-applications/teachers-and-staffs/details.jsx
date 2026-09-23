import BaseLayout from "@/components/shared/BaseLayout";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import SuccessDialog from "@/components/shared/SuccessDialog";
import Button from "@/components/ui/Button";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { colors, FONTS, secondTimestampToDate } from "@/services";
import { useUpdateLeaveStatusMutation } from "@/store/leaveManagement/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";

const PendingApplicationsTeachersDetailsScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { user } = useSelector((state) => state.auth);
  const { pendingTeacherStuffApplications } = useSelector(
    (state) => state.leaveManagement
  );

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [statusState, setStatusState] = useState(null);

  // UPDATE LEAVE STATUS API CALL
  const [updateLeaveStatus, { isLoading: isUpdateLeaveStatusLoading }] =
    useUpdateLeaveStatusMutation();

  // UPDATE LEAVE STATUS ACTION HANDLER
  const updateLeaveStatusHandler = ({ leave_id, status }) => {
    setStatusState(status);
    updateLeaveStatus({
      leave_id,
      institute_id: user?.teacher?.institute_id,
      type: "teacher",
      data: {
        status,
      },
    })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          if ((status = "approved")) {
            setSuccessDialogOpen(true);
          } else if ((status = "rejected")) {
            setConfirmationDialogOpen(true);
          }
        }
      })
      .catch((err) => {
        Toast.show(err?.data?.message, Toast.BOTTOM, Toast.LONG, {
          backgroundColor: colors.statusError,
        });
      });
  };

  // FINDING APPLICATION DETAILS
  const applicationDetails =
    pendingTeacherStuffApplications?.reservedData?.find(
      (application) => application?._id === params?.leave_id
    );

  const detailedData = [
    {
      label: "Name",
      value: applicationDetails?.teacher_id?.full_name || "N/A",
    },
    {
      label: "Designation",
      value: "Teacher",
    },
    {
      label: "ID",
      value: applicationDetails?.teacher_id?.username || "N/A",
    },
    {
      label: "Contact",
      value: applicationDetails?.teacher_id?.mobile_number || "N/A",
    },
    {
      label: "Application Date",
      value: applicationDetails?.application_date || "N/A",
    },
    {
      label: "Leave Duration",
      value:
        `${secondTimestampToDate(applicationDetails?.start_date)}${
          applicationDetails?.end_date
            ? ` - ${secondTimestampToDate(applicationDetails?.end_date)}`
            : ""
        }` || "N/A",
    },
    {
      label: "Status",
      value: applicationDetails?.status || "N/A",
    },
    {
      label: "Reason",
      value: applicationDetails?.reason || "N/A",
    },
    {
      label: "Note",
      value: applicationDetails?.reason_description || "N/A",
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
              className="text-black-700 !leading-[1.2] max-w-[160px] text-right"
              style={{
                ...FONTS.inter600,
                fontSize: 14,
                color:
                  item.label === "Status"
                    ? colors.statusWarning
                    : colors.black700,
              }}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* NAVIGATION BUTTONS */}
      <View className="flex flex-row gap-2 mx-4 mt-auto mb-6">
        <Button
          title="Reject"
          onPress={() => {
            setConfirmationDialogOpen(true);
            // updateLeaveStatusHandler({
            //   leave_id: applicationDetails?._id,
            //   status: "rejected",
            // });
          }}
          className="h-12 bg-status-error"
          textClassName="text-base"
          color={colors.main500}
          buttonWrapperStyle={{ width: width / 2 - 19 }}
        />
        <Button
          title="Approve"
          onPress={() => {
            updateLeaveStatusHandler({
              leave_id: applicationDetails?._id,
              status: "approved",
            });
          }}
          className="h-12 bg-status-success"
          textClassName="text-base"
          color={colors.main500}
          buttonWrapperStyle={{ width: width / 2 - 19 }}
        />
      </View>

      <SuccessDialog
        isModalVisible={successDialogOpen}
        setModalVisible={setSuccessDialogOpen}
        onConfirm={() => {
          setSuccessDialogOpen(false);
          router.canGoBack() && router.back();
        }}
        message={`Application has been ${statusState} successfully.`}
      />
      <ConfirmationDialog
        isModalVisible={confirmationDialogOpen}
        setModalVisible={setConfirmationDialogOpen}
        onConfirm={() =>
          updateLeaveStatusHandler({
            leave_id: applicationDetails?._id,
            status: "rejected",
          })
        }
      />

      {isUpdateLeaveStatusLoading && <LoadingOverlay />}
    </BaseLayout>
  );
};

export default PendingApplicationsTeachersDetailsScreen;
