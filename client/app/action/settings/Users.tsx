'use server'
import { AddUser, EditUser, RemoveUser } from "@/app/functions/settings/users/Users";
import { UserData } from "@/app/types/Settings/User";
import { revalidatePath } from "next/cache";

export async function SubmitAddUser(formData: FormData) {
  const username = formData.get('username') as string;
  const fullname = formData.get('fullname') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const role = Number(formData.get('role') as string);

  if (!username) {
    return { message:"กรุณาระบุชื่อผู้ใช้", type:"error"};
  }

  if (!fullname) {
    return { message:"กรุณาระบุชื่อจริง", type:"error" };
  }

  if (!password) {
    return { message:"กรุณาระบุรหัสผ่าน", type:"error"};
  }

  if (password !== confirmPassword) {
    return { message:"กรุณายืนยันรหัสผ่านให้ตรงกัน", type:"error"};
  }

  if (!role) {
    return { message:"กรุณาระบุตำแหน่ง", type:"error"};
  }

  const res = await AddUser({ username: username, fullname: fullname , password: password, role: role });

  revalidatePath('/admin/users');
  return res;
}

export async function SubmitEditUser(user: UserData) {
  const { id, username, password, confirmPassword, fullname, role } = user
  
  if (!id) {
    return { message:"ไม่สามารถแก้ไขผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!username) {
    return { message:"กรุณาระบุชื่อผู้ใช้", type:"error"};
  }

  if (!fullname) {
    return { message:"กรุณาระบุชื่อจริง", type:"error" };
  }

  if (password?.trim() && (password?.trim() !== confirmPassword?.trim())) {
    return { message:"กรุณายืนยันรหัสผ่านให้ตรงกัน", type:"error"};
  }

  if (!role) {
    return { message:"กรุณาระบุตำแหน่ง", type:"error"};
  }
  
  const res = await EditUser(user)
  revalidatePath('/admin/users');
  return res;
}

export async function SubmitRemoveUser(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveUser(id)
  revalidatePath('/admin/users');
  return res;
}


