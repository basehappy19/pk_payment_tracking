import { getClassrooms } from '@/app/functions/settings/classrooms/Classrooms';
import { getClassroomOptions } from '@/app/functions/classrooms/Classrooms';
import { Classroom } from '@/app/types/Settings/Classrooms';
import { ListClassrooms, ClassroomAdd, SearchClassroom } from '@/components/Settings/Classroom';
import React from 'react'
import { ClassroomOptions } from '@/app/types/classroom';

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'จัดการห้องเรียน | โรงเรียนภูเขียว',
  description: 'จัดการห้องเรียน โรงเรียนภูเขียว',
}

export default async function ManageClassroom({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const classrooms : Classroom = await getClassrooms({search:search,page:page})
    const options : ClassroomOptions = await getClassroomOptions();
    
    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการห้องเรียน</h1>
                <ClassroomAdd options={options} />
                <SearchClassroom />
            </div>

            <ListClassrooms options={options} classrooms={classrooms} />
        </div>
    )
}
