'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { FeeForClassroomData } from "@/app/types/Settings/Classrooms";
import { getServerSession } from "next-auth";

export const getFeeForClassrooms = async ({
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
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/fee/classrooms${
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
      console.error('Failed To Fetch FeeForClassrooms: ', e);
      throw e;
    }
};
  
export const AddFeeForClassroom = async ({fee, classroom}:{fee:number, classroom:number}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/fee/classroom",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({fee_id:fee, classroom_id:classroom})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add FeeForClassroom: ',e);
        throw e;
    }
}

export const EditFeeForClassroom = async (FeeForClassroom:FeeForClassroomData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        
        const { id, fee, classroom } = FeeForClassroom
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/fee/classroom",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, fee_id:fee.id, classroom_id:classroom.id})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit FeeForClassroom: ',e);
        throw e;
    }
}

export const RemoveFeeForClassroom = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/fee/classroom",{
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
        console.error('Failed To Remove FeeForClassroom: ',e);
        throw e;
    }
}
