import DataTable from "@/components/shared/DataTable";
import CustomScrollView from "@/components/shared/ScrollViewWithBar";
import { cn, colors, FONTS, SearchIcon, SortIcon } from "@/services";
import React from "react";
import { View, Text, Pressable } from "react-native";

const AttendanceHistoryTable = () => {
  // TABLE MATERIALS
  const headers = ["ID", "Name", "T.W.D", "Present", "Leave", "Holiday"];
  const keys = ["id", "name", "twd", "present", "leave", "holiday"];

  const data = [
    {
      _id: "1",
      id: "1",
      name: "A",
      twd: "10",
      present: "10",
      leave: "10",
      holiday: "10",
    },
    {
      _id: "2",
      id: "2",
      name: "B",
      twd: "10",
      present: "10",
      leave: "10",
      holiday: "10",
    },
    {
      _id: "3",
      id: "3",
      name: "C",
      twd: "10",
      present: "10",
      leave: "10",
      holiday: "10",
    },
  ];

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers.map((header) => (
        <Pressable
          key={header}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            header === "ID" ? "w-[54px]" : "w-[100px]"
          )}
        >
          <Text
            className="text-xs text-center text-black-700"
            style={{ ...FONTS.inter600 }}
          >
            {header}
          </Text>
          {header === "Status" && <SortIcon className="" />}
        </Pressable>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View
      className={cn(
        "w-full flex-row border-neutral-200 h-[42px]",
        index === data.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          key={keyIndex}
          className={cn(
            "flex-1 p-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys.length - 1 ? "border-r-0" : "",
            key === "id" ? "w-[54px]" : "w-[100px]"
          )}
        >
          <Text
            className={cn("text-center text-[10px] !leading-[1.24]")}
            style={{
              ...FONTS.inter400,
            }}
          >
            {item[key]}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <CustomScrollView horizontal overScrollMode="always" className="h-fit mx-4">
      <View className="overflow-hidden scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 min-w-[500px] mb-8">
        {/* DATA TABLE */}
        {data.length > 0 ? (
          <DataTable
            headers={headers}
            tableHeader={tableHeader()}
            data={data}
            renderItem={renderItem}
            wrapperClassName={"mt-3 mx-0"}
            innerScrollEnabled={true}
          />
        ) : (
          <View className="flex-1 flex flex-col items-center justify-center w-full">
            <SearchIcon color={colors.neutral300} height={80} width={80} />
            <Text
              className="!leading-[1.4] text-white-150"
              style={{ ...FONTS.inter400, fontSize: 14 }}
            >
              Select date and class to see data
            </Text>
          </View>
        )}
      </View>
    </CustomScrollView>
  );
};

export default AttendanceHistoryTable;
