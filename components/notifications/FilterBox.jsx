import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import Button from "@/components/ui/Button";
import DatePickerCalender from "@/components/ui/DatePickerCalender";
import { CalenderIcon, cn, colors, FONTS, SearchIcon } from "@/services";

const FilterBox = ({
  selectedDate,
  setSelectedDate,
  inputTextValue,
  onInputTextChange,
}) => {
  const { width } = useWindowDimensions();

  const [calenderOpen, setCalenderOpen] = useState();

  return (
    <View className="px-3 py-4 mx-4 mt-2 rounded-xl bg-white-75 flex flex-col">
      <View className="relative w-full flex flex-row items-center gap-2 mt-2">
        <View className="flex-1 flex flex-col gap-[6px]">
          <Text
            className="!leading-[1.2] text-black-700"
            style={{ ...FONTS.inter600, fontSize: 12 }}
          >
            Notification name
          </Text>
          <TextInput
            className="border border-neutral-300 rounded-lg py-3 px-4 flex flex-row items-center placeholder:text-white-400 justify-between h-12 shrink-0 bg-white-50"
            placeholder={"Select"}
            onChangeText={onInputTextChange}
            value={inputTextValue}
            style={{
              backgroundColor: colors.neutral50,
              ...FONTS.inter400,
              fontSize: 12,
            }}
          />
        </View>

        <View className="flex-1 flex flex-col gap-[6px]">
          <Text
            className="!leading-[1.2] text-black-700"
            style={{ ...FONTS.inter600, fontSize: 12 }}
          >
            Date
          </Text>
          <TouchableOpacity
            className="flex-1 border border-neutral-300 rounded-lg py-3 px-4 flex flex-row items-center justify-between h-12 shrink-0 bg-white-50"
            onPress={() => {
              setCalenderOpen(!calenderOpen);
            }}
          >
            <Text
              className={cn(
                "text-sm !leading-[1.4]",
                selectedDate ? "text-black-700" : "text-white-400"
              )}
              style={{ ...FONTS.inter400 }}
            >
              {selectedDate ? selectedDate?.dateString : "End Date"}
            </Text>
            <CalenderIcon />
          </TouchableOpacity>
        </View>

        <DatePickerCalender
          selected={selectedDate}
          setSelected={setSelectedDate}
          calenderOpen={calenderOpen}
          setCalenderOpen={setCalenderOpen}
          style={{ top: 36, right: -12 }}
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
        disabled={!inputTextValue}
        textStyle={{ ...FONTS.inter600, fontSize: 12 }}
        className="mt-4 h-12 bg-secondary-500"
        style={{ width: width - 50 }}
      />
    </View>
  );
};

export default FilterBox;
