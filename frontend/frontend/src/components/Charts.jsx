import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Charts({ data }) {
  if (!data || data.length === 0) return null;

  const positive = data.filter(d => d.sentiment === "positive").length;
  const negative = data.filter(d => d.sentiment === "negative").length;
  const neutral = data.filter(d => d.sentiment === "neutral").length;

  const chartData = [
    { name: "Positive", value: positive },
    { name: "Negative", value: negative },
    { name: "Neutral", value: neutral }
  ];

  const COLORS = ["#22c55e", "#ef4444", "#eab308"]; // green, red, yellow

  return (
    <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>

      <div>
        <h3>Bar Chart</h3>
        <BarChart width={300} height={250} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </div>

      <div>
        <h3>Pie Chart</h3>
        <PieChart width={300} height={250}>
          <Pie data={chartData} dataKey="value" outerRadius={80} label>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>

    </div>
  );
}