'use client'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOutButton = () => {
  return (
    <div className='px-4 py-2'>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: '/', redirect:true })}
        className="flex items-center text-red-500 hover:text-red-700 transition-colors"
      >
        <LogOut className="w-4 h-4 mr-1" />
        <span className="text-sm">ออกจากระบบ</span>
      </button>
    </div>
  )
}

export default SignOutButton