import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  name: "Paathshala Head Teacher App",
  slug: "paathshala-head-teacher",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.smartpathshala.headteacher",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.smartpathshala.headteacher",
  },
});
