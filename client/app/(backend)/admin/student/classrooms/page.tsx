import { getClassroomOptions } from '@/app/functions/classrooms/Classrooms';
import React from 'react'
import { ClassroomOptions } from '@/app/types/classroom';

import type { Metadata } from 'next'
import { ListStudentInClassrooms, SearchStudentInClassroom, StudentInClassroomAdd } from '@/components/Settings/StudentInClassroom';
import { StudentInClassroom } from '@/app/types/Settings/Students';
import { getStudentInClassrooms } from '@/app/functions/settings/students/StudentInClassroom';
 
export const metadata: Metadata = {
  title: 'จัดการนักเรียนในห้องเรียน | โรงเรียนภูเขียว',
  description: 'จัดการนักเรียนในห้องเรียน โรงเรียนภูเขียว',
}

export default async function ManageStudentInClassroom({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const studentInclassrooms : StudentInClassroom = await getStudentInClassrooms({search:search, status:status, page:page})
    const options : ClassroomOptions = await getClassroomOptions();

    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการนักเรียนในห้องเรียน</h1>

                <StudentInClassroomAdd classroomOptions={options.classrooms} />
                <SearchStudentInClassroom />
            </div>
            <ListStudentInClassrooms studentInclassrooms={studentInclassrooms} classroomOptions={options.classrooms} />
        </div>
    )
}
