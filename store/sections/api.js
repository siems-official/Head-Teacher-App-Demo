import { apiSlice } from "../api/slice";
import { setSections } from "./slice";

export const sectionsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSections: builder.query({
      query: ({ institute_id, limit = 99999, page = 1 }) => {
        const params = new URLSearchParams();
        params.append("institute_id", institute_id);
        params.append("limit", limit);
        params.append("page", page);

        return {
          url: `sections/all?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setSections(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetSectionsQuery } = sectionsApi;
