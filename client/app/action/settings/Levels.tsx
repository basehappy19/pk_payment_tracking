'use server'

import { AddLevel, EditLevel, RemoveLevel } from "@/app/functions/settings/levels/Levels";
import { LevelData } from "@/app/types/Settings/Levels";
import { revalidatePath } from "next/cache";

export async function SubmitAddLevel(formData: FormData) {
  const name = formData.get('name') as string | null;

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุระดับชั้น",type:"error" };
  }

  const res = await AddLevel({ name });

  revalidatePath('/admin/education/levels');
  return res;
}

export async function SubmitEditLevel(level: LevelData) {
  const { id, name } = level

  if (!id) {
    return { message:"ไม่สามารถแก้ไขระดับชั้นได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุระดับชั้น",type:"error" };
  }
  
  const res = await EditLevel(level)
  revalidatePath('/admin/levels');
  return res;
}

export async function SubmitRemoveLevel(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบระดับชั้นได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveLevel(id)
  revalidatePath('/admin/levels');
  return res;
}
