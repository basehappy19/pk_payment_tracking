import CardLoginStudent from '@/components/auth/CardLoginStudent'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ตรวจสอบค่าบำรุงการศึกษาสำหรับนักเรียน | โรงเรียนภูเขียว',
  description: 'ตรวจสอบค่าบำรุงการศึกษาสำหรับนักเรียน โรงเรียนภูเขียว',
}

export default function LoginStudent() {
  return (
    <main className='min-h-screen dark:bg-black'>
      <CardLoginStudent />
    </main>
  )
}
