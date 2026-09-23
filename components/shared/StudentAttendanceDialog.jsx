import {
  chat,
  cn,
  DotIcon,
  FONTS,
  handleCallPress,
  handleChatPress,
  phoneCall,
  profileImage,
} from "@/services";
import { Image, useWindowDimensions } from "react-native";
import { View, Text } from "react-native";
import Button from "../ui/Button";
import { Portal } from "react-native-portalize";

const StudentAttendanceDialog = ({
  Dialog,
  studentImage,
  name,
  studyClass,
  roll,
  totalClass,
  present,
  absent,
  phone,
}) => {
  const { width } = useWindowDimensions();

  return (
    <Portal>
      <Dialog infoModal={true}>
        <View className={cn("flex flex-col justify-center items-center")}>
          <View
            className={cn(
              "flex items-center justify-center h-[60px] w-[60px] bg-white-50 !rounded-full border border-main-500 relative z-[1]"
            )}
          >
            <Image
              source={studentImage ? { uri: studentImage } : profileImage}
              className="h-full w-full rounded-full"
            />
          </View>

          <Text
            className="text-black-700 text-base font-bold !leading-[1.2] uppercase w-full text-center mt-2"
            style={{ ...FONTS.inter700 }}
          >
            {name}
          </Text>

          <View className={cn("flex flex-row items-center gap-[6px] mt-1")}>
            <Text
              className="text-black-700 text-xs !leading-[1.2]"
              style={{ ...FONTS.inter400 }}
            >
              CLASS: {studyClass}
            </Text>
            <DotIcon className={"h-1 w-1"} />
            <Text
              className="text-black-700 text-xs !leading-[1.2]"
              style={{ ...FONTS.inter400 }}
            >
              ROLL: {roll}
            </Text>
          </View>

          <View className="flex flex-col gap-2 px-3 py-4 bg-main-50 rounded-lg mt-5">
            <View className="flex flex-row gap-4 justify-between w-full">
              <Text
                className="text-sm !leading-[1.4] text-black-700"
                style={{ ...FONTS.inter400 }}
              >
                Total Class:
              </Text>
              <Text
                className="text-sm !leading-[1.2] text-black-700"
                style={{ ...FONTS.inter600 }}
              >
                {totalClass}
              </Text>
            </View>
            <View className="flex flex-row gap-4 justify-between w-full">
              <Text
                className="text-sm !leading-[1.4] text-black-700"
                style={{ ...FONTS.inter400 }}
              >
                Presents:
              </Text>
              <Text
                className="text-sm !leading-[1.2] text-black-700"
                style={{ ...FONTS.inter600 }}
              >
                {present}
              </Text>
            </View>
            <View className="flex flex-row gap-4 justify-between w-full">
              <Text
                className="text-sm !leading-[1.4] text-black-700"
                style={{ ...FONTS.inter400 }}
              >
                Absent:
              </Text>
              <Text
                className="text-sm !leading-[1.2] text-black-700"
                style={{ ...FONTS.inter600 }}
              >
                {absent}
              </Text>
            </View>
          </View>

          <View className="flex flex-row min-w-full h-12 mt-5 gap-2">
            <Button
              onPress={() => handleChatPress({ number: phone })}
              startIcon={<Image source={chat} className="h-6 w-6" />}
              className="h-full flex-1 border-[#41CCF8] bg-[#F0FCFF]"
              style={{ width: width / 2 - 36 }}
              variant="outlined"
              rippleColor={"#41CCF84c"}
            />
            <Button
              onPress={() => handleCallPress({ number: phone })}
              startIcon={<Image source={phoneCall} className="h-6 w-6" />}
              className="h-full flex-1 border-[#B3E562] bg-[#F1FEDD]"
              style={{ width: width / 2 - 36 }}
              variant="outlined"
              rippleColor={"#B3E5624c"}
            />
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

export default StudentAttendanceDialog;
