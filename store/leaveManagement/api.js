import { enumList } from "@/services";
import { apiSlice } from "../api/slice";
import {
  removeStudentApplicationFromPendingList,
  removeTeacherStuffApplicationFromPendingList,
  setApprovedStudentApplications,
  setApprovedTeacherStuffApplications,
  setPendingStudentApplications,
  setPendingTeacherStuffApplications,
  setRejectedStudentApplications,
  setRejectedTeacherStuffApplications,
} from "./slice";

const leaveManagementApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET FILTERED LEAVES
    getFilteredLeaves: builder.query({
      query: ({
        institute_id,
        status,
        type,
        academic_year,
        username,
        date,
      }) => {
        const params = new URLSearchParams();
        if (institute_id) params.set("institute_id", institute_id);
        if (status) params.set("status", status);
        if (type) params.set("type", type);
        if (academic_year) params.set("academic_year", academic_year);
        if (username) params.set("username", username);
        if (date) params.set("date", date);

        return {
          url: `leave-managements/filtered?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { status, type } = _args;
          const { data: apiData } = await queryFulfilled;
          const leaves = apiData.data;

          if (type === enumList.userType.TEACHER) {
            if (status === enumList.applicationStatus.PENDING) {
              dispatch(setPendingTeacherStuffApplications(leaves));
            } else if (status === enumList.applicationStatus.APPROVED) {
              dispatch(setApprovedTeacherStuffApplications(leaves));
            } else if (status === enumList.applicationStatus.REJECTED) {
              dispatch(setRejectedTeacherStuffApplications(leaves));
            }
          } else if (type === enumList.userType.STUDENT) {
            if (status === enumList.applicationStatus.PENDING) {
              dispatch(setPendingStudentApplications(leaves));
            } else if (status === enumList.applicationStatus.APPROVED) {
              dispatch(setApprovedStudentApplications(leaves));
            } else if (status === enumList.applicationStatus.REJECTED) {
              dispatch(setRejectedStudentApplications(leaves));
            }
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // UPDATE LEAVE STATUS
    updateLeaveStatus: builder.mutation({
      query: ({ institute_id, leave_id, type, data }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        if (leave_id) params.append("leave_id", leave_id);

        const fromData = new FormData();
        fromData.append("data", JSON.stringify(data));

        return {
          url: `leave-managements/update?${params.toString()}`,
          method: "PATCH",
          body: fromData,
        };
      },

      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { leave_id, type } = _args;

          if (type === "student") {
            dispatch(removeStudentApplicationFromPendingList({ id: leave_id }));
          } else if (type === "teacher") {
            dispatch(
              removeTeacherStuffApplicationFromPendingList({ id: leave_id })
            );
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetFilteredLeavesQuery,
  useLazyGetFilteredLeavesQuery,
  useUpdateLeaveStatusMutation,
} = leaveManagementApi;
