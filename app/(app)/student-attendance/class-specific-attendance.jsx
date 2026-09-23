import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import CalendarHeader from "@/components/ui/CalenderHeader";
import DatePickerCalender from "@/components/ui/DatePickerCalender";
import {
  CalenderIcon,
  cn,
  colors,
  FilterIcon,
  FONTS,
  routes,
  safeRefetch,
} from "@/services";
import { useStudentAttendanceFilteredQuery } from "@/store/attendance/api";
import { setAttendanceDate } from "@/store/attendance/slice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const classSpecificAttendance = () => {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { attendanceDate, classSectionBasedAttendanceStatList } = useSelector(
    (state) => state.studentAttendance
  );

  // API CALLS
  const {
    isUninitialized: isUninitializedStudentAttendance,
    isLoading: isLoadingStudentAttendance,
    isFetching: isFetchingStudentAttendance,
    refetch: refetchStudentAttendance,
    isError,
  } = useStudentAttendanceFilteredQuery(
    {
      institute_id: user?.teacher?.institute_id,
      attendance_date: Math.floor(attendanceDate?.timestamp / 1000),

      attendanceSummary: true,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [calenderOpen, setCalenderOpen] = useState(false);

  // TABLE ACESSORIES
  const headers = ["SEC", "TOTAL", "P", "A"];
  const keys = ["section", "total", "present", "absent"];

  const tableData = classSectionBasedAttendanceStatList?.filter(
    (item) => item?.className === params?.className
  );

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : ""
          )}
        >
          <Text
            className={cn("text-xs text-center text-black-700")}
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
    <TouchableHighlight
      className={cn(
        "flex-row border-neutral-200 h-[42px] hover:bg-main-300",
        index === tableData.length - 1 ? "border-b-0" : "border-b"
      )}
      underlayColor={colors.main300}
      onPress={() =>
        router.push({
          pathname:
            routes.studentAttendance.subRoutes.sectionSpecificAttendance.path,
          params: item,
        })
      }
    >
      <Fragment>
        {keys?.map((key, keyIndex) => (
          <View
            key={keyIndex}
            className={cn(
              "flex-1 p-3 border-r border-transparent flex items-center justify-center",
              keyIndex === keys.length - 1 ? "border-r-0" : ""
            )}
          >
            <Text
              className={cn(
                "text-center text-xs !leading-[1.24] line-clamp-1",
                key === "sec" ? "text-main-500" : "text-black-700"
              )}
              style={{
                ...(key === "sec" ? FONTS.inter600 : FONTS.inter400),
              }}
            >
              {item[key]}
            </Text>
          </View>
        ))}
      </Fragment>
    </TouchableHighlight>
  );

  return (
    <BaseLayout title={`Class: ${params?.className}`}>
      <View className="flex flex-row gap-4 justify-between items-center px-4">
        <CalendarHeader
          selectedDate={attendanceDate}
          setSelectedDate={(dateObj) => dispatch(setAttendanceDate(dateObj))}
        />
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="border border-neutral-300 rounded-lg p-2">
            <FilterIcon />
          </TouchableOpacity>
          <View className="relative w-fit">
            <TouchableOpacity
              className="border border-neutral-300 rounded-lg p-2"
              onPress={() => setCalenderOpen(!calenderOpen)}
            >
              <CalenderIcon />
            </TouchableOpacity>
            <DatePickerCalender
              selected={attendanceDate}
              setSelected={(dateObj) => dispatch(setAttendanceDate(dateObj))}
              calenderOpen={calenderOpen}
              setCalenderOpen={setCalenderOpen}
            />
          </View>
        </View>
      </View>

      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={tableData}
        renderItem={renderItem}
        wrapperClassName={"mt-0 flex-1 mb-4"}
        innerScrollEnabled={true}
        loadingData={isLoadingStudentAttendance || isFetchingStudentAttendance}
        refetchFunction={() =>
          safeRefetch({
            refetch: refetchStudentAttendance,
            isUninitialized: isUninitializedStudentAttendance,
          })
        }
      />
    </BaseLayout>
  );
};

export default classSpecificAttendance;
