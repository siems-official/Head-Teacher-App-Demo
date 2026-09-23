import { Text, TouchableOpacity, View } from "react-native";
import {
  chat,
  cn,
  FONTS,
  handleCallPress,
  handleChatPress,
  phoneCall,
} from "@/services";
import DataTable from "@/components/shared/DataTable";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { useDialog } from "@/hooks/useDialog";
import StudentAttendanceDialog from "@/components/shared/StudentAttendanceDialog";
import BaseLayout from "@/components/shared/BaseLayout";
import { useSelector } from "react-redux";
import { useState } from "react";

const PresentScreen = () => {
  const params = useLocalSearchParams();
  const { Dialog, showDialog } = useDialog();
  const { presentStudentList } = useSelector(
    (state) => state.studentAttendance
  );

  const [activeStudentInfo, setActiveStudentInfo] = useState({});

  // TABLE ACESSORIES
  const headers = ["Roll", "Name", "Action"];
  const keys = ["roll", "name", "action"];

  const classSpecificPresentStudentList = presentStudentList?.filter(
    (student) =>
      student?.className === params?.className &&
      student?.section === params?.section
  );

  const handleViewStudentPress = (info) => {
    showDialog();
    setActiveStudentInfo(info);
  };

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : "",
            (header === "Name" && "min-w-[200px]") ||
              (header === "Action" && "min-w-[78px]") ||
              "min-w-[50px]"
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
          "flex-row border-neutral-200 h-[42px]",
          index === classSpecificPresentStudentList.length - 1
            ? "border-b-0"
            : "border-b"
        )}
      >
        {keys?.map((key, keyIndex) => (
          <View
            key={keyIndex}
            className={cn(
              "flex-1 p-3 border-r border-transparent flex items-center justify-center",
              keyIndex === keys.length - 1 ? "border-r-0" : "",
              (key === "name" && "min-w-[200px]") ||
                (key === "action" && "min-w-[78px]") ||
                "min-w-[50px]"
            )}
          >
            {key === "roll" && (
              <Text
                className={cn(
                  "text-center text-[10px] !leading-[1.24]",
                  key === "roll" && "text-black-700",
                  key === "name" && "text-main-500 font-semibold underline"
                )}
                style={{
                  ...FONTS.inter400,
                }}
              >
                {item[key]}
              </Text>
            )}
            {key === "name" && (
              <TouchableOpacity
                onPress={() => handleViewStudentPress(item)}
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
            )}
            {key === "action" && (
              <View className="flex flex-row items-center justify-end gap-2">
                <TouchableOpacity
                  activeOpacity={0.35}
                  className="!rounded-lg h-fit w-fit flex items-center justify-center"
                  onPress={() => handleCallPress({ number: item?.phone })}
                >
                  <Image source={phoneCall} className="h-6 w-6" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.35}
                  className="!rounded-lg h-fit w-fit flex items-center justify-center"
                  onPress={() => handleChatPress({ number: item?.phone })}
                >
                  <Image source={chat} className="h-6 w-6" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <BaseLayout title="Present">
      <View className="flex flex-row justify-between items-center mx-4 mt-4">
        <Text className="flex flex-1">
          Class: <Text className="font-semibold">{params?.classCode}</Text>
        </Text>
        <Text className="flex flex-1 text-center">
          Section: <Text className="font-semibold">{params?.section}</Text>
        </Text>
        <Text className="flex text-right flex-1">
          Period: <Text className="font-semibold">{params?.period}</Text>
        </Text>
      </View>

      {/* DATA TABLE */}
      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={classSpecificPresentStudentList}
        renderItem={renderItem}
        wrapperClassName={"mt-3 flex-1 mb-4"}
        innerScrollEnabled={true}
      />

      <StudentAttendanceDialog
        Dialog={Dialog}
        name={activeStudentInfo?.name}
        roll={activeStudentInfo?.roll}
        studyClass={activeStudentInfo?.classCode}
        present={activeStudentInfo?.totalPresent}
        absent={activeStudentInfo?.totalAbsent}
        totalClass={activeStudentInfo?.totalClass}
        phone={activeStudentInfo?.phone}
        studentImage={activeStudentInfo?.image}
      />
    </BaseLayout>
  );
};

export default PresentScreen;
