import BaseLayout from "@/components/shared/BaseLayout";
import AttendanceStatMapperTable from "@/components/studentAttendance/AttendanceStatMapperTable";
import Button from "@/components/ui/Button";
import CalendarHeader from "@/components/ui/CalenderHeader";
import CircularProgress from "@/components/ui/CircularPieChart";
import DatePickerCalender from "@/components/ui/DatePickerCalender";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import {
  CalenderIcon,
  colors,
  ExclamationIcon,
  FilterIcon,
  FONTS,
  routes,
  safeRefetch,
} from "@/services";
import { useStudentAttendanceFilteredQuery } from "@/store/attendance/api";
import { setAttendanceDate } from "@/store/attendance/slice";
import { useGetSectionsQuery } from "@/store/sections/api";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import { Text, useWindowDimensions } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const StudentAttendanceScreen = () => {
  // HOOKS
  const { width } = useWindowDimensions();
  const router = useRouter();
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { user } = useSelector((state) => state.auth);
  const { sectionList } = useSelector((state) => state.sections);
  const {
    attendanceDate,
    studentAttendanceMeta,
    classSectionBasedAttendanceStatList,
  } = useSelector((state) => state.studentAttendance);

  // STATES
  const [refreshing, setRefreshing] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false);

  // API CALLS
  const {
    isUninitialized: isUninitializedSections,
    isLoading: isLoadingSections,
    isFetching: isFetchingSections,
    refetch: refetchSections,
  } = useGetSectionsQuery({
    institute_id: user?.teacher?.institute_id,
  });

  const {
    isLoading: isLoadingFilteredStudents,
    isFetching: isFetchingFilteredStudents,
    refetch: refetchFilteredStudents,
    isError: isErrorFilteredStudents,
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

  // NOTE: CALCULATIONS FOR TABLE DATA MAPPING EVEN FOR THE NON-EXISTING ENTRIES LIKE IF NOT ATTENDANCE IS TAKEN
  const attendanceStatListMap = new Map();

  classSectionBasedAttendanceStatList?.forEach((entry) => {
    attendanceStatListMap.set(entry?._id, entry);
  });

  sectionList?.forEach((section) => {
    const uniqueKey = `${section?.local_class_id?._id}_${section?._id}`;

    if (!attendanceStatListMap.has(uniqueKey)) {
      attendanceStatListMap.set(uniqueKey, {
        _id: uniqueKey,
        classCode: section?.local_class_id?.local_class_code,
        className: section?.local_class_id?.local_class_name,
        section: section?.section_name,
        total: 0,
        present: 0,
        absent: 0,
        period: "",
      });
    }
  });

  const attendanceStatListTableContent = Array.from(
    attendanceStatListMap.values()
  ).sort((a, b) => {
    if (a.classCode !== b.classCode) return a.classCode - b.classCode;
    return a.section.localeCompare(b.section);
  });

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      safeRefetch({
        refetch: refetchFilteredStudents,
        isUninitialized: isErrorFilteredStudents,
      });

      safeRefetch({
        refetch: refetchSections,
        isUninitialized: isUninitializedSections,
      });

      setRefreshing(false);
    }, 2000);
  }, []);

  const attendanceSummaryData = [
    {
      title: "Totals",
      value: studentAttendanceMeta.totalStudents,
    },
    {
      title: "Presents",
      value: studentAttendanceMeta.totalPresent,
    },
    {
      title: "Absents",
      value: studentAttendanceMeta.totalAbsent,
    },
  ];

  return (
    <BaseLayout title="Attendance" className="relative">
      <ScrollView
        scrollEventThrottle={16}
        overScrollMode="always"
        bounces={true}
        alwaysBounceVertical={true}
        nestedScrollEnabled={true} // IF used with a nested scrollview or flatlist
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.main500]}
          />
        }
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push(routes.studentAttendance.subRoutes.absentAlert.path)
          }
          className="bg-status-error rounded-lg flex flex-row items-center justify-center w-[calc(100%-32px)] mx-4 h-12 px-2"
        >
          {/* BALANCER */}
          {/* <View className="h-5 w-5 invisible" /> */}
          <View className="flex flex-row items-center justify-center gap-2">
            <ExclamationIcon
              color={colors.white50}
              className={"w-[18px] h-[18px]"}
            />
            <Text
              className="text-base text-white-50"
              style={{ ...FONTS.inter600 }}
            >
              Absent Alert
            </Text>
          </View>
          {/* <View className="bg-status-alert rounded-full h-5 min-w-5 flex items-center justify-center">
            <Text
              className="text-white-50 text-[10px]"
              style={{ ...FONTS.inter700 }}
            >
              10
            </Text>
          </View> */}
        </TouchableOpacity>

        {/* DATE BASED FILTER */}
        <View className="flex flex-row gap-4 justify-between items-center px-4">
          <CalendarHeader
            selectedDate={attendanceDate}
            setSelectedDate={(dateObj) => dispatch(setAttendanceDate(dateObj))}
          />
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="border border-neutral-300 rounded-lg p-2">
              <FilterIcon />
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-neutral-300 rounded-lg p-2"
              onPress={() => setCalenderOpen(!calenderOpen)}
            >
              <CalenderIcon />
            </TouchableOpacity>
          </View>
        </View>
        <DatePickerCalender
          selected={attendanceDate}
          setSelected={(dateObj) => {
            dispatch(setAttendanceDate(dateObj));
            setCalenderOpen(false);
          }}
          calenderOpen={calenderOpen}
          setCalenderOpen={setCalenderOpen}
          style={{ position: "absolute", right: 14, top: 0 }}
        />

        {/* CHARTS */}
        <View className="flex flex-row gap-3 mx-4 mt-3">
          <View
            className="bg-main-100 rounded-xl py-6 px-3 flex flex-col gap-3"
            style={{ width: width / 2 - 19 }}
          >
            <Text
              className="text-sm !leading-[1.2] text-center text-black-700"
              style={{ ...FONTS.inter600 }}
            >
              Students Present
            </Text>
            <CircularProgress
              percentage={
                (studentAttendanceMeta.totalPresent /
                  studentAttendanceMeta.totalStudents) *
                100
              }
              radius={70}
              strokeWidth={15}
              color="#1DA1F2"
              backgroundColor="#E5E7EB7c"
              duration={1500} // Animation duration in ms
            />
          </View>
          <View
            className="bg-secondary-100 rounded-xl py-6 px-3 flex flex-col gap-3"
            style={{ width: width / 2 - 19 }}
          >
            <Text
              className="text-sm !leading-[1.2] text-center text-black-700"
              style={{ ...FONTS.inter600 }}
            >
              Students Absent
            </Text>
            <CircularProgress
              percentage={
                (studentAttendanceMeta.totalAbsent /
                  studentAttendanceMeta.totalStudents) *
                100
              }
              radius={70}
              strokeWidth={15}
              color={colors.secondary500}
              textColor={colors.secondary500}
              backgroundColor="#E5E7EB7c"
              duration={1500} // Animation duration in ms
            />
          </View>
        </View>

        {/* ATTENDANCE STAT MAPPER TABLE */}
        <AttendanceStatMapperTable data={attendanceStatListTableContent} />

        {/* SUMMARY LIST */}
        <View className="mt-3 px-4 py-6 bg-main-100 w-[calc(100%-32px)] rounded-xl mx-4 flex flex-col gap-2">
          {attendanceSummaryData.map((item, index) => (
            <AttendanceSummaryList
              key={index}
              title={item.title}
              value={item.value}
            />
          ))}
        </View>

        {/* NAVIGATION BUTTONS */}
        <View className="flex flex-row gap-2 mx-4 mt-6 h-12">
          <Button
            title="Class Attendance"
            onPress={() =>
              router.push(
                routes.studentAttendance.subRoutes.classAttendance.path
              )
            }
            className="h-full"
            textClassName="text-base"
            color={colors.main500}
            buttonWrapperStyle={{ width: width / 2 - 19 }}
          />
          <Button
            title="Absents History"
            onPress={() =>
              router.push(routes.studentAttendance.subRoutes.absentHistory.path)
            }
            className="h-full bg-secondary-500"
            textClassName="text-base"
            color={colors.main500}
            buttonWrapperStyle={{ width: width / 2 - 19 }}
          />
        </View>
      </ScrollView>

      {(isLoadingFilteredStudents ||
        isLoadingSections ||
        isFetchingFilteredStudents ||
        isFetchingSections) && <LoadingOverlay />}
    </BaseLayout>
  );
};

const AttendanceSummaryList = ({ title, value }) => {
  return (
    <View className="flex flex-row gap-4 justify-between items-center">
      <Text
        className="text-black-700 text-sm !leading-[1.4]"
        style={{ ...FONTS.inter400 }}
      >
        {title}:
      </Text>
      <Text
        className="text-black-700 text-sm !leading-[1.2]"
        style={{ ...FONTS.inter600 }}
      >
        {value}
      </Text>
    </View>
  );
};

export default StudentAttendanceScreen;
