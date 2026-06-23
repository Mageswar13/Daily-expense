import DashboardSummary from "../components/DashboardSummary";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import SearchFilter from "../components/SearchFilter";
import CategoryChart from "../components/CategoryChart";
import MonthlyReport from "../components/MonthlyReport";

function HomePage() {
  return (
    <div className="home-page">
      <h1 className="page-title">Expense Tracker</h1>

      <DashboardSummary />

      <div className="home-grid">
        <div className="home-column">
          <TransactionForm />
          <SearchFilter />
          <TransactionList />
        </div>

        <div className="home-column">
          <MonthlyReport />
          <CategoryChart />
        </div>
      </div>

      <footer className="footer">
        <h3>Expense Tracker</h3>
        <p>Email: mageswar2007@gmail.com.com</p>
        <p>Phone: +91 8056335689</p>
        <p>© 2026 Expense Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
