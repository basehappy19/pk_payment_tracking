import { Pagination } from "./Pagination"

export interface EducationYear {
    data:EducationYearData[],
    pagination: Pagination
}

export interface EducationYearData {
    id:number,
    name:string,
    createdAt:string,
    updatedAt:string,
}

export interface EducationTerm {
    data:EducationTermData[],
    pagination: Pagination
}

export interface EducationTermData {
    id:number,
    name:string,
    createdAt:string,
    updatedAt:string,
}









