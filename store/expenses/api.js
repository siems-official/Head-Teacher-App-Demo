import { apiSlice } from "../api/slice";
import {
  resetAllDataStates,
  setCategoryBasedExpensesList,
  setDateWiseCategoryBasedExpenseList,
  setDateWiseExpenseList,
  setExpensesList,
  setExpenseStats,
  setNewExpensesStat,
} from "./slice";

const expensesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // getExpenses: builder.query({
    //   query: ({ page = 1, limit = 999999, institute_id }) => {
    //     const params = new URLSearchParams();
    //     params.append("page", page);
    //     params.append("limit", limit);
    //     if (institute_id) params.append("institute_id", institute_id);

    //     return { url: `expenses/all?${params.toString()}`, method: "GET" };
    //   },
    //   async onQueryStarted(_args, { queryFulfilled, dispatch }) {
    //     try {
    //       const { data: apiData } = await queryFulfilled;
    //       dispatch(setExpensesList(apiData.data));
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   },
    // }),

    // GET EXPENSES BY INSTITUTE ID
    getExpenseStats: builder.query({
      query: ({ institute_id }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);

        return { url: `expenses/stats?${params.toString()}`, method: "GET" };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setExpenseStats(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // GET FILTERED EXPENSES
    getFilteredExpenses: builder.query({
      query: ({
        page = 1,
        limit = 999999,
        institute_id,
        expense_category_id,
        expense_date,
        expense_year,
        start_date,
        end_date,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (institute_id) params.append("institute_id", institute_id);
        if (expense_category_id)
          params.append("expense_category_id", expense_category_id);
        if (expense_date) params.append("expense_date", expense_date);
        if (expense_year) params.append("expense_year", expense_year);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        return { url: `expenses/filtered?${params.toString()}`, method: "GET" };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const {
            expense_category_id,
            expense_date,
            expense_year,
            start_date,
            end_date,
          } = _args;
          const { data: apiData } = await queryFulfilled;

          // BOTH EXPENSE CATEGORY AND DATE EXISTS
          if (expense_category_id && start_date && end_date) {
            dispatch(
              setDateWiseCategoryBasedExpenseList({
                category_id: expense_category_id,
                data: apiData.data,
              })
            );
          }
          // ONLY EXPENSE CATEGORY EXISTS
          else if (expense_category_id) {
            dispatch(
              setCategoryBasedExpensesList({
                category_id: expense_category_id,
                data: apiData.data,
              })
            );
          }
          // BOTH START DATE AND END DATE EXISTS
          else if (start_date && end_date) {
            dispatch(setDateWiseExpenseList(apiData.data));
          }
          // EXPENSES YEAR EXISTS
          else if (expense_year) {
            dispatch(setExpensesList(apiData.data));
          }
          // ONLY EXPENSE DATE EXISTS
          else if (expense_date) {
            dispatch(setNewExpensesStat(apiData.data));
          }
        } catch (err) {
          console.error(err);
          dispatch(resetAllDataStates());
        }
      },
    }),
  }),
});

export const {
  // useGetExpensesQuery,
  useGetExpenseStatsQuery,
  useGetFilteredExpensesQuery,
  useLazyGetFilteredExpensesQuery,
} = expensesApi;
