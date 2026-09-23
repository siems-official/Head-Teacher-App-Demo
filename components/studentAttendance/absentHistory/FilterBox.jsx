import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Button from "@/components/ui/Button";
import DatePickerCalender from "@/components/ui/DatePickerCalender";
import { CalenderIcon, cn, colors, FONTS, SearchIcon } from "@/services";
import SelectClass from "@/components/shared/SelectClass";
import SelectSection from "@/components/shared/SelectSection";

const FilterBox = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedClass,
  setSelectedClass,
  selectedSection,
  setSelectedSection,
  searchPress,
}) => {
  const { width } = useWindowDimensions();

  const [startCalenderOpen, setStartCalenderOpen] = useState();
  const [endCalenderOpen, setEndCalenderOpen] = useState();

  return (
    <View className="px-3 py-4 mx-4 mt-2 rounded-xl bg-white-75 flex flex-col">
      <Text
        className="!leading-[1.2] text-black-700"
        style={{ ...FONTS.inter600, fontSize: 12 }}
      >
        Select Date
      </Text>

      <View className="relative w-full flex flex-row items-center gap-2 mt-2">
        <TouchableOpacity
          className="flex-1 border border-neutral-300 rounded-lg py-3 px-4 flex flex-row items-center justify-between h-12 shrink-0 bg-white-50"
          onPress={() => {
            setStartCalenderOpen(!startCalenderOpen);
            setEndCalenderOpen(false);
          }}
        >
          <Text
            className={cn(
              "text-sm !leading-[1.4]",
              startDate ? "text-black-700" : "text-white-400"
            )}
            style={{ ...FONTS.inter400 }}
          >
            {startDate ? startDate?.dateString : "Start Date"}
          </Text>
          <CalenderIcon />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 border border-neutral-300 rounded-lg py-3 px-4 flex flex-row items-center justify-between h-12 shrink-0 bg-white-50"
          onPress={() => {
            setEndCalenderOpen(!endCalenderOpen);
            setStartCalenderOpen(false);
          }}
        >
          <Text
            className={cn(
              "text-sm !leading-[1.4]",
              endDate ? "text-black-700" : "text-white-400"
            )}
            style={{ ...FONTS.inter400 }}
          >
            {endDate ? endDate?.dateString : "End Date"}
          </Text>
          <CalenderIcon />
        </TouchableOpacity>

        <DatePickerCalender
          selected={startDate}
          setSelected={setStartDate}
          calenderOpen={startCalenderOpen}
          setCalenderOpen={setStartCalenderOpen}
          style={{ top: 28, right: -12 }}
        />
        <DatePickerCalender
          selected={endDate}
          setSelected={setEndDate}
          calenderOpen={endCalenderOpen}
          setCalenderOpen={setEndCalenderOpen}
          style={{ top: 28, right: -12 }}
        />
      </View>

      <Text
        className="!leading-[1.2] text-black-700 mt-4"
        style={{ ...FONTS.inter600, fontSize: 12 }}
      >
        Select Class & Section
      </Text>

      <View className="relative w-full flex flex-row items-center gap-2 mt-2">
        <SelectClass
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        <SelectSection
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          classId={selectedClass}
          disabled={!selectedClass}
        />
      </View>

      <Button
        title="Search"
        onPress={searchPress}
        startIcon={
          <SearchIcon
            color={colors.white50}
            className={"!h-4 !w-4"}
            height={16}
            width={16}
          />
        }
        disabled={!selectedClass || !startDate || !endDate}
        textStyle={{ ...FONTS.inter600, fontSize: 12 }}
        className="mt-4 h-12 bg-secondary-500"
        style={{ width: width - 50 }}
      />
    </View>
  );
};

export default FilterBox;
