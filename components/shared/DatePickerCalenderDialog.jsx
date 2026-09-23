import { useWindowDimensions, BackHandler } from "react-native";
import { ArrowKeyboardLeftIcon, ArrowKeyboardRightIcon } from "@/services";
import { Calendar } from "react-native-calendars";
import { colors } from "@/services";
import { Fragment, useEffect } from "react";
import Modal from "react-native-modal";

const DatePickerCalenderDialog = ({
  selected,
  setSelected,
  calenderOpen,
  setCalenderOpen,
  style,
  calenderRight,
  swippable = true,
}) => {
  const { width } = useWindowDimensions();

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
    <Modal
      isVisible={calenderOpen}
      onSwipeComplete={() => swippable && setCalenderOpen(false)}
      onBackdropPress={() => setCalenderOpen(false)}
      onBackButtonPress={() => setCalenderOpen(false)}
      swipeDirection={swippable ? "right" : undefined}
      useNativeDriver={true}
    >
      {calenderOpen && (
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          theme={{
            backgroundColor: colors.neutral50,
            calendarBackground: colors.neutral50,
          }}
          style={{
            position: "absolute",
            backgroundColor: colors.neutral50,
            right: calenderRight || 0,
            top: 10,
            zIndex: 10,
            width: width - 24,
            paddingVertical: 24,
            paddingHorizontal: 24,
            borderRadius: 12,
            borderColor: colors.neutral300,
            borderWidth: 1,
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
      )}
    </Modal>
  );
};

export default DatePickerCalenderDialog;
