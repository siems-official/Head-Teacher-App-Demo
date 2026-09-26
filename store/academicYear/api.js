import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../api/slice";
import { setInvoiceYear } from "../invoices/slice";
import { setAcademicYearList, setSelectedYear } from "./slice";

export const academicYearApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAcademicYears: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const { getState, dispatch } = _queryApi;
        const { user } = getState()?.auth || {};
        const baseUrl = process.env.EXPO_BASE_URL;
        const token = user?.token;

        try {
          const instituteDetailsFetchUrl = `${baseUrl}institutes/institute-details/${user?.teacher?.institute_id}`;

          const fetchOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const instituteDetailsResponse = await fetch(
            instituteDetailsFetchUrl,
            fetchOptions
          );
          const instituteDetails = await instituteDetailsResponse.json();
          if (!instituteDetails.success) {
            return {
              error: instituteDetails,
            };
          }

          const instituteBasedAcademicYearsFetchUrl = `${baseUrl}global-academic-years/filtered?institute_type=${instituteDetails?.data?.institute_type}`;
          const instituteBasedAcademicYearsResponse = await fetch(
            instituteBasedAcademicYearsFetchUrl,
            fetchOptions
          );
          const instituteBasedAcademicYears =
            await instituteBasedAcademicYearsResponse.json();
          dispatch(setAcademicYearList(instituteBasedAcademicYears.data));

          // set selected year from async storage if available
          const selectedYearJSON = await AsyncStorage.getItem("selectedYear");
          const selectedYear = JSON.parse(selectedYearJSON);
          const { academicYearList } = getState().academicYear;
          if (selectedYear) {
            dispatch(setSelectedYear(selectedYear));
          } else {
            dispatch(setSelectedYear(academicYearList?.[0]));
            dispatch(setInvoiceYear(academicYearList?.[0]));
          }

          return {
            data: {},
          };
        } catch (error) {
          console.error("error", error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAcademicYearsQuery } = academicYearApi;
