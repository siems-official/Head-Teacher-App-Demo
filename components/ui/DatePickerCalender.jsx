import {
  useWindowDimensions,
  BackHandler,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";
import { ArrowKeyboardLeftIcon, ArrowKeyboardRightIcon } from "@/services";
import { Calendar } from "react-native-calendars";
import { colors } from "@/services";
import { Fragment, useEffect } from "react";
import { Portal } from "react-native-portalize";

const DatePickerCalender = ({
  selected,
  setSelected,
  calenderOpen,
  setCalenderOpen,
  style,
}) => {
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    // Back press event listener to close the calendar
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (calenderOpen) {
          setCalenderOpen(false);
          return true; // Prevent default back press behavior
        }
        return false; // Default back press behavior
      }
    );

    return () => {
      backHandler.remove(); // Cleanup the event listener
    };
  }, [calenderOpen]);

  return (
    <Fragment>
      {calenderOpen && (
        <>
          <Calendar
            onDayPress={(day) => {
              setSelected(day);
              setCalenderOpen(false);
            }}
            {...(selected?.dateString && {
              current: selected.dateString,
              markedDates: {
                [selected.dateString]: {
                  selected: true,
                  disableTouchEvent: true,
                },
              },
            })}
            theme={{
              backgroundColor: colors.neutral50,
              calendarBackground: colors.neutral50,
            }}
            style={{
              position: "absolute",
              backgroundColor: colors.neutral50,
              right: 0,
              top: 10,
              zIndex: 20,
              width: width - 26,
              paddingVertical: 24,
              paddingHorizontal: 24,
              borderRadius: 12,
              borderColor: colors.neutral300,
              borderWidth: 1,
              elevation: 5,
              ...style,
            }}
            renderArrow={(direction) => (
              <Fragment>
                {direction === "left" ? (
                  <ArrowKeyboardLeftIcon className={"h-6 w-6"} />
                ) : (
                  <ArrowKeyboardRightIcon className={"h-6 w-6"} />
                )}
              </Fragment>
            )}
          />
          <Pressable
            onPress={() => setCalenderOpen(false)}
            className="absolute z-10 top-0 left-0 "
            style={{ minWidth: width, minHeight: height }}
          />
        </>
      )}
    </Fragment>
  );
};

export default DatePickerCalender;
