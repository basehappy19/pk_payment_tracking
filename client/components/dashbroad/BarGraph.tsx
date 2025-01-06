"use client"

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  const [currentPage, setCurrentPage] = useState(2); // เริ่มต้นที่หน้า 2 (เดือน 'มีนาคม', 'เมษายน')
  const dataPerPage = 2; // จำนวนข้อมูลที่จะแสดงในแต่ละหน้า

  // ข้อมูลสำหรับกราฟ
  const data = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน'],  // เดือนทั้งหมด
    datasets: [
      {
        label: 'My First Bar Dataset',
        data: [65, 59, 80, 81],  // ค่าที่เก็บข้อมูล
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'My Second Bar Dataset',
        data: [45, 49, 60, 71],  // ค่าที่เก็บข้อมูล
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // ฟังก์ชันเพื่ออัปเดตข้อมูลที่จะแสดงในกราฟตามหมายเลขหน้า
  const updateDataForPage = () => {
    const start = (currentPage - 1) * dataPerPage;
    const end = currentPage * dataPerPage;

    return {
      ...data,
      labels: data.labels.slice(start, end),  // เอาแค่เดือนที่ต้องการแสดง (ตามหน้าปัจจุบัน)
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.slice(start, end),  // เอาข้อมูลที่ตรงกับเดือน
      })),
    };
  };

  // ตั้งค่ากราฟ
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // ฟังก์ชันสำหรับปุ่มนำทาง
  const handleNext = () => {
    if (currentPage * dataPerPage < data.labels.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-center">
        <Bar data={updateDataForPage()} />
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        {/* ปุ่ม Previous */}
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-amber-400 dark:bg-amber-400/60 text-white rounded hover:bg-amber-500 dark:disabled:bg-gray-400 disabled:bg-gray-300/80 transition-transform duration-300 hover:scale-105"
          disabled={currentPage === 1}
        >
          ⟨ ก่อนหน้า
        </button>

        {/* ปุ่ม Next */}
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-indigo-400/80 dark:bg-indigo-400/60 text-white rounded hover:bg-indigo-500 dark:disabled:bg-gray-400 disabled:bg-gray-300/80 transition-transform duration-300 hover:scale-105"
          disabled={currentPage * dataPerPage >= data.labels.length}
        >
          ถัดไป ⟩
        </button>
      </div>
    </div>
  );
};

export default BarGraph;
