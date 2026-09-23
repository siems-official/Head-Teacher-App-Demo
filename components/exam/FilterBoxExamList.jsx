import { View, useWindowDimensions } from "react-native";
import Button from "@/components/ui/Button";
import { cn, colors, FONTS, SearchIcon } from "@/services";
import SelectExamStatus from "../shared/SelectExamStatus";
import SelectExamType from "../shared/SelectExamType";

const FilterBoxExamList = ({
  selectedExamType,
  setSelectedExamType,
  selectedStatus,
  setSelectedStatus,
  onSearchPress,
  className,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View
      className={cn(
        "px-3 py-4 mx-4 mt-2 rounded-xl bg-white-75 flex flex-col",
        className
      )}
    >
      <View className="relative w-full flex flex-row items-center gap-2 mt-2">
        <SelectExamType
          label={"Exam Type"}
          placeholder="Type"
          selectedExamType={selectedExamType}
          setSelectedExamType={setSelectedExamType}
          triggerButtonStyle={{ width: width / 2 - 28 }}
        />

        <SelectExamStatus
          label={"Select Status"}
          placeholder="Status"
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          triggerButtonStyle={{ width: width / 2 - 28 }}
        />
      </View>

      <Button
        title="Search"
        onPress={onSearchPress}
        startIcon={
          <SearchIcon
            color={colors.white50}
            className={"!h-4 !w-4"}
            height={16}
            width={16}
          />
        }
        disabled={!selectedStatus || !selectedExamType}
        textStyle={{ ...FONTS.inter600, fontSize: 12 }}
        className="mt-4 h-12 bg-secondary-500"
        style={{ width: width - 50 }}
      />
    </View>
  );
};

export default FilterBoxExamList;
