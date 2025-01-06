'use client'
import React, { FC, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Student } from '@/app/types/Students';
import { useUser } from '@/app/contexts/User';
import Image from 'next/image';

const getPaymentStatusBadge = (payStatus: string) => {
    switch (payStatus) {
      case 'done':
        return <div className='text-green-500 dark:text-green-800 font-semibold'>ชำระครบเรียบร้อย</div>;
      case 'paying':
        return <div className='text-orange-500 dark:text-orange-800 font-semibold'>อยู่ระหว่างชำระ</div>;
      default:
        return <div className='text-red-500 dark:text-red-800 font-semibold'>ยังไม่ชำระ</div>;
    }
  };  
interface StudentCardProps {
    student: Student
}

const StudentCard: FC<StudentCardProps> = ({ student }) => {
    const [isReceiptsOpen, setIsReceiptsOpen] = useState<boolean>(false);
    const user = useUser();
    
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <Image quality={90} width={48} height={48} src={`${process.env.NEXT_PUBLIC_STUDENT_PROFILE_IMG}/${student.student.profileImg}`} alt={student.student_sid.toString()} className="rounded-md mr-4" />
                    <div>
                        <p className="font-semibold text-md">{student.student.name}</p>
                        <p className="text-sm text-gray-500">รหัสนักเรียน: {student.student_sid.toString()}</p>
                    </div>
                </div>

                {(user?.data.role?.id === 2 || user?.data.role?.id === 3) && (
                    <div>
                        <div className="flex justify-between items-center mt-2">
                            {getPaymentStatusBadge(student.pay_status)}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs p-1"
                                onClick={() => setIsReceiptsOpen(!isReceiptsOpen)}
                            >
                                {isReceiptsOpen ? 'ซ่อน' : 'แสดง'}เล่มใบเสร็จ
                                {isReceiptsOpen ? (
                                    <ChevronUp className="ml-1 h-3 w-3" />
                                ) : (
                                    <ChevronDown className="ml-1 h-3 w-3" />
                                )}
                            </Button>
                        </div>

                        {isReceiptsOpen && (
                            student.studentReceipts.length > 0 ? (
                                <div className="mt-3 space-y-2 text-sm">
                                    {student.studentReceipts.map((receipt, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-100 dark:bg-gray-700 p-2 rounded"
                                        >
                                            <p className="font-medium">
                                                {receipt.receiptBook.name}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {receipt.amount} บาท
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-sm mt-3">
                                    นักเรียนไม่มีเล่มใบเสร็จ
                                </div>
                            )
                        )}
                    </div>
                )}

            </CardContent>
        </Card>
    );
};

export default StudentCard;