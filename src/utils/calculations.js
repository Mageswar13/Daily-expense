// src/utils/calculations.js

/**
 * Sum of all transaction amounts.
 * Expense amounts are stored as positive numbers with a `type` of
 * "expense" or "income" to distinguish direction.
 */
export function getTotal(transactions) {
  return transactions.reduce((sum, t) => {
    const amt = Number(t.amount) || 0;
    return t.type === "income" ? sum + amt : sum - amt;
  }, 0);
}

/** Sum of income only. */
export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
}

/** Sum of expenses only (returned as a positive number). */
export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
}

/**
 * Totals grouped by category, expenses only (useful for the bar chart).
 * Returns: [{ category: "Food", total: 120 }, ...] sorted descending.
 */
export function getTotalsByCategory(transactions) {
  const totals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const cat = t.category || "Uncategorized";
      totals[cat] = (totals[cat] || 0) + (Number(t.amount) || 0);
    });

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

/** True if an ISO date string falls in the given year/month (0-indexed month). */
function isInMonth(dateStr, year, month) {
  const d = new Date(dateStr);
  return d.getFullYear() === year && d.getMonth() === month;
}

/**
 * Filters transactions down to the current calendar month
 * and returns income/expense/net totals plus the filtered list.
 */
export function getMonthlyReport(transactions, referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  const monthTransactions = transactions.filter((t) =>
    isInMonth(t.date, year, month)
  );

  const income = getTotalIncome(monthTransactions);
  const expenses = getTotalExpenses(monthTransactions);

  return {
    year,
    month, // 0-indexed
    monthLabel: referenceDate.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    }),
    income,
    expenses,
    net: income - expenses,
    count: monthTransactions.length,
    transactions: monthTransactions,
  };
}

/**
 * Filters transactions by a free-text keyword (matches description/category)
 * and an optional category filter. Pass "" / "All" to skip a filter.
 */
export function filterTransactions(transactions, keyword = "", category = "All") {
  const kw = keyword.trim().toLowerCase();

  return transactions.filter((t) => {
    const matchesKeyword =
      !kw ||
      t.description?.toLowerCase().includes(kw) ||
      t.category?.toLowerCase().includes(kw);

    const matchesCategory = category === "All" || t.category === category;

    return matchesKeyword && matchesCategory;
  });
}
