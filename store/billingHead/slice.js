import { getCalendarFormattedDate } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billingDate: getCalendarFormattedDate(new Date()),
  billingHeadList: null,
};

const billingHeadSlice = createSlice({
  name: "billingHead",
  initialState,
  reducers: {
    setBillingDate: (state, action) => {
      state.billingDate = action.payload;
    },
    setBillingHeadList: (state, action) => {
      // Creating a Map to maintain unique billing heads and their total amounts
      const billingHeadsMap = new Map();

      // Filter only 'Paid' invoices
      const paidInvoices = action.payload?.filter(
        (invoice) => invoice.status === "Paid"
      );

      // Process each invoice
      paidInvoices?.forEach((invoice) => {
        // Process each charge in the charges_summary
        invoice.charges_summary.forEach((charge) => {
          const billingHead = charge?.billing_head_id;
          const amount = charge?.amount;
          const headId = billingHead?._id;

          // If this billing head already exists in our map, add to its amount
          // Otherwise, create a new entry
          if (billingHeadsMap.has(headId)) {
            const currentAmount = billingHeadsMap.get(headId).amount;
            billingHeadsMap.get(headId).amount = currentAmount + amount;
          } else {
            billingHeadsMap.set(headId, {
              _id: headId,
              head: billingHead?.head_title,
              amount: amount,
            });
          }
        });
      });

      // Convert the Map to an array
      state.billingHeadList = Array.from(billingHeadsMap.values());
    },
  },
});

export const { setBillingDate, setBillingHeadList } = billingHeadSlice.actions;
export default billingHeadSlice.reducer;
