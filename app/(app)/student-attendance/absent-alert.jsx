import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import StudentAttendanceDialog from "@/components/shared/StudentAttendanceDialog";
import { useDialog } from "@/hooks/useDialog";
import {
  chat,
  cn,
  FONTS,
  getCurrentYear,
  getMonthName,
  handleCallPress,
  handleChatPress,
  phoneCall,
  safeRefetch,
} from "@/services";
import DataTable from "@/components/shared/DataTable";
import BaseLayout from "@/components/shared/BaseLayout";
import { useStudentAttendanceFilteredQuery } from "@/store/attendance/api";
import { useSelector } from "react-redux";

const absentAlert = () => {
  const { Dialog, showDialog } = useDialog();
  const { user } = useSelector((state) => state.auth);
  const { monthlyAbsentList } = useSelector((state) => state.studentAttendance);

  const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-based
  const currentMonthName = getMonthName(currentMonth);
  const currentYear = getCurrentYear();

  const {
    isUninitialized: isUninitializedAttendance,
    isLoading: isLoadingAttendance,
    isFetching: isFetchingAttendance,
    refetch: refetchAttendance,
  } = useStudentAttendanceFilteredQuery({
    institute_id: user?.teacher?.institute_id,
    month: currentMonthName,
    academic_year: currentYear,

    absentAlert: true,
  });

  // console.log({
  //   institute_id: user?.teacher?.institute_id,
  //   month: currentMonthName,
  //   academic_year: currentYear,

  //   absentAlert: true,
  // });

  const [activeStudentInfo, setActiveStudentInfo] = useState({});

  // TABLE ACESSORIES
  const headers = ["Roll", "Name", "Absent", "Action"];
  const keys = ["roll", "name", "absent", "action"];

  const data = monthlyAbsentList?.filter((student) => student.absent > 3);

  const handleViewStudentPress = (info) => {
    showDialog();
    setActiveStudentInfo(info);
  };

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : "",
            (header === "Name" && "min-w-[148px]") ||
              (header === "Action" && "min-w-[78px]") ||
              (header === "Absent" && "min-w-[66px]") ||
              "min-w-[50px]"
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
        "flex-row border-neutral-200 h-[42px]",
        index === data?.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          key={keyIndex}
          className={cn(
            "flex-1 p-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys?.length - 1 ? "border-r-0" : "",
            (key === "name" && "min-w-[148px]") ||
              (key === "action" && "min-w-[78px]") ||
              "min-w-[50px]"
          )}
        >
          {(key === "roll" || key === "absent") && (
            <Text
              className={cn(
                "text-center text-[10px] !leading-[1.24]",
                key === "roll" && "text-black-700",
                key === "name" && "text-main-500 font-semibold underline",
                key === "absent" && "w-[46px]"
              )}
              style={{
                ...FONTS.inter400,
              }}
            >
              {item[key]}
            </Text>
          )}
          {key === "name" && (
            <TouchableOpacity
              onPress={() => handleViewStudentPress(item)}
              activeOpacity={0.35}
            >
              <Text
                className={cn(
                  "text-center text-[10px] !leading-[1.24] text-main-500 font-semibold underline"
                )}
                style={{
                  ...FONTS.inter600,
                }}
              >
                {item[key]}
              </Text>
            </TouchableOpacity>
          )}
          {key === "action" && (
            <View className="flex flex-row items-center justify-end gap-2">
              <TouchableOpacity
                activeOpacity={0.35}
                className="!rounded-lg h-fit w-fit flex items-center justify-center"
                onPress={() => handleCallPress({ number: "+91 1234567890" })}
              >
                <Image source={phoneCall} className="h-6 w-6" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.35}
                className="!rounded-lg h-fit w-fit flex items-center justify-center"
                onPress={() => handleChatPress({ number: "+91 1234567890" })}
              >
                <Image source={chat} className="h-6 w-6" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <BaseLayout title="Absent Alert">
      <Text
        className="mx-4 mt-2 !leading-[1.2] text-black-700"
        style={{ ...FONTS.inter600, fontSize: 14 }}
      >
        Students with 3+ Consecutive Absences
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={data}
        renderItem={renderItem}
        wrapperClassName={"mt-3 flex-1 mb-4"}
        innerScrollEnabled={true}
        loadingData={isLoadingAttendance || isFetchingAttendance}
        refetchFunction={() =>
          safeRefetch({
            refetch: refetchAttendance,
            isUninitialized: isUninitializedAttendance,
          })
        }
      />

      <StudentAttendanceDialog
        Dialog={Dialog}
        name={activeStudentInfo?.name}
        roll={activeStudentInfo?.roll}
        studyClass={activeStudentInfo?.classCode}
        present={activeStudentInfo?.present}
        absent={activeStudentInfo?.absent}
        totalClass={activeStudentInfo?.totalClass}
        phone={activeStudentInfo?.phone}
        studentImage={activeStudentInfo?.image}
      />
    </BaseLayout>
  );
};

export default absentAlert;
