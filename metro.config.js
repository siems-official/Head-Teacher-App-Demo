const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

const customResolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "react-native-simple-toast") {
    return context.resolveRequest(
      context,
      path.resolve(__dirname, "shims/react-native-simple-toast.web.js"),
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

const prevResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest =
  prevResolveRequest
    ? (context, moduleName, platform) =>
        customResolveRequest({ ...context, resolveRequest: prevResolveRequest }, moduleName, platform)
    : customResolveRequest;

module.exports = withNativeWind(config, { input: "./styles/global.css" });
