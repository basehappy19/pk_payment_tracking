'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { CSVData } from "@/components/Settings/Import";
import { getServerSession } from "next-auth";

export const getImportOptions = async () => {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return null;
      }
  
  
      const res = await fetch(process.env.NEXT_PUBLIC_APP_API + '/import_options', {
        method: 'GET',
        headers: {
          authorization: session.accessToken,
        },
        next: {
          revalidate: 0,
        },
      });
  
      if (!res.ok) {
        return null;
      }
  
      return res.json();
    } catch (e) {
      console.error('Failed To Fetch Import Options: ', e);
      throw e;
    }
};

export const AddImportData = async ({ studentId, studentName, studentNo, cid, education_year, education_term, level, room, receipt_book_id, receiptNo, amount } : {
  studentId: number,
  studentName: string,
  studentNo: number,
  cid: string,
  education_year: number, 
  education_term: number, 
  level: number, 
  room: number, 
  receipt_book_id: number, 
  receiptNo: number, 
  amount: number
}) => {
  try {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return null;
    }
  
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API + '/import', {
      method: 'POST',
      headers: {
        authorization: session.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student_id: studentId, student_name: studentName, student_no: studentNo, cid: cid, education_year: education_year, education_term: education_term, level: level, room: room, receipt_book_id: receipt_book_id, receipt_no: receiptNo, amount: amount }),
      next: {
        revalidate: 0,
      },
    });
  
    if (!res.ok) {
      return null;
    }
  
    return res.json();
  } catch (e) {
    console.error('Failed To Add Import Data: ', e);
    throw e;
  }
};

export const AddImportDataByCSV = async (CSVData: CSVData[]) => {
  try {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return null;
    }
  
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API + '/import_csv', {
      method: 'POST',
      headers: {
        authorization: session.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: CSVData,
      }),
      next: {
        revalidate: 0,
      },
    });
  
    if (!res.ok) {
      return null;
    }
  
    return res.json();
  } catch (e) {
    console.error('Failed To Add Import Data: ', e);
    throw e;
  }
};