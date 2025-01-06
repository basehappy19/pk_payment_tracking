import React from 'react'

export const AllRooms = () => {
    return (
        <div className="items-baseline my-1">
            <p className='text-lg text-gray-700'>
                ห้องทั้งหมด <span className='text-black'>(90)</span> ห้อง
            </p>
            <p className='text-xl font-semibold text-black'>
                <span>123</span> ห้อง <span>(100%)</span>
            </p>
        </div>  
    )
}

export const PayedRooms = () => {
    return (
        <div className="items-baseline my-1">
            <p className='text-lg text-gray-700'>
                ห้องที่ชำระครบ <span className='text-black'>(45)</span> ห้อง
            </p>
            <p className='text-xl font-semibold text-green-600'>
                <span>123</span> ห้อง <span>(50%)</span>
            </p>
        </div>  
    )
}

export const NotAllPayRooms = () => {
    return (
        <div className="items-baseline my-1">
            <p className='text-lg text-gray-700'>
                ห้องที่ยังชำระไม่หมด <span className='text-black'>(45)</span> ห้อง
            </p>
            <p className='text-xl font-semibold text-red-600'>
                <span>123</span> ห้อง <span>(50%)</span>
            </p>
        </div>  
    )
}
