'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth";

export const getClassroomOptions = async () => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const classrooms = await fetch(process.env.NEXT_PUBLIC_APP_API + "/classroom_options",{
            headers: {
                'authorization': session.accessToken,
            },
            method: 'GET',
            next:{
                revalidate: 0,
            }
        })
        return await classrooms.json();
    } catch (e) {
        console.error('Error Fetch Classroom Options:', e);
        throw e;
    }
}