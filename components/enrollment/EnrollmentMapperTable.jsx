import { cn, colors, FONTS } from "@/services";
import { handleScrollForAnimatedButton } from "@/services/helpers/scroll";
import { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Switch from "../ui/Switch";
import { useDispatch } from "react-redux";
import {
  addSingleEnroll,
  removeSingleEnroll,
  updateAllEnroll,
  updateAllEnrollForSectionStudent,
  updateSingleEnrollForSectionStudent,
} from "@/store/enrollment/slice";
import { RefreshControl } from "react-native";

const EnrollmentMapperTable = ({
  data,
  translateY,
  enrollCount,
  class_id,
  section_id,
  subject_id,
  loadingData,
  refetchFunction,
}) => {
  const lastScrollY = useRef(0);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  // TABLE ACCESSORIES
  const headers = ["Name", "Roll", "Action"];
  const keys = ["name", "roll", "enrollStatus"];

  const toggleMasterSwitch = (value) => {
    dispatch(
      updateAllEnroll({ value, data, class_id, section_id, subject_id })
    );
    dispatch(
      updateAllEnrollForSectionStudent({
        value,
        class_id,
        section_id,
        subject_id,
      })
    );
  };

  const toggleIndividualSwitch = ({ id, value, item: student }) => {
    if (value === true) {
      dispatch(addSingleEnroll({ student, class_id, section_id, subject_id }));
    } else if (value === false) {
      dispatch(removeSingleEnroll({ id, class_id, section_id, subject_id }));
    }

    dispatch(
      updateSingleEnrollForSectionStudent({
        id,
        value,
        class_id,
        section_id,
        subject_id,
      })
    );
  };

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      if (refetchFunction) refetchFunction();
      setRefreshing(false);
    }, 2000);
  }, []);

  const MasterSwitch = () => (
    <View className="px-4 py-3 flex-row items-center justify-between rounded-lg bg-main-500">
      <Text
        className="text-xs text-white-50 !leading-[1.2]"
        style={{ ...FONTS.inter600 }}
      >
        Enroll All
      </Text>
      <Switch
        trackColor={{ false: "#D1D5DB", true: "#34D399" }}
        thumbColor={"#ffffff"}
        ios_backgroundColor="#D1D5DB"
        onValueChange={toggleMasterSwitch}
        value={enrollCount === data?.length}
      />
    </View>
  );

  const TableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers.map((header, index) => (
        <View
          key={index}
          className={`flex-1 py-5 px-3 border-r border-neutral-300 items-center justify-center flex-row
            ${index === headers.length - 1 ? "border-r-0" : ""}`}
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
        "flex-row border-neutral-200",
        index === data?.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys.map((key, index) => (
        <View
          key={index}
          className={`flex-1 p-3 border-r border-transparent items-center justify-center
            ${index === keys.length - 1 ? "border-r-0" : ""}`}
        >
          {key === "enrollStatus" ? (
            <Switch
              trackColor={{ false: "#D1D5DB", true: "#34D399" }}
              thumbColor={item[key] ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#D1D5DB"
              onValueChange={(value) =>
                toggleIndividualSwitch({ id: item?._id, value, item })
              }
              value={item[key]}
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
    <View className="flex-1">
      <MasterSwitch />
      <View className="border border-neutral-300 rounded-lg overflow-hidden mt-3 flex-1">
        <TableHeader />
        {loadingData ? (
          <View className="flex-1 flex items-center justify-center">
            <ActivityIndicator size="large" color={colors.main500} />
          </View>
        ) : data?.length > 0 ? (
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
    </View>
  );
};

export default EnrollmentMapperTable;
