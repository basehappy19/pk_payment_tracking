'use server'

import { revalidatePath } from "next/cache";
import { AddImportData, AddImportDataByCSV } from "../functions/imports/Import";
import { CSVData } from "@/components/Settings/Import";

export async function SubmitAddImportData(formData: FormData) {
    const studentId = Number(formData.get('studentId') as string);
    const studentName = formData.get('name') as string;
    const cid = formData.get('cid') as string;
    const studentNo = Number(formData.get('no') as string);
    const level = Number(formData.get('level') as string);
    const room = Number(formData.get('room') as string);
    const educationYear = Number(formData.get('educationYear') as string);
    const educationTerm = Number(formData.get('educationTerm') as string);
    const receiptBook = Number(formData.get('receiptBook') as string);
    const receiptNo = Number(formData.get('receiptNo') as string);
    const amount = Number(formData.get('amount') as string);
  
    if (!studentId) {
      return { message:"กรุณาระบุรหัสนักเรียน",type:"error" };
    }

    if (!studentName) {
      return { message:"กรุณาระบุชื่อนักเรียน",type:"error" };
    }

    if (!cid) {
      return { message:"กรุณาระบุเลขบัตรประชาชน",type:"error" };
    }

    if (!studentNo) {
      return { message:"กรุณาระบุเลขที่",type:"error" };
    }

    if (!educationYear) {
      return { message:"กรุณาระบุปีการศึกษา",type:"error" };
    }
  
    if (!educationTerm) {
      return { message:"กรุณาระบุภาคเรียน",type:"error" };
    }
  
    if (!level) {
      return { message:"กรุณาระบุระดับชั้น",type:"error" };
    }
  
    if (!room) {
      return { message:"กรุณาระบุห้อง",type:"error" };
    }

    if (!receiptBook) {
      return { message:"กรุณาระบุเล่มใบเสร็จ",type:"error" };
    }

    if (!receiptNo) {
      return { message:"กรุณาระบุเล่มที่",type:"error" };
    }

    if (!amount) {
      return { message:"กรุณาระบุจำนวนเงิน",type:"error" };
    }
  
    const res = await AddImportData({
       studentId: studentId,
       studentNo: studentNo,
       studentName: studentName,
       cid: cid, 
       education_year: educationYear, 
       education_term: educationTerm, 
       level: level, 
       room: room, 
       receipt_book_id: receiptBook, 
       receiptNo: receiptNo, 
       amount: amount 
    });
  
    revalidatePath('/admin/imports');
    return res;
}

export async function SubmitAddImportDataByCSV(CSVData: CSVData[]) {
  const res = await AddImportDataByCSV(CSVData);
  revalidatePath('/admin/imports');
  return res;
}