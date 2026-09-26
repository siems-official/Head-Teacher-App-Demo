import BaseLayout from "@/components/shared/BaseLayout";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import DataTable from "@/components/shared/DataTable";
import SuccessDialog from "@/components/shared/SuccessDialog";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import {
  CheckLineIcon,
  cn,
  colors,
  CrossLineIcon,
  FONTS,
  routes,
  safeRefetch,
  ViewEyeIcon,
} from "@/services";
import {
  useGetFilteredLeavesQuery,
  useUpdateLeaveStatusMutation,
} from "@/store/leaveManagement/api";
import { useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";

const PendingApplicationsTeachersScreen = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { pendingTeacherStuffApplications } = useSelector(
    (state) => state.leaveManagement
  );

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [statusState, setStatusState] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // GET LEAVES
  const {
    isUninitialized: isLeavesUninitialized,
    isLoading: isLeavesLoading,
    isFetching: isLeavesFetching,
    refetch: refetchLeaves,
  } = useGetFilteredLeavesQuery({
    type: "teacher",
    status: "pending",
    institute_id: user?.teacher?.institute_id,
  });

  // UPDATE LEAVE STATUS
  const [updateLeaveStatus, { isLoading: isUpdateLeaveStatusLoading }] =
    useUpdateLeaveStatusMutation();

  // UPDATE LEAVE STATUS
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
          setSuccessDialogOpen(true);
        }
      })
      .catch((err) => {
        Toast.show(
          err?.data?.message ||
            err?.error ||
            err?.message ||
            "Network error. Please try again.",
          Toast.BOTTOM,
          Toast.LONG,
          {
            backgroundColor: colors.statusError,
          }
        );
      });
  };

  // TABLE ACESSORIES
  const headers = ["ID", "Name", "Appl. Date", "Action"];
  const keys = ["id", "name", "application_date", "action"];

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : "",
            header === "Action" && "w-[84px]",
            header === "Name" && "w-[100px]",
            header === "ID" && "w-[60px]"
          )}
        >
          <Text
            className="text-xs text-center text-black-700"
            style={{
              ...FONTS.inter600,
            }}
          >
            {header}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View
      className={cn(
        "flex-row border-neutral-200 h-[42px] hover:bg-main-300",
        index === pendingTeacherStuffApplications?.data?.length - 1
          ? "border-b-0"
          : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          className={cn("flex-1", key === "action" && "w-[84px]")}
          key={keyIndex}
        >
          {key === "action" ? (
            <View className={cn("flex flex-row")}>
              <TouchableOpacity
                className={cn(
                  "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                  keyIndex === keys.length - 1 ? "border-r-0" : ""
                )}
                onPress={() =>
                  updateLeaveStatusHandler({
                    leave_id: item._id,
                    status: "approved",
                  })
                }
                activeOpacity={0.35}
              >
                <CheckLineIcon
                  height={16}
                  width={16}
                  color={colors.statusSuccess}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className={cn(
                  "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                  keyIndex === keys.length - 1 ? "border-r-0" : ""
                )}
                onPress={() => {
                  setConfirmationDialogOpen(true);
                  setSelectedLeave(item);
                }}
                activeOpacity={0.35}
              >
                <CrossLineIcon
                  height={16}
                  width={16}
                  color={colors.statusError}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className={cn(
                  "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                  keyIndex === keys.length - 1 ? "border-r-0" : ""
                )}
                onPress={() =>
                  router.push({
                    pathname:
                      routes.leaveManagement.subRoutes.pendingApplications
                        .subRoutes.teachersAndStaffsDetails.path,
                    params: {
                      leave_id: item._id,
                    },
                  })
                }
                activeOpacity={0.35}
              >
                <ViewEyeIcon height={16} width={16} color={colors.statusInfo} />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              className={cn(
                "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                keyIndex === keys.length - 1 ? "border-r-0" : ""
              )}
            >
              <Text
                className={cn(
                  "text-center text-xs !leading-[1.24] line-clamp-1",
                  key === "cls" ? "text-main-500" : "text-black-700"
                )}
                style={{
                  ...(key === "cls" ? FONTS.inter600 : FONTS.inter400),
                }}
              >
                {item[key]}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <BaseLayout title="Pending Applications">
      <Text
        className="mx-4 !leading-[1.4] text-black-700 mt-5"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Teachers' & Staff's Application List
      </Text>

      {/* DATA TABLE */}
      <Fragment>
        <DataTable
          headers={headers}
          tableHeader={tableHeader()}
          data={pendingTeacherStuffApplications?.data}
          renderItem={renderItem}
          wrapperClassName={"mt-3 mb-4 flex-1"}
          innerScrollEnabled={true}
          loadingData={isLeavesLoading || isLeavesFetching}
          refetchFunction={() =>
            safeRefetch({
              refetch: refetchLeaves,
              isUninitialized: isLeavesUninitialized,
            })
          }
        />
        {/* <Pagination
          meta={meta}
          onPageChange={handlePageChange}
          containerClassName="mt-2"
        /> */}
      </Fragment>

      <SuccessDialog
        isModalVisible={successDialogOpen}
        setModalVisible={setSuccessDialogOpen}
        message={`Application has been ${statusState} successfully.`}
      />
      <ConfirmationDialog
        isModalVisible={confirmationDialogOpen}
        setModalVisible={setConfirmationDialogOpen}
        onConfirm={() =>
          updateLeaveStatusHandler({
            leave_id: selectedLeave?._id,
            status: "rejected",
          })
        }
      />

      {isUpdateLeaveStatusLoading && <LoadingOverlay />}
    </BaseLayout>
  );
};

export default PendingApplicationsTeachersScreen;
