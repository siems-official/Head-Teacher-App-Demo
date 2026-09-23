import { FONTS } from "@/services";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

const AttendanceSummaryTable = ({ data, headers, keys }) => {
    return (
        <View className="border border-neutral-300 rounded-lg overflow-hidden">
            {/* Table Header */}
            <View className="bg-main-500 flex-row">
                {headers.map((header, index) => (
                    <View
                        key={index}
                        className={`flex-1 p-3 border-r border-neutral-300 flex items-center justify-center ${index === headers.length - 1 ? "border-r-0" : ""
                            }`}
                    >
                        <Text
                            className="text-xs text-center text-white-50"
                            style={{
                                ...FONTS.inter600,
                            }}
                        >
                            {header}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Table Rows */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View className="flex-row border-b border-neutral-300 last:border-b-0">
                        {keys.map((key, index) => (
                            <View
                                key={index}
                                className={`flex-1 py-6 border-r border-neutral-300 ${index === keys.length - 1 ? "border-r-0" : ""
                                    }`}
                            >
                                <Text
                                    className="text-center text-xs !leading-[1.24] text-black-700"
                                    style={{
                                        ...FONTS.inter400,
                                    }}
                                >
                                    {item[key]}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

export default AttendanceSummaryTable;
