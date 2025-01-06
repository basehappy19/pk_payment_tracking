'use server'

import { AddFee, EditFee, RemoveFee } from "@/app/functions/settings/fees/Fees";
import { FeeData } from "@/app/types/Settings/Fees";
import { revalidatePath } from "next/cache";

export async function SubmitAddFee(formData: FormData) {
  const amount = Number(formData.get('amount')) as number;
  const name = formData.get('name') as string | null;
  const education_year = Number(formData.get('education_year')) as number;
  const education_term = Number(formData.get('education_term')) as number;

  if (!amount) {
    return { message:"กรุณาระบุจำนวนเงิน",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุชื่อค่าบำรุงการศึกษา",type:"error" };
  }

  if (!education_year) {
    return { message:"กรุณาระบุปีการศึกษา",type:"error" };
  }

  if (!education_term) {
    return { message:"กรุณาระบุภาคเรียน",type:"error" };
  }

  const res = await AddFee({ amount, name, education_year, education_term });
  revalidatePath('/admin/fee/classrooms');
  return res;
}

export async function SubmitEditFee(fee: FeeData) {
  const { id, amount, name, education_year, education_term } = fee

  if (!id) {
    return { message:"ไม่สามารถแก้ไขค่าบำรุงการศึกษาได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!amount) {
    return { message:"กรุณาระบุจำนวนเงิน",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุชื่อค่าบำรุงการศึกษา",type:"error" };
  }

  if (!education_year) {
    return { message:"กรุณาระบุปีการศึกษา",type:"error" };
  }

  if (!education_term) {
    return { message:"กรุณาระบุภาคเรียน",type:"error" };
  }
  
  const res = await EditFee(fee)
  revalidatePath('/admin/fee/classrooms');
  return res;
}

export async function SubmitRemoveFee(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบค่าบำรุงการศึกษาได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveFee(id)
  revalidatePath('/admin/fee/classrooms');
  return res;
}
