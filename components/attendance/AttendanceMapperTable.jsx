import { cn, colors, FONTS } from "@/services";
import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Switch from "../ui/Switch";
import { handleScrollForAnimatedButton } from "@/services/helpers/scroll";
import { useDispatch } from "react-redux";
import {
  setAllAttendanceStatus,
  setAttendanceStatus,
} from "@/store/attendanceManagement/slice";

const AttendanceMapperTable = ({
  translateY,
  data,
  presentCount,
  isDisabled,
  class_id,
  section_id,
  period_id,
  subject_id,
  loadingData,
  refetchFunction,
  attendanceExistance,
}) => {
  const lastScrollY = useRef(0);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      if (refetchFunction) refetchFunction();
      setRefreshing(false);
    }, 2000);
  }, []);

  const headers = ["Name", "Roll", "Status"];
  const keys = ["name", "roll", "attendanceStatus"];

  const toggleMasterSwitch = (value) => {
    dispatch(
      setAllAttendanceStatus({
        status: value ? "present" : "absent",
        class_id,
        section_id,
        period_id,
        subject_id,
      })
    );
  };

  const toggleIndividualSwitch = ({ id, value }) => {
    dispatch(
      setAttendanceStatus({
        studentId: id,
        status: value ? "present" : "absent",
        class_id,
        section_id,
        period_id,
        subject_id,
      })
    );
  };

  const TableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={`flex-1 py-5 px-3 border-r border-neutral-300 items-center justify-center flex-row
            ${index === headers.length - 1 ? "border-r-0" : ""}`}
        >
          {index !== headers.length - 1 && (
            <Text
              className="text-xs text-center text-black-700"
              style={{
                ...FONTS.inter600,
              }}
            >
              {header}
            </Text>
          )}
          {index === headers.length - 1 && (
            <Switch
              trackColor={{ false: "#D1D5DB", true: "#34D399" }}
              thumbColor={"#ffffff"}
              ios_backgroundColor="#D1D5DB"
              onValueChange={toggleMasterSwitch}
              value={presentCount === data?.length}
              disabled={isDisabled}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View
      className={cn(
        "flex-row border-neutral-200",
        index === data.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, index) => (
        <View
          key={index}
          className={`flex-1 p-3 border-r border-transparent items-center justify-center
            ${index === keys.length - 1 ? "border-r-0" : ""}`}
        >
          {key === "attendanceStatus" ? (
            <Switch
              trackColor={{ false: "#D1D5DB", true: "#34D399" }}
              thumbColor={item[key] ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#D1D5DB"
              onValueChange={(value) =>
                toggleIndividualSwitch({ id: item?._id, value })
              }
              value={item[key] === "absent" ? false : true}
              disabled={isDisabled}
            />
          ) : (
            <Text
              className="text-center text-xs !leading-[1.24] text-black-700"
              style={{
                ...FONTS.inter400,
              }}
            >
              {item[key]}
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View className="border border-neutral-300 rounded-lg overflow-hidden mt-3 flex-1">
      <TableHeader />
      {loadingData ? (
        <View className="flex-1 flex items-center justify-center">
          <ActivityIndicator size="large" color={colors.main500} />
        </View>
      ) : data?.length > 0 && attendanceExistance ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item?._id}
          renderItem={renderItem}
          onScroll={(event) =>
            handleScrollForAnimatedButton({ event, translateY, lastScrollY })
          }
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
          overScrollMode="always"
          scrollToOverflowEnabled={false}
          bounces={true}
          alwaysBounceVertical={true}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.main500]}
            />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.main500]}
            />
          }
          // className="flex-1 h-[42px]"
          contentContainerStyle={{
            flex: 1,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            className="text-neutral-500  text-xs"
            style={{
              ...FONTS.inter500,
            }}
          >
            No data available
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default AttendanceMapperTable;
