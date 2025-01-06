'use server'

import { AddReceiptBook, EditReceiptBook, RemoveReceiptBook } from "@/app/functions/settings/receiptBooks/ReceiptBooks";
import { ReceiptBookData } from "@/app/types/Settings/ReceiptBooks";
import { revalidatePath } from "next/cache";

export async function SubmitAddReceiptBook(formData: FormData) {
  const name = formData.get('name') as string | null;
  const total_page = Number(formData.get('total_page')) as number | null;

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุชื่อเล่มใบเสร็จ",type:"error" };
  }

  if (total_page === 0) {
    return { message:"จำนวนหน้าทั้งหมดต้องไม่เท่ากับ 0",type:"error" };
  }

  if (!total_page) {
    return { message:"กรุณาระบุจำนวนหน้าทั้งหมด",type:"error" };
  }

  const res = await AddReceiptBook({ name:name, total_page: total_page });

  revalidatePath('/admin/education/receiptBooks');
  return res;
}

export async function SubmitEditReceiptBook(receiptBook: ReceiptBookData) {
  const { id, name, total_page } = receiptBook

  if (!id) {
    return { message:"ไม่สามารถแก้ไขเล่มใบเสร็จได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุชื่อเล่มใบเสร็จ",type:"error" };
  }

  if (!total_page) {
    return { message:"กรุณาระบุจำนวนหน้าทั้งหมด",type:"error" };
  }
  
  const res = await EditReceiptBook(receiptBook)
  revalidatePath('/admin/receiptBooks');
  return res;
}

export async function SubmitRemoveReceiptBook(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบเล่มใบเสร็จได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveReceiptBook(id)
  revalidatePath('/admin/receiptBooks');
  return res;
}
