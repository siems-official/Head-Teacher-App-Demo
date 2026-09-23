import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import { cn, FONTS, getStartTimeEndTime, safeRefetch } from "@/services";
import { useGetBillingHeadsQuery } from "@/store/invoices/api";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const CollectionsScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const { billingHeadList } = useSelector((state) => state.billingHead);

  const startDate = getStartTimeEndTime(new Date().getTime()).startTimestamp;
  const endDate = getStartTimeEndTime(new Date().getTime()).endTimestamp;

  const {
    isUninitialized: isBillingHeadsUninitialized,
    isSuccess: isBillingHeadsSuccess,
    isLoading: isBillingHeadsLoading,
    isFetching: isBillingHeadsFetching,
    refetch: refetchBillingHeads,
  } = useGetBillingHeadsQuery(
    {
      institute_id: user?.teacher?.institute_id,
      start_date_of_payment: startDate,
      end_date_of_payment: endDate,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // TABLE ACESSORIES
  const headers = ["Head", "Amount"];
  const keys = ["head", "amount"];

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
        index === billingHeadList?.length - 1 ? "border-b-0" : "border-b"
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
    <BaseLayout title={"Collections"}>
      <Text
        className="mx-4 !leading-[1.4] text-black-700"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Head Wise Collections
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={billingHeadList}
        renderItem={renderItem}
        wrapperClassName={"mt-3 mb-3 flex-1"}
        innerScrollEnabled={true}
        loadingData={isBillingHeadsLoading || isBillingHeadsFetching}
        refetchFunction={() => {
          safeRefetch({
            refetch: refetchBillingHeads,
            isUninitialized: isBillingHeadsUninitialized,
          });
        }}
      />
    </BaseLayout>
  );
};

export default CollectionsScreen;
