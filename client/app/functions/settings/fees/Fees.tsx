'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { FeeData } from "@/app/types/Settings/Fees";
import { getServerSession } from "next-auth";

export const getFeeOptions = async () => {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return null;
      }
  
  
      const res = await fetch(process.env.NEXT_PUBLIC_APP_API + '/feeOptions', {
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
      console.error('Failed To Fetch Fee For Classroom Options: ', e);
      throw e;
    }
};

export const getFees = async ({
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
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/fees${
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
      console.error('Failed To Fetch Fees: ', e);
      throw e;
    }
};
  
export const AddFee = async ({amount, name, education_year, education_term}:{amount:number, name:string, education_year:number, education_term:number}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/fee",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({amount:amount, name:name, education_year_id:education_year, education_term_id:education_term})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add Fee: ',e);
        throw e;
    }
}

export const EditFee = async (fee:FeeData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const { id, amount, name, education_year, education_term } = fee
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/fee",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id, amount:amount, name:name, education_year_id:education_year.id, education_term_id:education_term.id})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit Fee: ',e);
        throw e;
    }
}

export const RemoveFee = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/fee",{
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
        console.error('Failed To Remove Fee: ',e);
        throw e;
    }
}