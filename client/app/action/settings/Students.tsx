'use server'

import { AddStudent, EditStudent, RemoveStudent } from "@/app/functions/settings/students/Students";
import { StudentData } from "@/app/types/Settings/Students";
import { revalidatePath } from "next/cache";

export async function SubmitAddStudent(formData: FormData) {
  const sid = Number(formData.get('sid')) as number | null;
  const cid = formData.get('cid') as string | null;
  const name = formData.get('name') as string | null;

  if (!sid) {
    return { message:"กรุณาระบุรหัสนักเรียน",type:"error" };
  }

  if (!cid || cid.trim() === '') {
    return { message:"กรุณาระบุเลขบัตรประชาชน",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุชื่อนักเรียน",type:"error" };
  }

  const res = await AddStudent({ sid, cid, name });

  revalidatePath('/admin/students');
  return res;
}

export async function SubmitEditStudent(student: StudentData) {
  const { sid, cid, name } = student

  if (!sid) {
    return { message:"ไม่สามารถแก้ไขนักเรียนได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!cid || cid.trim() === '') {
    return { message:"กรุณาระบุเลขบัตรประชาชน",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุชื่อนักเรียน",type:"error" };
  }
  
  const res = await EditStudent(student)
  revalidatePath('/admin/students');
  return res;
}

export async function SubmitRemoveStudent(sid: number) {
  if (!sid) {
    return { message:"ไม่สามารถลบนักเรียนได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveStudent(sid)
  revalidatePath('/admin/students');
  return res;
}
