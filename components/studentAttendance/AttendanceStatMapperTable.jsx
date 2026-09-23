import { cn, FONTS, routes } from "@/services";
import { FlatList, Text, View } from "react-native";
import Button from "../ui/Button";
import { useRouter } from "expo-router";
import DataTable from "../shared/DataTable";

const AttendanceStatMapperTable = ({ data }) => {
  const router = useRouter();

  // TABLE ACESSORIES
  const headers = ["CLS", "SEC", "TOTAL", "P", "A"];
  const keys = ["className", "section", "total", "present", "absent"];

  const tableHeader = () => (
    <View className="bg-main-100 flex-row">
      {headers?.map((header, index) => (
        <View
          key={index}
          className={cn(
            "h-[42px] px-3 border-r border-white-50 flex items-center justify-center flex-row",
            index === headers.length - 1 ? "border-r-0" : "",
            header === "P" || header === "A" ? "w-12" : "flex-1"
          )}
        >
          <Text
            className="text-xs text-center text-black-700"
            style={{
              ...FONTS.inter600,
            }}
          >
            {header}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View
      className={cn(
        "flex-row border-neutral-200 h-[42px]",
        index === data.length - 1 ? "border-b-0" : "border-b"
      )}
    >
      {keys?.map((key, keyIndex) => (
        <View
          key={keyIndex}
          className={cn(
            "px-3 border-r border-transparent flex items-center justify-center",
            keyIndex === keys.length - 1 ? "border-r-0" : "",
            key === "present" || key === "absent" ? "w-12" : "flex-1"
          )}
        >
          {key === "present" || key === "absent" ? (
            <Button
              title={item[key] || `0`}
              textClassName="text-[10px] !leading-[1.2]"
              buttonWrapperClassName="rounded-[4px]"
              className={cn(
                "flex items-center justify-center !p-0 !h-8 !w-8 !rounded-[4px]",
                key === "present" ? "bg-status-success" : "bg-status-error"
              )}
              onPress={() =>
                router.push(
                  key === "present"
                    ? {
                        pathname:
                          routes.studentAttendance.subRoutes.present.path,
                        params: item,
                      }
                    : {
                        pathname:
                          routes.studentAttendance.subRoutes.absent.path,
                        params: item,
                      }
                )
              }
            />
          ) : (
            <Text
              className="text-center text-xs !leading-[1.24] text-black-700"
              style={{
                ...FONTS.inter400,
              }}
            >
              {item[key]}
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <DataTable
      headers={headers}
      tableHeader={tableHeader()}
      data={data}
      renderItem={renderItem}
      wrapperClassName={"mt-3"}
      innerScrollEnabled={true}
    />
  );
};

export default AttendanceStatMapperTable;
