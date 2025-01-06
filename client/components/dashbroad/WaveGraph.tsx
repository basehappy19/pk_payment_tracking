'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WaveGraph = () => {
  const data = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
    datasets: [
      {
        label: 'Dataset 1', 
        data: [65, -59, 80, -81, 56, 55, -40, 30, -10, 90, 50, 60],
        fill: false, 
        borderColor: 'rgb(75, 192, 192)', 
        tension: 0.1, 
      },
      {
        label: 'Dataset 2', 
        data: [28, 48, 40, 19, 86, 27, 90, 70, 60, 50, 40, 30],
        fill: false, 
        borderColor: 'rgb(255, 99, 132)', 
        tension: 0.1, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'ยอดลด และเพิ่ม',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'เดือน',
        },
      },
      y: {
        title: {
          display: true,
          text: 'ค่า', 
        },
        ticks: {
          beginAtZero: false, 
          min: -100, 
          max: 100, 
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className='shadow shadow-md dark:shadow-none rounded-lg border dark:bg-zinc-200'>
      <p className='text-center text-black text-2xl font-bold'>ยอดสถิติ</p>
      <div className="px-4 py-2 max-w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WaveGraph
