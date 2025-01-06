'use client'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CheckFeeStudentAll } from '@/app/functions/fees/CheckFee'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { useUser } from '@/app/contexts/User'
import StudentCard from './StudentCard'
import { Student } from '@/app/types/Students'
import { Fee } from '@/app/types/Fee'

interface studentFeeInClassroom {
    students: Student[],
    classroom: ClassroomFees
}

interface ClassroomFees {
    fees: FeeItem[];
    total_fee_amount: number;
    total_students: number;
    total_fee_for_all_students?: number;
    total_paid_by_all_students?: number;
    total_paid_students?: number;
    total_missing_students?: number,
    remaining_amount?: number,

}

interface FeeItem {
    fee: Fee;
}

interface StudentFeeInClassroomsProps {
    onLoading: (isLoading: boolean) => void;
    year: string,
    term: string,
    level: string,
    room: string,
}

const StudentFeeInClassrooms: FC<StudentFeeInClassroomsProps> = ({ onLoading, year, term, level, room }) => {
    const user = useUser();

    const [studentFeeInClassroom, setStudentFeeInClassroom] = useState<studentFeeInClassroom>({
        students: [],
        classroom: {
            fees: [],
            total_fee_amount: 0,
            total_students: 0,
        },
    });


    const getStudentFeeInClassroom = useCallback(
        async (year: string, term: string, level: string, room: string) => {
          try {
            const res = await CheckFeeStudentAll(year, term, level, room);
            setStudentFeeInClassroom(res);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            onLoading(false);
          }
        },
        [onLoading] 
    );
      

    useEffect(() => {
        if (year && term && level && room) {
            getStudentFeeInClassroom(year, term, level, room);
        };
    }, [year, term, level, room, getStudentFeeInClassroom])


    if (!studentFeeInClassroom) {
        return <div className='w-full flex justify-center'>ไม่มีข้อมูลห้องเรียน</div>
    }
    

    return (
        <div>
            {studentFeeInClassroom.students.length > 0 && (
                <Card className='mb-8 dark:bg-zinc-900 dark:border-stone-700/50 border-2 border-pink-300/65 bg-pink-100/80'>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">ค่าบำรุงการศึกษาทั้งหมด</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {studentFeeInClassroom.classroom.fees.length > 0 ? (
                            <ScrollArea className="h-[50px] pr-4">
                                {studentFeeInClassroom.classroom.fees.map((fee, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex justify-between items-center py-2 text-lg">
                                            <span className="font-medium">{fee.fee.name}</span>
                                            <span>{fee.fee.amount} บาท</span>
                                        </div>
                                        {index < studentFeeInClassroom.classroom.fees.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </ScrollArea>
                        ) : (
                            <div className='w-full flex justify-center'>ไม่มีข้อมูลค่าบำรุงการศึกษา</div>
                        )}
                        <Separator className="my-4 border-b-2 border-pink-300/65 dark:border-stone-700/50" />
                        <div className="flex justify-between items-center font-semibold text-lg">
                            <span>รวมค่าบำรุงการศึกษาทั้งหมด</span>
                            <span>{studentFeeInClassroom.classroom.total_fee_amount} บาท</span>
                        </div>
                        {user && (user?.data.role?.id == 2 || user?.data.role?.id == 3) && (
                            <React.Fragment>
                                <Separator className="my-4 border-b-2 border-pink-300/65 dark:border-stone-700/50" />
                                <div className="flex justify-between items-center font-semibold text-lg">
                                    <span>จำนวนนักเรียน {studentFeeInClassroom.classroom.total_students} คน รวมเป็นทั้งสิ้น</span>
                                    <span>{studentFeeInClassroom.classroom.total_fee_for_all_students} บาท</span>
                                </div>
                                <Separator className="my-4 border-b-2 border-pink-300/65 dark:border-stone-700/50" />
                                <div className="flex justify-between items-center font-semibold text-lg text-green-500">
                                    <span>ชำระไปแล้ว {studentFeeInClassroom.classroom.total_paid_students} คน รวมทั้งสิ้น</span>
                                    <span>{studentFeeInClassroom.classroom.total_paid_by_all_students} บาท</span>
                                </div>
                                <Separator className="my-4 border-b-2 border-pink-300/65 dark:border-stone-700/50" />
                                <div className="flex justify-between items-center font-semibold text-lg text-red-500">
                                    <span>ขาดอีก {studentFeeInClassroom.classroom.total_missing_students} คน รวมทั้งสิ้น</span>
                                    <span>{studentFeeInClassroom.classroom.remaining_amount} บาท</span>
                                </div>
                            </React.Fragment>
                        )}
                    </CardContent>
                </Card>
            )}
            {studentFeeInClassroom.students.length > 0 && (
                <Card className='dark:bg-zinc-900 dark:border-stone-700/50 border-2 border-pink-300/65 bg-pink-100/80'>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">รายชื่อนักเรียน</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {studentFeeInClassroom.students.map((student) => (
                                <StudentCard key={student.student_sid} student={student} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default StudentFeeInClassrooms