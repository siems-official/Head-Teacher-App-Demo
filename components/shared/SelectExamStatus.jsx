import SelectItemPicker from "../ui/SelectItemPicker";

const SelectExamStatus = ({
  selectedStatus,
  setSelectedStatus,
  listTypeText,
  placeholder = "Select Status",
  label,
  ...props
}) => {
  const examStatusList = [
    {
      label: "Pending",
      value: "pending",
    },
  ];

  return (
    <SelectItemPicker
      selected={selectedStatus}
      setSelected={setSelectedStatus}
      placeholder={placeholder}
      label={label || ""}
      options={examStatusList}
      triggerButtonStyle={{ marginHorizontal: 16 }}
      {...props}
    />
  );
};

export default SelectExamStatus;
