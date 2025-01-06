import { EducationTermData, EducationYearData } from "./Settings/Educations";
import { LevelData } from "./Settings/Levels";
import { ReceiptBookData } from "./Settings/ReceiptBooks";
import { RoomData } from "./Settings/Rooms";

export interface Option {
    levels: LevelData[],
    rooms: RoomData[],
    education_years: EducationYearData[],
    education_terms: EducationTermData[],
    receiptBooks : ReceiptBookData[],
}