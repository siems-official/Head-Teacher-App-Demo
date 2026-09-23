import {
  processPendingCalculations,
  updateSubjectWiseMarksImmediate,
} from "@/store/exam/slice";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

export const useOptimizedMarksUpdate = (calculationParams) => {
  const dispatch = useDispatch();
  const pendingUpdates = useRef(new Set());
  const timeoutRefs = useRef(new Map());

  // Custom debounced batch calculation
  const debouncedCalculation = useCallback(
    (uniqueKey) => {
      // Clear existing timeout for this uniqueKey
      if (timeoutRefs.current.has(uniqueKey)) {
        clearTimeout(timeoutRefs.current.get(uniqueKey));
      }

      // Set new timeout
      const timeoutId = setTimeout(() => {
        if (pendingUpdates.current.has(uniqueKey)) {
          dispatch(
            processPendingCalculations({
              uniqueKey,
              ...calculationParams,
            })
          );
          pendingUpdates.current.delete(uniqueKey);
          timeoutRefs.current.delete(uniqueKey);
        }
      }, 300); // 300ms delay

      timeoutRefs.current.set(uniqueKey, timeoutId);
    },
    [dispatch, calculationParams]
  );

  const updateMarks = useCallback(
    (payload) => {
      const { uniqueKey } = payload;

      // Immediate UI update
      dispatch(updateSubjectWiseMarksImmediate(payload));

      // Schedule batch calculation
      pendingUpdates.current.add(uniqueKey);
      debouncedCalculation(uniqueKey);
    },
    [dispatch, debouncedCalculation]
  );

  // Cleanup timeouts on unmount
  const cleanup = useCallback(() => {
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current.clear();
    pendingUpdates.current.clear();
  }, []);

  return { updateMarks, cleanup };
};
