import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../api/slice";
import { setCredentials } from "./slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        return { url: "auth/signin", method: "POST", body: formData };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          const user = apiData.data;
          if (user?.teacher?.role === "head_teacher") {
            await AsyncStorage.setItem("auth", JSON.stringify(user));
            dispatch(setCredentials(user));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
