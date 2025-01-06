'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"

export const getUserData = async () => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const role = session.role
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user_data",{
            headers: {
                'authorization': session.accessToken,
            },
        })        
        if (!res.ok) {
            return null
        }
        const data = await res.json();
        const token = session.accessToken
        
        return {data, token, role}
    } catch (err) {
        console.error('Error Fetch User:', err);
        throw err;
    }
}