import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { Fragment, useState } from "react";
import {
  chat,
  cn,
  FONTS,
  handleCallPress,
  handleChatPress,
  handleMailPress,
  mail,
  phoneCall,
} from "@/services";
import FilterBox from "@/components/student/FilterBox";
import { useDialog } from "@/hooks/useDialog";
import StudentContactDialog from "@/components/shared/StudentContactDialog";
import DataTable from "@/components/shared/DataTable";
import SearchField from "@/components/ui/SearchField";
import BaseLayout from "@/components/shared/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterCategory,
  setFilterClass,
  setFilterSection,
  setFilterYear,
  setSearchRoll,
} from "@/store/students/slice";
import { useLazyGetFilteredStudentsQuery } from "@/store/students/api";

const index = () => {
  const { Dialog, showDialog } = useDialog();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    filterYear,
    filterClass,
    filterSection,
    filterCategory,
    studentList,
    allStudents,
    searchRoll,
  } = useSelector((state) => state.student);

  const [
    getStudents,
    { isLoading: isLoadingStudents, isFetching: isFetchingStudents },
  ] = useLazyGetFilteredStudentsQuery();

  const [activeStudent, setActiveStudent] = useState(null);

  // TABLE ACESSORIES
  const headers = ["Class", "Roll", "Name", "Action"];
  const keys = ["class", "roll", "name", "action"];

  const handleViewStudentPress = (student) => {
    setActiveStudent(student);
    showDialog();
  };

  const handleSearchPress = () => {
    getStudents({
      institute_id: user?.teacher?.institute_id,
      academic_year: filterYear,
      class_id: filterClass,
      section_id: filterSection,
      category_id: filterCategory,
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
            (header === "Name" && "min-w-[122px]") ||
              (header === "Action" && "min-w-[110px]") ||
              (header === "Class" && "min-w-[46px]") ||
              (header === "Roll" && "min-w-[56px]")
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
        index === studentList?.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          key={keyIndex}
          className={cn(
            "flex-1 p-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys.length - 1 ? "border-r-0" : "",
            (key === "name" && "min-w-[122px]") ||
              ((key === "class" || key === "roll") && "min-w-[46px]") ||
              (key === "action" && "min-w-[110px]") ||
              "min-w-[50px]"
          )}
        >
          {(key === "roll" || key === "class") && (
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
                  "text-center text-[10px] !leading-[1.24] text-main-500 font-semibold underline max-w-[100px] line-clamp-1"
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
              {item?.phone && (
                <Fragment>
                  <TouchableOpacity
                    activeOpacity={0.35}
                    className={cn(
                      "!rounded-lg h-fit w-fit flex items-center justify-center",
                      !item?.phone && "opacity-50"
                    )}
                    onPress={() => handleCallPress({ number: item?.phone })}
                    // disabled={!item?.phone}
                  >
                    <Image source={phoneCall} className="h-6 w-6" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.35}
                    className={cn(
                      "!rounded-lg h-fit w-fit flex items-center justify-center",
                      !item?.phone && "opacity-50"
                    )}
                    onPress={() => handleChatPress({ number: item?.phone })}
                    // disabled={!item?.phone}
                  >
                    <Image source={chat} className="h-6 w-6" />
                  </TouchableOpacity>
                </Fragment>
              )}
              {item?.email && (
                <TouchableOpacity
                  activeOpacity={0.35}
                  className={cn(
                    "!rounded-lg h-fit w-fit flex items-center justify-center",
                    !item?.email && "opacity-50"
                  )}
                  onPress={() => handleMailPress({ email: item?.email })}
                  // disabled={!item?.email}
                >
                  <Image source={mail} className="h-7 w-7" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <BaseLayout title="Students">
      <FilterBox
        selectedYear={filterYear}
        setSelectedYear={(value) => dispatch(setFilterYear(value))}
        selectedClass={filterClass}
        setSelectedClass={(value) => dispatch(setFilterClass(value))}
        selectedSection={filterSection}
        setSelectedSection={(value) => dispatch(setFilterSection(value))}
        selectedCategory={filterCategory}
        setSelectedCategory={(value) => dispatch(setFilterCategory(value))}
        onSearchPress={handleSearchPress}
      />

      <View className="mx-4 mt-5 flex flex-row gap-4 items-center justify-between">
        <Text
          className="text-black-700 !leading-normal"
          style={{ ...FONTS.inter400, fontSize: 14 }}
        >
          Student List{" "}
          <Text style={{ ...FONTS.inter600, fontSize: 14 }}>
            ({allStudents?.length})
          </Text>
        </Text>

        <SearchField
          value={searchRoll}
          onChangeText={(searchText) => dispatch(setSearchRoll(searchText))}
          placeholder="Search by roll"
          className="w-[116px] h-7 overflow-hidden"
          inputClassName="h-12 text-[10px]"
        />
      </View>

      {/* DATA TABLE */}

      <DataTable
        headers={headers}
        tableHeader={tableHeader()}
        data={studentList}
        renderItem={renderItem}
        wrapperClassName={"mt-3 mb-4 flex-1"}
        innerScrollEnabled={true}
        loadingData={isLoadingStudents || isFetchingStudents}
      />

      <StudentContactDialog
        Dialog={Dialog}
        name={activeStudent?.name}
        roll={activeStudent?.roll}
        studyClass={activeStudent?.class}
        phone={activeStudent?.phone}
        email={activeStudent?.email}
        studentImage={activeStudent?.image}
      />
    </BaseLayout>
  );
};

export default index;
