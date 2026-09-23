export const getTodayName = () =>
  new Date().toLocaleString("en-US", { weekday: "long" });

export const getMonthName = () =>
  new Date().toLocaleString("en-US", { month: "long" });

export const getCurrentYear = () => new Date().getFullYear();

export const getFormattedDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = now.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getFormattedDateWithParam = ({ date, formattingType = "/" }) => {
  let parsedDate;

  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === "number") {
    // If it's a timestamp in seconds (less than year 3000)
    parsedDate = new Date(date < 1e12 ? date * 1000 : date);
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate)) {
    console.warn("Invalid date passed to getFormattedDateWithParam:", date);
    return "";
  }

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = parsedDate?.getFullYear();

  return `${day}${formattingType}${month}${formattingType}${year}`;
};

export const formatTimestampToDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${mm}-${dd}-${yyyy}`;
};

export const getCalenderDateJoinedFormat = (timestamp) => {
  const date = new Date(Number(timestamp));

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

export const formatDateToYMD = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0"); // Months are 0-indexed
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}${month}${day}`;
};

export const getStartTimeEndTime = (unixTimestamp) => {
  // Convert unix timestamp to date object
  const dateTime = new Date(Number(unixTimestamp));

  // Get the start of the day (00:00:00) in the local timezone
  const startOfDay = new Date(
    dateTime.getFullYear(),
    dateTime.getMonth(),
    dateTime.getDate(),
    0,
    0,
    0
  );

  // Get the end of the day (23:59:59) in the local timezone
  const endOfDay = new Date(
    dateTime.getFullYear(),
    dateTime.getMonth(),
    dateTime.getDate(),
    23,
    59,
    59
  );

  // Convert back to unix timestamp (seconds)
  const startTimestamp = Math.floor(startOfDay.getTime() / 1000);
  const endTimestamp = Math.floor(endOfDay.getTime() / 1000);

  return {
    startTimestamp,
    endTimestamp,
  };
};

export const getCalendarFormattedDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // months are 0-indexed
  const year = date.getFullYear();
  const dateString = date.toISOString().split("T")[0]; // e.g. "2025-04-18"
  const timestamp = date.getTime();

  return { dateString, day, month, year, timestamp };
};

export const addDays = (date, numDays) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + numDays);
  return newDate;
};

export const getMidpointTimestamp = (range) => {
  const [startYear, endYear] = range?.toString().split("-").map(Number);

  if (isNaN(startYear) || isNaN(endYear)) {
    throw new Error(
      'Invalid year range format. Use something like "2024-2025".'
    );
  }

  const startDate = new Date(`${startYear}-01-01T00:00:00Z`).getTime();
  const endDate = new Date(`${endYear}-01-01T00:00:00Z`).getTime();

  return Math.floor((startDate + endDate) / 2 / 1000);
};

export const getYearBasedTimestampInSeconds = (year) => {
  const timestamp = new Date(`${year}-01-01`).getTime();
  const timestampInSeconds = timestamp / 1000;

  return timestampInSeconds;
};

export const dateToSecondTimestamp = (dateStr) => {
  // dateStr example "2025-06-19"
  return Math.floor(new Date(dateStr).getTime() / 1000);
}; // in seconds. example: 1640995200

export const secondTimestampToDate = (timestamp) => {
  if (!timestamp || isNaN(Number(timestamp))) return "";

  const ts = Number(timestamp);
  const normalized = ts > 1e12 ? ts : ts * 1000;
  const date = new Date(normalized);

  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
};
