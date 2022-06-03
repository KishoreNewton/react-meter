import React from "react";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend);
const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [500, 500, 500],
      needleValue: 370 * 3, // Change This for Meter * 2 or * 1
      backgroundColor: ["red", "#FFCE56", "lightgreen"],
      hoverBackgroundColor: ["red", "#FFCE56", "lightgreen"],
    },
  ],
  options: {
    layout: {
      padding: {
        bottom: 3,
      },
    },
    rotation: -95,
    circumference: 60 * Math.PI,
    legend: {
      display: false,
    },
    cutoutPercentage: 70,
  },
};
ChartJS.register({
  id: "doughnut",
  afterDraw: (chart, args, opts) => {
    var needleValue = chart.config.data.datasets[0].needleValue;
    var dataTotal = chart.config.data.datasets[0].data.reduce(
      (a, b) => a + b,
      0
    );
    var angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
    var ctx = chart.ctx;
    var cw = chart.canvas.offsetWidth;
    var ch = chart.canvas.offsetHeight - 100;
    var cx = cw / 2;
    var cy = ch - 6;

    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -3);
    ctx.lineTo(ch - 5, 0);
    ctx.lineTo(0, 3);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fill();
    ctx.rotate(-angle);
    ctx.translate(-cx, -cy);
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();
  },
});

function DonutChart() {
  return (
    <>
      <h1>Sample Meter</h1>
      <Doughnut height="100px" data={data} options={data.options} />
    </>
  );
}
function App() {
  return (
    <div style={{ width: "500px", height: "100px" }}>
      <DonutChart />
    </div>
  );
}

export default App;
