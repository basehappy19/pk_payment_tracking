'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { LevelData } from "@/app/types/Settings/Levels";
import { getServerSession } from "next-auth";

export const getLevels = async ({
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
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/setting/levels${
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
      console.error('Failed To Fetch Levels: ', e);
      throw e;
    }
};
  
export const AddLevel = async ({name}:{name:string}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/level",{
            method:'POST',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:name})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Add Level: ',e);
        throw e;
    }
}

export const EditLevel = async (level:LevelData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const { id, name } = level
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/level",{
            method:'PUT',
            headers: {
                'authorization': session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id,name:name})
        })
        if(!res.ok){
            return null;
        }
        return res.json()
    } catch (e) {
        console.error('Failed To Edit Level: ',e);
        throw e;
    }
}

export const RemoveLevel = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/level",{
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
        console.error('Failed To Remove Level: ',e);
        throw e;
    }
}