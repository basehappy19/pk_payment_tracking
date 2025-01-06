import { getEducationYears } from '@/app/functions/settings/educations/Educations'
import { EducationYear } from '@/app/types/Settings/Educations'
import { EducationYearAdd, ListEducationYears, SearchEducationYear } from '@/components/Settings/EducationYear'
import React from 'react'

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'จัดการปีการศึกษา | โรงเรียนภูเขียว',
  description: 'จัดการปีการศึกษา โรงเรียนภูเขียว',
}

export default async function ManageEducationYear({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const years : EducationYear = await getEducationYears({search:search,page:page})
    
    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการปีการศึกษา</h1>
                <EducationYearAdd />
                <SearchEducationYear />
            </div>

            <ListEducationYears years={years} />
        </div>
    )
}
