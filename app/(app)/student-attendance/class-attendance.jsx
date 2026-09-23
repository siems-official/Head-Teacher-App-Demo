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
import { useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ClassAttendanceScreen = () => {
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
    isError: isErrorLoadingStudentAttendance,
    refetch: refetchStudentAttendance,
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

  const classWiseAttendanceMap = new Map();
  classSectionBasedAttendanceStatList?.forEach((entry) => {
    if (!classWiseAttendanceMap.has(entry?.classCode)) {
      classWiseAttendanceMap.set(entry?.classCode, {
        ...entry,
      });
    } else {
      const current = classWiseAttendanceMap.get(entry?.classCode);
      current.total += entry?.total;
      if (entry?.attendance_status === "present") {
        current.present += entry?.present;
      } else if (entry?.attendance_status === "absent") {
        current.absent += entry?.absent;
      }
    }
  });

  const classWiseAttendance = Array.from(classWiseAttendanceMap.values());

  // TABLE ACESSORIES
  const headers = ["CLS", "TOTAL", "P", "A"];
  const keys = ["className", "total", "present", "absent"];

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
            className={cn("text-xs text-center text-black-700 line-clamp-1")}
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
        index === classWiseAttendance.length - 1 ? "border-b-0" : "border-b"
      )}
      underlayColor={colors.main300}
      onPress={() =>
        router.push({
          pathname:
            routes.studentAttendance.subRoutes.classSpecificAttendance.path,
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
                key === "className" ? "text-main-500" : "text-black-700"
              )}
              style={{
                ...(key === "className" ? FONTS.inter600 : FONTS.inter400),
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
    <BaseLayout title="Class Attendance" className={"relative"}>
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
              setSelected={(dateObj) => {
                dispatch(setAttendanceDate(dateObj));
                setCalenderOpen(false);
              }}
              calenderOpen={calenderOpen}
              setCalenderOpen={setCalenderOpen}
            />
          </View>
        </View>
      </View>

      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={classWiseAttendance}
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

      {/* {(isLoading || isFetching) && <LoadingOverlay />} */}
    </BaseLayout>
  );
};

export default ClassAttendanceScreen;
