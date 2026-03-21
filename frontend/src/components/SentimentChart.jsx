import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#4CAF50", "#F44336", "#FFC107"]; // Green, Red, Yellow

const SentimentChart = ({ data }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SentimentChart;