"use client"
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const DoughnutGraph = () => {
  // ข้อมูลสมมุติ
  const datasets = [
    {
      label: 'Dataset 1',
      data: [300, 50, 100],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
    {
      label: 'Dataset 2',
      data: [200, 150, 50],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
    {
      label: 'Dataset 3',
      data: [120, 80, 200],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
  ];

  // ตั้งค่าเริ่มต้นให้เริ่มที่ข้อมูลสุดท้าย
  const [currentIndex, setCurrentIndex] = useState(datasets.length - 1); // เริ่มจากข้อมูลสุดท้าย

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // ย้อนกลับไปยังข้อมูลก่อนหน้า
    }
  };

  const handleNext = () => {
    if (currentIndex < datasets.length - 1) {
      setCurrentIndex(currentIndex + 1); // ไปยังข้อมูลถัดไป
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* กราฟแสดงตามข้อมูลที่เลือก */}
      <Doughnut data={{ labels: ['Red', 'Blue', 'Yellow'], datasets: [datasets[currentIndex]] }} options={options} />
      <div className='flex justify-center mt-6 space-x-4'>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0} // ปิดการทำงานของปุ่มเมื่อถึงสุดทาง
          className='px-4 py-2 bg-amber-400 dark:bg-amber-400/60 text-white rounded hover:bg-amber-500 dark:disabled:bg-gray-400 disabled:bg-gray-300/80 transition-transform duration-300 hover:scale-105'
        >
          ⟨ ก่อนหน้า
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === datasets.length - 1} // ปิดการทำงานของปุ่มเมื่อถึงสุดทาง
          className='px-4 py-2 bg-indigo-400/80 dark:bg-indigo-400/60 text-white rounded hover:bg-indigo-500 dark:disabled:bg-gray-400 disabled:bg-gray-300/80 transition-transform duration-300 hover:scale-105'
        >
          ถัดไป ⟩
        </button>
      </div>
    </div>
  );
};

export default DoughnutGraph;
