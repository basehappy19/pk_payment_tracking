import React from 'react'

export const AllStudentsWidget = () => {
  return (
    <div className="flex justify-between dark:bg-green-300/80 dark:shadow-green-600 shadow-md shadow-green-400 border-emerald-400/65 bg-green-200/80 rounded-lg p-4 transition duration-200 hover:transform hover:scale-[103%]">
        <div className="">
            <p className='mb-4 text-lg '>นักเรียน <span>8888</span> คน</p>
            <p className='text-xl font-semibold text-green-800 dark:text-green-800'>จำนวนเงิน <span>9999999</span> บาท</p>
        </div>
        <div>
            <p className="text-end text-green-600 dark:text-green-800">stonk +999%</p>
        </div>
    </div>
  )
}

export const NotPayStudentsWidget = () => {
  return (
    <div className="flex justify-between dark:bg-red-300/80 dark:shadow-rose-600 shadow-md shadow-rose-400  border-rose-400/65 bg-red-200/80 rounded-lg p-4 transition duration-200 hover:transform hover:scale-[103%]">
        <div>
            <p className='mb-4 text-lg'>นักเรียนที่ยังไม่จ่าย <span>888</span> คน</p>
            <p className='text-xl font-semibold text-red-800 dark:text-red-800'>จำนวนเงิน <span>9999999</span> บาท</p>
        </div>
        <div>
            <p className="text-end text-red-600 dark:text-red-800">stonk -999%</p>
        </div>
    </div>
  )
}

export const PayedStudentsWidget = () => {
  return (
    <div className="flex justify-between dark:bg-sky-300/80 dark:shadow-blue-600 shadow-md shadow-blue-400  border-blue-400/65 bg-cyan-200/80 rounded-lg p-4 transition duration-200 hover:transform hover:scale-[103%]">
        <div className="">
            <p className='mb-4 text-lg'>นักเรียนที่ยังจ่ายไปแล้ว <span>888</span> คน</p>
            <p className='text-xl font-semibold text-indigo-800 dark:text-indigo-800'>จำนวนเงิน <span>9999999</span> บาท</p>
        </div>
        <div>
            <p className="text-end text-green-600 dark:text-green-800">stonk +999%</p>
        </div>
    </div>
  )
}

export const NotPayRoomsWidget = () => {
  return (
    <div className="flex justify-between dark:bg-yellow-300/80 dark:shadow-orange-600 shadow shadow shadow-md shadow-amber-400 border-orange-400/65 bg-yellow-200/80 rounded-lg p-4 transition duration-200 hover:transform hover:scale-[103%]">
        <div className="">
            <p className='mb-4 text-lg'>นักเรียนห้องที่ยังจ่ายไม่ครบ <span>888</span> ห้อง</p>
            <p className='text-xl font-semibold text-orange-800 dark:text-orange-800'>จำนวนเงิน <span>9999999</span> บาท</p>
        </div>
        <div>
            <p className="text-end text-red-600 dark:text-red-800">stonk -999%</p>
        </div>
    </div>
  )
}


