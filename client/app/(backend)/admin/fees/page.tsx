import { getFees } from '@/app/functions/settings/fees/Fees';
import { Fee } from '@/app/types/Settings/Fees';
import { ListFees, FeeAdd, SearchFee } from '@/components/Settings/Fee';
import React from 'react'
import { ClassroomOptions } from '@/app/types/classroom';
import { getClassroomOptions } from '@/app/functions/classrooms/Classrooms';

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'จัดการค่าบำรุงการศึกษา | โรงเรียนภูเขียว',
  description: 'จัดการค่าบำรุงการศึกษา โรงเรียนภูเขียว',
}

export default async function ManageFee({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const fees : Fee = await getFees({search:search,page:page})
    const options : ClassroomOptions = await getClassroomOptions();

    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการค่าบำรุงการศึกษา</h1>
                <FeeAdd education_year_options={options.education_years} education_term_options={options.education_terms} />
                <SearchFee />
            </div>
            <ListFees education_year_options={options.education_years} education_term_options={options.education_terms} fees={fees} />
        </div>
    )
}
