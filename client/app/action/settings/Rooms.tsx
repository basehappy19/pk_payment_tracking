'use server'

import { AddRoom, EditRoom, RemoveRoom } from "@/app/functions/settings/rooms/Rooms";
import { RoomData } from "@/app/types/Settings/Rooms";
import { revalidatePath } from "next/cache";

export async function SubmitAddRoom(formData: FormData) {
  const name = formData.get('name') as string | null;

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุห้อง",type:"error" };
  }

  const res = await AddRoom({ name });

  revalidatePath('/admin/education/rooms');
  return res;
}

export async function SubmitEditRoom(room: RoomData) {
  const { id, name } = room

  if (!id) {
    return { message:"ไม่สามารถแก้ไขห้องได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }

  if (!name || name.trim() === '') {
    return { message:"กรุณาระบุห้อง",type:"error" };
  }
  
  const res = await EditRoom(room)
  revalidatePath('/admin/rooms');
  return res;
}

export async function SubmitRemoveRoom(id: number) {
  if (!id) {
    return { message:"ไม่สามารถลบห้องได้ กรุณาลองใหม่อีกครั้ง",type:"error" };
  }
  
  const res = await RemoveRoom(id)
  revalidatePath('/admin/rooms');
  return res;
}
