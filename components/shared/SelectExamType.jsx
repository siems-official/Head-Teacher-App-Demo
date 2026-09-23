import { useSelector } from "react-redux";
import { useGetAllExamTypesQuery } from "@/store/exam/api";
import SelectItemPicker from "../ui/SelectItemPicker";

const SelectExamType = ({
  selectedExamType,
  setSelectedExamType,
  listTypeText,
  placeholder = "Select Status",
  label,
  ...props
}) => {
  const { user } = useSelector((state) => state.auth);
  const { allExamTypes } = useSelector((state) => state.exam);

  const {
    data: allExamTypesData,
    isLoading,
    isFetching,
  } = useGetAllExamTypesQuery({
    institute_id: user?.teacher?.institute_id,
    page: 1,
    limit: 999999,
  });

  return (
    <SelectItemPicker
      selected={selectedExamType}
      setSelected={setSelectedExamType}
      placeholder={placeholder}
      label={label || ""}
      options={allExamTypes?.map((item) => ({
        label: item?.exam_type_name,
        value: item?._id,
      }))}
      triggerButtonStyle={{ marginHorizontal: 16 }}
      disabled={isLoading || isFetching}
      {...props}
    />
  );
};

export default SelectExamType;
