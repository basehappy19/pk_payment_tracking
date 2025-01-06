import { Pagination } from "./Pagination";

export interface Student {
    data:StudentData[],
    pagination: Pagination
}

export interface StudentData {
    sid: number,
    cid: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface StudentReceipt {
    data:StudentReceiptData[],
    pagination: Pagination
}

export interface StudentReceiptData {
    id: number,
    student_sid?:number,
    studentInClassroom:{
        id:number,
        student_sid:number,
        student:{
            sid:number,
            cid:number,
            name:string,
        },
        classroom:{
            id:number,
            education_year:{
                id:number,
                name:string
            }
            education_term:{
                id:number,
                name:string
            }
            level:{
                id:number,
                name:string
            }
            room:{
                id:number,
                name:string
            },
        }
        no:number,
    }
    amount:number,
    receiptBook:{
        id:number,
        name:string,
        total_page:number,
    },
    receipt_no: number,
    createdAt:string,
    updatedAt:string,
}

export interface StudentInClassroom {
    data: StudentInClassroomData[],
    pagination: Pagination
}

export interface StudentInClassroomData {
    id:number,
    student_sid:number,
    classroom:{
        id:number,
        education_year:{ 
            id:number,
            name:string,
        },
        education_term:{
            id:number,
            name:string,
        },
        level:{
            id:number,
            name:string,
        },
        room:{
            id:number,
            name:string,
        },
    },
    no:number,
    pay_status: "none" | "paying" | "done"
    createdAt:string,
    updatedAt:string,
}
