import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/slice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.user?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const response = result.error?.data;

    // Check for specific error messages indicating an invalid token
    if (
      response?.message === "Invalid token" ||
      response?.message === "Unauthorized" ||
      response?.message === "Unauthorized access" ||
      response?.message === "Forbidden"
    ) {
      // Dispatch the logout action if the token is invalid
      api.dispatch(logout());
    }

    return result;
  },
  tagTypes: ["enrollList", "attendanceExistance", "sectionStudents"],
  endpoints: (builder) => ({}),
});
