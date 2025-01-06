import { Pagination } from "./Pagination";

export interface Fee {
    data:FeeData[],
    pagination: Pagination
}

export interface FeeData {
    id:number,
    amount:number,
    name:string,
    education_year:{id:number,name:string},
    education_term:{id:number,name:string},
    createdAt:string,
    updatedAt:string,
}
