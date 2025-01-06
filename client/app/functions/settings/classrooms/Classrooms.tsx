'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { ClassroomData } from "@/app/types/Settings/Classrooms";
import { getServerSession } from "next-auth";

export const getClassrooms = async ({
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
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/classrooms${
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
      console.error('Failed To Fetch Classrooms: ', e);
      throw e;
    }
};
  
export const AddClassroom = async ({education_year, education_term, level, room}:{education_year:number, education_term:number, level:number, room:number}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/classroom",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({education_year_id:education_year, education_term_id:education_term, level_id:level, room_id:room})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add Classroom: ',e);
        throw e;
    }
}

export const EditClassroom = async (classroom:ClassroomData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        
        const { id, education_year, education_term, level, room } = classroom
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/classroom",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, education_year_id:education_year.id, education_term_id:education_term.id, level_id:level.id, room_id:room.id})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit Classroom: ',e);
        throw e;
    }
}

export const RemoveClassroom = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/classroom",{
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
        console.error('Failed To Remove Classroom: ',e);
        throw e;
    }
}
