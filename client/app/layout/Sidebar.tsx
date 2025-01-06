'use client'
import React, { FC, useState } from 'react';
import { LogOut, Menu } from 'lucide-react';
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { sideBarMenu } from './SidebarMenu';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from 'next-auth/react';
import { ModeToggle } from '@/components/SwitchThemeMode';
import { Session } from '../types/session';

interface SideBarProps {
    session: Session | null
}

const Sidebar: FC<SideBarProps> = ({ session }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
                        <Menu size={24} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 dark:border-r dark:border-slate-300 overflow-y-auto">
                    <SidebarContent user={session} />
                </SheetContent>
            </Sheet>

            <div className="hidden z-50 md:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 dark:border-r dark:border-slate-300 overflow-y-auto">
                <SidebarContent user={session} />
            </div>
        </>
    );
};

interface SidebarContentProps {
    user: Session | null
}

const SidebarContent: FC<SidebarContentProps> = ({ user }) => {
    const pathname = usePathname()

    return (
        <div className="min-h-full bg-background flex flex-col">
            <div className="bg-gradient-to-t dark:from-pink-900/50 dark:via-stone-900 dark:to-stone-950 from-rose-100 to-fuchsia-200">
                <div className="p-4 border-b border-white dark:border-stone-700">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={user?.data.profileImg} />
                                    <AvatarFallback>{user?.data.fullname}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start">
                                    <span className="font-medium text-sm">{user?.data.fullname}</span>
                                    <span className="text-xs text-muted-foreground dark:text-stone-300">{user?.data.role?.name}</span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start" forceMount>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>ออกจากระบบ</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">จัดการระบบ</h2>
                    <div className="mt-2">
                        <ModeToggle />
                    </div>
                </div>
                <nav className="flex-1 px-3 py-2 space-y-1">
                    {sideBarMenu.map((menu, index) => (
                        <div className='border-b border-neutral-400 py-2' key={index}>
                            <Link href={menu.path}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-2 hover:text-amber-700 hover:bg-yellow-100/60 bg-white dark:hover:text-gray-800/90 dark:hover:bg-cyan-100/60 dark:text-gray-200 dark:bg-neutral-700 text-gray-800/90 rounded-md",
                                        pathname === menu.path && "bg-neutral-700 text-gray-200 dark:text-gray-800 dark:bg-gray-50"
                                    )}
                                >
                                    {menu.icon}
                                    {menu.label}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;