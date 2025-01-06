'use server'

import { AddStudentInClassroom, EditStudentInClassroom, RemoveStudentInClassroom } from "@/app/functions/settings/students/StudentInClassroom";
import { StudentInClassroomData } from "@/app/types/Settings/Students";
import { revalidatePath } from "next/cache";

export async function SubmitAddStudentInClassroom(formData: FormData) {
  const student_sid = Number(formData.get('student_sid')) as number;
  const classroom = Number(formData.get('classroom')) as number | null;
  const no = Number(formData.get('no')) as number;
  const pay_status = formData.get('pay_status') as string;

  if (!student_sid) {
    return { message:"กรุณาระบุนักเรียน",type:"error" };
  }

  if (!classroom) {
    return { message:"กรุณาระบุห้องเรียน",type:"error" };
  }

  if (!no) {
    return { message:"กรุณาระบุเลขที่นักเรียน",type:"error" };
  }

  if (!pay_status || pay_status.trim() === '') {
    return { message:"กรุณาระบุสถานะการชำระ",type:"error" };
  }

  const res = await AddStudentInClassroom({ student_sid, classroom, no, pay_status });
  revalidatePath('/admin/student/classrooms');
  return res;
}

export async function SubmitEditStudentInClassroom(studentInclassroom: StudentInClassroomData) {
  const { id, student_sid, classroom, no, pay_status } = studentInclassroom

  if (!id) {
    return { message:"ไม่สามารถแก้ไขค่าบำรุงการศึกษาได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!student_sid) {
    return { message:"กรุณาระบุนักเรียน",type:"error" };
  }

  if (!classroom) {
    return { message:"กรุณาระบุห้องเรียน",type:"error" };
  }

  if (!no) {
    return { message:"กรุณาระบุเลขที่นักเรียน",type:"error" };
  }

  if (!pay_status || pay_status.trim() === '') {
    return { message:"กรุณาระบุสถานะการชำระ",type:"error" };
  }
  
  const res = await EditStudentInClassroom(studentInclassroom)
  revalidatePath('/admin/student/classrooms');
  return res;
}

export async function SubmitRemoveStudentInClassroom(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบนักเรียนในห้องได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveStudentInClassroom(id)
  revalidatePath('/admin/student/classrooms');
  return res;
}
