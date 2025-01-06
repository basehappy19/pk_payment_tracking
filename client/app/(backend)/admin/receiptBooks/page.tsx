import { getReceiptBooks } from '@/app/functions/settings/receiptBooks/ReceiptBooks';
import { ReceiptBook } from '@/app/types/Settings/ReceiptBooks';
import { ReceiptBookAdd, ListReceiptBooks, SearchReceiptBook } from '@/components/Settings/ReceiptBook';
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'จัดการเล่มใบเสร็จ | โรงเรียนภูเขียว',
  description: 'จัดการเล่มใบเสร็จ โรงเรียนภูเขียว',
}


export default async function ManageReceiptBook({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const receiptBooks : ReceiptBook = await getReceiptBooks({search:search,page:page})
    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการเล่มใบเสร็จ</h1>

                <ReceiptBookAdd />
                <SearchReceiptBook />
            </div>
            <ListReceiptBooks receiptBooks={receiptBooks} />
        </div>
    )
}
