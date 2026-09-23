import { apiSlice } from "../api/slice";
import { setInstituteDetails } from "./slice";

const instituteApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getInstituteDetails: builder.query({
      query: ({ institute_id }) => {
        return {
          url: `institutes/institute-details/${institute_id}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setInstituteDetails(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetInstituteDetailsQuery } = instituteApi;
