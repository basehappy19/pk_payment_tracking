import { Pagination } from "./Pagination"

export interface UserData {
    id:number,
    username: string,
    fullname:string,
    password?:string
    confirmPassword?: string
    role: Role
    createdAt:string,
    updatedAt:string,
}

export interface User {
    data: UserData[]
    pagination: Pagination
}

interface Role {
    id: number,
    name: string,
}