import { getStudents } from '@/app/functions/settings/students/Students';
import { Student } from '@/app/types/Settings/Students';
import { ListStudents, SearchStudent, StudentAdd } from '@/components/Settings/Student';
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'จัดการนักเรียน | โรงเรียนภูเขียว',
    description: 'จัดการนักเรียน โรงเรียนภูเขียว',
}

export default async function ManageStudent({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const students : Student = await getStudents({search:search,page:page})
    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการนักเรียน</h1>

                <StudentAdd />
                <SearchStudent />
            </div>
            <ListStudents students={students} />
        </div>
    )
}
