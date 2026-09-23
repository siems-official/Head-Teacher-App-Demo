import BaseLayout from "@/components/shared/BaseLayout";
import AttendanceDataTable from "@/components/teacherAttendance/todaysAttendance/AttendanceDataTable";
import DatePickerCalender from "@/components/ui/DatePickerCalender";
import {
  CalenderIcon,
  cn,
  FONTS,
  getCalendarFormattedDate,
  PrintIcon,
} from "@/services";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TodaysAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(
    getCalendarFormattedDate(new Date())
  );
  const [showDateCalender, setShowDateCalender] = useState(false);

  const statData = [
    {
      type: "T. Employee",
      value: "50",
      bgScheme: "#CDFFE9",
    },
    {
      type: "Present",
      value: "45",
      bgScheme: "#FFE5CC",
    },
    {
      type: "Absent",
      value: "05",
      bgScheme: "#C9ECFF",
    },
    {
      type: "On Leave",
      value: "05",
      bgScheme: "#C5D1FF",
    },
  ];

  return (
    <BaseLayout title="Today's Attendance">
      <View className="flex flex-row gap-2 mx-4">
        {statData.map((item, index) => (
          <View
            key={index}
            className="flex-1 px-2 py-4 rounded-lg flex flex-col justify-center gap-[6px] min-h-[66px]"
            style={{ backgroundColor: item.bgScheme }}
          >
            <Text
              className="!leading-[1.3] text-black-700"
              style={{ ...FONTS.inter400, fontSize: 10 }}
            >
              {item.type}
            </Text>
            <Text
              className="text-sm text-black-900"
              style={{ ...FONTS.inter700, fontSize: 12 }}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      <View className="relative mx-4 mt-5">
        <TouchableOpacity
          className="border border-neutral-300 rounded-lg py-3 px-4 flex flex-row items-center justify-between h-12 shrink-0 bg-white-50"
          onPress={() => {
            setShowDateCalender(!showDateCalender);
          }}
        >
          <Text
            className={cn(
              "text-sm !leading-[1.4]",
              selectedDate ? "text-black-700" : "text-white-400"
            )}
            style={{ ...FONTS.inter400 }}
          >
            {selectedDate ? selectedDate?.dateString : "Start Date"}
          </Text>
          <CalenderIcon />
        </TouchableOpacity>

        <DatePickerCalender
          selected={selectedDate}
          setSelected={setSelectedDate}
          calenderOpen={showDateCalender}
          setCalenderOpen={setShowDateCalender}
          style={{ top: 12, right: 0 }}
        />
      </View>

      <View className="mx-4 mt-5 flex flex-row gap-4 items-center justify-between">
        <Text
          className="text-black-700 !leading-normal"
          style={{ ...FONTS.inter400, fontSize: 14 }}
        >
          Attendance List
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex flex-row items-center justify-center gap-1 min-h-8 px-3 bg-main-500 rounded-lg"
        >
          <PrintIcon width={12} height={12} />
          <Text
            className="!leading-[1.4] text-white-50"
            style={{ ...FONTS.inter600, fontSize: 10 }}
          >
            Print
          </Text>
        </TouchableOpacity>
      </View>

      <AttendanceDataTable />
    </BaseLayout>
  );
};

export default TodaysAttendance;
