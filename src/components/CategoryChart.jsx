import { useExpense } from "../context/ExpenseContext";
import { getTotalsByCategory } from "../utils/calculations";

function CategoryChart() {
  const { transactions } = useExpense();

  const data = getTotalsByCategory(transactions);

  if (!data.length) {
    return (
      <section className="category-chart">
        <h2 className="section-title">Spending by Category</h2>
        <p className="empty-state">No expense data available.</p>
      </section>
    );
  }

  const chartHeight = 250;
  const maxValue = Math.max(...data.map((d) => d.total));

  return (
    <section className="category-chart">
      <h2 className="section-title">Spending by Category</h2>

      <svg
        width="100%"
        height={chartHeight + 60}
        viewBox={`0 0 ${data.length * 100} ${chartHeight + 60}`}
      >
        {data.map((item, index) => {
          const barHeight = (item.total / maxValue) * chartHeight;

          return (
            <g key={item.category}>
              <rect
                x={index * 100 + 25}
                y={chartHeight - barHeight}
                width="50"
                height={barHeight}
                rx="8"
                className="chart-bar"
              />

              <text
                x={index * 100 + 50}
                y={chartHeight - barHeight - 10}
                textAnchor="middle"
                className="chart-value-label"
              >
                ₹{item.total}
              </text>

              <text
                x={index * 100 + 50}
                y={chartHeight + 25}
                textAnchor="middle"
                className="chart-category-label"
              >
                {item.category}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

export default CategoryChart;
