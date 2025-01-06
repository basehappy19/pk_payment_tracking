import { getImportOptions } from '@/app/functions/imports/Import'
import { Option } from '@/app/types/import'
import { AddImportData, ImportCSV } from '@/components/Settings/Import'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'นำเข้าข้อมูล | โรงเรียนภูเขียว',
    description: 'นำเข้าข้อมูล โรงเรียนภูเขียว',
}

const ImportPage = async () => {
    const options : Option = await getImportOptions()
    
    return (
        <div className="p-4 space-y-8">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">นำเข้าข้อมูล</h1>

                <AddImportData options={options} />
            </div>
            <ImportCSV />
        </div>
    )
}

export default ImportPage