import Toast from "react-native-simple-toast";

// COMMON

export const safeRefetch = async ({ refetch, isUninitialized }) => {
  if (!isUninitialized) {
    try {
      await refetch();
    } catch (err) {
      if (__DEV__) console.warn("Safe refetch failed: ", err);
      Toast.show("Refresh suspended", Toast.BOTTOM, Toast.LONG);
    }
  }
};

// INVOICE MANAGEMENT

// CLASS BASED COLLECTION
export const getClassBasedInvoiceList = (payload) => {
  const classMap = {};

  // POPULATING THE CLASS MAP
  payload?.forEach((item) => {
    const className = item?.student_id?.current_class?.local_class_name;
    if (!className) return;

    const totalAmount = item?.charges_summary?.reduce((sum, charge) => {
      return sum + (charge?.amount || 0);
    }, 0);

    if (!classMap[className]) {
      classMap[className] = {
        _id: item?._id,
        class: className,
        amount: 0,
      };
    }

    classMap[className].amount += totalAmount;
  });

  return Object.values(classMap);
};

// CLASS-SECTION BASED COLLECTION
export const getClassSectionBasedInvoiceList = (payload) => {
  const classSectionMap = {};

  // POPULATING THE CLASS-SECTION MAP
  payload?.forEach((item) => {
    const className = item?.student_id?.current_class?.local_class_name;
    const sectionName = item?.student_id?.current_section?.section_name;

    if (!className || !sectionName) return;

    const key = `${className}-${sectionName}`;

    const totalAmount = item?.charges_summary?.reduce((sum, charge) => {
      return sum + (charge?.amount || 0);
    }, 0);

    if (!classSectionMap[key]) {
      classSectionMap[key] = {
        _id: item?._id,
        class: className,
        section: sectionName,
        amount: 0,
      };
    }

    classSectionMap[key].amount += totalAmount;
  });

  return Object.values(classSectionMap);
};

export const getClassSectionStudentBasedInvoiceList = (payload) => {
  const classSectionStudentMap = {};

  // POPULATING THE CLASS-SECTION-STUDENT MAP
  payload?.forEach((item) => {
    const className = item?.student_id?.current_class?.local_class_name;
    const sectionName = item?.student_id?.current_section?.section_name;
    const studentId = item?.student_id?._id;
    const studentName = item?.student_id?.name_english;

    if (!className || !sectionName || !studentId) return;

    const key = `${studentId}`;

    const totalAmount = item?.charges_summary?.reduce((sum, charge) => {
      return sum + (charge?.amount || 0);
    }, 0);

    if (!classSectionStudentMap[key]) {
      classSectionStudentMap[key] = {
        _id: item?._id,
        class: className,
        section: sectionName,
        student_id: studentId,
        student_roll: item?.student_id?.current_roll_number,
        student_name: studentName,
        mobile_number: item?.student_id?.mobile_number,
        student_username: item?.student_username,
        image: item?.student_id?.image,
        amount: 0,
      };
    }

    classSectionStudentMap[key].amount += totalAmount;
  });

  return Object.values(classSectionStudentMap);
};

export const getResultConversionFactor = (examConfig, subjectId) => {
  const matched = examConfig?.mark_distribution?.find(
    (el) => el?.subject_id === subjectId
  );

  if (!matched) return undefined;

  const { converted_total_mark, total_mark } = matched;

  if (!total_mark || total_mark === 0) return undefined; // prevent division by zero

  return converted_total_mark / total_mark || 1;
};
