import { Pagination } from "./Pagination";

export interface Room {
    data:RoomData[],
    pagination: Pagination
}

export interface RoomData {
    id:number,
    name:string,
    createdAt:string,
    updatedAt:string,
}
