import { ListFeeForClassrooms, FeeForClassroomAdd, SearchFeeForClassroom } from '@/components/Settings/FeeForClassroom';
import React from 'react'
import type { Metadata } from 'next'
import { ClassroomOptions } from '@/app/types/classroom';
import { getClassroomOptions } from '@/app/functions/classrooms/Classrooms';
import { getFeeForClassrooms } from '@/app/functions/settings/classrooms/Fees';
import { getFeeOptions } from '@/app/functions/settings/fees/Fees';
 
export const metadata: Metadata = {
  title: 'จัดการค่าบำรุงการศึกษาในห้องเรียน | โรงเรียนภูเขียว',
  description: 'จัดการค่าบำรุงการศึกษาในห้องเรียน โรงเรียนภูเขียว',
}

export default async function ManageFeeForClassroom({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const classroomOptions : ClassroomOptions = await getClassroomOptions()
    const feeOptions = await getFeeOptions();
    const feeForClassrooms = await getFeeForClassrooms({page,search});

    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการห้องเรียน</h1>

                <FeeForClassroomAdd feeOptions={feeOptions} classroomOptions={classroomOptions.classrooms} />
                <SearchFeeForClassroom />
            </div>
            <ListFeeForClassrooms feeForClassrooms={feeForClassrooms} feeOptions={feeOptions} classroomOptions={classroomOptions.classrooms} />
        </div>
    )
}
