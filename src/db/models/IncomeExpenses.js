import { model, Schema } from "mongoose";

const IncomeExpensesSchema = new Schema(
  {
    name: {
      type: String,
    },
    amount: {
      type: String,
    },
    type: {
      type: String,
      enum: "Income" | "Expense" | "Error",
    },
  },
  { versionKey: false }
);

export const IncomeExpensesCollection = model(
  "incomeExpenses",
  IncomeExpensesSchema
);
