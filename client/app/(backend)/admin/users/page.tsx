import React from 'react'

import type { Metadata } from 'next'
import { ListUsers, SearchUser, UserAdd } from '@/components/Settings/User';
import { getRoleOptions, getUsers } from '@/app/functions/settings/users/Users';
import { User } from '@/app/types/Settings/User';
 
export const metadata: Metadata = {
  title: 'จัดการผู้ใช้ | โรงเรียนภูเขียว',
  description: 'จัดการผู้ใช้ โรงเรียนภูเขียว',
}

export default async function ManageUser({searchParams}:{
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : undefined;    
    const users : User = await getUsers({search:search,page:page})
    const roles = await getRoleOptions();
    return (
        <div className="p-4 space-y-4">
            <div className="bg-gradient-to-t space-y-4 from-rose-100 to-pink-200 rounded-md p-2 dark:from-zinc-900 dark:to-stone-900/60">
                <h1 className="text-2xl font-bold">จัดการผู้ใช้</h1>

                <UserAdd roles={roles} />
                <SearchUser />
            </div>
            <ListUsers users={users} roles={roles} />
        </div>
    )
}
