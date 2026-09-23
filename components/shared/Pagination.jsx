import { cn, colors, FONTS } from "@/services";
import { View, Text, TouchableOpacity } from "react-native";

const Pagination = ({ meta, onPageChange, containerClassName }) => {
  const {
    currentPage,
    totalPages,
    previousPage,
    nextPage,
    totalItems,
    itemsPerPage,
  } = meta;

  // Calculate start and end entries
  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page buttons (showing max 5 pages)
  const generatePageButtons = () => {
    const buttons = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          onPress={() => onPageChange(i)}
          className={cn(
            "mx-1 h-6 w-6 rounded-lg flex items-center justify-center",
            currentPage === i ? "bg-main-500" : "bg-neutral-100"
          )}
          activeOpacity={0.7}
        >
          <Text
            className={cn("text-xs")}
            style={{
              ...FONTS.inter600,
              color: currentPage === i ? colors.white50 : colors.black700,
            }}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  return (
    <View
      className={cn(
        "flex flex-row items-center gap-2 py-4",
        containerClassName
      )}
    >
      {/* Pagination Info */}
      <View className="px-4">
        <Text
          className="text-xs text-neutral-500"
          style={{
            ...FONTS.inter400,
          }}
        >
          Showing {startEntry} to {endEntry} from {totalItems} entries
        </Text>
      </View>

      {/* Pagination Controls */}
      <View className="flex-row justify-center items-center">
        {/* First Page */}
        <TouchableOpacity
          onPress={() => onPageChange(1)}
          disabled={!previousPage}
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center mx-1"
          )}
          activeOpacity={0.7}
        >
          <Text
            className={cn(
              "text-lg",
              !previousPage ? "text-neutral-400" : "text-main-500"
            )}
            style={{
              ...FONTS.inter600,
            }}
          >
            «
          </Text>
        </TouchableOpacity>

        {/* Page Numbers */}
        {generatePageButtons()}

        {/* Last Page */}
        <TouchableOpacity
          onPress={() => onPageChange(totalPages)}
          disabled={!nextPage}
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center mx-1"
          )}
          activeOpacity={0.7}
        >
          <Text
            className={cn(
              "text-lg",
              !nextPage ? "text-neutral-400" : "text-main-500"
            )}
            style={{
              ...FONTS.inter600,
            }}
          >
            »
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pagination;
