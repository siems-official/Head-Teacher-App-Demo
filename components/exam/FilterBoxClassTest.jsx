import { View, useWindowDimensions } from "react-native";
import Button from "@/components/ui/Button";
import { cn, colors, FONTS, SearchIcon } from "@/services";
import SelectExamType from "../shared/SelectExamType";

const FilterBoxClassTest = ({
  selectedExamType,
  setSelectedExamType,
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
      <SelectExamType
        label={"Exam Type"}
        placeholder="Type"
        className="w-full"
        selectedExamType={selectedExamType}
        setSelectedExamType={setSelectedExamType}
        triggerButtonStyle={{ width: width - 50 }}
      />

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
        disabled={!selectedExamType}
        textStyle={{ ...FONTS.inter600, fontSize: 12 }}
        className="mt-4 h-12 bg-secondary-500"
        style={{ width: width - 50 }}
      />
    </View>
  );
};

export default FilterBoxClassTest;
