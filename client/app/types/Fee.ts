export interface Fee {
    amount: string;
    name: string;
};

export interface FeeForClassroom {
    id: number;
    fee: Fee;
};