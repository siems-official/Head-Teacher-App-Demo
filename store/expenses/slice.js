import { formatTimestampToDate, getCalendarFormattedDate } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateWiseExpenseStartDate: getCalendarFormattedDate(new Date()),
  dateWiseExpenseEndDate: getCalendarFormattedDate(new Date()),
  selectedExpensesYear: "",
  expenseStats: {},
  expensesList: [],
  categoryBasedExpensesList: {},
  dateWiseExpenseList: [],
  dateWiseCategoryBasedExpenseList: {},

  // NEW EPENSES STAT
  newExpensesStat: {},
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpensesYear: (state, action) => {
      state.selectedExpensesYear = action.payload;
    },
    setDateWiseExpenseStartDate: (state, action) => {
      state.dateWiseExpenseStartDate = action.payload;
    },
    setDateWiseExpenseEndDate: (state, action) => {
      state.dateWiseExpenseEndDate = action.payload;
    },
    setExpensesList: (state, action) => {
      state.expensesList = action.payload
        ?.filter((item) => item?.expense_category_id?._id && item)
        ?.map((item) => ({
          _id: item?._id,
          category: item?.expense_category_id?.expense_category_name,
          category_id: item?.expense_category_id?._id,
          amount: item?.expense_amount,
        }));
    },
    setCategoryBasedExpensesList: (state, action) => {
      const { category_id, data } = action.payload;

      const formattedData = data?.map((item) => ({
        _id: item?._id,
        date: formatTimestampToDate(item?.expense_date),
        timestamp: item?.expense_date,
        name: item?.expense_note,
        amount: item?.expense_amount,
      }));
      state.categoryBasedExpensesList[category_id] = formattedData;
    },
    setDateWiseExpenseList: (state, action) => {
      state.dateWiseExpenseList = action.payload
        ?.filter((item) => item?.expense_category_id?._id && item)
        ?.map((item) => ({
          _id: item?._id,
          category: item?.expense_category_id?.expense_category_name,
          category_id: item?.expense_category_id?._id,
          amount: item?.expense_amount,
        }));
    },
    setDateWiseCategoryBasedExpenseList: (state, action) => {
      const { category_id, data } = action.payload;

      const formattedData = data?.map((item) => ({
        _id: item?._id,
        date: formatTimestampToDate(item?.expense_date),
        timestamp: item?.expense_date,
        name: item?.expense_note,
        amount: item?.expense_amount,
      }));
      state.dateWiseCategoryBasedExpenseList[category_id] = formattedData;
    },
    resetAllDataStates: (state) => {
      state.expensesList = [];
      state.categoryBasedExpensesList = {};
      state.dateWiseExpenseList = [];
      state.dateWiseCategoryBasedExpenseList = {};
    },
    setExpenseStats: (state, action) => {
      state.expenseStats = action.payload;
    },

    // NEW EXPENSES STAT
    setNewExpensesStat: (state, action) => {
      const categoryMap = new Map();

      action.payload?.forEach((expense) => {
        const category = expense?.expense_category_id;
        const amount = expense?.expense_amount;
        const categoryId = category?._id;

        if (categoryMap.has(categoryId)) {
          const currentAmount = categoryMap.get(categoryId).amount;
          categoryMap.get(categoryId).amount = currentAmount + amount;
        } else {
          categoryMap.set(categoryId, {
            _id: categoryId,
            category: category?.expense_category_name?.trim(),
            amount: amount,
          });
        }
      });

      // Convert map to array (if needed for UI)
      state.newExpensesStat = Array.from(categoryMap.values());
    },
  },
});

export const {
  setExpensesList,
  setDateWiseExpenseStartDate,
  setDateWiseExpenseEndDate,
  setExpensesYear,
  setCategoryBasedExpensesList,
  setDateWiseExpenseList,
  setDateWiseCategoryBasedExpenseList,
  resetAllDataStates,
  setExpenseStats,

  // NEW EXPENSES STAT
  setNewExpensesStat,
} = expensesSlice.actions;
export default expensesSlice.reducer;
