import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examHeads: null,
  allExamTypes: null,
  listFilter: {
    examType: null,
    status: null,
  },
  teacherSpecificExams: null,
  examConfig: null,
  studentsForExamSectionWise: {},
  filteredExamResult: {},
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExamHeads: (state, action) => {
      state.examHeads = action.payload;
    },
    setAllExamTypes: (state, action) => {
      state.allExamTypes = action.payload;
    },
    setListFilterExamType: (state, action) => {
      state.listFilter.examType = action.payload;
    },
    setListFilterStatus: (state, action) => {
      state.listFilter.status = action.payload;
    },
    setTeacherSpecificExams: (state, action) => {
      state.teacherSpecificExams = action.payload;
    },
    setExamConfig: (state, action) => {
      state.examConfig = action.payload;
    },
    setStudentsForExamSectionWise: (state, action) => {
      const { students, class_id, section_id, subject_id, exam_id } =
        action.payload;

      const uniqueKey = `${state.listFilter?.examType}-${class_id}-${section_id}-${subject_id}-${exam_id}`;

      state.studentsForExamSectionWise[uniqueKey] = students;
    },

    updateSubjectWiseMarksImmediate: (state, action) => {
      const { type, value, uniqueKey, studentId } = action.payload;

      const studentList = state.studentsForExamSectionWise?.[uniqueKey];
      if (!studentList) return;

      const index = studentList.findIndex((s) => s._id === studentId);
      if (index === -1) return;

      const student = studentList[index];
      const examResult = { ...(student.examResult || {}) };

      // Just update the field immediately for instant UI feedback
      examResult[type] = Number(value) || 0;

      // Simple total recalculation (fast)
      examResult.total = Object.entries(examResult)
        .filter(([key]) => key !== "total")
        .reduce((sum, [, val]) => sum + (Number(val) || 0), 0);

      // Update state immediately
      state.studentsForExamSectionWise[uniqueKey][index] = {
        ...student,
        examResult,
        _pendingCalculation: true, // Mark for batch processing
      };
    },

    // Batch process heavy calculations
    processPendingCalculations: (state, action) => {
      const {
        uniqueKey,
        exam_head_id,
        mark_distribution_heads,
        conversion_factor,
        usedHeads,
      } = action.payload;

      const studentList = state.studentsForExamSectionWise?.[uniqueKey];
      if (!studentList) return;

      // Process only students with pending calculations
      studentList.forEach((student, index) => {
        if (!student._pendingCalculation) return;

        const updatedMarks = [...(student.obtain_head_wise_marks || [])];

        // Process all exam results for this student
        Object.entries(student.examResult || {}).forEach(([key, value]) => {
          if (key === "total") return;

          const headId = usedHeads?.find(
            (h) =>
              h.head_name
                ?.toLowerCase()
                .replace(/\./g, "")
                .replace(/\s+/g, "_") === key
          )?._id;

          if (!headId) return;

          const headIndex = updatedMarks.findIndex(
            (mark) => mark.exam_head_id === headId
          );

          const newTotal = Number(value) || 0;
          const newConverted = Math.ceil(newTotal * conversion_factor || 0);

          const mark_distribution_head = mark_distribution_heads?.find(
            (mark_head) => mark_head?.exam_head_id === headId
          );

          const isPassed = value >= (mark_distribution_head?.pass_mark || 0);

          const newMarkObject = {
            exam_head_id: headId,
            obtain_total_mark: Math.ceil(newTotal),
            obtain_converted_total_mark: newConverted,
            is_passed: isPassed,
          };

          if (headIndex !== -1) {
            updatedMarks[headIndex] = newMarkObject;
          } else {
            updatedMarks.push(newMarkObject);
          }
        });

        // Update the student with calculated data
        state.studentsForExamSectionWise[uniqueKey][index] = {
          ...student,
          obtain_head_wise_marks: updatedMarks,
          _pendingCalculation: false,
        };
      });
    },

    setFilteredExamResult: (state, action) => {
      const { class_id, section_id, subject_id, exam_id, data } =
        action.payload;

      const uniqueKey = `${state.listFilter?.examType}-${class_id}-${section_id}-${subject_id}-${exam_id}`;

      state.filteredExamResult[uniqueKey] = data;

      const usedHeadIds = new Set();
      if (data?.length) {
        data?.forEach((result) => {
          result?.obtain_head_wise_marks?.forEach((head) => {
            if (head?.exam_head_id) {
              usedHeadIds.add(head.exam_head_id);
            }
          });
        });
      }

      // Checking for applicable heads based on data. Taking only the available heads
      const usedHeads = Array.isArray(state.examHeads)
        ? state.examHeads?.filter((head) => usedHeadIds.has(head._id))
        : [];

      // Creating dynamic keys
      const dynamicKeys = usedHeads.map((h) =>
        (h.head_name ?? "")
          .toLowerCase()
          .replace(/\./g, "")
          .replace(/\s+/g, "_")
      );

      // Creating head id to key map
      const headIdToKeyMap = {};
      usedHeads.forEach((head, i) => {
        headIdToKeyMap[head._id] = dynamicKeys[i];
      });

      // Creating student id to mark
      const studentIdToMark = {};
      data?.forEach((entry) => {
        studentIdToMark[entry.student_id?._id] = entry;
      });

      // Updating the state with filtered data and marks
      state.studentsForExamSectionWise[uniqueKey] =
        state.studentsForExamSectionWise[uniqueKey]?.map((student) => {
          const markData = studentIdToMark[student._id];

          if (!markData) return student;

          const examResult = {};

          // Initializing dynamic keys to 0
          dynamicKeys.forEach((key) => {
            examResult[key] = 0;
          });

          for (const headMark of markData.obtain_head_wise_marks) {
            const key = headIdToKeyMap[headMark.exam_head_id];
            if (key) {
              examResult[key] = headMark.obtain_total_mark ?? 0;
            }
          }

          examResult.total = markData.obtain_total_mark ?? 0;

          return {
            ...student,
            examResult,
          };
        });
    },
  },
});

export const {
  setExamHeads,
  setAllExamTypes,
  setListFilterExamType,
  setListFilterStatus,
  setTeacherSpecificExams,
  setExamConfig,
  setStudentsForExamSectionWise,
  updateSubjectWiseMarks,
  setFilteredExamResult,
  updateSubjectWiseMarksImmediate,
  processPendingCalculations,
} = examSlice.actions;
export default examSlice.reducer;
