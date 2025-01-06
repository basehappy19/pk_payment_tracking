'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { StudentInClassroomData } from "@/app/types/Settings/Students";
import { getServerSession } from "next-auth";

export const getStudentInClassrooms = async ({
    search,
    status,
    page,
  }: {
    search: string | undefined;
    status: string | undefined;
    page: number | undefined;
  }) => {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return null;
      }
  
      const queryParams = new URLSearchParams();
      if (search) queryParams.set('search', search);
      if (status) queryParams.set('status', status);
      if (page) queryParams.set('page', page.toString());
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/student/classrooms${
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
      console.error('Failed To Fetch Student In Classrooms: ', e);
      throw e;
    }
};
  
export const AddStudentInClassroom = async ({student_sid, classroom, no, pay_status}:{student_sid:number, classroom:number, no:number, pay_status:string}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/student/classroom",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({student_sid:student_sid, classroom_id:classroom, no:no, pay_status:pay_status})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add Student In Classroom: ',e);
        throw e;
    }
}

export const EditStudentInClassroom = async (studentInClassroom:StudentInClassroomData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const { id, student_sid, classroom, no, pay_status } = studentInClassroom
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/student/classroom",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id, student_sid:student_sid, classroom_id: classroom.id, no:no, pay_status:pay_status})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit Student In Classroom: ',e);
        throw e;
    }
}

export const RemoveStudentInClassroom = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/student/classroom",{
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
        console.error('Failed To Remove Student In Classroom: ',e);
        throw e;
    }
}