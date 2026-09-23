import FilterBox from "@/components/accounts/expenses/FilterBox";
import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import { cn, FONTS, routes } from "@/services";
import { useLazyGetFilteredExpensesQuery } from "@/store/expenses/api";
import {
  setDateWiseExpenseEndDate,
  setDateWiseExpenseStartDate,
} from "@/store/expenses/slice";
import { useRouter } from "expo-router";
import { Fragment } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    dateWiseExpenseList,
    dateWiseExpenseStartDate,
    dateWiseExpenseEndDate,
  } = useSelector((state) => state.expenses);

  const [getFilteredExpenses, { isLoading, isFetching }] =
    useLazyGetFilteredExpensesQuery();

  const handleGetDateWiseExpenseListSearch = () => {
    getFilteredExpenses({
      institute_id: user?.teacher?.institute_id,
      start_date: Math.floor(dateWiseExpenseStartDate?.timestamp / 1000),
      end_date: Math.floor(dateWiseExpenseEndDate?.timestamp / 1000),
    });
  };

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
        index === dateWiseExpenseList?.length - 1 ? "border-b-0" : "border-b"
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
                    routes.accounts.subRoutes.expenses.subRoutes.dateWise
                      .subRoutes.category.path,
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
      <FilterBox
        selectedStartDate={dateWiseExpenseStartDate}
        setSelectedStartDate={(value) =>
          dispatch(setDateWiseExpenseStartDate(value))
        }
        selectedEndDate={dateWiseExpenseEndDate}
        setSelectedEndDate={(value) =>
          dispatch(setDateWiseExpenseEndDate(value))
        }
        onSearchPress={handleGetDateWiseExpenseListSearch}
      />

      <Text
        className="mx-4 !leading-[1.4] text-black-700 mt-5"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Date Wise Expenses
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={dateWiseExpenseList}
        renderItem={renderItem}
        wrapperClassName={"mt-3 flex-1 mb-4"}
        innerScrollEnabled={true}
        loadingData={isLoading || isFetching}
        refetchFunction={handleGetDateWiseExpenseListSearch}
      />
    </BaseLayout>
  );
};

export default index;
