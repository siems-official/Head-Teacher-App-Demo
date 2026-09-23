import TeacherCard from "@/components/teachers/TeacherCard";
import { colors, safeRefetch } from "@/services";
import { useGetTeachersQuery } from "@/store/teachers/api";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const TeachersScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { allTeachers } = useSelector((state) => state.teachers);
  const {
    isUninitialized: isTeachersUninitialized,
    isLoading: isLoadingTeachers,
    isFetching: isFetchingTeachers,
    refetch: refetchTeachers,
  } = useGetTeachersQuery(
    { page: 1, limit: 0, institute_id: user?.teacher?.institute_id },
    { skip: false }
  );

  const [refreshing, setRefreshing] = useState(false);

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      safeRefetch({
        refetch: refetchTeachers,
        isUninitialized: isTeachersUninitialized,
      });

      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 relative">
      {(isLoadingTeachers || isFetchingTeachers) && (
        <View className="flex-1 bg-white-50 flex justify-center items-center">
          <ActivityIndicator size="large" color={colors.main500} />
        </View>
      )}
      {!isLoadingTeachers && !isFetchingTeachers && allTeachers?.length > 0 && (
        <FlatList
          data={allTeachers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TeacherCard teacher={item} className="mb-3" />
          )}
          scrollEventThrottle={16}
          overScrollMode="always"
          bounces={true}
          alwaysBounceVertical={true}
          scrollToOverflowEnabled={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          className="flex-1 bg-white-50 px-4 mt-2"
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.main500]}
            />
          }
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">
              No teachers found.
            </Text>
          }
        />
      )}
      {!isLoadingTeachers &&
        !isFetchingTeachers &&
        allTeachers?.length === 0 && (
          <View className="flex-1 flex items-center justify-center">
            <Text className="text-lg text-black-600">No Teachers Found</Text>
          </View>
        )}

      <StatusBar style="dark" backgroundColor={colors.white50} />
    </View>
  );
};

export default TeachersScreen;
