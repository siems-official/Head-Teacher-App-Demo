import { View } from "react-native";
import React from "react";
import { useSharedValue } from "react-native-reanimated";
import Button from "@/components/ui/Button";
import EnrollmentMapperTable from "@/components/enrollment/EnrollmentMapperTable";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { colors, safeRefetch } from "@/services";
import Toast from "react-native-simple-toast";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import {
  useAddUpdateEnrollListMutation,
  useGetFilteredSubjectEnrollListQuery,
  useGetSectionStudentsQuery,
} from "@/store/enrollment/api";
import BaseLayout from "@/components/shared/BaseLayout";
import { useDialog } from "@/hooks/useDialog";

const EnrollmentList = () => {
  const { section_id, class_id, institute_id, subject_id } =
    useLocalSearchParams();
  const { Dialog, hideDialog, showDialog } = useDialog();
  const translateY = useSharedValue(0);
  const { user } = useSelector((state) => state.auth);
  const { selectedYear } = useSelector((state) => state.academicYear);
  const { enrollCount, enrollListForSectionStudents } = useSelector(
    (state) => state.enrollment
  );

  // GET SECTION STUDENTS
  const {
    isUninitialized: isUninitializedSectionStudents,
    isLoading: isLoadingSectionStudents,
    isFetching: isFetchingSectionStudents,
    isSuccess: sectionStudentsFetchSuccess,
    refetch: refetchSectionStudents,
  } = useGetSectionStudentsQuery({
    page: 1,
    institute_id: institute_id,
    section_id: section_id,
    subject_id: subject_id,
    class_id: class_id,
    academic_year: selectedYear?.global_academic_year,
  });

  // GET ENROLL LIST
  const {
    isUninitialized: isUninitializedEnrollList,
    data: filteredSubjectEnrollListData,
    isLoading: isLoadingEnrollList,
    isFetching: isFetchingEnrollList,
    refetch: refetchEnrollList,
  } = useGetFilteredSubjectEnrollListQuery(
    {
      institute_id: institute_id,
      academic_year: selectedYear?.global_academic_year,
      local_class_id: class_id,
      section_id: section_id,
      subject_id: subject_id,
      teacher_id: user?.teacher?._id,
    },
    {
      skip: !sectionStudentsFetchSuccess,
    }
  );

  // ADD UPDATE ENROLL
  const [addUpdateEnrollList, { isLoading: isLoadingEnroll }] =
    useAddUpdateEnrollListMutation();

  const uniqueKey = `${class_id}-${section_id}-${subject_id}`;

  const handleAddEnroll = () => {
    const data = {
      institute_id: institute_id,
      academic_year: selectedYear?.global_academic_year,
      local_class_id: class_id,
      section_id: section_id,
      subject_id: subject_id,
      teacher_id: user?.teacher?._id,
      students: enrollListForSectionStudents?.[uniqueKey]
        ?.filter((student) => student.enrollStatus === true)
        .map((student) => student._id),
    };

    addUpdateEnrollList(data)
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

  const handleCloseModal = () => {
    hideDialog();
    router.back();
  };

  return (
    <BaseLayout title={"Enroll Student List"}>
      <View className="flex-1 p-4">
        <EnrollmentMapperTable
          translateY={translateY}
          data={enrollListForSectionStudents?.[uniqueKey]}
          enrollCount={enrollCount?.[uniqueKey]}
          class_id={class_id}
          section_id={section_id}
          subject_id={subject_id}
          filteredSubjectEnrollListData={filteredSubjectEnrollListData}
          loadingData={
            isLoadingSectionStudents ||
            isFetchingSectionStudents ||
            isLoadingEnrollList ||
            isFetchingEnrollList
          }
          refetchFunction={() => {
            safeRefetch({
              refetch: refetchSectionStudents,
              isUninitialized: isUninitializedSectionStudents,
            });
            safeRefetch({
              refetch: refetchEnrollList,
              isUninitialized: isUninitializedEnrollList,
            });
          }}
        />
      </View>

      <View className="pb-5 px-4">
        <Button
          title="Enroll"
          className="w-full flex-grow"
          buttonWrapperClassName="w-full min-h-[48px]"
          onPress={handleAddEnroll}
          disabled={isLoadingEnroll}
        />
      </View>

      {isLoadingEnroll && <LoadingOverlay />}

      <Dialog
        successModal
        titleText={"Successful!"}
        description={"Students enroll has been successfully saved"}
        handleConfirm={handleCloseModal}
      />
    </BaseLayout>
  );
};

export default EnrollmentList;
