'use server'

import { AddClassroom, EditClassroom, RemoveClassroom } from "@/app/functions/settings/classrooms/Classrooms";
import { AddFeeForClassroom, EditFeeForClassroom, RemoveFeeForClassroom } from "@/app/functions/settings/classrooms/Fees";
import { ClassroomData, FeeForClassroomData } from "@/app/types/Settings/Classrooms";
import { revalidatePath } from "next/cache";

export async function SubmitAddClassroom(formData: FormData) {
  const education_year = formData.get('education_year') as string;
  const education_term = formData.get('education_term') as string;
  const level = formData.get('level') as string;
  const room = formData.get('room') as string;

  if (!education_year) {
    return { message:"กรุณาระบุปีการศึกษา",type:"error" };
  }

  if (!education_term) {
    return { message:"กรุณาระบุภาคเรียน",type:"error" };
  }

  if (!level) {
    return { message:"กรุณาระบุระดับชั้น",type:"error" };
  }

  if (!room) {
    return { message:"กรุณาระบุห้อง",type:"error" };
  }

  const res = await AddClassroom({ education_year: parseInt(education_year), education_term: parseInt(education_term), level: parseInt(level), room: parseInt(room) });

  revalidatePath('/admin/education/classrooms');
  return res;
}

export async function SubmitEditClassroom(classroom: ClassroomData) {
  const { id, education_year, education_term, level, room } = classroom
  
  if (!id) {
    return { message:"ไม่สามารถแก้ไขห้องได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!education_year) {
    return { message:"กรุณาระบุปีการศึกษา",type:"error" };
  }

  if (!education_term) {
    return { message:"กรุณาระบุภาคเรียน",type:"error" };
  }

  if (!level) {
    return { message:"กรุณาระบุระดับชั้น",type:"error" };
  }

  if (!room) {
    return { message:"กรุณาระบุห้อง",type:"error" };
  }
  
  const res = await EditClassroom(classroom)
  revalidatePath('/admin/classrooms');
  return res;
}

export async function SubmitRemoveClassroom(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบห้องได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveClassroom(id)
  revalidatePath('/admin/classrooms');
  return res;
}


export async function SubmitAddFeeForClassroom(formData: FormData) {
  const fee = Number(formData.get('fee')) as number;
  const classroom = Number(formData.get('classroom')) as number;

  if (!fee) {
    return { message:"กรุณาเลือกค่าบำรุงการศึกษา",type:"error" };
  }

  if (!classroom) {
    return { message:"กรุณาเลือกห้องเรียน",type:"error" };
  }

  const res = await AddFeeForClassroom({ fee: fee, classroom: classroom});

  revalidatePath('/admin/fee/classrooms');
  return res;
}

export async function SubmitEditFeeForClassroom(feeForClassroom: FeeForClassroomData) {
  const { id, fee, classroom } = feeForClassroom
  
  if (!id) {
    return { message:"ไม่สามารถแก้ไขห้องได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!fee) {
    return { message:"กรุณาเลือกค่าบำรุงการศึกษา",type:"error" };
  }

  if (!classroom) {
    return { message:"กรุณาเลือกห้องเรียน",type:"error" };
  }
  
  const res = await EditFeeForClassroom(feeForClassroom)
  revalidatePath('/admin/fee/classrooms');
  return res;
}

export async function SubmitRemoveFeeForClassroom(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบห้องได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveFeeForClassroom(id)
  revalidatePath('/admin/classrooms');
  return res;
}
