'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { EducationYearData } from "@/app/types/Settings/Educations";
import { getServerSession } from "next-auth";

export const getEducationYears = async ({
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
  
      const url = `${process.env.NEXT_PUBLIC_APP_API}/setting/education/years${
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
      console.error('Failed To Fetch Education Years: ', e);
      throw e;
    }
};
  
export const AddEducationYear = async ({name}:{name:string}) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/education/year",{
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
        console.error('Failed To Add Education Year: ',e);
        throw e;
    }
}

export const EditEducationYear = async (year:EducationYearData) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const { id, name } = year
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/education/year",{
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
        console.error('Failed To Edit Education Year: ',e);
        throw e;
    }
}

export const RemoveEducationYear = async (id:number) => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/education/year",{
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
        console.error('Failed To Remove Education Year: ',e);
        throw e;
    }
}

export const getEducationTerms = async ({
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

    const url = `${process.env.NEXT_PUBLIC_APP_API}/setting/education/terms${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: session.accessToken,
      },
      next: {
        revalidate: 0,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (e) {
    console.error('Failed To Fetch Education Terms: ', e);
    throw e;
  }
};

export const AddEducationTerm = async ({name}:{name:string}) => {
  try {
      const session = await getServerSession(authOptions);
      
      if(!session){
          return null;
      }
      const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/education/term",{
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
      console.error('Failed To Add Education Term: ',e);
      throw e;
  }
}

export const EditEducationTerm = async (year:EducationYearData) => {
  try {
      const session = await getServerSession(authOptions);
      
      if(!session){
          return null;
      }
      const { id, name } = year
      const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/education/term",{
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
      console.error('Failed To Edit Education Term: ',e);
      throw e;
  }
}

export const RemoveEducationTerm = async (id:number) => {
  try {
      const session = await getServerSession(authOptions);
      
      if(!session){
          return null;
      }
      const res = await fetch(process.env.NEXT_PUBLIC_APP_API + "/setting/education/term",{
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
      console.error('Failed To Remove Education Term: ',e);
      throw e;
  }
}