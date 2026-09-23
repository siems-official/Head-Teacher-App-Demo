import {
  getClassBasedInvoiceList,
  getClassSectionBasedInvoiceList,
  getClassSectionStudentBasedInvoiceList,
} from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedInvoiceYear: "",
  invoiceList: null,
  // PAID
  paidCollectionClassWise: null,
  paidCollectionClassSectionWise: null,
  paidCollectionClassSectionStudentWise: null,
  // PENDING
  pendingCollectionClassWise: null,
  pendingCollectionClassSectionWise: null,
  pendingCollectionClassSectionStudentWise: null,
  // STUDENT SPECIFIC
  studentSpecificPaidInvoices: {},
  studentSpecificPendingInvoices: {},
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoiceList: (state, action) => {
      state.invoiceList = action.payload;
    },
    setInvoiceYear: (state, action) => {
      state.selectedInvoiceYear = action.payload;
    },
    setPaidCollection: (state, action) => {
      // UPDATING STATE GETTING PAID COLLECTION IN ARRAY
      state.paidCollectionClassWise = getClassBasedInvoiceList(action.payload);
      state.paidCollectionClassSectionWise = getClassSectionBasedInvoiceList(
        action.payload
      );
      state.paidCollectionClassSectionStudentWise =
        getClassSectionStudentBasedInvoiceList(action.payload);
    },
    setPendingCollection: (state, action) => {
      // UPDATING STATE GETTING PENDING COLLECTION IN ARRAY
      state.pendingCollectionClassWise = getClassBasedInvoiceList(
        action.payload
      );
      state.pendingCollectionClassSectionWise = getClassSectionBasedInvoiceList(
        action.payload
      );
      state.pendingCollectionClassSectionStudentWise =
        getClassSectionStudentBasedInvoiceList(action.payload);
    },
    setStudentSpecificDetailedInvoices: (state, action) => {
      const { student_username, data } = action.payload;

      state.studentSpecificPaidInvoices[student_username] = data
        ?.filter((item) => item?.status === "Paid")
        ?.map((item) => ({
          _id: item?._id,
          billingmonth: item?.billing_month,
          invoiceid: item?.invoice_number,
          amount: item?.total_amount,
        }));

      state.studentSpecificPendingInvoices[student_username] = data
        ?.filter((item) => item?.status === "Pending")
        ?.map((item) => ({
          _id: item?._id,
          billingmonth: item?.billing_month,
          invoiceid: item?.invoice_number,
          amount: item?.total_amount,
        }));
    },
  },
});

export const {
  setInvoiceList,
  setInvoiceYear,
  setPaidCollection,
  setPendingCollection,
  setStudentSpecificDetailedInvoices,
  setStudentSpecificPendingInvoices,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
