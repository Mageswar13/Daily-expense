// src/components/DashboardSummary.jsx
import { useExpenses } from "../context/ExpenseContext";
import { getTotal, getTotalIncome, getTotalExpenses } from "../utils/calculations";

function DashboardSummary() {
  const { transactions } = useExpenses();

  const balance = getTotal(transactions);
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);

  return (
    <section className="dashboard-summary" aria-label="Dashboard summary">
      <div className="summary-card">
        <span className="summary-label">Balance</span>
        <span className={`summary-value ${balance >= 0 ? "summary-value--income" : "summary-value--expense"}`}>
          {balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}
        </span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total Income</span>
        <span className="summary-value summary-value--income">+${income.toFixed(2)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total Expenses</span>
        <span className="summary-value summary-value--expense">-${expenses.toFixed(2)}</span>
      </div>
    </section>
  );
}

export default DashboardSummary;
