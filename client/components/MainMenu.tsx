'use client'
import React from 'react';
import { Session } from '@/app/types/session';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Image from 'next/image';
import drImg from '../public/cr/dr.png'
import longuom from '../public/cr/longuom.jpg'
import mongkon from '../public/cr/mongkon.jpg'
import Time from '../public/cr/Time.jpg'
const MainMenu = ({ session }: { session: Session | null }) => {
    return (
        <>
            <div className="grid grid-cols-1 w-full gap-4 mx-auto px-4 py-8 max-w-4xl">
                <h2 className='text-center font-bold text-4xl'>ระบบตรวจสอบค่าบำรุงการศึกษา</h2>
                <div className="">
                    <p className='text-center font-semibold text-lg -mt-3 dark:text-gray-300 text-gray-700'>
                    กลุ่มบริหารงบประมาณ โรงเรียนภูเขียว อำเภอภูเขียว จังหวัดชัยภูมิ
                    </p>
                    <p className='text-center font-semibold text-lg -mt-1 dark:text-gray-300 text-gray-700'>
                        สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาชัยภูมิ
                    </p>
                </div>
                <div className="relative w-full max-w-4xl mx-auto px-4 py-8 rounded-xl shadow-2xl overflow-hidden dark:shadow-gray-600">
                    <div className="absolute inset-0 bg-[url(/building_bg2.jpg)] dark:bg-[url(/building_bg3.jpg)] bg-center bg-cover filter blur-[1.2px]"></div>
                    <div className="absolute inset-0 bg-black opacity-10"></div>

                    <div className="relative z-10 space-y-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
                            Menu
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href={`${session && session.role === 'student' ? '/fee' : '/auth/student'}`}
                                className={`${session && session.role === 'student' ? 'col-span-full' : ''} font-semibold text-lg bg-gradient-to-r from-fuchsia-600 via-fuchsia-500 to-fuchsia-600 hover:bg-fuchsia-600 text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2 w-full h-full min-h-[120px]`}
                            >
                                <span><ChecklistIcon /></span>
                                ตรวจสอบการชำระค่าบำรุงการศึกษา
                                <p className='text-base text-fuchsia-200'>⟨ สำหรับนักเรียนและผู้ปกครอง ⟩</p>
                                {session && session.role === 'student' && (
                                    <div className="text-sm mt-2">{session.data.name}</div>
                                )}
                            </Link>

                            {!session && (
                                <Link
                                    href="/auth/user"
                                    className="font-semibold text-lg bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 hover:bg-pink-600 text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2 w-full h-full min-h-[120px]"
                                >
                                    <LockIcon />
                                    <span>เข้าสู่ระบบ</span>
                                    <p className='text-base text-pink-200'>⟨ เฉพาะคุณครูและเจ้าหน้าที่ ⟩</p>
                                </Link>
                            )}

                            {session && session.role === 'user' && (
                                <Link
                                    href="/fee/students"
                                    className="font-semibold text-center text-lg bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:bg-green-500 text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2 w-full h-full min-h-[120px]"
                                >
                                    <PigMoneyIcon />
                                    <span>ตรวจสอบการชำระค่าบำรุงการศึกษารายห้อง</span>
                                    <p className='text-base text-green-200'>⟨ สำหรับคุณครูที่ปรึกษา ⟩</p>
                                </Link>
                            )}
                            {session && session.role === 'user' && session.data.role?.id === 3 && (
                                <Link
                                href={`/accounting`}
                                className="font-semibold text-lg bg-gradient-to-r col-span-1 from-violet-600 via-purple-500 to-violet-600 hover:bg-yellow-600 text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2 w-full h-full min-h-[120px]"
                                >
                                    <TheOfficialIcon />
                                    <span>บันทึกการชำระเงินค่าบำรุงการศึกษา</span>
                                    <p className='text-base text-violet-200'>⟨ สำหรับเจ้าหน้าที่การเงิน ⟩</p>
                                </Link>
                            )}

                            {session && session.role === 'user' && session.data.role?.id === 3 && (
                                <Link
                                    href={`/dashboard`}
                                    className="font-semibold text-lg bg-gradient-to-r col-span-1 from-slate-700 via-gray-500 to-slate-700 hover:bg-yellow-600 text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2 w-full h-full min-h-[120px]"
                                >
                                    <GraphIcon />
                                    <span>รายงานการชำระเงินค่าบำรุงการศึกษา</span>
                                    <p className='text-base text-gray-200'>⟨ สำหรับผู้บริหาร ⟩</p>
                                </Link>
                            )}

                            {session && session.role === 'user' && session.data.role?.id === 3 && (
                                <Link
                                    href={`/admin`}
                                    className="font-semibold text-lg col-span-1 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-400 hover:bg-yellow-600 text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2 w-full h-full min-h-[120px]"
                                >
                                    <LayoutDashboard />
                                    <span>จัดการระบบ</span>
                                    <p className='text-base text-yellow-100'>⟨ แอดมินและผู้รับผิดชอบ ⟩</p>
                                </Link>
                            )}


                            {session && (
                                <button
                                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                                    className="font-semibold text-lg col-span-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 hover:bg-cyan-600 text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center space-y-2 w-full h-full min-h-[120px]"
                                >
                                    <LogOut />
                                    <span>ออกจากระบบ</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <p className='text-2xl font-semibold text-center mt-10 m-2'>
                        คณะกรรมการพัฒนาโปแกรม
                    </p>
                    <div className="grid md:grid-cols-2 justify-center gap-2">
                        <div className="p-4 dark:shadow-rose-950 dark:from-pink-950 dark:via-rose-600 dark:to-pink-950 bg-gradient-to-r via-rose-300 from-pink-400 to-pink-400 w-full px-2 py-4 rounded-xl shadow-xl shadow-pink-300 drop-shadow-md">
                            <div className="flex items-center flex-col col-span-1 md:col-span-1 text-white justify-center">
                                <Image width={96} height={96} alt={`dr`} className='w-24 rounded-md object-cover bg-gradient-to-t from-blue-400 to-sky-400' src={drImg} />
                                <div className='text-center'>
                                    <div className='font-light dark:text-amber-100'>นายธรรมนูญ วิชาหา</div>
                                    <div className='font-light text-sm dark:text-amber-100'>⟨ ผู้อำนวยการโรงเรียน ⟩</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 dark:shadow-rose-950 dark:from-pink-950 dark:via-rose-600 dark:to-pink-950 bg-gradient-to-r via-rose-300 from-pink-400 to-pink-400 w-full px-2 py-4 rounded-xl shadow-xl shadow-pink-300 drop-shadow-md">
                            <div className="flex items-center flex-col text-white justify-center">
                                <Image alt={`Image`} width={96} height={96}  className='w-24 rounded-md object-cover' src={longuom} />
                                <div className='text-center'>
                                    <div className='font-light dark:text-amber-100'>นางสาวปาณิตา อาจวงษ์</div>
                                    <div className='font-light text-sm dark:text-amber-100'>⟨ รองผู้อำนวยการกลุ่มบริหารงบประมาณ ⟩</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 dark:shadow-rose-950 dark:from-pink-950 dark:via-rose-600 dark:to-pink-950 bg-gradient-to-r via-rose-300 from-pink-400 to-pink-400 w-full px-2 py-4 rounded-xl shadow-xl shadow-pink-300 drop-shadow-md">
                            <div className="flex items-center flex-col text-white justify-center">
                                <Image alt={`Image`} width={96} height={96}  className='w-24 rounded-md object-cover' src={mongkon} />
                                <div className='text-center'>
                                    <div className='font-light dark:text-amber-100'>นายมงคล ชนะดี</div>
                                    <div className='font-light text-sm dark:text-amber-100'>⟨ ที่ปรึกษา/แอดมิน ⟩</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 dark:shadow-rose-950 dark:from-pink-950 dark:via-rose-600 dark:to-pink-950 bg-gradient-to-r via-rose-300 from-pink-400 to-pink-400 w-full px-2 py-4 rounded-xl shadow-xl shadow-pink-300 drop-shadow-md">
                            <div className="flex items-center flex-col text-white justify-center">
                                <Image alt={`Image`} width={96} height={96}  className='w-24 rounded-md object-cover' src={mongkon} />
                                <div className='text-center'>
                                    <div className='font-light dark:text-amber-100'>นางสาวธรีดา เลาประเสริฐสุข</div>
                                    <div className='font-light text-sm dark:text-amber-100'>⟨ ที่ปรึกษา ⟩</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 dark:shadow-rose-950 dark:from-pink-950 dark:via-rose-600 dark:to-pink-950 bg-gradient-to-r via-rose-300 from-pink-400 to-pink-400 w-full px-2 py-4 rounded-xl shadow-xl shadow-pink-300 drop-shadow-md">
                            <div className="flex items-center flex-col text-white justify-center">
                                <Image alt={`Image`} width={96} height={96}  className='w-24 rounded-md object-cover' src={mongkon} />
                                <div className='text-center'>
                                    <div className='font-light dark:text-amber-100'>นายภาคภูมิ ทีดินดำ</div>
                                    <div className='font-light text-sm dark:text-amber-100'>⟨ ม.4/1 SMT15 FRONTEND/BACKEND ⟩</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 dark:shadow-rose-950 dark:from-pink-950 dark:via-rose-600 dark:to-pink-950 bg-gradient-to-r via-rose-300 from-pink-400 to-pink-400 w-full px-2 py-4 rounded-xl shadow-xl shadow-pink-300 drop-shadow-md">
                            <div className="flex items-center flex-col text-white justify-center">
                                <Image alt={`Image`} width={96} height={96}  className='w-24 rounded-md object-cover' src={Time} />
                                <div className='text-center'>
                                    <div className='font-light dark:text-amber-100'>นางสาวแทมมารีน ตาปราบ</div>
                                    <div className='font-light text-sm dark:text-amber-100'>⟨ ม.4/1 SMT15 UX/UI ⟩</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ChecklistIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
        <path d="M14 19l2 2l4 -4" />
        <path d="M9 8h4" />
        <path d="M9 12h2" />
    </svg>
);

const TheOfficialIcon = () => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-brand-ctemplar">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6.04 14.831l4.46 -4.331" />
        <path d="M12.555 20.82c4.55 -3.456 7.582 -8.639 8.426 -14.405a1.668 1.668 0 0 0 -.934 -1.767a19.647 19.647 0 0 0 -8.047 -1.648a19.647 19.647 0 0 0 -8.047 1.647a1.668 1.668 0 0 0 -.934 1.767c.844 5.766 3.875 10.95 8.426 14.406a.948 .948 0 0 0 1.11 0z" />
        <path d="M20 5c-2 0 -4.37 3.304 -8 6.644c-3.63 -3.34 -6 -6.644 -8 -6.644" />
        <path d="M17.738 15l-4.238 -4.5" />
    </svg>
);

const GraphIcon = () => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-graph">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M7 14l3 -3l2 2l3 -3l2 2" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        <path d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
        <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
    </svg>
);

const PigMoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 11v.01" />
        <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
        <path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" />
    </svg>
);


export default MainMenu;