import { Bar, Doughnut } from "react-chartjs-2";
import "../chart"; // Import the chart registration file

const Dashboard = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [5000, 7000, 8000, 6000, 9000],
        backgroundColor: "#3A86C3",
      },
    ],
  };

  const doughnutData = {
    labels: ["Electronics", "Furniture", "Clothing"],
    datasets: [
      {
        data: [20, 35, 45],
        backgroundColor: ["#B4A020", "#EA6D09", "#46B7F7"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
        <Bar data={barData} />
      </div>
      <div className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Product Categories</h2>
        <Doughnut data={doughnutData} />
      </div>
    </div>
  );
};

export default Dashboard;
