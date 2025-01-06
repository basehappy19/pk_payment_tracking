'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { StudentReceiptData } from "@/app/types/Settings/Students";
import { getServerSession } from "next-auth";

export const getStudentReceipts = async ({
    search,
    page,
  }: {
    search: string | undefined;
    page: number | undefined;
  }) => {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return null;
      }
  
      const queryParams = new URLSearchParams();
      if (search) queryParams.set('search', search);
      if (page) queryParams.set('page', page.toString());
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/studentReceipts${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;
  
      const res = await fetch(url, {
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
      console.error('Failed To Fetch StudentReceipts: ', e);
      throw e;
    }
};
  
export const AddStudentReceipt = async ({student_sid, amount, receiptBook, receiptNo }:{student_sid:number, amount:number, receiptBook:number, receiptNo:number}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/studentReceipt",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({student_sid:student_sid, amount:amount, receipt_book_id:receiptBook, receipt_no: receiptNo})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add StudentReceipt: ',e);
        throw e;
    }
}

export const EditStudentReceipt = async (student:StudentReceiptData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const { id, studentInClassroom, amount, receiptBook } = student
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/studentReceipt",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id, student_sid:studentInClassroom.student_sid, amount: amount, receipt_book_id:receiptBook.id})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit StudentReceipt: ',e);
        throw e;
    }
}

export const RemoveStudentReceipt = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/studentReceipt",{
            method:'DELETE',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Remove StudentReceipt: ',e);
        throw e;
    }
}