"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Bank",
        data: [1000, 2000, 3000],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["GTbank", "Access Bank", "Zenith Bank"],
  }
  return (
    <Doughnut 
    data={data} 
    options={{
      cutout: '70%',
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          boxWidth: 20,
        }
      }
    }}/>
  )
}

export default DoughnutChart