import { Text, TouchableOpacity, View } from "react-native";
import BaseLayout from "@/components/shared/BaseLayout";
import FilterBox from "@/components/leaveManagement/FilterBox";
import { useState } from "react";
import {
  cn,
  colors,
  FONTS,
  getCalendarFormattedDate,
  routes,
  SearchIcon,
  ViewEyeIcon,
} from "@/services";
import DataTable from "@/components/shared/DataTable";
import { useRouter } from "expo-router";

const AllNotifications = () => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(() =>
    getCalendarFormattedDate(new Date())
  );
  const [notificationName, setNotificationName] = useState("");

  // TABLE ACESSORIES
  const headers = ["ID", "Name", "Appl. Date", "Action"];
  const keys = ["id", "name", "application_date", "action"];

  const data = [
    {
      _id: 1,
      id: "1",
      name: "John Doe",
      application_date: "17.04.2022",
    },
    {
      _id: 2,
      id: "2",
      name: "Jane Doe",
      application_date: "17.04.2022",
    },
  ];

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : "",
            header === "Action" && "w-[84px]",
            header === "Name" && "w-[100px]",
            header === "ID" && "w-[60px]"
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
        "flex-row border-neutral-200 h-[42px] hover:bg-main-300",
        index === data.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          className={cn("flex-1", key === "action" && "w-[84px]")}
          key={keyIndex}
        >
          {key === "action" ? (
            <TouchableOpacity
              className={cn(
                "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                keyIndex === keys.length - 1 ? "border-r-0" : ""
              )}
              onPress={() =>
                router.push(
                  routes.leaveManagement.subRoutes.rejectedApplications
                    .subRoutes.teachersAndStaffsDetails.path
                )
              }
              activeOpacity={0.35}
            >
              <ViewEyeIcon height={16} width={16} color={colors.statusInfo} />
            </TouchableOpacity>
          ) : (
            <View
              className={cn(
                "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                keyIndex === keys.length - 1 ? "border-r-0" : ""
              )}
            >
              <Text
                className={cn(
                  "text-center text-xs !leading-[1.24] line-clamp-1",
                  key === "cls" ? "text-main-500" : "text-black-700"
                )}
                style={{
                  ...(key === "cls" ? FONTS.inter600 : FONTS.inter400),
                }}
              >
                {item[key]}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <BaseLayout title="All Notifications">
      <View className="relative">
        <FilterBox
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onInputTextChange={setNotificationName}
          inputTextValue={notificationName}
        />

        <Text
          className="mx-4 !leading-[1.4] text-black-700 mt-5"
          style={{ ...FONTS.inter400, fontSize: 14 }}
        >
          Notification List
        </Text>

        {/* DATA TABLE */}
        {data.length > 0 ? (
          <DataTable
            headers={headers}
            tableHeader={tableHeader()}
            data={data}
            renderItem={renderItem}
            wrapperClassName={"mt-3"}
            innerScrollEnabled={true}
          />
        ) : (
          <View className="flex-1 flex flex-col items-center justify-center w-full">
            <SearchIcon color={colors.neutral300} height={80} width={80} />
            <Text
              className="!leading-[1.4] text-white-150"
              style={{ ...FONTS.inter400, fontSize: 14 }}
            >
              Select to see data
            </Text>
          </View>
        )}
      </View>
    </BaseLayout>
  );
};

export default AllNotifications;
