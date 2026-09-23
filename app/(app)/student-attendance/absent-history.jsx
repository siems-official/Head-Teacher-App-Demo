import {
  chat,
  cn,
  colors,
  FONTS,
  getCalendarFormattedDate,
  handleCallPress,
  handleChatPress,
  phoneCall,
} from "@/services";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FilterBox from "@/components/studentAttendance/absentHistory/FilterBox";
import DataTable from "@/components/shared/DataTable";
import StudentAttendanceDialog from "@/components/shared/StudentAttendanceDialog";
import { useDialog } from "@/hooks/useDialog";
import BaseLayout from "@/components/shared/BaseLayout";
import { useLazyStudentAttendanceFilteredQuery } from "@/store/attendance/api";
import { useSelector } from "react-redux";

const AbsentHistory = () => {
  const { Dialog, showDialog } = useDialog();
  const { user } = useSelector((state) => state.auth);
  const { absentHistory } = useSelector((state) => state.studentAttendance);
  const [
    searchStudentAttendanceList,
    { isFetching: isFetchingAttendanceHistory },
  ] = useLazyStudentAttendanceFilteredQuery();

  const [startDate, setStartDate] = useState(() =>
    getCalendarFormattedDate(new Date())
  );
  const [endDate, setEndDate] = useState(() =>
    getCalendarFormattedDate(new Date())
  );
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [activeStudentInfo, setActiveStudentInfo] = useState({});

  // TABLE ACESSORIES
  const headers = ["Roll", "Name", "Absent", "Action"];
  const keys = ["roll", "name", "absent", "action"];

  const handleViewStudentPress = (info) => {
    showDialog();
    setActiveStudentInfo(info);
  };

  const handleSearchAbsentHistory = () => {
    searchStudentAttendanceList({
      institute_id: user?.teacher?.institute_id,
      section_id: selectedSection,
      local_class_id: selectedClass,
      start_date: Math.floor(startDate.timestamp / 1000),
      end_date: Math.floor(endDate.timestamp / 1000),

      absentHistory: true,
    });
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
        index === absentHistory?.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          key={keyIndex}
          className={cn(
            "flex-1 p-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys.length - 1 ? "border-r-0" : "",
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
                onPress={() => handleCallPress({ number: item?.phone })}
              >
                <Image source={phoneCall} className="h-6 w-6" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.35}
                className="!rounded-lg h-fit w-fit flex items-center justify-center"
                onPress={() => handleChatPress({ number: item?.phone })}
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
    <BaseLayout title="Absents History">
      <FilterBox
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        searchPress={handleSearchAbsentHistory}
      />

      {/* DATA TABLE */}
      {absentHistory?.length > 0 && !isFetchingAttendanceHistory && (
        <DataTable
          headers={headers}
          tableHeader={tableHeader()}
          data={absentHistory}
          renderItem={renderItem}
          wrapperClassName={"mt-3 flex-1 mb-4"}
          innerScrollEnabled={true}
        />
      )}

      {absentHistory?.length === 0 && !isFetchingAttendanceHistory && (
        <View className="flex-1 flex items-center justify-center">
          <Text
            className="text-neutral-400 text-center"
            style={{ ...FONTS.inter500, fontSize: 16 }}
          >
            No data available for this filter
          </Text>
        </View>
      )}

      {isFetchingAttendanceHistory && (
        <View className="flex-1 bg-white-50 flex justify-center items-center">
          <ActivityIndicator size="large" color={colors.main500} />
        </View>
      )}

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

export default AbsentHistory;
