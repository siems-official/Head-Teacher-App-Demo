import DataTable from "@/components/shared/DataTable";
import ScrollViewWithBar from "@/components/shared/ScrollViewWithBar";
import Button from "@/components/ui/Button";
import InputNumberType from "@/components/ui/InputNumberType";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import useKeyboard from "@/hooks/useKeyboard";
import {
  cn,
  colors,
  FONTS,
  getResultConversionFactor,
  safeRefetch,
} from "@/services";
import {
  useAddOrUpdateResultMutation,
  useGetExamConfigByExamDetailsQuery,
  useGetExamHeadsQuery,
  useGetFilteredExamResultsQuery,
  useGetSectionStudentsForExamQuery,
} from "@/store/exam/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fragment, useRef } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import BaseLayout from "@/components/shared/BaseLayout";
import NumberSubmissionExamStats from "@/components/exam/NumberSubmissionExamStats";
import { useOptimizedMarksUpdate } from "@/hooks/useMarkesUpdate";
import { useDialog } from "@/hooks/useDialog";

const NumberSubmissionScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { Dialog, showDialog, hideDialog } = useDialog();
  const { keyboardVisible } = useKeyboard();

  const scrollViewRef = useRef();

  const { user } = useSelector((state) => state.auth);
  const { listFilter, examHeads, examConfig, studentsForExamSectionWise } =
    useSelector((state) => state.exam);
  const { academicYearList, selectedYear } = useSelector(
    (state) => state.academicYear
  );

  // FETCHING EXAM HEADS
  const {
    isUninitialized: isUninitializedExamHeads,
    isSuccess: isExamHeadsSuccess,
    isLoading: isExamHeadsLoading,
    isFetching: isExamHeadsFetching,
    isError: isErrorLoadingExamHeads,
    refetch: refetchExamHeads,
  } = useGetExamHeadsQuery(
    {
      institute_id: user?.teacher?.institute_id,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // FETCHING EXAM CONFIG
  const {
    isUninitialized: isUninitializedExamConfig,
    isSuccess: isExamConfigSuccess,
    isLoading: isExamConfigLoading,
    isFetching: isExamConfigFetching,
    isError: isErrorLoadingExamConfig,
    refetch: refetchExamConfig,
  } = useGetExamConfigByExamDetailsQuery(
    {
      institute_id: user?.teacher?.institute_id,
      exam_id: params?.exam_id,
      exam_type_id: params?.exam_type_id,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // FETCHING SECTION STUDENTS
  const {
    isUninitialized: isUninitializedSectionStudents,
    isSuccess: isSectionStudentsSuccess,
    isLoading: isSectionStudentsLoading,
    isFetching: isSectionStudentsFetching,
    isError: isErrorLoadingSectionStudents,
    refetch: refetchSectionStudents,
  } = useGetSectionStudentsForExamQuery({
    institute_id: user?.teacher?.institute_id,
    section_id: params?.section_id,
    subject_id: params?.subject_id,
    class_id: params?.class_id,
    exam_id: params?.exam_id,
    // group_id: params?.group_id,
    academic_year:
      selectedYear?.global_academic_year ||
      academicYearList?.[0]?.global_academic_year,
  });

  // FETCHING FILTERED RESULTS
  const {
    isUninitialized: isUninitializedFilteredResults,
    isLoading: isFilteredResultsLoading,
    isFetching: isFilteredResultsFetching,
    refetch: refetchFilteredResults,
  } = useGetFilteredExamResultsQuery(
    {
      institute_id: user?.teacher?.institute_id,
      exam_id: params?.exam_id,
      exam_config_id: examConfig?._id,
      exam_type_id: params?.exam_type_id,
      academic_year:
        selectedYear?.global_academic_year ||
        academicYearList?.[0]?.global_academic_year,
      local_class_id: params?.class_id,
      section_id: params?.section_id,
      subject_id: params?.subject_id,
    },
    {
      skip:
        !isSectionStudentsSuccess &&
        !isExamConfigSuccess &&
        !isExamHeadsSuccess,
    }
  );

  // ADD OR UPDATE MARKS
  const [addUpdateStudentMarks, { isLoading: isAddUpdateMarksLoading }] =
    useAddOrUpdateResultMutation();

  // DETERMINING UNIQUE KEY
  const uniqueKey = `${listFilter?.examType}-${params?.class_id}-${params?.section_id}-${params?.subject_id}-${params?.exam_id}`;

  // CONVERSION FACTOR
  const resultConversionFactor =
    getResultConversionFactor(examConfig, params?.subject_id) || 1; // Default to 1 if not found

  //******************/ TABLE ACESSORIES /*******************/
  // TAKING EXAM HEADS DYNAMICALLY: START
  const usedHeadIds = new Set();

  // Step 1: Extracting safely usedHeadIds
  if (examConfig?.mark_distribution?.length) {
    examConfig.mark_distribution
      .flatMap((subject) => subject?.heads || [])
      .forEach((head) => {
        if (head?.exam_head_id) {
          usedHeadIds.add(head.exam_head_id?._id);
        }
      });
  }

  // Step 2: Only filtering if examHeads is valid
  const usedHeads = Array.isArray(examHeads || [])
    ? examHeads?.filter((head) => usedHeadIds?.has(head._id))
    : [];

  // Step 3: Building headers and keys
  const staticHeaders = ["Roll", "Name"];
  const staticKeys = ["current_roll_number", "name_english"];

  const dynamicHeaders = usedHeads?.map((h) => h.head_name ?? "") || []; // fallback if name missing
  const dynamicKeys =
    usedHeads?.map((h) =>
      (h.head_name ?? "").toLowerCase().replace(/\./g, "").replace(/\s+/g, "_")
    ) || [];

  const headers = [...staticHeaders, ...dynamicHeaders, "Total"];
  const keys = [...staticKeys, ...dynamicKeys, "total"];

  // TAKING EXAM HEADS DYNAMICALLY: END

  const { updateMarks, cleanup } = useOptimizedMarksUpdate({
    exam_head_id: examConfig?.mark_distribution?.[0]?.heads?.[0]?.exam_head_id,
    mark_distribution_heads: examConfig?.mark_distribution?.[0]?.heads,
    conversion_factor: resultConversionFactor,
    usedHeads: usedHeads,
  });

  const handleCloseModal = () => {
    hideDialog();
    router.back();
  };

  const handleBulkResultAdd = () => {
    const results = studentsForExamSectionWise?.[uniqueKey]
      ?.filter(
        (student) =>
          Array.isArray(student?.obtain_head_wise_marks) &&
          student?.obtain_head_wise_marks.length > 0 &&
          typeof student?.examResult === "object" &&
          student.examResult !== null
      )
      ?.map((student) => ({
        institute_id: user?.teacher?.institute_id,
        academic_year:
          selectedYear?.global_academic_year ||
          academicYearList?.[0]?.global_academic_year,
        exam_id: params?.exam_id,
        exam_config_id: examConfig?._id,
        student_id: student._id,
        obtain_head_wise_marks: student.obtain_head_wise_marks,
        obtain_total_mark: student.examResult.total,
        obtain_converted_total_mark: Math.ceil(
          student.examResult.total * resultConversionFactor
        ),
        status: "not_published",
      }));

    if (!results?.length)
      return Toast.show("No results updated", Toast.BOTTOM, Toast.LONG, {
        backgroundColor: colors.statusError,
      });

    addUpdateStudentMarks({
      institute_id: user?.teacher?.institute_id,
      data: { results },
    })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          showDialog();
        }
      })
      .catch((err) => {
        Toast.show(err?.data?.message, Toast.BOTTOM, Toast.LONG, {
          backgroundColor: colors.statusError,
        });
      });
  };

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : "",
            header === "Name" ? "w-[122px]" : "w-[60px]"
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

  const renderItem = ({ item, index }) => {
    return (
      <View
        className={cn(
          "w-full flex-row border-neutral-200 min-h-[42px]",
          index === studentsForExamSectionWise?.[uniqueKey]?.length - 1
            ? "border-b-0"
            : "border-b"
        )}
        style={{
          ...(index === studentsForExamSectionWise?.[uniqueKey]?.length - 1 && {
            paddingBottom: 334, // Taking common type gen purpose keyboard height
          }),
        }}
      >
        {keys?.map((key, keyIndex) => {
          return (
            <View
              key={keyIndex}
              className={cn(
                "flex-1 p-3 border-r border-transparent flex items-center justify-center",
                keyIndex === keys.length - 1 ? "border-r-0" : "",
                key === "name_english" ? "w-[122px]" : "w-[60px]"
              )}
            >
              {key !== "current_roll_number" && key !== "name_english" ? (
                <InputNumberType
                  className={cn(
                    `flex-shrink-0 rounded-[4px] px-2.5 py-0 h-[32px] w-[44px] text-black-700 text-sm !leading-[1.4] border border-neutral-400 text-center`,
                    "placeholder:text-white-400",
                    key === "total" && "bg-neutral-100 border-neutral-200"
                  )}
                  editable={key !== "total"}
                  placeholder={"00"}
                  value={
                    item?.examResult?.[key] &&
                    item?.examResult?.[key]?.toString()
                  }
                  onChangeText={(value) => {
                    const numericValue = Number(value);
                    if (numericValue > 100) {
                      return Toast.show(
                        "Value cannot be greater than 100",
                        Toast.BOTTOM,
                        Toast.LONG
                      );
                    }
                    updateMarks({
                      type: key,
                      value: Number(value),
                      uniqueKey: uniqueKey,
                      studentId: item._id,
                    });
                  }}
                  disabled={key === "total"}
                  onFocus={() => {
                    scrollViewRef?.current?.scrollToEnd({ animated: true });
                  }}
                />
              ) : (
                <Text
                  className={cn(
                    "text-center text-[10px] !leading-[1.24] text-black-700 line-clamp-1 truncate",
                    key === "name_english" ? "font-bold" : "font-normal"
                  )}
                  style={{
                    ...FONTS.inter400,
                  }}
                >
                  {item[key]}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <BaseLayout title={"Add Result"} className={"flex-1 h-full"}>
      {!keyboardVisible && <NumberSubmissionExamStats params={params} />}

      {isErrorLoadingExamConfig ||
      isErrorLoadingExamHeads ||
      isErrorLoadingSectionStudents ? (
        <View className="flex-1 flex items-center justify-center">
          <Text
            className="text-sm !leading-[1.4] text-black-700"
            style={{ ...FONTS.inter400, fontSize: 12 }}
          >
            Something went wrong.
          </Text>
        </View>
      ) : (
        <Fragment>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className={cn("flex-1")}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20} // Increased offset
            enabled={true}
          >
            <ScrollViewWithBar
              overScrollMode="never"
              contentContainerStyle={{
                flexGrow: 1,
              }}
              className={cn("flex-1 mx-4")}
              scrollEnabled
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              ref={scrollViewRef}
            >
              <View className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 min-w-[300px] mb-2">
                <DataTable
                  headers={headers}
                  tableHeader={tableHeader()}
                  data={studentsForExamSectionWise?.[uniqueKey] || []}
                  renderItem={renderItem}
                  wrapperClassName={"mt-3 mb-4 mx-0 flex-1"}
                  innerScrollEnabled={true}
                  // refetchFunction={() => {
                  //   safeRefetch({
                  //     refetch: refetchExamHeads,
                  //     isUninitialized: isUninitializedExamHeads,
                  //   });
                  //   safeRefetch({
                  //     refetch: refetchExamConfig,
                  //     isUninitialized: isUninitializedExamConfig,
                  //   });
                  //   safeRefetch({
                  //     refetch: refetchSectionStudents,
                  //     isUninitialized: isUninitializedSectionStudents,
                  //   });
                  //   safeRefetch({
                  //     refetch: refetchFilteredResults,
                  //     isUninitialized: isUninitializedFilteredResults,
                  //   });

                  //   Toast.show(
                  //     "Try refreshing again if existing data not shown",
                  //     Toast.BOTTOM,
                  //     Toast.LONG,
                  //     {}
                  //   );
                  // }}
                  keyboardShouldPersistTaps="handled"
                  keyboardDismissMode="interactive"
                  placeholderText={"No data available"}
                />
              </View>
            </ScrollViewWithBar>
          </KeyboardAvoidingView>

          {!keyboardVisible && (
            <View className="p-4">
              <Button
                title="Submit"
                textStyle={{ ...FONTS.inter600, fontSize: 16 }}
                buttonStyle={{ width: width - 28 }}
                className="h-12"
                onPress={handleBulkResultAdd}
              />
            </View>
          )}
        </Fragment>
      )}

      <Dialog
        className="mx-4"
        successModal
        titleText={"Successful!"}
        description={"Number has been successfully submitted."}
        confirmButtonText="Close"
        handleConfirm={handleCloseModal}
      />

      {(isExamConfigFetching ||
        isExamConfigLoading ||
        isExamHeadsFetching ||
        isExamHeadsLoading ||
        isSectionStudentsLoading ||
        isSectionStudentsFetching ||
        isAddUpdateMarksLoading ||
        isFilteredResultsLoading ||
        isFilteredResultsFetching) && <LoadingOverlay />}
    </BaseLayout>
  );
};

export default NumberSubmissionScreen;
