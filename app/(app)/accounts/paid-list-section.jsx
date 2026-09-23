import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import SelectCollectionsListYear from "@/components/shared/SelectCollectionsListYear";
import { cn, FONTS, routes, safeRefetch } from "@/services";
import { useGetFilteredInvoicesQuery } from "@/store/invoices/api";
import { setInvoiceYear } from "@/store/invoices/slice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const PaidListSectionScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedInvoiceYear, paidCollectionClassSectionWise } = useSelector(
    (state) => state.invoice
  );

  // API CALLS
  const {
    isUninitialized: isInvoicesUninitialized,
    isLoading: isLoadingFilteredInvoices,
    isFetching: isFetchingFilteredInvoices,
    refetch: refetchFilteredInvoices,
  } = useGetFilteredInvoicesQuery(
    {
      institute_id: user?.teacher?.institute_id,
      status: "Pending",
      academic_year: selectedInvoiceYear,
      paidList: true,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const classBasedFilteredInvoices = paidCollectionClassSectionWise?.filter(
    (item) => item?.class === params?.class
  );

  // TABLE ACESSORIES
  const headers = ["Section", "Amount"];
  const keys = ["section", "amount"];

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
        index === classBasedFilteredInvoices?.length - 1
          ? "border-b-0"
          : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <Fragment key={keyIndex}>
          {key === "section" ? (
            <TouchableOpacity
              className={cn(
                "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                keyIndex === keys.length - 1 ? "border-r-0" : ""
              )}
              onPress={() =>
                router.push({
                  pathname: routes.accounts.subRoutes.paidListStudent.path,
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
    <BaseLayout title="Paid List">
      <SelectCollectionsListYear
        selectedYear={selectedInvoiceYear}
        setSelectedYear={(year) => dispatch(setInvoiceYear(year))}
        listTypeText="Paid List"
      />

      <Text
        className="mx-4 !leading-[1.4] text-black-700 mt-5"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Section Wise Collections
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={classBasedFilteredInvoices}
        renderItem={renderItem}
        wrapperClassName={"mt-3 mb-4 flex-1"}
        innerScrollEnabled={true}
        loadingData={isLoadingFilteredInvoices || isFetchingFilteredInvoices}
        refetchFunction={() =>
          safeRefetch({
            refetch: refetchFilteredInvoices,
            isUninitialized: isInvoicesUninitialized,
          })
        }
      />
    </BaseLayout>
  );
};

export default PaidListSectionScreen;
