import { setCategoriesData } from "./slice";
import { apiSlice } from "../api/slice";

const categoriesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ page = 1, limit = 999, institute_id }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (institute_id) params.append("institute_id", institute_id);

        return {
          url: `local-categories/all?page=${page}&limit=${limit}&institute_id=${institute_id}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          const categories = apiData.data;
          dispatch(setCategoriesData(categories));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
