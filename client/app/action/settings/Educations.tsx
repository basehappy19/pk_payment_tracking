'use server'

import { AddEducationTerm, AddEducationYear, EditEducationTerm, EditEducationYear, RemoveEducationTerm, RemoveEducationYear } from "@/app/functions/settings/educations/Educations";
import { EducationTermData, EducationYearData } from "@/app/types/Settings/Educations";
import { revalidatePath } from "next/cache";

export async function SubmitAddEducationYear(formData: FormData) {
  const name = formData.get('name') as string | null;

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุปีการศึกษา",type:"error" };
  }

  const res = await AddEducationYear({ name });
  revalidatePath('/admin/education/years');
  return res;
}

export async function SubmitEditEducationYear(year: EducationYearData) {
  const { id, name } = year

  if (!id) {
    return { message:"ไม่สามารถแก้ไขปีการศึกษาได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุปีการศึกษา",type:"error" };

  }
  
  const res = await EditEducationYear(year)
  revalidatePath('/admin/education/years');
  return res;
}

export async function SubmitRemoveEducationYear(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบปีการศึกษาได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveEducationYear(id)
  revalidatePath('/admin/education/years');
  return res;
}

export async function SubmitAddEducationTerm(formData: FormData) {
  const name = formData.get('name') as string | null;

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุภาคเรียน",type:"error" };
  }

  const res = await AddEducationTerm({ name });

  revalidatePath('/admin/education/terms');
  return res;
}

export async function SubmitEditEducationTerm(term: EducationTermData) {
  const { id, name } = term

  if (!id) {
    return { message:"ไม่สามารถแก้ไขภาคเรียนได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"ชื่อภาคเรียนไม่ถูกต้อง",type:"error" };
  }
  
  const res = await EditEducationTerm(term)
  revalidatePath('/admin/education/terms');
  return res;
}

export async function SubmitRemoveEducationTerm(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบภาคเรียนได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveEducationTerm(id)
  revalidatePath('/admin/education/terms');
  return res;
}
