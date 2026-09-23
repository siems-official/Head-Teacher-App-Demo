import { View, useWindowDimensions } from "react-native";
import Button from "@/components/ui/Button";
import { colors, FONTS, SearchIcon } from "@/services";
import SelectCategory from "../shared/SelectCategory";
import SelectClass from "../shared/SelectClass";
import SelectCollectionsListYear from "../shared/SelectCollectionsListYear";
import SelectSection from "../shared/SelectSection";

const FilterBox = ({
  selectedYear,
  setSelectedYear,
  selectedClass,
  setSelectedClass,
  selectedSection,
  setSelectedSection,
  selectedCategory,
  setSelectedCategory,
  onSearchPress,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View className="px-3 py-4 mx-4 mt-2 rounded-xl bg-white-75 flex flex-col">
      <View className="relative w-full flex flex-row items-center gap-2 mt-2">
        <SelectCollectionsListYear
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          label={"Select Year"}
          triggerButtonStyle={{ width: width / 2 - 28 }}
          placeholder="Year"
        />

        <SelectClass
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          label={"Select Class"}
          placeholder="Class"
        />
      </View>

      <View className="relative w-full flex flex-row items-center gap-2 mt-4">
        <SelectSection
          label={"Select Section"}
          placeholder="Section"
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          classId={selectedClass}
          triggerButtonStyle={{ width: width / 2 - 28 }}
          disabled={!selectedClass}
        />
        <SelectCategory
          label={"Select Category"}
          placeholder="Category"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          triggerButtonStyle={{ width: width / 2 - 28 }}
          disabled={!selectedClass}
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
        disabled={!selectedYear || !selectedClass}
        textStyle={{ ...FONTS.inter600, fontSize: 12 }}
        className="mt-4 h-12 bg-secondary-500"
        style={{ width: width - 50 }}
      />
    </View>
  );
};

export default FilterBox;
