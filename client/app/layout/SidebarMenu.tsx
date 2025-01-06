import { BookCopy, BookUser, CircleDollarSign, GraduationCap, Home, ListOrdered, Receipt, SquareStack, University, Upload, User, UsersRound, WalletCards } from "lucide-react";

export const sideBarMenu = [
    {
        "label":"กลับหน้าหลัก",
        "path":"/",
        "icon": <Home />
    },
    {
        "label":"ปีการศึกษา",
        "path":"/admin/education/years",
        "icon": <GraduationCap />
    },
    {
        "label":"ภาคเรียน",
        "path":"/admin/education/terms",
        "icon": <University />
    },
    {
        "label":"ระดับชั้น",
        "path":"/admin/levels",
        "icon": <ListOrdered />
    },
    {
        "label":"ห้อง",
        "path":"/admin/rooms",
        "icon": <SquareStack />
    },
    {
        "label":"นักเรียน",
        "path":"/admin/students",
        "icon": <UsersRound />
    },
    {
        "label":"ห้องเรียน",
        "path":"/admin/classrooms",
        "icon": <SquareStack />
    },
    {
        "label":"นักเรียนในห้องเรียน",
        "path":"/admin/student/classrooms",
        "icon": <BookUser />
    },
    {
        "label":"ค่าบำรุงการศึกษา",
        "path":"/admin/fees",
        "icon": <CircleDollarSign />
    },
    {
        "label":"ค่าบำรุงการศึกษาในห้องเรียน",
        "path":"/admin/fee/classrooms",
        "icon": <WalletCards />
    },
    {
        "label":"เล่มใบเสร็จ",
        "path":"/admin/receiptBooks",
        "icon": <BookCopy />
    },
    {
        "label":"ใบเสร็จชำระของนักเรียน",
        "path":"/admin/studentReceipts",
        "icon": <Receipt />
    },
    {
        "label":"ผู้ใช้",
        "path":"/admin/users",
        "icon": <User />
    },
    {
        "label":"นำเข้าข้อมูล",
        "path":"/admin/imports",
        "icon": <Upload />
    }
]