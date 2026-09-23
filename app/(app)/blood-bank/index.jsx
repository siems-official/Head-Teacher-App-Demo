import FilterBox from "@/components/bloodBank/FilterBox";
import BaseLayout from "@/components/shared/BaseLayout";
import DataTable from "@/components/shared/DataTable";
import StudentContactDialog from "@/components/shared/StudentContactDialog";
import { useDialog } from "@/hooks/useDialog";
import {
  chat,
  cn,
  colors,
  FONTS,
  handleCallPress,
  handleChatPress,
  handleMailPress,
  mail,
  phoneCall,
  SearchIcon,
} from "@/services";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const BloodBankScreen = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);

  const { Dialog, showDialog } = useDialog();

  // TABLE ACESSORIES
  const headers = ["Class", "Name", "B.G", "Action"];
  const keys = ["class", "name", "bloodGroup", "action"];

  const data = [
    {
      _id: 1,
      class: "Six",
      roll: "01",
      bloodGroup: "A+",
      name: "Abhishek",
    },
  ];

  const handleViewStudentPress = (studentId) => {
    showDialog();
  };

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "flex-1 h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : "",
            (header === "Name" && "min-w-[122px]") ||
              (header === "Action" && "min-w-[110px]") ||
              (header === "Class" && "min-w-[46px]") ||
              (header === "B.G" && "min-w-[56px]")
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
        "flex-row border-neutral-200 h-[42px]",
        index === data.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          key={keyIndex}
          className={cn(
            "flex-1 p-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys.length - 1 ? "border-r-0" : "",
            (key === "name" && "min-w-[122px]") ||
              ((key === "class" || key === "bloodGroup") && "min-w-[46px]") ||
              (key === "action" && "min-w-[110px]") ||
              "min-w-[50px]"
          )}
        >
          {key === "class" && (
            <Text
              className={cn(
                "text-center text-[10px] !leading-[1.24]",
                key === "bloodGroup" && "text-black-700",
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
              onPress={() => handleViewStudentPress(item._id)}
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
                onPress={() => handleCallPress({ number: "+91 1234567890" })}
              >
                <Image source={phoneCall} className="h-6 w-6" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.35}
                className="!rounded-lg h-fit w-fit flex items-center justify-center"
                onPress={() => handleChatPress({ number: "+91 1234567890" })}
              >
                <Image source={chat} className="h-6 w-6" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.35}
                className="!rounded-lg h-fit w-fit flex items-center justify-center"
                onPress={() => handleMailPress({ email: "v6mGp@example.com" })}
              >
                <Image source={mail} className="h-7 w-7" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <BaseLayout title="Blood Bank">
      <FilterBox
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedBloodGroup={selectedBloodGroup}
        setSelectedBloodGroup={setSelectedBloodGroup}
      />

      <Text
        className="text-black-700 !leading-normal mx-4 mt-4"
        style={{ ...FONTS.inter400, fontSize: 14 }}
      >
        Student List
      </Text>

      {/* DATA TABLE */}
      {data.length > 0 ? (
        <DataTable
          headers={headers}
          tableHeader={tableHeader()}
          data={data}
          renderItem={renderItem}
          wrapperClassName={"mt-3"}
          innerScrollEnabled={true}
        />
      ) : (
        <View className="flex-1 flex flex-col items-center justify-center w-full">
          <SearchIcon color={colors.neutral300} height={80} width={80} />
          <Text
            className="!leading-[1.4] text-white-150"
            style={{ ...FONTS.inter400, fontSize: 14 }}
          >
            Select date and class to see data
          </Text>
        </View>
      )}

      <StudentContactDialog
        Dialog={Dialog}
        name={"Abhishek"}
        roll={"01"}
        studyClass={"6"}
      />
    </BaseLayout>
  );
};

export default BloodBankScreen;
