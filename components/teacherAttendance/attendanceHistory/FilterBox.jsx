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

const FilterBox = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const { width } = useWindowDimensions();

  const [startCalenderOpen, setStartCalenderOpen] = useState();
  const [endCalenderOpen, setEndCalenderOpen] = useState();

  return (
    <View className="px-3 py-4 mx-4 mt-2 rounded-xl bg-white-75 flex flex-col">
      <View className="relative w-full flex flex-row items-center gap-2 mt-2">
        <View className="flex flex-col flex-1 min-h-[66px]">
          <Text
            className="!leading-[1.2] text-black-700 mb-[6px]"
            style={{ ...FONTS.inter600, fontSize: 12 }}
          >
            Select Date
          </Text>
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
        </View>

        <View className="flex flex-col flex-1 min-h-[66px]">
          <Text
            className="!leading-[1.2] text-black-700 mb-[6px]"
            style={{ ...FONTS.inter600, fontSize: 12 }}
          >
            Select Date
          </Text>
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
        </View>

        <DatePickerCalender
          selected={startDate}
          setSelected={setStartDate}
          calenderOpen={startCalenderOpen}
          setCalenderOpen={setStartCalenderOpen}
          style={{ top: 38, right: -12 }}
        />
        <DatePickerCalender
          selected={endDate}
          setSelected={setEndDate}
          calenderOpen={endCalenderOpen}
          setCalenderOpen={setEndCalenderOpen}
          style={{ top: 38, right: -12 }}
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
        disabled={!startDate || !endDate}
        textStyle={{ ...FONTS.inter600, fontSize: 12 }}
        className="mt-4 h-12 bg-secondary-500"
        style={{ width: width - 50 }}
      />
    </View>
  );
};

export default FilterBox;
