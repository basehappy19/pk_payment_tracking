export interface Session {
    data:{
        id?:number,
        username?:string,
        fullname?:string,
        profileImg?:string,
        sid?:string,
        cid?:string,
        name?:string,
        role?:{
            id:number,
            name:string
        }
    },
    token:string,
    role:string,
}
