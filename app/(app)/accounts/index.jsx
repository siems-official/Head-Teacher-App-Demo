import BaseLayout from "@/components/shared/BaseLayout";
import Button from "@/components/ui/Button";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import {
  ArrowForwardIcon,
  colors,
  FONTS,
  routes,
  safeRefetch,
} from "@/services";
import { useGetExpenseStatsQuery } from "@/store/expenses/api";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const AccountsScreen = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { billingDate } = useSelector((state) => state.billingHead);
  const { expenseStats } = useSelector((state) => state.expenses);

  const [refreshing, setRefreshing] = useState(false);

  // GET CALENDER DATE FORMAT
  // const formattedDate = getCalenderDateJoinedFormat(billingDate?.timestamp);

  const {
    isUninitialized: isExpenseStatsUninitialized,
    isLoading: isExpenseStatsLoading,
    isFetching: isExpenseStatsFetching,
    refetch: refetchExpenseStats,
  } = useGetExpenseStatsQuery({
    institute_id: user?.teacher?.institute_id,
  });

  // const {
  //   isLoading: isBillingHeadsLoading,
  //   isFetching: isBillingHeadsFetching,
  //   refetch: refetchBillingHeads,
  // } = useGetBillingHeadsQuery(
  //   {
  //     institute_id: user?.teacher?.institute_id,
  //     start_date_of_payment: formattedDate,
  //     end_date_of_payment: formattedDate,
  //   },
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  // const [calenderOpen, setCalenderOpen] = useState(false);

  const statData = [
    {
      type: "Opening Balance",
      value: `৳ ${expenseStats?.opening_balance || 0}`,
      bgScheme: "#CDFFE9",
    },
    {
      type: "New Collections",
      value: `৳ ${expenseStats?.todays_collection || 0}`,
      bgScheme: "#C9ECFF",
      link: routes.accounts.subRoutes.collectionHeads.path,
    },
    {
      type: "New Expenses",
      value: `৳ ${expenseStats?.todays_expense || 0}`,
      bgScheme: "#FFE0DF",
      link: routes.accounts.subRoutes.expensesHeads.path,
    },
    {
      type: "Current Balance",
      value: `৳ ${expenseStats?.current_balance || 0}`,
      bgScheme: "#FFE5CC",
    },
  ];

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      safeRefetch({
        refetch: refetchExpenseStats,
        isUninitialized: isExpenseStatsUninitialized,
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <BaseLayout title={"Accounts"}>
      <ScrollView
        scrollEventThrottle={16}
        overScrollMode="always"
        bounces={true}
        alwaysBounceVertical={true}
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.main500]}
          />
        }
      >
        {/* <View className="relative mx-4 mt-2">
          <TouchableOpacity
            className="border border-neutral-300 rounded-lg py-3 px-4 flex flex-row items-center justify-between h-12 shrink-0 bg-white-50"
            onPress={() => {
              setCalenderOpen(!calenderOpen);
            }}
          >
            <Text
              className={cn(
                "text-sm !leading-[1.4]",
                billingDate ? "text-black-700" : "text-white-400"
              )}
              style={{ ...FONTS.inter400 }}
            >
              {billingDate ? billingDate?.dateString : "Start Date"}
            </Text>
            <CalenderIcon />
          </TouchableOpacity>
          <DatePickerCalender
            selected={billingDate}
            setSelected={(value) => dispatch(setBillingDate(value))}
            calenderOpen={calenderOpen}
            setCalenderOpen={setCalenderOpen}
          />
        </View> */}

        <View className="flex flex-col gap-2 mx-4 mt-5">
          {statData.map((item, index) => (
            <View
              key={index}
              className="px-4 py-5 rounded-lg flex flex-row justify-center gap-2"
              style={{ backgroundColor: item.bgScheme }}
              activeOpacity={item?.link ? 0.5 : 1}
            >
              <View className="flex-1 flex flex-row items-center justify-between gap-2">
                <Text
                  className="!leading-[1.4] text-black-900"
                  style={{ ...FONTS.inter400, fontSize: 12 }}
                >
                  {item.type}
                </Text>
                <Text
                  className="text-sm text-black-900"
                  style={{ ...FONTS.inter700, fontSize: 12 }}
                >
                  {item.value}
                </Text>
              </View>
              {item.link ? (
                <TouchableOpacity
                  style={{ backgroundColor: `${colors.black}15` }}
                  activeOpacity={0.5}
                  onPress={() => item?.link && router.push(item?.link)}
                  className="h-7 w-7 flex items-center justify-center rounded-full"
                >
                  <ArrowForwardIcon color={colors.black} />
                </TouchableOpacity>
              ) : (
                <View className="h-7 w-7 shrink-0" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="flex flex-row gap-2 mx-4 mt-auto mb-6">
        <Button
          title={"Collections"}
          className="h-12"
          buttonWrapperStyle={{ width: width / 2 - 18 }}
          onPress={() =>
            router.push(routes.accounts.subRoutes.collections.path)
          }
        />
        <Button
          title={"Expenses"}
          className="h-12 bg-status-error"
          buttonWrapperStyle={{ width: width / 2 - 18 }}
          onPress={() => router.push(routes.accounts.subRoutes.expenses.path)}
        />
      </View>

      {(isExpenseStatsLoading || isExpenseStatsFetching) && <LoadingOverlay />}
    </BaseLayout>
  );
};

export default AccountsScreen;
