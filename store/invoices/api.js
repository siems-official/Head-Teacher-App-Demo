import {
  setInvoiceList,
  setPaidCollection,
  setPendingCollection,
  setStudentSpecificDetailedInvoices,
} from "./slice";
import { apiSlice } from "../api/slice";
import { setBillingHeadList } from "../billingHead/slice";

const invoicesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET FILTERED INVOICES
    getFilteredInvoices: builder.query({
      query: ({ institute_id, full_billing_month, status, academic_year }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        if (full_billing_month)
          params.append("full_billing_month", full_billing_month);
        if (status) params.append("status", status);
        if (academic_year) params.append("academic_year", academic_year);

        return {
          url: `invoices/filtered-with-params?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { status } = _args;
          const { data: apiData } = await queryFulfilled;
          dispatch(setInvoiceList(apiData.data));

          if (status == "Paid") dispatch(setPaidCollection(apiData.data));
          if (status == "Pending") dispatch(setPendingCollection(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // GET FILTERED INVOICES BY STUDENT USERNAME
    getFilteredInvoicesByStudentUsername: builder.query({
      query: ({ institute_id, student_username }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        if (student_username)
          params.append("student_username", student_username);

        return {
          url: `invoices/find-by-student-username?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { student_username } = _args;
          const { data: apiData } = await queryFulfilled;
          dispatch(
            setStudentSpecificDetailedInvoices({
              student_username,
              data: apiData.data,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // GET BILLING HEADS
    getBillingHeads: builder.query({
      query: ({ institute_id, start_date_of_payment, end_date_of_payment }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        if (start_date_of_payment)
          params.append("start_date_of_payment", start_date_of_payment);
        if (end_date_of_payment)
          params.append("end_date_of_payment", end_date_of_payment);

        return {
          url: `invoices/filtered-with-params?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setBillingHeadList(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetFilteredInvoicesQuery,
  useGetFilteredInvoicesByStudentUsernameQuery,
  useGetBillingHeadsQuery,
} = invoicesApi;
