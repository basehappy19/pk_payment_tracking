import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
    role: string,
    roleId:string;
    accessToken: string;
  }

  interface User {
    id: string;
    role: string;
    roleId:string;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    roleId:string;
    accessToken: string;
  }
}
