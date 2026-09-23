import { View, useWindowDimensions } from "react-native";
import SelectItemPicker from "@/components/ui/SelectItemPicker";
import Button from "@/components/ui/Button";
import { colors, FONTS, SearchIcon } from "@/services";

const FilterBox = ({
  selectedYear,
  setSelectedYear,
  selectedBloodGroup,
  setSelectedBloodGroup,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View className="px-3 py-4 mx-4 mt-2 rounded-xl bg-white-75 flex flex-col">
      <View className="relative w-full flex flex-row items-center gap-2 mt-2">
        <SelectItemPicker
          label={"Select Year"}
          selected={selectedYear}
          setSelected={setSelectedYear}
          triggerButtonStyle={{ width: width / 2 - 28 }}
          placeholder="Select"
          options={[
            { label: "2023", value: "2023" },
            { label: "2022", value: "2022" },
            { label: "2021", value: "2021" },
          ]}
        />
        <SelectItemPicker
          label={"Blood Group"}
          selected={selectedBloodGroup}
          setSelected={setSelectedBloodGroup}
          triggerButtonStyle={{ width: width / 2 - 28 }}
          placeholder="Select"
          options={[
            { label: "One", value: "one" },
            { label: "Two", value: "two" },
            { label: "Three", value: "three" },
          ]}
        />
      </View>

      <Button
        title="Search"
        onPress={() => {}}
        startIcon={
          <SearchIcon
            color={colors.white50}
            className={"!h-4 !w-4"}
            height={16}
            width={16}
          />
        }
        disabled={
          !selectedYear ||
          !selectedClass ||
          !selectedSection ||
          !selectedCategory
        }
        textStyle={{ ...FONTS.inter600, fontSize: 12 }}
        className="mt-4 h-12 bg-secondary-500"
        style={{ width: width - 50 }}
      />
    </View>
  );
};

export default FilterBox;
