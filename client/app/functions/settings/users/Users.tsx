'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { UserData } from "@/app/types/Settings/User";
import { getServerSession } from "next-auth";

export const getRoleOptions = async () => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/role_options",{
            headers: {
                'authorization': session.accessToken,
            },
            method: 'GET',
            next:{
                revalidate: 0,
            }
        })
        return await res.json();
    } catch (e) {
        console.error('Error Fetch Role Options:', e);
        throw e;
    }
}

export const getUsers = async ({
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
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/users${
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
      console.error('Failed To Fetch Users: ', e);
      throw e;
    }
};
  
export const AddUser = async ({username, password, fullname, role}:{username: string, password: string, fullname: string, role: number}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password, fullname, roleId: role})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add User: ',e);
        throw e;
    }
}

export const EditUser = async (user: UserData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const { id, username, fullname, password, role} = user
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id, username, fullname, password, roleId: role.id})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit User: ',e);
        throw e;
    }
}

export const RemoveUser = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user",{
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
        console.error('Failed To Remove User: ',e);
        throw e;
    }
}