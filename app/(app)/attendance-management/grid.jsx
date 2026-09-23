import AttendanceGrid from "@/components/attendance/AttendanceGrid";
import Button from "@/components/ui/Button";
import HeaderCommon from "@/components/shared/HeaderCommon";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { FONTS, successGif } from "@/services";
import { useState } from "react";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { View } from "react-native";
import { Text } from "react-native";
import { useClassAttendanceBulkAddMutation } from "@/store/attendanceManagement/api";

const AttendanceGridScreen = () => {
  const translateY = useSharedValue(0);
  const { attendanceList, presentCount } = useSelector(
    (state) => state.attendanceManagement
  );
  const { subject_id, class_id, section_id, period_id } =
    useLocalSearchParams();
  const router = useRouter();
  const [attendanceBulkAdd, { isLoading: isBulkAttendanceAdding }] =
    useClassAttendanceBulkAddMutation();

  const { height, width } = Dimensions.get("window");

  const [isModalVisible, setModalVisible] = useState(false);

  const uniqueKey = `${class_id}-${section_id}-${period_id}-${subject_id}`;

  const handleCloseModal = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 relative bg-white-50">
      <HeaderCommon title="Attendance" showEditButton={false} />
      {attendanceList?.[uniqueKey] &&
      attendanceList?.[uniqueKey]?.length > 0 ? (
        <AttendanceGrid
          translateY={translateY}
          data={attendanceList?.[uniqueKey]}
          presentCount={presentCount?.[uniqueKey]}
          // isDisabled={attendanceExists === "true" || customDisabled}
          class_id={class_id}
          section_id={section_id}
          period_id={period_id}
          subject_id={subject_id}
        />
      ) : (
        <View className="flex-1 flex items-center justify-center">
          <Text className="text-neutral-300">
            No student is enrolled for this class.
          </Text>
        </View>
      )}

      <TouchableWithoutFeedback
        accessible={false}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            margin: 0,
            minHeight: height,
            width: width,
            display: isModalVisible ? "flex" : "none",
          }}
          className="absolute bottom-0 left-0 bg-black-900/50 flex justify-center items-center"
        >
          <View
            className="h-fit  bg-white-50 flex flex-col justify-center items-center rounded-xl px-4 py-6 relative z-10"
            style={{ maxWidth: 340, height: "auto" }}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
          >
            <ExpoImage
              source={successGif}
              className="h-[150px] w-[150px]"
              height={150}
              width={150}
            />

            <Text
              className="text-2xl font-normal !leading-[1.4]"
              style={{ ...FONTS.inter600 }}
            >
              Successful!
            </Text>

            <Text
              className="text-sm font-normal !leading-[1.4] text-center text-black-600"
              style={{ ...FONTS.inter400 }}
            >
              attendance successfully saved!
            </Text>

            <View className="flex flex-row mt-6 w-full relative z-20">
              <Button
                title="Back"
                onPress={handleCloseModal}
                buttonWrapperClassName="!flex-1 h-fit mr-1"
                className="py-3"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View className="p-4">
        <Button
          title="Close"
          className="w-full flex-grow"
          buttonWrapperClassName="w-full min-h-[48px]"
          onPress={router.back}
        />
      </View>

      {isBulkAttendanceAdding && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default AttendanceGridScreen;
