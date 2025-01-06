import React from 'react';
import { CheckFeeStudent } from '@/app/functions/fees/CheckFee';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Metadata } from 'next'
import NextPrvFees from '@/components/NextPrvFees';
import ExportVerifyPdf from '@/components/ExportVerifyPdf';


export async function generateMetadata(): Promise<Metadata> {
  const status: Status = await CheckFeeStudent({ index: undefined });

  return {
    title: `ค่าบำรุงการศึกษาของ ${status.name} | โรงเรียนภูเขียว`,
    description: 'ระบบตรวจสอบค่าบำรุงการศึกษา โรงเรียนภูเขียว',
  }
}

export interface StudentInClassroom {
  id: number;
  no: number;
  pay_status: string;
  classroom: {
    level: {
      name: string;
    };
    room: {
      name: string;
    };
    education_year: {
      name: string;
    };
    education_term: {
      name: string;
    };
    feeForClassrooms: [{
      id: number;
      fee: {
        amount: string;
        name: string;
      };
    }];

  };
  createdAt: string,
  updatedAt: string;
  total_fee_amount: number;
}
export interface Status {
  sid: number;
  name: string;
  profileImg: string;
  studentInClassroom: StudentInClassroom
  studentInClassrooms: StudentInClassroom[]
  pagination: StatusPagination
}

export interface StatusPagination {
  next: {
    data: StudentInClassroom,
    index: number,
  },
  prev: {
    data: StudentInClassroom,
    index: number,
  },
  current: number,
  total: number,
}

export default async function StudentDashboard({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const index = typeof searchParams.index === 'string' ? searchParams.index : undefined;
  const status: Status = await CheckFeeStudent({ index: index });

  const getPaymentStatusBadge = (payStatus: string) => {
    switch (payStatus) {
      case 'done':
        return <div className='text-green-500 dark:text-green-600 font-semibold'>ชำระครบเรียบร้อย</div>;
      case 'paying':
        return <div className='text-orange-500 dark:text-orange-600 font-semibold'>อยู่ระหว่างชำระ</div>;
      default:
        return <div className='text-red-500 dark:text-red-600 font-semibold'>ยังไม่ชำระ</div>;
    }
  }; 
   
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ตรวจสอบการชำระค่าบำรุงการศึกษา</h1>
        <p className="text-xl dark:text-pink-400 mt-2 text-pink-500">
          ประจำปีการศึกษา {status.studentInClassroom.classroom.education_year.name} เทอม {status.studentInClassroom.classroom.education_term.name}
        </p>
      </div>
      <Card className='dark:bg-zinc-900 bg-pink-100/80 border dark:border-stone-700/50 border-pink-300/65 border-2'>
        <CardHeader>
          <CardTitle>สวัสดี, {status.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">ยอดค่าบำรุงการศึกษาทั้งหมด</h3>
              <p className="text-3xl font-bold text-blue-500">{status.studentInClassroom.total_fee_amount.toString()} บาท</p>

            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">สถานะการชำระเงิน</h3>
              <p className='text-lg dark:text-red-400'>
                {getPaymentStatusBadge(status.studentInClassroom.pay_status)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card className='dark:bg-zinc-900 dark:border-stone-700/50 border-2 border-pink-300/65 bg-pink-100/80'>
        <CardHeader>
          <CardTitle>การชำระค่าบำรุงการศึกษา รายปีการศึกษา</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className='text-md'>
            <TableHeader>
              <TableRow className='bg-fuchsia-200/50 dark:bg-fuchsia-800/50 border-b-2 border-pink-300/65 dark:border-stone-700/50'>
                <TableHead>ภาคเรียน/ปีการศึกษา</TableHead>
                <TableHead>ระดับชั้น/ห้อง</TableHead>
                <TableHead>จำนวนเงิน</TableHead>
                <TableHead className="text-right">สถานะการชำระเงิน</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status.studentInClassrooms.map((studentInClassroom) => (
                <TableRow key={studentInClassroom.id}>
                  <TableCell>{studentInClassroom.classroom.education_term.name}/{studentInClassroom.classroom.education_year.name}</TableCell>
                  <TableCell>{studentInClassroom.classroom.level.name}/{studentInClassroom.classroom.room.name}</TableCell>
                  <TableCell>{studentInClassroom.total_fee_amount} บาท</TableCell>
                  <TableCell className="text-right">{getPaymentStatusBadge(studentInClassroom.pay_status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ExportVerifyPdf />
        </CardContent>
      </Card>
      <NextPrvFees pagination={status.pagination} />


      <Card className='dark:bg-zinc-900 dark:border-stone-700/50 border-2 border-pink-300/65 bg-pink-100/80'>
        <CardHeader>
          <CardTitle>รายการชำระทั้งหมด</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className='border-b-2 border-pink-300/65 dark:border-stone-700/50'>
                <TableHead className='text-lg'>รายการ</TableHead>
                <TableHead className="text-right text-lg">จำนวนเงิน</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='text-lg'>
              {status.studentInClassroom.classroom.feeForClassrooms.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.fee.name}</TableCell>
                  <TableCell className="text-right">{fee.fee.amount.toString()} บาท</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}