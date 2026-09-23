export const loginValidationRules = {
    instituteId: {
      required: { value: true, message: "Institute ID is required" },
    },
    userCode: {
      required: { value: true, message: "User code is required" },
    },
    password: {
      required: { value: true, message: "Password is required" },
    },
};
  