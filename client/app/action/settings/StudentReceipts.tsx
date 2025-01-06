'use server'

import { AddStudentReceipt, EditStudentReceipt, RemoveStudentReceipt } from "@/app/functions/settings/students/StudentReceipt";
import { StudentReceiptData } from "@/app/types/Settings/Students";
import { revalidatePath } from "next/cache";

export async function SubmitAddStudentReceipt(formData: FormData) {
  const student_sid = Number(formData.get('student_sid')) as number | null;
  const amount = Number(formData.get('amount')) as number | null;
  const receiptBook = Number(formData.get('receiptBook')) as number | null;
  const receiptNo = Number(formData.get('receiptNo')) as number | null;

  if (!student_sid) {
    return { message:"กรุณาเลือกนักเรียน",type:"error" };
  }

  if (!amount) {
    return { message:"กรุณาระบุจำนวนเงิน",type:"error" };
  }

  if (!receiptBook) {
    return { message:"กรุณาเลือกเล่มใบเสร็จ",type:"error" };
  }

  if (!receiptNo) {
    return { message:"กรุณาระบุเล่มที่",type:"error" };
  }

  const res = await AddStudentReceipt({ student_sid, amount, receiptBook, receiptNo });

  revalidatePath('/admin/studentReceipts');
  return res;
}

export async function SubmitEditStudentReceipt(student: StudentReceiptData) {
  const { id, studentInClassroom, amount, receiptBook } = student

  if (!id) {
    return { message:"ไม่สามารถแก้ไขใบเสร็จนักเรียนได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!studentInClassroom) {
    return { message:"กรุณาระบุรหัสนักเรียน",type:"error" };
  }

  if (!amount) {
    return { message:"กรุณาระบุจำนวนเงิน",type:"error" };
  }

  if (!receiptBook) {
    return { message:"กรุณาเลือกเล่มใบเสร็จ",type:"error" };
  }
  
  const res = await EditStudentReceipt(student)
  revalidatePath('/admin/students');
  return res;
}

export async function SubmitRemoveStudentReceipt(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบใบเสร็จนักเรียนได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveStudentReceipt(id)
  revalidatePath('/admin/students');
  return res;
}
