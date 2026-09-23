import SelectItemPicker from "../ui/SelectItemPicker";
import { useGetCategoriesQuery } from "@/store/categories/api";
import { useSelector } from "react-redux";

const SelectCategory = ({
  selectedCategory,
  setSelectedCategory,
  label,
  placeholder = "Category",
  ...props
}) => {
  const { user } = useSelector((state) => state.auth);
  const { allCategories } = useSelector((state) => state.categories);
  const { isLoading, isFetching } = useGetCategoriesQuery({
    institute_id: user?.teacher?.institute_id,
  });

  return (
    <SelectItemPicker
      label={label}
      selected={selectedCategory}
      setSelected={setSelectedCategory}
      placeholder={placeholder}
      options={allCategories?.map((item) => ({
        label: item?.local_category_name,
        value: item?._id,
      }))}
      disabled={isLoading || isFetching}
      {...props}
    />
  );
};

export default SelectCategory;
