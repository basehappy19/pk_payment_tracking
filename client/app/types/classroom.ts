export interface ClassroomOptions {
    classrooms:{
        id:number,
        education_year:{
            id:number,
            name:string,
        }
        education_term:{
            id:number,
            name:string,
        }
        level:{
            id:number,
            name:string,
        }
        room:{
            id:number,
            name:string,
        }
    }[]
    education_years:educationYears[],
    education_terms:educationTerms[],
    levels:Levels[],
    rooms:Rooms[],
}

interface educationYears {
    id:number,
    name:string,
}

interface educationTerms {
    id:number,
    name:string,
}

interface Levels {
    id:number,
    name:string,
}

interface Rooms {
    id:number,
    name:string,
}