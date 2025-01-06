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
import { ReceiptBook, ReceiptBookData } from '@/app/types/Settings/ReceiptBooks'
import { SubmitAddReceiptBook, SubmitEditReceiptBook, SubmitRemoveReceiptBook } from '@/app/action/settings/ReceiptBooks'
import { Res } from '@/app/types/Settings/Response'
import { Label } from '../ui/label'
import { EditIcon } from 'lucide-react'
import { DeleteIconTable } from './IconOnBtnTable'

interface ReceiptBookEditProps {
  editingReceiptBook: ReceiptBookData | null;
  setEditingReceiptBook: (receiptBook: ReceiptBookData | null) => void;
  handleUpdateReceiptBook: () => void;
}

export const ButtonSubmitFormAddReceiptBook = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type='submit'>{pending ? "กำลังโหลด..." : "เพิ่มเล่มใบเสร็จ"}</Button>
  )
}

export const SearchReceiptBook = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  useEffect(() => {
    if (!text || text.trim() === '') {
      router.push(`/admin/receiptBooks`);
    } else {
      const debounceTimer = setTimeout(() => {
        router.push(`/admin/receiptBooks?search=${text}`);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [text, router]);

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="ค้นหาเล่มใบเสร็จ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export const ReceiptBookAdd = () => {
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    try {
      const res: Res = await SubmitAddReceiptBook(formData);
      toast[res.type](res.message,{position: 'bottom-right'});
      if(res.type !== 'error'){
        ref.current?.reset();
      }
    } catch (error) {
      console.error('Failed to add receiptBook:', error);
      toast.error('ไม่สามารถเพื่มเล่มใบเสร็จได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  return (
    <form ref={ref} action={async (formData: FormData) => {
      await handleSubmit(formData)
    }} method="post">
      <div className="flex space-x-2">
        <Input
          type="text"
          name="name"
          placeholder="ระบุชื่อเล่มใบเสร็จใหม่"
          required
        />
        <Input
          type="number"
          name="total_page"
          placeholder="ระบุจำนวนหน้าทั้งหมด"
          required
        />
        <ButtonSubmitFormAddReceiptBook />
      </div>
    </form>
  )
}

export const ListReceiptBooks = ({ receiptBooks }: { receiptBooks: ReceiptBook }) => {
  const [editingReceiptBook, setEditingReceiptBook] = useState<ReceiptBookData | null>(null);
  const handleEditReceiptBook = (receiptBook: ReceiptBookData) => {
    setEditingReceiptBook(receiptBook);
  };

  const handleUpdateReceiptBook = async () => {
    try {
      if (!editingReceiptBook) {
        return toast.error('ไม่สามารถแก้ไขเล่มใบเสร็จได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
      }
      const res: Res = await SubmitEditReceiptBook(editingReceiptBook);
      toast[res.type](res.message,{position: 'bottom-right'});
      setEditingReceiptBook(null);
    } catch (error) {
      console.error('Failed to edit receiptBook:', error);
      toast.error('ไม่สามารถแก้ไขเล่มใบเสร็จได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  const handleRemoveReceiptBook = async (id: number) => {
    try {      
      if (!id) {
        return toast.error('ไม่สามารถลบเล่มใบเสร็จได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
      }
      const res: Res = await SubmitRemoveReceiptBook(id);
      toast[res.type](res.message,{position: 'bottom-right'});
    } catch (error) {
      console.error('Failed to remove receiptBook:', error);
      toast.error('ไม่สามารถลบเล่มใบเสร็จได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  return (
    <>
      <TablePagination pagination={receiptBooks.pagination} />
      <Table className='dark:bg-neutral-900/30 bg-gray-100'>
        <TableHeader className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-zinc-800 dark:to-gray-800">
          <TableRow>
            <TableHead className='dark:text-slate-200 text-slate-700'>ชื่อเล่ม</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>จำนวนหน้า</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>สร้างเมื่อ</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>อัพเดทเมื่อ</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receiptBooks.data && receiptBooks.data.length > 0 ? (
            receiptBooks.data.map((receiptBook) => (
              <TableRow className='border-white border-b-4 dark:border-b-neutral-950' key={receiptBook.id}>
                <TableCell>{receiptBook.name}</TableCell>
                <TableCell>{receiptBook.total_page}</TableCell>
                <TableCell className='text-blue-500'>{new Date(receiptBook.createdAt).toLocaleString()}</TableCell>
                <TableCell className='text-blue-500'>{new Date(receiptBook.updatedAt).toLocaleString()}</TableCell>
                <TableCell className='items-center justify-center flex flex-col md:flex-row gap-3'>
                  <Button variant="outline" className="w-full" onClick={() => handleEditReceiptBook(receiptBook)}>
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
                        <AlertDialogAction onClick={() => handleRemoveReceiptBook(Number(receiptBook.id))}>ลบ</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='text-center' colSpan={5}>ไม่พบเล่มใบเสร็จ</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ReceiptBookEdit editingReceiptBook={editingReceiptBook} setEditingReceiptBook={setEditingReceiptBook} handleUpdateReceiptBook={handleUpdateReceiptBook} />
    </>
  )
}

export const ReceiptBookEdit: FC<ReceiptBookEditProps> = ({ editingReceiptBook, setEditingReceiptBook, handleUpdateReceiptBook }) => {
  if (!editingReceiptBook) return null;

  return (
    <AlertDialog open={!!editingReceiptBook} onOpenChange={() => setEditingReceiptBook(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>แก้ไขเล่มใบเสร็จ</AlertDialogTitle>
        </AlertDialogHeader>
        <Label>ชื่อเล่ม</Label>
        <Input
          value={editingReceiptBook.name}
          onChange={(e) => setEditingReceiptBook({ ...editingReceiptBook, name: e.target.value })}
        />
        <Label>จำนวนหน้าทั้งหมด</Label>
        <Input
          value={editingReceiptBook.total_page}
          onChange={(e) => setEditingReceiptBook({ ...editingReceiptBook, total_page: Number(e.target.value) })}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setEditingReceiptBook(null)}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdateReceiptBook}>แก้ไข</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};