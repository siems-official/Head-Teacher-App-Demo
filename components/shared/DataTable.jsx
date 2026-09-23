import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { cn, colors, FONTS } from "@/services";

const DataTable = ({
  tableHeader,
  data,
  renderItem,
  innerScrollEnabled = false,
  wrapperClassName,
  wrapperStyle = {},
  loadingData,
  className,
  refetchFunction,
  noDataMessage = "No data available",
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      if (refetchFunction) refetchFunction();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View
      className={cn(
        "border border-neutral-300 rounded-lg overflow-hidden mx-4",
        wrapperClassName
      )}
      style={wrapperStyle}
    >
      {tableHeader}
      {loadingData ? (
        <View className="flex-1 flex items-center justify-center">
          <ActivityIndicator size="large" color={colors.main500} />
        </View>
      ) : data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item?._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          scrollEnabled={innerScrollEnabled} // IF used within a nested scrollview or flatlist
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
          overScrollMode="always"
          scrollToOverflowEnabled={false}
          bounces={true}
          alwaysBounceVertical={true}
          className={className}
          contentContainerStyle={{ paddingBottom: 0 }}
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
            {noDataMessage}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default DataTable;
