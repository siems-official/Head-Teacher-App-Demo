import BaseLayout from "@/components/shared/BaseLayout";
import AttendanceHistoryTable from "@/components/teacherAttendance/attendanceHistory/AttendanceHistoryTable";
import FilterBox from "@/components/teacherAttendance/attendanceHistory/FilterBox";
import { getCalendarFormattedDate } from "@/services";
import { useState } from "react";

const AttendanceHistory = () => {
  const [startDate, setStartDate] = useState(() =>
    getCalendarFormattedDate(new Date())
  );
  const [endDate, setEndDate] = useState(() =>
    getCalendarFormattedDate(new Date())
  );

  return (
    <BaseLayout title="Attendance History">
      <FilterBox
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <AttendanceHistoryTable />
    </BaseLayout>
  );
};

export default AttendanceHistory;
