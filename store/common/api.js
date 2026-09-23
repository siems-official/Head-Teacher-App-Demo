import { apiSlice } from "../api/slice";
import { setSelectedYear, setYears } from "./slice";

const commonApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({}),
});

export const {} = commonApi;
