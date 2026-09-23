import { Text, TouchableOpacity, View } from "react-native";
import BaseLayout from "@/components/shared/BaseLayout";
import FilterBox from "@/components/leaveManagement/FilterBox";
import { useState } from "react";
import {
  cn,
  colors,
  dateToSecondTimestamp,
  enumList,
  FONTS,
  getCalendarFormattedDate,
  routes,
  ViewEyeIcon,
} from "@/services";
import DataTable from "@/components/shared/DataTable";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useLazyGetFilteredLeavesQuery } from "@/store/leaveManagement/api";
import Toast from "react-native-simple-toast";

const RejectedApplicationsStudentsScreen = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { selectedYear } = useSelector((state) => state.academicYear);
  const { rejectedstudentApplications } = useSelector(
    (state) => state.leaveManagement
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [id, setId] = useState("");

  // GET LEAVES
  const [
    getFilteredLeaves,
    {
      isError: isFilteredLeavesError,
      isLoading: isFilteredLeavesLoading,
      isFetching: isFilteredLeavesFetching,
    },
  ] = useLazyGetFilteredLeavesQuery();

  const handleGetLeaves = () => {
    if (!id && !selectedDate) return;
    getFilteredLeaves({
      institute_id: user?.teacher?.institute_id,
      status: enumList.applicationStatus.REJECTED,
      type: enumList.userType.STUDENT,
      academic_year: selectedYear?.global_academic_year,
      ...(id && { username: id }),
      ...(selectedDate && {
        date: dateToSecondTimestamp(selectedDate.dateString),
      }),
    });
  };

  // DATA FETCH ERROR MANAGEMENT
  if (isFilteredLeavesError)
    Toast.show("Something went wrong", Toast.BOTTOM, Toast.LONG);

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
        index === rejectedstudentApplications?.data?.length - 1
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
            <TouchableOpacity
              className={cn(
                "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                keyIndex === keys.length - 1 ? "border-r-0" : ""
              )}
              onPress={() =>
                router.push({
                  pathname:
                    routes.leaveManagement.subRoutes.rejectedApplications
                      .subRoutes.studentsDetails.path,
                  params: {
                    _id: item._id,
                  },
                })
              }
              activeOpacity={0.35}
            >
              <ViewEyeIcon height={16} width={16} color={colors.statusInfo} />
            </TouchableOpacity>
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
    <BaseLayout title="Rejected Applications">
      <View className="relative flex-1">
        <FilterBox
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onInputTextChange={setId}
          inputTextValue={id}
          onSearchPress={handleGetLeaves}
        />

        <Text
          className="mx-4 !leading-[1.4] text-black-700 mt-5"
          style={{ ...FONTS.inter400, fontSize: 14 }}
        >
          Students
        </Text>

        {/* DATA TABLE */}
        <DataTable
          headers={headers}
          tableHeader={tableHeader()}
          data={rejectedstudentApplications?.data}
          renderItem={renderItem}
          wrapperClassName={"mt-3 mb-4 flex-1"}
          innerScrollEnabled={true}
          loadingData={isFilteredLeavesLoading || isFilteredLeavesFetching}
          refetchFunction={handleGetLeaves}
          noDataMessage="Enter Student ID or Date to search"
        />
      </View>
    </BaseLayout>
  );
};

export default RejectedApplicationsStudentsScreen;
