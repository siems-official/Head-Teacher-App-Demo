import { Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { colors, FONTS, PaperPlane, routes } from "@/services";
import BaseLayout from "@/components/shared/BaseLayout";

const collections = () => {
  const router = useRouter();

  const navigationData = [
    {
      _id: 1,
      title: "Paid",
      path: routes.accounts.subRoutes.paidListClass.path,
    },
    {
      _id: 2,
      title: "Due",
      path: routes.accounts.subRoutes.dueListClass.path,
    },
  ];

  return (
    <BaseLayout title="Collections">
      <FlatList
        data={navigationData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border border-neutral-300 mb-3 p-4 rounded-xl flex flex-row gap-4 justify-between items-center"
            activeOpacity={0.5}
            onPress={() => router.push(item.path)}
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

export default collections;
