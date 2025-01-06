import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ระบบแอดมินตรวจสอบค่าบำรุงการศึกษา | โรงเรียนภูเขียว',
  description: 'ระบบตรวจสอบค่าบำรุงการศึกษา โรงเรียนภูเขียว',
}

export default function page() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center w-full">
            <div className="container">
                <p className='hidden md:block text-5xl dark:text-gray-400 text-gray-700'>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-corner-up-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 18v-6a3 3 0 0 0 -3 -3h-10l4 -4m0 8l-4 -4" /></svg>
                    กรุณาเลือกหน้าที่เมนู    
                </p>
                <p className='md:hidden block text-5xl dark:text-gray-400 text-gray-700'>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="64"  height="64"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-corner-left-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 18h-6a3 3 0 0 1 -3 -3v-10l-4 4m8 0l-4 -4" /></svg>   
                    กรุณาเลือกหน้าเมนู กดคลิกตามลูกษร
                </p>
            </div>
        </div>
    )
}
