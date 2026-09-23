import { View, Text, Pressable } from "react-native";
import Accordion from "../ui/Accordion";
import { useState } from "react";
import { cn, FONTS } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedYear } from "@/store/academicYear/slice";

const YearSelectionAccordion = () => {
  const dispatch = useDispatch();

  const { academicYearList, selectedYear } = useSelector(
    (state) => state.academicYear
  );

  // For accordion management
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      titleStyle={{ ...FONTS.inter600 }}
      visibleContentClassName="!pt-1"
      title={selectedYear?.global_academic_year}
      className="mt-3 mb-4 bg-white-50"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <View className={cn("flex flex-col items-stretch gap-3")}>
        {academicYearList?.map((yearItem, index) => (
          <Pressable
            key={`yearItem_${index}`}
            onPress={() => {
              dispatch(setSelectedYear(yearItem));
              setExpanded((prev) => !prev);
            }}
            className={cn(
              "flex flex-row items-center justify-between gap-4 p-2 rounded-lg",
              selectedYear?.global_academic_year ===
                yearItem?.global_academic_year
                ? "bg-main-100"
                : "bg-transparent"
            )}
          >
            <Text
              className={cn(
                "text-sm",
                selectedYear?.global_academic_year ===
                  yearItem?.global_academic_year
                  ? "text-white"
                  : "text-main-500"
              )}
              style={{ ...FONTS.inter500 }}
            >
              {yearItem?.global_academic_year}
            </Text>
          </Pressable>
        ))}
      </View>
    </Accordion>
  );
};

export default YearSelectionAccordion;
