import ExamListCard from "@/components/exam/ExamListCard";
import FilterBoxExamList from "@/components/exam/FilterBoxExamList";
import BaseLayout from "@/components/shared/BaseLayout";
import { colors, FONTS } from "@/services";
import { useLazyGetFilteredExamsByTeacherQuery } from "@/store/exam/api";
import { setListFilterExamType, setListFilterStatus } from "@/store/exam/slice";
import { useCallback, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ExamListScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { listFilter, teacherSpecificExams } = useSelector(
    (state) => state.exam
  );

  const [refreshing, setRefreshing] = useState(false);

  const [getFilteredExamsByTeacher, { isLoading, isFetching }] =
    useLazyGetFilteredExamsByTeacherQuery();

  const handleSearchPress = () => {
    // RETURN IF STATUS OR EXAM TYPE IS NOT SELECTED
    if (!listFilter.status || !listFilter.examType) return;

    getFilteredExamsByTeacher({
      institute_id: user?.teacher?.institute_id,
      result_submit_status: listFilter.status,
      exam_type_id: listFilter.examType,
    });
  };

  // REFRESH CONTROL
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      handleSearchPress();
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <BaseLayout title="Exam List">
      <FilterBoxExamList
        selectedExamType={listFilter?.examType}
        setSelectedExamType={(value) => dispatch(setListFilterExamType(value))}
        selectedStatus={listFilter?.status}
        setSelectedStatus={(value) => dispatch(setListFilterStatus(value))}
        className=""
        onSearchPress={handleSearchPress}
      />

      {!isLoading && !isFetching && teacherSpecificExams?.length > 0 && (
        <FlatList
          scrollEventThrottle={16}
          overScrollMode="always"
          scrollToOverflowEnabled={false}
          showsVerticalScrollIndicator={false}
          bounces={true}
          scrollEnabled={true}
          alwaysBounceVertical={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.main500]}
            />
          }
          className="mx-4 mt-6 h-[200px]"
          data={teacherSpecificExams}
          renderItem={({ item }) => (
            <ExamListCard className={"mb-3"} item={item} />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            // flex: 1,
            paddingBottom: 20,
          }}
        />
      )}

      {isLoading || isFetching ? (
        <View className="flex-1 flex items-center justify-center">
          <ActivityIndicator size="large" color={colors.main500} />
        </View>
      ) : !listFilter.status || !listFilter.examType ? (
        <View className="flex-1 flex items-center justify-center">
          <Text style={{ ...FONTS.inter500, color: colors.neutral400 }}>
            Select type and status to get exams
          </Text>
        </View>
      ) : !teacherSpecificExams ? (
        <View className="flex-1 flex items-center justify-center">
          <Text style={{ ...FONTS.inter500, color: colors.neutral400 }}>
            No exams
          </Text>
        </View>
      ) : null}
    </BaseLayout>
  );
};

export default ExamListScreen;
