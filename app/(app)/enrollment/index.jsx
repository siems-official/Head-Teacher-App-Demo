import EnrollmentCard from "@/components/enrollment/EnrollmentCard";
import HeaderCommon from "@/components/shared/HeaderCommon";
import { colors, safeRefetch } from "@/services";
import { useGetClasslistQuery } from "@/store/routines/api";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const EnrollmentScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { classList } = useSelector((state) => state.routines);
  const [refreshing, setRefreshing] = useState(false);
  const { selectedYear } = useSelector((state) => state.academicYear);

  const {
    isUninitialized: isClasslistUninitialized,
    isLoading: isLoadingClasslist,
    isFetching: isFetchingClasslist,
    refetch: refetchClasslist,
  } = useGetClasslistQuery(
    {
      academic_year: selectedYear?.global_academic_year,
      institute_id: user?.teacher?.institute_id,
      teacher_id: user?.teacher?._id,
    },
    { skip: !selectedYear, refetchOnMountOrArgChange: true }
  );

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      safeRefetch({
        refetch: refetchClasslist,
        isUninitialized: isClasslistUninitialized,
      });

      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-white-50 relative">
      <SafeAreaView className="flex-1 relative bg-white-50">
        <HeaderCommon title="My Class List" showEditButton={false} />

        {!isLoadingClasslist && !isFetchingClasslist ? (
          classList?.length > 0 ? (
            <View className="px-4 flex-1" style={{ paddingTop: 8 }}>
              <FlatList
                data={classList}
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
                renderItem={({ item }) => <EnrollmentCard item={item} />}
              />
            </View>
          ) : (
            <View className="flex-1 flex items-center justify-center">
              <Text className="text-lg text-black-600">No Classes Found</Text>
            </View>
          )
        ) : (
          <View className="flex-1 bg-white-50 flex justify-center items-center">
            <ActivityIndicator size="large" color={colors.main500} />
          </View>
        )}
      </SafeAreaView>

      <StatusBar style="dark" backgroundColor={colors.white50} />
    </View>
  );
};

export default EnrollmentScreen;
