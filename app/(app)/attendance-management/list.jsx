import AttendanceMapperTable from "@/components/attendance/AttendanceMapperTable";
import AttendanceSummaryTable from "@/components/attendance/AttendanceSummaryTable";
import Button from "@/components/ui/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { colors, getMonthName, routes, safeRefetch } from "@/services";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import moment from "moment";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useGetEnrollListQuery } from "@/store/enrollment/api";
import BaseLayout from "@/components/shared/BaseLayout";
import { useDialog } from "@/hooks/useDialog";
import {
  useCheckAttendanceExistanceQuery,
  useClassAttendanceBulkAddMutation,
  useClassAttendanceBulkUpdateMutation,
} from "@/store/attendanceManagement/api";

const attendanceListScreen = () => {
  const { Dialog, hideDialog, showDialog } = useDialog();
  const { user } = useSelector((state) => state.auth);
  const { selectedYear } = useSelector((state) => state.academicYear);
  const {
    totalStudents,
    present,
    absent,
    onLeave,
    attendanceList,
    presentCount,
  } = useSelector((state) => state.attendanceManagement);
  const { id, subject_id, class_id, section_id, day_id, period_id, group_id } =
    useLocalSearchParams();
  const translateY = useSharedValue(0);
  const router = useRouter();
  const monthName = getMonthName();

  // UNIQUE KEY
  const uniqueKey = `${class_id}-${section_id}-${period_id}-${subject_id}`;

  // GET ENROLL LIST
  const {
    isUninitialized: isUninitializedEnrollList,
    isLoading: isLoadingEnrollList,
    isFetching: isFetchingEnrollList,
    isSuccess: enrollmentFetchSuccess,
    isError: isErrorLoadingEnrollList,
    refetch: refetchEnrollList,
  } = useGetEnrollListQuery(
    {
      institute_id: user?.teacher?.institute_id,
      subject_id: subject_id,
      teacher_id: user?.teacher?._id,
      class_id: class_id,
      section_id: section_id,
      period_id: period_id,
      group_id: group_id,
    },
    {
      // refetchOnMountOrArgChange: true,
      skip: attendanceExistance,
    }
  );

  // CHECK ATTENDANCE EXISTANCE
  const {
    isUninitialized: isUninitializedExistance,
    data: attendanceExistance,
    isLoading: isLoadingExistance,
    isFetching: isFetchingExistance,
    isError: isErrorLoadingExistance,
    refetch: refetchExistance,
  } = useCheckAttendanceExistanceQuery(
    {
      institute_id: user?.teacher?.institute_id,
      local_class_id: class_id,
      section_id: section_id,
      day_id: day_id,
      period_id: period_id,
      teacher_id: user?.teacher?._id,
      subject_id: subject_id,
      month: monthName,
      academic_year: selectedYear?.global_academic_year,
    },
    {
      skip: !enrollmentFetchSuccess, // Only run after enrollment succeeds,
      refetchOnMountOrArgChange: true,
    }
  );

  // ATTENDANCE BULK ADD
  const [attendanceBulkAdd, { isLoading: isBulkAttendanceAdding }] =
    useClassAttendanceBulkAddMutation();

  const [attendanceBulkUpdate, { isLoading: isBulkAttendanceUpdating }] =
    useClassAttendanceBulkUpdateMutation();

  // HANDLING API ERRORS
  if (isErrorLoadingEnrollList || isErrorLoadingExistance)
    Toast.show("Something went wrong.", Toast.BOTTOM, Toast.LONG, {
      backgroundColor: colors.statusError,
    });

  // TABLE ACCESSORIES
  const headers = ["TOTAL STUDENTS", "PRESENT", "ABSENTS", "ON LEAVE"];
  const keys = ["total", "present", "absent", "onLeave"];

  const attendanceSummaryData = [
    {
      total: totalStudents[uniqueKey],
      present: present?.[uniqueKey],
      absent: absent?.[uniqueKey],
      onLeave: onLeave?.[uniqueKey],
    },
  ];

  const handleCloseModal = () => {
    hideDialog();
    router.back();
  };

  const handleBulkUpload = async () => {
    const data = attendanceList?.[uniqueKey]?.map((student) => ({
      institute_id: user?.teacher?.institute_id,
      academic_year: selectedYear?.global_academic_year,
      local_class_id: class_id,
      section_id: section_id,
      day_id: day_id,
      period_id: period_id,
      student_id: student?._id,
      teacher_id: user?.teacher?._id,
      subject_id: subject_id,
      group_id: group_id,
      month: new Date().toLocaleString("en-US", { month: "long" }),
      attendance_date: moment().utc().unix(),
      attendance_status: student?.attendanceStatus,
    }));

    attendanceBulkAdd(data)
      .unwrap()
      .then(async (res) => {
        if (res?.success) {
          showDialog();
        }
      })
      .catch((err) => {
        Toast.show(err?.data?.message, Toast.BOTTOM, Toast.LONG, {
          backgroundColor: colors.statusError,
        });
        console.log(err);
      });
  };

  // console.log(attendanceExistance?.data?.isExists);

  const handleBulkUpdate = async () => {
    const data = attendanceList?.[uniqueKey]?.map((student) => ({
      _id: student?.attendanceId,
      institute_id: user?.teacher?.institute_id,
      attendance_status: student?.attendanceStatus,
    }));

    attendanceBulkUpdate(data)
      .unwrap()
      .then(async (res) => {
        if (res?.success) {
          showDialog();
        }
      })
      .catch((err) => {
        Toast.show(err?.data?.message, Toast.BOTTOM, Toast.LONG, {
          backgroundColor: colors.statusError,
        });
        console.error(err);
      });
  };

  return (
    <BaseLayout title={"Attendance"}>
      <View className="flex-1 p-4">
        <AttendanceSummaryTable
          data={attendanceSummaryData}
          keys={keys}
          headers={headers}
        />
        <Button
          title="Counting"
          textClassName="text-base"
          className="mt-3 bg-secondary-500 py-4"
          onPress={() =>
            router.push({
              pathname: routes.attendanceGrid.path,
              params: {
                id: id,
                subject_id: subject_id,
                class_id: class_id,
                section_id: section_id,
                day_id: day_id,
                period_id: period_id,
                attendanceExists: attendanceExistance?.data?.isExists,
              },
            })
          }
        />

        <AttendanceMapperTable
          translateY={translateY}
          data={attendanceList?.[uniqueKey]}
          presentCount={presentCount?.[uniqueKey]}
          class_id={class_id}
          section_id={section_id}
          period_id={period_id}
          subject_id={subject_id}
          attendanceExistance={attendanceExistance}
          loadingData={
            isLoadingEnrollList ||
            isLoadingExistance ||
            isFetchingEnrollList ||
            isFetchingExistance
          }
          refetchFunction={() => {
            safeRefetch({
              refetch: refetchEnrollList,
              isUninitialized: isUninitializedEnrollList,
            });
            safeRefetch({
              refetch: refetchExistance,
              isUninitialized: isUninitializedExistance,
            });
          }}
        />
      </View>

      <View className="pb-5 px-4">
        <Button
          title="Submit"
          className="w-full flex-grow"
          buttonWrapperClassName="w-full min-h-[48px]"
          onPress={
            attendanceExistance?.data?.isExists
              ? handleBulkUpdate
              : handleBulkUpload
          }
          disabled={isBulkAttendanceAdding || isBulkAttendanceUpdating}
        />
      </View>

      {(isBulkAttendanceAdding || isBulkAttendanceUpdating) && (
        <LoadingOverlay />
      )}

      <Dialog
        successModal
        titleText={"Successful!"}
        description={"Attendance successfully saved!"}
        handleConfirm={handleCloseModal}
      />
    </BaseLayout>
  );
};

export default attendanceListScreen;
