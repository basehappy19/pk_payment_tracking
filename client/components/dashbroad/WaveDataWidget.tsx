import React from 'react'

export const GrowthMoney = () => {
  return (
    <div className="flex justify-between items-baseline dark:bg-zinc-200 dark:border-stone-700/50 border border-gray-300 shadow shadow-md rounded-lg p-4 py-6 transition duration-300 hover:transform hover:scale-[103%]">
        <p className='text-lg text-gray-700 text-center font-semibold'>
            ยอดการเติบโต
        </p>
        <p className='text-2xl font-semibold text-teal-600'>
            <span>1234</span> บาท <span>(90%)</span>
        </p>
    </div>    
  )
}

export const DownMoney = () => {
  return (
    <div className="flex justify-between items-baseline dark:bg-zinc-200 dark:border-stone-700/50 border border-gray-300 shadow shadow-md rounded-lg p-4 py-6 transition duration-300 hover:transform hover:scale-[103%]">
        <p className='text-lg text-gray-700 text-center font-semibold'>
            ยอดการลดลง
        </p>
        <p className='text-2xl font-semibold text-rose-600'>
            <span>1234</span> บาท <span>(10%)</span>
        </p>
    </div>    
  )
}

