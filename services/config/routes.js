export const routes = {
  home: {
    name: "Home",
    path: "/",
  },
  login: {
    name: "Login",
    path: "/login",
  },
  attendanceManagement: {
    name: "Attendance",
    path: "/attendance-management",
  },
  attendanceList: {
    name: "Attendance List",
    path: "/attendance-management/list",
  },
  attendanceGrid: {
    name: "Attendance Grid",
    path: "attendance-management/grid",
  },
  enrollment: {
    name: "Enrollment",
    path: "/enrollment",
  },
  enrollmentList: {
    name: "Enrollment List",
    path: "/enrollment/list",
  },
  studentAttendance: {
    name: "Student Attendance",
    path: "/student-attendance",
    subRoutes: {
      present: {
        name: "Present",
        path: "/student-attendance/present",
      },
      absent: {
        name: "Absent",
        path: "/student-attendance/absent",
      },
      classAttendance: {
        name: "Class Attendance",
        path: "/student-attendance/class-attendance",
      },
      absentHistory: {
        name: "Absent History",
        path: "/student-attendance/absent-history",
      },
      absentAlert: {
        name: "Absent Alert",
        path: "/student-attendance/absent-alert",
      },
      classSpecificAttendance: {
        name: "Class Specific Attendance",
        path: "/student-attendance/class-specific-attendance",
      },
      sectionSpecificAttendance: {
        name: "Section Specific Attendance",
        path: "/student-attendance/section-specific-attendance",
      },
    },
  },
  teacherAttendance: {
    name: "Teacher Attendance",
    path: "/teacher-attendance",
    subRoutes: {
      todaysAttendance: {
        name: "Today's Attendance",
        path: "/teacher-attendance/todays-attendance",
      },
      attendanceHistory: {
        name: "Attendance History",
        path: "/teacher-attendance/attendance-history",
      },
    },
  },
  accounts: {
    name: "Accounts",
    path: "/accounts",
    subRoutes: {
      collectionHeads: {
        name: "Collection Head",
        path: "/accounts/collection-heads",
      },
      expensesHeads: {
        name: "Expenses Head",
        path: "/accounts/expenses-heads",
      },
      collections: {
        name: "Collections",
        path: "/accounts/collections",
      },
      expenses: {
        name: "Expenses",
        path: "/accounts/expenses-list",
        subRoutes: {
          category: {
            name: "Category",
            path: "/accounts/expenses-list/category",
          },
          dateWise: {
            name: "Date Wise",
            path: "/accounts/expenses-list/date-wise",
            subRoutes: {
              category: {
                name: "Category",
                path: "/accounts/expenses-list/date-wise/category",
              },
            },
          },
        },
      },
      dueListClass: {
        name: "Due List",
        path: "/accounts/due-list-class",
      },
      dueListSection: {
        name: "Due List",
        path: "/accounts/due-list-section",
      },
      dueListStudent: {
        name: "Due List",
        path: "/accounts/due-list-student",
        subRoutes: {
          details: {
            name: "Details",
            path: "/accounts/due-list-student/details",
          },
        },
      },
      paidListClass: {
        name: "Paid List",
        path: "/accounts/paid-list-class",
      },
      paidListSection: {
        name: "Paid List",
        path: "/accounts/paid-list-section",
      },
      paidListStudent: {
        name: "Paid List",
        path: "/accounts/paid-list-student",
        subRoutes: {
          details: {
            name: "Details",
            path: "/accounts/paid-list-student/details",
          },
        },
      },
    },
  },
  examResults: {
    name: "Exam Results",
    path: "/exam",
    subRoutes: {
      examList: {
        name: "Exam List",
        path: "exam/exam-list",
        subRoutes: {
          examNumberSubmission: {
            name: "Number Submission",
            path: "exam/exam-list/number-submission",
          },
        },
      },

      classTest: {
        name: "Class Test",
        path: "exam/class-test",
      },
    },
  },
  leaveManagement: {
    name: "Leave Management",
    path: "/leave-management",
    subRoutes: {
      pendingApplications: {
        name: "Pending Applications",
        path: "/leave-management/pending-applications",
        subRoutes: {
          teachersAndStaffs: {
            name: "Teachers & Staffs",
            path: "/leave-management/pending-applications/teachers-and-staffs",
          },
          teachersAndStaffsDetails: {
            name: "Teachers & Staffs Details",
            path: "/leave-management/pending-applications/teachers-and-staffs/details",
          },
          students: {
            name: "Students",
            path: "/leave-management/pending-applications/students",
          },
          studentsDetails: {
            name: "Students Details",
            path: "/leave-management/pending-applications/students/details",
          },
        },
      },
      approvedApplications: {
        name: "Approved Applications",
        path: "/leave-management/approved-applications",
        subRoutes: {
          teachersAndStaffs: {
            name: "Teachers & Staffs",
            path: "/leave-management/approved-applications/teachers-and-staffs",
          },
          teachersAndStaffsDetails: {
            name: "Teachers & Staffs Details",
            path: "/leave-management/approved-applications/teachers-and-staffs/details",
          },
          students: {
            name: "Students",
            path: "/leave-management/approved-applications/students",
          },
          studentsDetails: {
            name: "Students Details",
            path: "/leave-management/approved-applications/students/details",
          },
        },
      },
      rejectedApplications: {
        name: "Rejected Applications",
        path: "/leave-management/rejected-applications",
        subRoutes: {
          teachersAndStaffs: {
            name: "Teachers & Staffs",
            path: "/leave-management/rejected-applications/teachers-and-staffs",
          },
          teachersAndStaffsDetails: {
            name: "Teachers & Staffs Details",
            path: "/leave-management/rejected-applications/teachers-and-staffs/details",
          },
          students: {
            name: "Students",
            path: "/leave-management/rejected-applications/students",
          },
          studentsDetails: {
            name: "Students Details",
            path: "/leave-management/rejected-applications/students/details",
          },
        },
      },
    },
  },
  notification: {
    name: "Notifications",
    path: "/notifications",
    subRoutes: {
      allNotifications: {
        name: "All Notifications",
        path: "/notifications/all-notifications",
      },
      createNotification: {
        name: "Create Notification",
        path: "/notifications/create-notification",
      },
      editNotification: {
        name: "Edit Notification",
        path: "/notifications/edit-notification",
      },
    },
  },
  eventManagement: {
    name: "Event Management",
    path: "/event-management",
  },
  residentManagement: {
    name: "Resident Management",
    path: "/resident-management",
  },
  libraryManagemnent: {
    name: "Library Management",
    path: "/library-management",
  },
  birthdayWish: {
    name: "Birthday Wish",
    path: "/birthday-wish",
    subRoutes: {
      students: {
        name: "Students",
        path: "/birthday-wish/students",
      },
      teachers: {
        name: "Teachers",
        path: "/birthday-wish/teachers",
      },
      myBirthday: {
        name: "My Birthday",
        path: "/birthday-wish/my-birthday",
      },
    },
  },
  student: {
    name: "Student",
    path: "/student",
  },
  teachers: {
    name: "Teachers",
    path: "/teachers",
  },
  bloodBank: {
    name: "Blood Bank",
    path: "/blood-bank",
  },
  askMe: {
    name: "Ask Me",
    path: "/ask-me",
  },
};
