'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from 'react-toastify'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import TablePagination from './TablePagination'
import { StudentReceipt, StudentReceiptData } from '@/app/types/Settings/Students'
import { SubmitAddStudentReceipt, SubmitEditStudentReceipt, SubmitRemoveStudentReceipt } from '@/app/action/settings/StudentReceipts'
import { Res } from '@/app/types/Settings/Response'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { EditIcon } from 'lucide-react'
import { DeleteIconTable } from './IconOnBtnTable'

interface StudentReceiptEditProps {
  receiptBookOptions: {
    receiptBooks: {
      id: number,
      name: string,
    }[]
  }
  editingStudentReceipt: StudentReceiptData | null;
  setEditingStudentReceipt: (studentReceipt: StudentReceiptData | null) => void;
  handleUpdateStudentReceipt: () => void;
}

export const ButtonSubmitFormAddStudentReceipt = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type='submit'>{pending ? "กำลังโหลด..." : "เพิ่มใบเสร็จนักเรียน"}</Button>
  )
}

export const SearchStudentReceipt = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  useEffect(() => {
    if (!text || text.trim() === '') {
      router.push(`/admin/studentReceipts`);
    } else {
      const debounceTimer = setTimeout(() => {
        router.push(`/admin/studentReceipts?search=${text}`);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [text, router]);

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="ค้นหาใบเสร็จนักเรียน..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

interface StudentReceiptAdd {
  receiptBookOptions: {
    receiptBooks: {
      id: number,
      name: string,
      total_page: number,
    }[]
  }
}

export const StudentReceiptAdd: FC<StudentReceiptAdd> = ({ receiptBookOptions }) => {
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    try {
      const res: Res = await SubmitAddStudentReceipt(formData);

      toast[res.type](res.message,{position: 'bottom-right'});
      if (res.type !== 'error') {
        ref.current?.reset();
        setSelectedValues({
          receiptBook: '',
        });
      }
    } catch (error) {
      console.error('Failed to add studentReceipt:', error);
      toast.error('ไม่สามารถเพื่มใบเสร็จนักเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedValues, setSelectedValues] = useState({
    receiptBook: '',
  });

  return (
    <form ref={ref} action={async (formData: FormData) => {
      await handleSubmit(formData)
    }} method="post">
      <div className="flex space-x-2">
        <Input
          type="number"
          name="student_sid"
          placeholder="ระบุรหัสนักเรียน"
          required
        />
        <Input
          type="number"
          name="amount"
          placeholder="ระบุจำนวนเงิน"
          required
        />
        <div className='w-full'>
          <Select name='receiptBook'
            value={selectedValues.receiptBook}
            onValueChange={(value) => handleSelectChange('receiptBook', value)}>
            <SelectTrigger id="receiptBook">
              <SelectValue placeholder="เลือกเล่มใบเสร็จ" />
            </SelectTrigger>
            <SelectContent>
              {receiptBookOptions.receiptBooks.map((receiptBook) => (
                <SelectItem key={receiptBook.id} value={receiptBook.id.toString()}>
                  {receiptBook.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          type="number"
          name="receiptNo"
          placeholder="เล่มที่"
          required
        />
        <ButtonSubmitFormAddStudentReceipt />
      </div>
    </form>
  )
}

export const ListStudentReceipts = ({ studentReceipts, receiptBookOptions }: { studentReceipts: StudentReceipt, receiptBookOptions: { receiptBooks: { id: number, name: string, total_page: number }[] } }) => {
  const [editingStudentReceipt, setEditingStudentReceipt] = useState<StudentReceiptData | null>(null);
  const handleEditStudentReceipt = (studentReceipt: StudentReceiptData) => {
    setEditingStudentReceipt(studentReceipt);
  };

  const handleUpdateStudentReceipt = async () => {
    try {
      if (!editingStudentReceipt) {
        return toast.error('ไม่สามารถแก้ไขใบเสร็จนักเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
      }

      const res: Res = await SubmitEditStudentReceipt(editingStudentReceipt);

      toast[res.type](res.message,{position: 'bottom-right'});
      setEditingStudentReceipt(null);
    } catch (error) {
      console.error('Failed to edit studentReceipt:', error);
      toast.error('ไม่สามารถแก้ไขใบเสร็จนักเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  const handleRemoveStudentReceipt = async (id: number) => {
    try {
      if (!id) {
        return toast.error('ไม่สามารถลบใบเสร็จนักเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
      }
      const res: Res = await SubmitRemoveStudentReceipt(id);
      toast[res.type](res.message,{position: 'bottom-right'});
    } catch (error) {
      console.error('Failed to remove studentReceipt:', error);
      toast.error('ไม่สามารถลบใบเสร็จนักเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  return (
    <>
      <TablePagination pagination={studentReceipts.pagination} />
      <Table className='dark:bg-neutral-900/30 bg-gray-100'>
        <TableHeader className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-zinc-800 dark:to-gray-800">
          <TableRow>
            <TableHead className='dark:text-slate-200 text-slate-700'>รหัสนักเรียน</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>จำนวน</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>เล่มใบเสร็จ</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>เล่มที่</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>สร้างเมื่อ</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>อัพเดทเมื่อ</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentReceipts.data && studentReceipts.data.length > 0 ? (
            studentReceipts.data.map((studentReceipt) => (
              <TableRow className='border-white border-b-4 dark:border-b-neutral-950' key={studentReceipt.id}>
                <TableCell>{studentReceipt.studentInClassroom.student_sid}</TableCell>
                <TableCell>{studentReceipt.amount}</TableCell>
                <TableCell>{studentReceipt.receiptBook.name}</TableCell>
                <TableCell>{studentReceipt.receipt_no}</TableCell>
                <TableCell className='text-blue-500'>{new Date(studentReceipt.createdAt).toLocaleString()}</TableCell>
                <TableCell className='text-blue-500'>{new Date(studentReceipt.updatedAt).toLocaleString()}</TableCell>
                <TableCell className='items-center justify-center flex flex-col md:flex-row gap-3'>
                  <Button variant="outline" className="w-full" onClick={() => handleEditStudentReceipt(studentReceipt)}>
                    <EditIcon/>
                    แก้ไข
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className='w-full' variant="destructive">
                        <DeleteIconTable/>
                        ลบ
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>กรุณายืนยัน</AlertDialogTitle>
                        <AlertDialogDescription>
                          การลบนี้ไม่สามารถกู้คืนได้
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemoveStudentReceipt(Number(studentReceipt.id))}>ลบ</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='text-center' colSpan={6}>ไม่พบใบเสร็จนักเรียน</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <StudentReceiptEdit receiptBookOptions={receiptBookOptions} editingStudentReceipt={editingStudentReceipt} setEditingStudentReceipt={setEditingStudentReceipt} handleUpdateStudentReceipt={handleUpdateStudentReceipt} />
    </>
  )
}

export const StudentReceiptEdit: FC<StudentReceiptEditProps> = ({ receiptBookOptions, editingStudentReceipt, setEditingStudentReceipt, handleUpdateStudentReceipt }) => {
  if (!editingStudentReceipt) return null;

  return (
    <AlertDialog open={!!editingStudentReceipt} onOpenChange={() => setEditingStudentReceipt(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>แก้ไขใบเสร็จนักเรียน</AlertDialogTitle>
        </AlertDialogHeader>
        <Label>รหัสนักเรียน</Label>
        <Input
          type='number'
          value={editingStudentReceipt.studentInClassroom.student_sid}
          onChange={(e) =>
            setEditingStudentReceipt({
              ...editingStudentReceipt,
              studentInClassroom: {
                ...editingStudentReceipt.studentInClassroom,
                student_sid: Number(e.target.value),
              },
            })
          }
        />
        <Label>จำนวน</Label>
        <Input
          type='number'
          value={editingStudentReceipt.amount}
          onChange={(e) => setEditingStudentReceipt({ ...editingStudentReceipt, amount: Number(e.target.value) })}
        />
        <Label>เล่มใบเสร็จ</Label>
        <div className="w-full">
          <Select
            defaultValue={
              receiptBookOptions.receiptBooks.find((receiptBook) => editingStudentReceipt.receiptBook.id === receiptBook.id)?.id.toString() || ''
            }
            onValueChange={(value) => setEditingStudentReceipt({ ...editingStudentReceipt, receiptBook: { id: parseInt(value), name: editingStudentReceipt.receiptBook.name, total_page: editingStudentReceipt.receiptBook.total_page } })}
            name="level"
          >
            <SelectTrigger id="level">
              <SelectValue placeholder="เลือกเล่มใบเสร็จ" />
            </SelectTrigger>
            <SelectContent>
              {receiptBookOptions.receiptBooks.map((receiptBook) => (
                <SelectItem key={receiptBook.id} value={receiptBook.id.toString()}>
                  {receiptBook.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Label>เล่มที่</Label>
        <Input
          type='number'
          value={editingStudentReceipt.receipt_no}
          onChange={(e) => setEditingStudentReceipt({ ...editingStudentReceipt, receipt_no: Number(e.target.value) })}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setEditingStudentReceipt(null)}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdateStudentReceipt}>แก้ไข</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};