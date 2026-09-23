import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import SelectCollectionsListYear from "@/components/shared/SelectCollectionsListYear";
import Button from "@/components/ui/Button";
import {
  chat,
  cn,
  DotIcon,
  FONTS,
  handleCallPress,
  handleChatPress,
  phoneCall,
  profileImage,
  safeRefetch,
} from "@/services";
import { useGetFilteredInvoicesByStudentUsernameQuery } from "@/store/invoices/api";
import { setInvoiceYear } from "@/store/invoices/slice";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const DueListStudentDetailsScreen = () => {
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedInvoiceYear, studentSpecificPendingInvoices } = useSelector(
    (state) => state.invoice
  );

  const {
    isUninitialized: isInvoicesUninitialized,
    isLoading: isLoadingInvoices,
    isFetching: isFetchingInvoices,
    refetch: refetchInvoices,
  } = useGetFilteredInvoicesByStudentUsernameQuery({
    institute_id: user?.teacher?.institute_id,
    student_username: params?.student_username,
    academic_year: selectedInvoiceYear,
  });

  // TABLE ACESSORIES
  const headers = ["Billing Month", "Invoice ID", "Amount"];
  const keys = ["billingmonth", "invoiceid", "amount"];

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
          studentSpecificPendingInvoices[params?.student_username]?.length - 1
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
    <BaseLayout title="Due List">
      <SelectCollectionsListYear
        selectedYear={selectedInvoiceYear}
        setSelectedYear={(year) => dispatch(setInvoiceYear(year))}
        listTypeText="Due List"
      />

      <View className="border border-main-300 px-5 py-6 bg-main-50 mx-4 flex flex-col justify-center items-center mt-5 rounded-xl">
        <View
          className={cn(
            "flex items-center justify-center h-[60px] w-[60px] bg-white-50 !rounded-full border border-main-500 relative z-[1]"
          )}
        >
          <Image
            source={params?.image ? { uri: params?.image } : profileImage}
            className="h-full w-full rounded-full"
          />
        </View>

        <Text
          className="text-black-700 text-base font-bold !leading-[1.2] uppercase w-full text-center mt-2"
          style={{ ...FONTS.inter700 }}
        >
          {params?.student_name}
          {/* {name} */}
        </Text>

        <View className={cn("flex flex-row items-center gap-[6px] mt-1")}>
          <Text
            className="text-black-700 text-xs !leading-[1.2]"
            style={{ ...FONTS.inter400 }}
          >
            {`Class: ${params?.class}`}
          </Text>
          <DotIcon className={"h-1 w-1"} />
          <Text
            className="text-black-700 text-xs !leading-[1.2]"
            style={{ ...FONTS.inter400 }}
          >
            {`Section: ${params?.section}`}
          </Text>
        </View>

        <View className={cn("flex flex-row items-center gap-[6px] mt-1")}>
          <Text
            className="text-black-700 text-xs !leading-[1.2]"
            style={{ ...FONTS.inter400 }}
          >
            {`Roll: ${params?.student_roll}`}
          </Text>
          <DotIcon className={"h-1 w-1"} />
          <Text
            className="text-black-700 text-xs !leading-[1.2]"
            style={{ ...FONTS.inter400 }}
          >
            {`ID: ${params?.student_username}`}
          </Text>
        </View>
      </View>

      <Text
        className="mx-4 !leading-[1.4] text-black-700 mt-5"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Due List
      </Text>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={studentSpecificPendingInvoices[params?.student_username]}
        renderItem={renderItem}
        wrapperClassName={"mt-3 flex-1"}
        innerScrollEnabled={true}
        loadingData={isLoadingInvoices || isFetchingInvoices}
        refetchFunction={() =>
          safeRefetch({
            refetch: refetchInvoices,
            isUninitialized: isInvoicesUninitialized,
          })
        }
      />

      <View className="flex flex-row min-w-full h-12 mb-6 mx-4 mt-4 gap-2">
        <Button
          onPress={() => handleChatPress({ number: params?.mobile_number })}
          startIcon={<Image source={chat} className="h-6 w-6" />}
          className="h-full border-[#41CCF8] bg-[#F0FCFF]"
          style={{ width: width / 2 - 17 }}
          variant="outlined"
          rippleColor={"#41CCF84c"}
        />
        <Button
          onPress={() => handleCallPress({ number: params?.mobile_number })}
          startIcon={<Image source={phoneCall} className="h-6 w-6" />}
          className="h-full border-[#B3E562] bg-[#F1FEDD]"
          style={{ width: width / 2 - 17 }}
          variant="outlined"
          rippleColor={"#B3E5624c"}
        />
      </View>
    </BaseLayout>
  );
};

export default DueListStudentDetailsScreen;
