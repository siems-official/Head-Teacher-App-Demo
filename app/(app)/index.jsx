import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView, View } from "react-native";
import { Image } from "react-native";
import AppVersionBanner from "@/components/shared/AppVersionBanner";
import HomeHeader from "@/components/home/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileBanner from "@/components/home/ProfileBanner";
import QuickAccessGrid from "@/components/home/QuickAccessGrid";
import { colors, homeHeaderBackground, safeRefetch } from "@/services";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useGetInstituteDetailsQuery } from "@/store/institute/api";
import YearSelectionAccordion from "@/components/home/YearSelectionAccordion";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useGetAllDaysQuery } from "@/store/days/api";
import { useGetAcademicYearsQuery } from "@/store/academicYear/api";

const HomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { instituteDetails } = useSelector((state) => state.institute);
  const { allDays } = useSelector((state) => state.days);

  // GET INSTITUTE DETAILS
  const {
    isUninitialized: isInstituteDetailsUninitialized,
    isSuccess: isInstituteDetailsSuccess,
    isLoading: isLoadingInstituteDetails,
    isFetching: isFetchingInstituteDetails,
    refetch: refetchInstituteDetails,
  } = useGetInstituteDetailsQuery({
    institute_id: user?.teacher?.institute_id,
  });

  // GET YEARS
  const {
    isUninitialized: isYearsUninitialized,
    isSuccess: isYearsSuccess,
    isLoading: isLoadingYears,
    isFetching: isFetchingYears,
    refetch: refetchYears,
  } = useGetAcademicYearsQuery(undefined, {
    skip: !instituteDetails,
    refetchOnMountOrArgChange: true,
  });

  // GET DAYS
  const {
    isUninitialized: isDaysUninitialized,
    isSuccess: isDaysSuccess,
    isLoading: isLoadingDays,
    isFetching: isFetchingDays,
    refetch: refetchDays,
  } = useGetAllDaysQuery(
    { page: 1, institute_id: user?.teacher?.institute_id },
    { skip: allDays === undefined }
  );

  const [refreshing, setRefreshing] = useState(false);

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      safeRefetch({
        refetch: refetchInstituteDetails,
        isUninitialized: isInstituteDetailsUninitialized,
      });
      safeRefetch({
        refetch: refetchYears,
        isUninitialized: isYearsUninitialized,
      });
      safeRefetch({
        refetch: refetchDays,
        isUninitialized: isDaysUninitialized,
      });

      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="flex-1 relative bg-white-50">
      <Image
        source={homeHeaderBackground}
        className="w-full absolute top-0 left-0 rounded-b-2xl"
      />
      <SafeAreaView className="flex-1">
        <HomeHeader />

        <View className={"flex-1"}>
          <ScrollView
            scrollEventThrottle={16}
            overScrollMode="always"
            bounces={true}
            alwaysBounceVertical={true}
            className="flex-1 px-4 py-6"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.main500]}
              />
            }
          >
            <View className="flex-1 mb-16 gap-1">
              <ProfileBanner />
              <YearSelectionAccordion />
              <QuickAccessGrid />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      {(isLoadingYears ||
        isFetchingInstituteDetails ||
        isFetchingYears ||
        isLoadingInstituteDetails ||
        isLoadingDays ||
        isFetchingDays) && <LoadingOverlay />}

      <AppVersionBanner />
      <StatusBar style="light" />
    </View>
  );
};

export default HomeScreen;
