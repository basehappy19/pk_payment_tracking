import { Pagination } from "./Pagination";

export interface Level {
    data:LevelData[],
    pagination: Pagination
}

export interface LevelData {
    id:number,
    name:string,
    createdAt:string,
    updatedAt:string,
}
