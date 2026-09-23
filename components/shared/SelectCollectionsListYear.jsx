import { useGetAcademicYearsQuery } from "@/store/academicYear/api";
import SelectItemPicker from "../ui/SelectItemPicker";
import { useSelector } from "react-redux";

const SelectCollectionsListYear = ({
  customYears,
  selectedYear,
  setSelectedYear,
  listTypeText,
  placeholder = "Select year",
  label,
  ...props
}) => {
  const { academicYearList } = useSelector((state) => state.academicYear);

  // FETCHING YEAR
  const { isLoading, isFetching } = useGetAcademicYearsQuery();

  return (
    <SelectItemPicker
      selected={selectedYear}
      setSelected={setSelectedYear}
      placeholder={placeholder}
      label={label || ""}
      options={
        customYears
          ? customYears?.map((item) => ({
              label: item,
              value: item,
            }))
          : academicYearList?.map((item) => ({
              label: item?.global_academic_year,
              value: item?.global_academic_year,
            }))
      }
      triggerButtonStyle={{ marginHorizontal: 16 }}
      disabled={isLoading || isFetching}
      {...props}
    />
  );
};

export default SelectCollectionsListYear;
