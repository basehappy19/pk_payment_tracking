'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { EducationTerm, EducationTermData } from '@/app/types/Settings/Educations'
import { SubmitAddEducationTerm, SubmitEditEducationTerm, SubmitRemoveEducationTerm } from '@/app/action/settings/Educations'
import { toast } from 'react-toastify'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import TablePagination from './TablePagination'
import { Res } from '@/app/types/Settings/Response'
import { Label } from '../ui/label'
import { DeleteIconTable } from './IconOnBtnTable'
import { EditIcon } from 'lucide-react'

interface EducationTermEditProps {
  editingTerm: EducationTermData | null;
  setEditingTerm: (term: EducationTermData | null) => void;
  handleUpdateTerm: () => void;
}

export const ButtonSubmitFormAddEducationTerm = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type='submit'>{pending ? "กำลังโหลด..." : "เพิ่มภาคเรียนใหม่"}</Button>
  )
}

export const SearchEducationTerm = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  useEffect(() => {
    if (!text || text.trim() === '') {
      router.push(`/admin/education/terms`);
    } else {
      const debounceTimer = setTimeout(() => {
        router.push(`/admin/education/terms?search=${text}`);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [text, router]);

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="ค้นหาภาคเรียน..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export const EducationTermAdd = () => {
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    try {
      const res: Res = await SubmitAddEducationTerm(formData);
      toast[res.type](res.message,{position: 'bottom-right'});
      if(res.type !== 'error'){
        ref.current?.reset();
      }
    } catch (error) {
      console.error('Failed To Add Education Term:', error);
      toast.error('ไม่สามารถเพิ่มภาคเรียน กรุณาลองอีกครั้ง', { position: 'bottom-right' });
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
          placeholder="ระบุภาคเรียนใหม่"
          required
        />
        <ButtonSubmitFormAddEducationTerm />
      </div>
    </form>
  )
}

export const ListEducationTerms = ({ terms }: { terms: EducationTerm }) => {
  const [editingTerm, setEditingTerm] = useState<EducationTermData | null>(null);
  const handleEditTerm = (term: EducationTermData) => {
    setEditingTerm(term);
  };

  const handleUpdateTerm = async () => {
    try {
      if (!editingTerm) {
        return toast.error('ไม่สามารถแก้ไขภาคเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
      }
      const res: Res = await SubmitEditEducationTerm(editingTerm);
      toast[res.type](res.message,{position: 'bottom-right'});
      setEditingTerm(null);
    } catch (error) {
      console.error('Failed to Edit Education Term:', error);
      toast.error('ไม่สามารถแก้ไขภาคเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  const handleRemoveTerm = async (id: number) => {
    try {
      if (!id) {
        return toast.error('ไม่สามารถลบภาคเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
      }
      const res: Res = await SubmitRemoveEducationTerm(id);
      toast[res.type](res.message,{position: 'bottom-right'});
    } catch (error) {
      console.error('Failed to remove education term:', error);
      toast.error('ไม่สามารถลบภาคเรียนได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
    }
  };

  return (
    <>
      <TablePagination pagination={terms.pagination} />
      <Table className='dark:bg-neutral-900/30 bg-gray-100'>
        <TableHeader className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-zinc-800 dark:to-gray-800">
          <TableRow>
            <TableHead className='dark:text-slate-200 text-slate-700'>ภาคเรียน</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>สร้างเมื่อ</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700'>อัพเดทเมื่อ</TableHead>
            <TableHead className='dark:text-slate-200 text-slate-700' >จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {terms.data && terms.data.length > 0 ? (
            terms.data.map((term) => (
              <TableRow className='border-white border-b-4 dark:border-b-neutral-950' key={term.id}>
                <TableCell>{term.name}</TableCell>
                <TableCell className='text-blue-500'>{new Date(term.createdAt).toLocaleString()}</TableCell>
                <TableCell className='text-blue-500'>{new Date(term.updatedAt).toLocaleString()}</TableCell>
                <TableCell className='items-center justify-center flex flex-col md:flex-row gap-3'>
                  <Button variant="outline" className="w-full" onClick={() => handleEditTerm(term)}>
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
                        <AlertDialogAction onClick={() => handleRemoveTerm(Number(term.id))}>ลบ</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='text-center' colSpan={4}>ไม่พบภาคเรียน</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EducationTermEdit editingTerm={editingTerm} setEditingTerm={setEditingTerm} handleUpdateTerm={handleUpdateTerm} />
    </>
  )
}

export const EducationTermEdit: FC<EducationTermEditProps> = ({ editingTerm, setEditingTerm, handleUpdateTerm }) => {
  if (!editingTerm) return null;

  return (
    <AlertDialog open={!!editingTerm} onOpenChange={() => setEditingTerm(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>แก้ไขภาคเรียน</AlertDialogTitle>
        </AlertDialogHeader>
        <Label>
          ภาคเรียน
        </Label>
        <Input
          value={editingTerm.name}
          onChange={(e) => setEditingTerm({ ...editingTerm, name: e.target.value })}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setEditingTerm(null)}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdateTerm}>แก้ไข</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
