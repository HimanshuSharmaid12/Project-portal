import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AnalyticsChart({ analytics }) {
  const data = {
    labels: analytics?.labels || ["Frontend", "Backend", "AI", "Design", "DevOps"],
    datasets: [
      {
        label: "Job Applications",
        data: analytics?.values || [30, 45, 25, 60, 20],
        backgroundColor: "rgba(37, 99, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">Application Insights</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
