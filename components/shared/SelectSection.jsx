import { useWindowDimensions } from "react-native";
import React from "react";
import SelectItemPicker from "../ui/SelectItemPicker";
import { useSelector } from "react-redux";
import { useGetSectionsQuery } from "@/store/sections/api";

const SelectSection = ({
  selectedSection,
  setSelectedSection,
  label,
  placeholder = "Section",
  classId,
  ...props
}) => {
  const { width } = useWindowDimensions();
  const { user } = useSelector((state) => state.auth);
  const { sectionList } = useSelector((state) => state.sections);

  // FILTERING SECTIONS BASED ON CLASS
  const classBasedSectionList = sectionList
    ?.filter((section) => section?.local_class_id?._id === classId)
    ?.sort(
      (a, b) => (a?.group_id?.group_name > b?.group_id?.group_name ? 1 : -1) // SORTING SECTIONS BASED ON GROUP NAME ALPHABETICALLY
    );

  const { isFetching } = useGetSectionsQuery({
    institute_id: user?.teacher?.institute_id,
  });

  return (
    <SelectItemPicker
      selected={selectedSection}
      setSelected={setSelectedSection}
      triggerButtonStyle={{ width: width / 2 - 28 }}
      placeholder={placeholder}
      label={label}
      options={classBasedSectionList?.map((sectionItem) => ({
        label: `${sectionItem?.group_id?.group_name || ""} ${
          sectionItem?.section_name
        }`,
        value: sectionItem?._id,
      }))}
      disabled={isFetching}
      {...props}
    />
  );
};

export default SelectSection;
