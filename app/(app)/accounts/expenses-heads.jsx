import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import { cn, FONTS, safeRefetch } from "@/services";
import { useGetFilteredExpensesQuery } from "@/store/expenses/api";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const ExpensesHeadsScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { newExpensesStat } = useSelector((state) => state.expenses);

  const dateinUTCNow = Math.floor(new Date().getTime() / 1000);

  const {
    isUninitialized: isExpensesUninitialized,
    isLoading: isLoadingExpenses,
    isFetching: isFetchingExpenses,
    refetch: refetchExpenses,
  } = useGetFilteredExpensesQuery({
    institute_id: user?.teacher?.institute_id,
    expense_date: dateinUTCNow,
  });

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
        index === newExpensesStat?.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          key={keyIndex}
          className={cn(
            "flex-1 p-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys.length - 1 ? "border-r-0" : ""
          )}
        >
          <Text
            className={cn(
              "text-center text-xs !leading-[1.24] ",
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
    <BaseLayout title={"New Expenses"}>
      <Text
        className="mx-4 !leading-[1.4] text-black-700"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Category Wise Expenses
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={newExpensesStat}
        renderItem={renderItem}
        wrapperClassName={"mt-3 mb-3 flex-1"}
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

export default ExpensesHeadsScreen;
