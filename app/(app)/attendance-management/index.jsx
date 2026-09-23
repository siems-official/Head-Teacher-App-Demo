import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCommon from "@/components/shared/HeaderCommon";
import { StatusBar } from "expo-status-bar";
import AttendanceRoutineCard from "@/components/attendance/AttendanceRoutineCard";
import { colors, getTodayName, safeRefetch } from "@/services";
import { useSelector } from "react-redux";
import { useGetTodayRoutinesQuery } from "@/store/routines/api";

const index = () => {
  const { allDays } = useSelector((state) => state.days);
  const { todaysRoutines } = useSelector((state) => state.routines);
  const { user } = useSelector((state) => state.auth);
  const { selectedYear } = useSelector((state) => state.academicYear);
  const today = getTodayName();
  const activeDay = allDays?.find(
    (day) => day.day_name?.toLowerCase() === today.toLowerCase()
  )?._id;

  const {
    isUninitialized: isRoutinesUninitialized,
    data: routines,
    isLoading: isLoadingRoutines,
    isFetching: isFetchingRoutines,
    isError: isErrorLoadingRoutines,
    refetch: refetchRoutines,
  } = useGetTodayRoutinesQuery(
    {
      academic_year: selectedYear?.global_academic_year,
      institute_id: user?.teacher?.institute_id,
      teacher_id: user?.teacher?._id,
      day_id: activeDay,
    },
    { skip: !selectedYear, refetchOnMountOrArgChange: true }
  );

  const [refreshing, setRefreshing] = useState(false);

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      safeRefetch({
        refetch: refetchRoutines,
        isUninitialized: isRoutinesUninitialized,
      });

      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-white-50 relative">
      <SafeAreaView className="flex-1 relative bg-white-50">
        <HeaderCommon title="Today's Routine" showEditButton={false} />

        {(isLoadingRoutines || isFetchingRoutines) && (
          <View className="flex-1 bg-white-50 flex justify-center items-center">
            <ActivityIndicator size="large" color={colors.main500} />
          </View>
        )}
        {!isLoadingRoutines &&
          !isFetchingRoutines &&
          !isErrorLoadingRoutines &&
          todaysRoutines?.length > 0 && (
            <View className="px-4 flex-1" style={{ paddingTop: 8 }}>
              <FlatList
                data={todaysRoutines}
                overScrollMode="always"
                bounces={true}
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.main500]}
                  />
                }
                contentContainerStyle={{
                  rowGap: 12,
                  paddingBottom: 16,
                }}
                keyExtractor={(key) => key?._id}
                renderItem={({ item }) => <AttendanceRoutineCard item={item} />}
              />
            </View>
          )}
        {!isLoadingRoutines &&
          !isFetchingRoutines &&
          todaysRoutines?.length === 0 && (
            <ScrollView
              overScrollMode="always"
              bounces={true}
              alwaysBounceVertical={true}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.main500]}
                />
              }
              contentContainerStyle={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-lg text-black-600">No Routines Found</Text>
            </ScrollView>
          )}
      </SafeAreaView>
      <StatusBar style="dark" backgroundColor={colors.white50} />
    </View>
  );
};

export default index;
