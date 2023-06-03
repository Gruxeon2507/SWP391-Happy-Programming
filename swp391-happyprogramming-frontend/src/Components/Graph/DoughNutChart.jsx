import { Doughnut } from 'react-chartjs-2';
import React from 'react';

function DoughnutChart({ chartData }) {
  return <Doughnut data={chartData} options={{ animation: { animateRotate: true, animateScale: true } }} />;
}

export default DoughnutChart;