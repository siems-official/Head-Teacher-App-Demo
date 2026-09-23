import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import SelectCollectionsListYear from "@/components/shared/SelectCollectionsListYear";
import Button from "@/components/ui/Button";
import {
  cn,
  FONTS,
  getYearBasedTimestampInSeconds,
  routes,
  safeRefetch,
} from "@/services";
import { useGetFilteredExpensesQuery } from "@/store/expenses/api";
import { setExpensesYear } from "@/store/expenses/slice";
import { useRouter } from "expo-router";
import { Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";

const ExpensesList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expensesList, selectedExpensesYear } = useSelector(
    (state) => state.expenses
  );

  const {
    isUninitialized: isExpensesUninitialized,
    isLoading: isLoadingExpenses,
    isFetching: isFetchingExpenses,
    refetch: refetchExpenses,
    isError: isErrorExpenses,
  } = useGetFilteredExpensesQuery(
    {
      institute_id: user?.teacher?.institute_id,
      ...(selectedExpensesYear && {
        expense_year: getYearBasedTimestampInSeconds(selectedExpensesYear),
      }),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isErrorExpenses)
    Toast.show("Couldn't find data for this year.", Toast.BOTTOM, Toast.LONG);

  // TABLE ACESSORIES
  const headers = ["Category", "Amount"];
  const keys = ["category", "amount"];

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : ""
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
        index === expensesList?.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <Fragment key={keyIndex}>
          {key === "category" ? (
            <TouchableOpacity
              className={cn(
                "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                keyIndex === keys.length - 1 ? "border-r-0" : ""
              )}
              onPress={() =>
                router.push({
                  pathname:
                    routes.accounts.subRoutes.expenses.subRoutes.category.path,
                  params: item,
                })
              }
              activeOpacity={0.35}
            >
              <Text
                className={cn(
                  "text-center text-[10px] !leading-[1.24] text-main-500 font-semibold underline"
                )}
                style={{
                  ...FONTS.inter600,
                }}
              >
                {item[key]}
              </Text>
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
        </Fragment>
      ))}
    </View>
  );

  return (
    <BaseLayout title="Expenses List">
      <SelectCollectionsListYear
        selectedYear={selectedExpensesYear}
        setSelectedYear={(year) => dispatch(setExpensesYear(year))}
        customYears={[2023, 2024, 2025, 2026, 2027]}
        listTypeText="Expenses"
      />

      <Text
        className="mx-4 !leading-[1.4] text-black-700 mt-5"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Category Wise Expenses
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={expensesList}
        renderItem={renderItem}
        wrapperClassName={"mt-3 flex-1 mb-4"}
        innerScrollEnabled={true}
        loadingData={isLoadingExpenses || isFetchingExpenses}
        refetchFunction={() =>
          safeRefetch({
            refetch: refetchExpenses,
            isUninitialized: isExpensesUninitialized,
          })
        }
      />

      <View className="mx-4">
        <Button
          title={"Date Wise Expenses"}
          className="min-h-12 mt-auto mb-6"
          onPress={() =>
            router.push({
              pathname:
                routes.accounts.subRoutes.expenses.subRoutes.dateWise.path,
              // params: item,
            })
          }
        />
      </View>
    </BaseLayout>
  );
};

export default ExpensesList;
