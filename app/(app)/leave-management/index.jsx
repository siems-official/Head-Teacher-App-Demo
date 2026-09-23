import BaseLayout from "@/components/shared/BaseLayout";
import { colors, FONTS, PaperPlane, routes } from "@/services";
import { useRouter } from "expo-router";
import { Text, FlatList, TouchableOpacity } from "react-native";
import Toast from "react-native-simple-toast";

const LeaveManagementScreen = () => {
  const router = useRouter();

  const navigationData = [
    {
      _id: 1,
      title: "Pending Applications",
      path: routes.leaveManagement.subRoutes.pendingApplications.path,
    },
    {
      _id: 2,
      title: "Approved Applications",
      path: routes.leaveManagement.subRoutes.approvedApplications.path,
    },
    {
      _id: 3,
      title: "Rejected Applications",
      path: routes.leaveManagement.subRoutes.rejectedApplications.path,
    },
  ];

  return (
    <BaseLayout title="Leave Application">
      <FlatList
        data={navigationData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border border-neutral-300 mb-3 p-4 rounded-xl flex flex-row gap-4 justify-between items-center"
            activeOpacity={0.5}
            onPress={() =>
              !item.underDev
                ? router.push(item.path)
                : Toast.show("Under Development")
            }
          >
            <Text
              className="!leading-[1.2] text-black-700 text-base"
              style={{ ...FONTS.inter600 }}
            >
              {item.title}
            </Text>
            <PaperPlane
              className=""
              height={20}
              width={20}
              color={colors.main500}
            />
          </TouchableOpacity>
        )}
        scrollEventThrottle={16}
        overScrollMode="always"
        bounces={true}
        alwaysBounceVertical={true}
        scrollToOverflowEnabled={false}
        showsVerticalScrollIndicator={false}
        className="mx-4 mt-2"
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </BaseLayout>
  );
};

export default LeaveManagementScreen;
