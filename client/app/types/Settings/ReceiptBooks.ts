import { Pagination } from "./Pagination";

export interface ReceiptBook {
    data:ReceiptBookData[],
    pagination: Pagination
}

export interface ReceiptBookData {
    id:number,
    name:string,
    total_page:number,
    createdAt:string,
    updatedAt:string,
}
