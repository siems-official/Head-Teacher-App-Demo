import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import SelectCollectionsListYear from "@/components/shared/SelectCollectionsListYear";
import {
  cn,
  FONTS,
  getYearBasedTimestampInSeconds,
  safeRefetch,
} from "@/services";
import { useGetFilteredExpensesQuery } from "@/store/expenses/api";
import { setExpensesYear } from "@/store/expenses/slice";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ExpensesListCategoryDetails = () => {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categoryBasedExpensesList, selectedExpensesYear } = useSelector(
    (state) => state.expenses
  );

  const {
    isUninitialized: isExpensesUninitialized,
    isLoading: isLoadingExpenses,
    isFetching: isFetchingExpenses,
    refetch: refetchExpenses,
  } = useGetFilteredExpensesQuery(
    {
      institute_id: user?.teacher?.institute_id,
      expense_category_id: params?.category_id,
      expense_year: getYearBasedTimestampInSeconds(selectedExpensesYear),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // TABLE ACESSORIES
  const headers = ["Date", "Name", "Amount"];
  const keys = ["date", "name", "amount"];

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
        index === categoryBasedExpensesList?.[params?.category_id]?.length - 1
          ? "border-b-0"
          : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          className={cn(
            "flex-1 p-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys.length - 1 ? "border-r-0" : ""
          )}
          key={keyIndex}
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
        className="mx-4 !leading-[1.4] text-black-700 mt-5 capitalize"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        {params?.category} Expenses
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={categoryBasedExpensesList?.[params?.category_id]}
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
    </BaseLayout>
  );
};

export default ExpensesListCategoryDetails;
