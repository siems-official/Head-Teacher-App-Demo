import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/slice";
import authReducer, { logout } from "./auth/slice";
import instituteReducer from "./institute/slice";
import teachersReducer from "./teachers/slice";
import leaveManagementReducer from "./leaveManagement/slice";
import categoriesReducer from "./categories/slice";
import studentAttendanceReducer from "./attendance/slice";
import classesReducer from "./classes/slice";
import sectionsReducer from "./sections/slice";
import billingHeadReducer from "./billingHead/slice";
import expenseReducer from "./expenses/slice";
import academicYearReducer from "./academicYear/slice";
import invoiceReducer from "./invoices/slice";
import studentReducer from "./students/slice";
import enrollmentReducer from "./enrollment/slice";
import commonReducer from "./common/slice";
import routinesReducer from "./routines/slice";
import daysReducer from "./days/slice";
import attendanceManagementReducer from "./attendanceManagement/slice";
import examReducer from "./exam/slice";

// 1️⃣ combining all the reducers
const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  academicYear: academicYearReducer,
  attendanceManagement: attendanceManagementReducer,
  billingHead: billingHeadReducer,
  categories: categoriesReducer,
  classes: classesReducer,
  common: commonReducer,
  days: daysReducer,
  expenses: expenseReducer,
  enrollment: enrollmentReducer,
  exam: examReducer,
  institute: instituteReducer,
  invoice: invoiceReducer,
  leaveManagement: leaveManagementReducer,
  routines: routinesReducer,
  sections: sectionsReducer,
  student: studentReducer,
  studentAttendance: studentAttendanceReducer,
  teachers: teachersReducer,
});

// 2️⃣ resetting state if logout is dispatched
const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined; // 🧼 wiping all
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false, // Disables serializable check for redux-persist(if used) actions
    }).concat(apiSlice.middleware),
});

export default store;
