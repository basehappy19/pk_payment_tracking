
import React from 'react'

export const AllStudents = () => {
  return (
    <div className="items-baseline my-1">
        <p className='text-lg text-gray-700'>
            นักเรียนทั้งหมด <span className='text-black'>(90000)</span> คน
        </p>
        <p className='text-xl font-semibold text-black'>
            <span>1234</span> บาท <span>(100%)</span>
        </p>
    </div>  
    )
}

export const PayedStudents = () => {
  return (
    <div className="items-baseline my-1">
        <p className='text-lg text-gray-700'>
            นักเรียนที่ชำระ <span className='text-black'>(2000)</span> คน
        </p>
        <p className='text-xl font-semibold text-green-600'>
            <span>1234</span> บาท <span>(10%)</span>
        </p>
    </div>  
    )
}
export const NotPayStudents = () => {
  return (
        <div className="items-baseline my-1">
            <p className='text-lg text-gray-700'>
                นักเรียนที่ยังค้างค่าชำระ <span className='text-black'>(2000)</span> คน
            </p>
            <p className='text-xl font-semibold text-red-600'>
                <span>1234</span> บาท <span>(90%)</span>
            </p>
        </div>  
    )
}
