import { cn } from "@/services";
import { handleScrollForAnimatedButton } from "@/services/helpers/scroll";
import { setAttendanceStatus } from "@/store/attendanceManagement/slice";
import { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

const AttendanceGrid = ({
  translateY,
  data,
  isDisabled,
  class_id,
  section_id,
  period_id,
  subject_id,
}) => {
  const { width: windowWidth } = Dimensions.get("window");
  const lastScrollY = useRef(0);
  const dispatch = useDispatch();

  const handlePress = ({ id, value }) => {
    dispatch(
      setAttendanceStatus({
        studentId: id,
        status: value,
        class_id,
        section_id,
        period_id,
        subject_id,
      })
    );
  };

  return (
    <ScrollView
      onScroll={(event) =>
        handleScrollForAnimatedButton({ event, translateY, lastScrollY })
      }
      scrollEventThrottle={16}
      overScrollMode="always"
      bounces={true}
      alwaysBounceVertical={true}
      className="flex-1 px-4 pt-4 pb-20 mt-2"
    >
      <View className="flex flex-row flex-wrap justify-start gap-2 pb-28">
        {data?.map(({ _id, attendanceStatus, roll }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              handlePress({
                id: _id,
                value: attendanceStatus === "present" ? "absent" : "present",
              })
            }
            className={cn(
              "justify-center items-center rounded-md",
              attendanceStatus === "present"
                ? "bg-status-success"
                : "bg-status-error",
              isDisabled ? "opacity-50" : ""
            )}
            style={{
              height: (windowWidth - 64) / 6,
              width: (windowWidth - 64) / 6,
            }}
            disabled={isDisabled}
          >
            <Text className="text-white font-bold text-white-50">{roll}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AttendanceGrid;
