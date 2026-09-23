import FilterBox from "@/components/accounts/expenses/FilterBox";
import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import { cn, FONTS } from "@/services";
import {
  useGetFilteredExpensesQuery,
  useLazyGetFilteredExpensesQuery,
} from "@/store/expenses/api";
import {
  setDateWiseExpenseEndDate,
  setDateWiseExpenseStartDate,
} from "@/store/expenses/slice";
import store from "@/store/store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const DateWiseCategoryExpenses = () => {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    dateWiseExpenseStartDate,
    dateWiseExpenseEndDate,
    dateWiseCategoryBasedExpenseList,
  } = useSelector((state) => state.expenses);

  // Track if we've already fetched
  const hasFetchedInitially = useRef(false);

  const shouldSkipInitialFetch =
    hasFetchedInitially.current ||
    !dateWiseExpenseStartDate?.timestamp ||
    !dateWiseExpenseEndDate?.timestamp ||
    dateWiseCategoryBasedExpenseList?.length > 0;

  // FETCHING DATA INITIALLY
  const { isLoading: categoryBasedExpenseLoading } =
    useGetFilteredExpensesQuery(
      {
        institute_id: user?.teacher?.institute_id,
        start_date: Math.floor(dateWiseExpenseStartDate?.timestamp / 1000),
        end_date: Math.floor(dateWiseExpenseEndDate?.timestamp / 1000),
        expense_category_id: params?.category_id,
      },
      {
        skip: shouldSkipInitialFetch,
        refetchOnMountOrArgChange: false,
      }
    );

  // FETCHING DATA ON SEARCH
  const [getFilteredExpenses, { isLoading, isFetching }] =
    useLazyGetFilteredExpensesQuery();

  // Once it's fetched, locking the secondary initial fetch
  useEffect(() => {
    if (!shouldSkipInitialFetch) {
      hasFetchedInitially.current = true;
    }
  }, [shouldSkipInitialFetch]);

  const handleGetDateWiseExpenseListSearch = ({ startDate, endDate }) => {
    getFilteredExpenses({
      institute_id: user?.teacher?.institute_id,
      start_date: Math.floor(startDate / 1000),
      end_date: Math.floor(endDate / 1000),
      expense_category_id: params?.category_id,
    });
  };

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
        index ===
          dateWiseCategoryBasedExpenseList?.[params?.category_id]?.length - 1
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
      <FilterBox
        selectedStartDate={dateWiseExpenseStartDate}
        setSelectedStartDate={(value) =>
          dispatch(setDateWiseExpenseStartDate(value))
        }
        selectedEndDate={dateWiseExpenseEndDate}
        setSelectedEndDate={(value) =>
          dispatch(setDateWiseExpenseEndDate(value))
        }
        onSearchPress={() =>
          handleGetDateWiseExpenseListSearch({
            startDate: dateWiseExpenseStartDate?.timestamp,
            endDate: dateWiseExpenseEndDate?.timestamp,
          })
        }
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
        data={dateWiseCategoryBasedExpenseList?.[params?.category_id]}
        renderItem={renderItem}
        wrapperClassName={"mt-3 flex-1 mb-4"}
        innerScrollEnabled={true}
        loadingData={isLoading || isFetching || categoryBasedExpenseLoading}
        refetchFunction={() => {
          // Gets the most up-to-date values from the state when refetch is called
          const currentState = store.getState().expenses;
          const startDate = currentState.dateWiseExpenseStartDate?.timestamp;
          const endDate = currentState.dateWiseExpenseEndDate?.timestamp;

          handleGetDateWiseExpenseListSearch({
            startDate,
            endDate,
          });
        }}
      />
    </BaseLayout>
  );
};

export default DateWiseCategoryExpenses;
