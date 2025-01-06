import { Pagination } from "./Pagination";

export interface Classroom {
    data:ClassroomData[],
    pagination: Pagination
}

export interface ClassroomData {
    id:number,
    level:{
        id:number,
        name:string,
    },
    room:{
        id:number,
        name:string,
    },
    education_year:{
        id:number,
        name:string,
    },
    education_term:{
        id:number,
        name:string,
    },
    createdAt:string,
    updatedAt:string,
}

export interface FeeForClassroom {
    data:FeeForClassroomData[],
    pagination: Pagination
}

export interface FeeForClassroomData {
    id:number,
    fee:{
        id:number,
        amount:number,
        name:string,
        education_year:{
            id:number,
            name:string,
        }
        education_term:{
            id:number,
            name:string,
        },
    },
    classroom:{
        id:number
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
        }
        room:{
            id:number,
            name:string,
        }
    }
    createdAt:string,
    updatedAt:string,
}