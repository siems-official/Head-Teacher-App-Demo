// components/CalendarHeader.tsx
import {
  addDays,
  ArrowKeyboardLeftIcon,
  ArrowKeyboardRightIcon,
  FONTS,
  getCalendarFormattedDate,
} from "@/services";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CalendarHeader = ({ selectedDate, setSelectedDate }) => {
  const handlePreviousDay = () => {
    const prevDate = addDays(new Date(selectedDate.timestamp), -1);
    setSelectedDate(getCalendarFormattedDate(prevDate));
  };

  const handleNextDay = () => {
    const nextDate = addDays(new Date(selectedDate.timestamp), 1);
    setSelectedDate(getCalendarFormattedDate(nextDate));
  };

  // Function to pad a number with leading zeros
  const pad = (n) => (n < 10 ? `0${n}` : n.toString());

  return (
    <View className="flex-row items-center justify-center gap-1 py-4">
      <TouchableOpacity onPress={handlePreviousDay}>
        <ArrowKeyboardLeftIcon className={"h-6 w-6"} />
      </TouchableOpacity>

      <Text className="text-sm !leading-[1.2]" style={{ ...FONTS.inter600 }}>
        {pad(selectedDate.day)}.{pad(selectedDate.month)}.{selectedDate.year}
      </Text>

      <TouchableOpacity onPress={handleNextDay}>
        <ArrowKeyboardRightIcon className={"h-6 w-6"} />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarHeader;
