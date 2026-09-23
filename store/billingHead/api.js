import { apiSlice } from "../api/slice";
import { setBillingHeadList } from "./slice";

const billingHeadApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBillingHeadDetails: builder.query({
      query: ({ institute_id }) => {
        return {
          url: `billing-heads/all?institute_id=${institute_id}`,
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

export const { useGetBillingHeadDetailsQuery } = billingHeadApi;
