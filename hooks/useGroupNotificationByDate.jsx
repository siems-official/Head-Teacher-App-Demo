import moment from "moment";

const useGroupNotificationsByDate = (notifications) => {
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "day").startOf("day");

  return notifications.reduce((acc, notification) => {
    const notificationDate = moment(notification.date);

    if (notificationDate.isSame(today, "day")) {
      acc["Today"] = [...(acc["Today"] || []), notification];
    } else if (notificationDate.isSame(yesterday, "day")) {
      acc["Yesterday"] = [...(acc["Yesterday"] || []), notification];
    } else {
      const formattedDate = notificationDate.format("Do, MMMM"); // e.g., "29th, March"
      acc[formattedDate] = [...(acc[formattedDate] || []), notification];
    }

    return acc;
  }, {});
};

export default useGroupNotificationsByDate;
