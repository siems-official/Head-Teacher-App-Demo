import { useWindowDimensions } from "react-native";
import React from "react";
import SelectItemPicker from "../ui/SelectItemPicker";
import { useGetLocalClassQuery } from "@/store/classes/api";
import { useSelector } from "react-redux";

const SelectClass = ({
  selectedClass,
  setSelectedClass,
  label,
  placeholder = "Class",
}) => {
  const { width } = useWindowDimensions();
  const { user } = useSelector((state) => state.auth);
  const { classList } = useSelector((state) => state.classes);

  const { isFetching } = useGetLocalClassQuery({
    institute_id: user?.teacher?.institute_id,
  });

  return (
    <SelectItemPicker
      selected={selectedClass}
      setSelected={setSelectedClass}
      triggerButtonStyle={{ width: width / 2 - 28 }}
      placeholder={placeholder}
      label={label}
      options={classList?.map((classItem) => ({
        label: classItem?.local_class_name,
        value: classItem?._id,
      }))}
      disabled={isFetching}
    />
  );
};

export default SelectClass;
