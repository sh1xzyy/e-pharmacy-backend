import createHttpError from "http-errors";
import { IncomeExpensesCollection } from "../db/models/IncomeExpenses.js";
import { SuppliersCollection } from "../db/models/Suppliers.js";
import { CustomerCollection } from "../db/models/Customer.js";
import { ProductsCollection } from "../db/models/Products.js";

export const getStatistics = async (req) => {
  const userId = req.users.id;

  const incomeExpenses = await IncomeExpensesCollection.find();
  if (!incomeExpenses) throw createHttpError(401, "no income expenses");
  const lastIncomeExpenses = incomeExpenses.slice(-5).reverse();

  const suppliers = await SuppliersCollection.find();
  if (!suppliers) throw createHttpError(401, "no suppliers");

  const customers = await CustomerCollection.find();
  if (!customers) throw createHttpError(401, "no customers");
  const recentCustomers = customers.slice(-5).reverse();

  const products = await ProductsCollection.find();
  if (!products) throw createHttpError(401, "no products");

  return {
    main: {
      products: products.length,
      incomeExpenses: incomeExpenses.length,
      suppliers: suppliers.length,
    },
    recentCustomers,
    incomeExpenses: lastIncomeExpenses,
  };
};
