'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { ReceiptBookData } from "@/app/types/Settings/ReceiptBooks";
import { getServerSession } from "next-auth";

export const getReceiptBookOptions = async () => {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return null;
      }
    
      const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/receiptBookOptions", {
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
      console.error('Failed To Fetch ReceiptBookOptions: ', e);
      throw e;
    }
};

export const getReceiptBooks = async ({
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
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/receiptBooks${
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
      console.error('Failed To Fetch ReceiptBooks: ', e);
      throw e;
    }
};
  
export const AddReceiptBook = async ({name, total_page}:{name:string, total_page:number}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/receiptBook",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:name, total_page:total_page})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add ReceiptBook: ',e);
        throw e;
    }
}

export const EditReceiptBook = async (receiptBook:ReceiptBookData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const { id, name, total_page } = receiptBook
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/receiptBook",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id, name:name, total_page:total_page})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit ReceiptBook: ',e);
        throw e;
    }
}

export const RemoveReceiptBook = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/receiptBook",{
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
        console.error('Failed To Remove ReceiptBook: ',e);
        throw e;
    }
}