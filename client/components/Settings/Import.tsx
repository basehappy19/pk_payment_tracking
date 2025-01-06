'use client'
import { Res } from "@/app/types/Settings/Response";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Option } from "@/app/types/import";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SubmitAddImportData, SubmitAddImportDataByCSV } from "@/app/action/Import";
import Papa, { ParseResult } from 'papaparse'
import { TableHead, Table, TableBody, TableCell, TableRow, TableHeader } from "../ui/table";
export const AddImportData = ({ options }: { options: Option }) => {
    const ref = useRef<HTMLFormElement>(null);

    const [selectedValues, setSelectedValues] = useState({
        level: '',
        room: '',
        educationYear: '',
        educationTerm: '',
        receiptBook: '',
    });

    const handleSelectChange = (name: string, value: string) => {
        setSelectedValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            const res: Res = await SubmitAddImportData(formData);
            toast[res.type](res.message, { position: 'bottom-right' });
            if (res.type !== 'error') {
                ref.current?.reset();
                setSelectedValues({
                    level: '',
                    room: '',
                    educationYear: '',
                    educationTerm: '',
                    receiptBook: '',
                });
            }
        } catch (error) {
            console.error('Failed to add import data:', error);
            toast.error('ไม่สามารถนำเข้าข้อมูลได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }
    };

    return (
        <form
            ref={ref}
            action={async (formData: FormData) => {
                await handleSubmit(formData);
            }}
            method="post"
        >
            <div className="flex flex-col space-y-3">
                <div className="w-full">
                    <div className="flex flex-row space-x-2">
                        <div className="w-full">
                            <Input
                                type="number"
                                name="studentId"
                                placeholder="รหัสนักเรียน"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                type="text"
                                name="name"
                                placeholder="ชื่อนักเรียน"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                type="number"
                                name="cid"
                                placeholder="เลขบัตรประชาชน"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                type="number"
                                name="no"
                                placeholder="เลขที่"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Select
                                name="level"
                                value={selectedValues.level}
                                onValueChange={(value) => handleSelectChange('level', value)}
                            >
                                <SelectTrigger id="level">
                                    <SelectValue placeholder="เลือกระดับชั้น" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.levels.map((level) => (
                                        <SelectItem key={level.id} value={level.id.toString()}>
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Select
                                name="room"
                                value={selectedValues.room}
                                onValueChange={(value) => handleSelectChange('room', value)}
                            >
                                <SelectTrigger id="room">
                                    <SelectValue placeholder="เลือกห้องเรียน" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.rooms.map((room) => (
                                        <SelectItem key={room.id} value={room.id.toString()}>
                                            {room.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Select
                                name="educationYear"
                                value={selectedValues.educationYear}
                                onValueChange={(value) => handleSelectChange('educationYear', value)}
                            >
                                <SelectTrigger id="educationYear">
                                    <SelectValue placeholder="เลือกปีการศึกษา" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.education_years.map((year) => (
                                        <SelectItem key={year.id} value={year.id.toString()}>
                                            {year.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Select
                                name="educationTerm"
                                value={selectedValues.educationTerm}
                                onValueChange={(value) => handleSelectChange('educationTerm', value)}
                            >
                                <SelectTrigger id="educationTerm">
                                    <SelectValue placeholder="เลือกภาคเรียน" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.education_terms.map((term) => (
                                        <SelectItem key={term.id} value={term.id.toString()}>
                                            {term.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-row space-x-2">
                        <div className='w-full'>
                            <Select name='receiptBook'
                                value={selectedValues.receiptBook}
                                onValueChange={(value) => handleSelectChange('receiptBook', value)}>
                                <SelectTrigger id="receiptBook">
                                    <SelectValue placeholder="เลือกเล่มใบเสร็จ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.receiptBooks.map((receiptBook) => (
                                        <SelectItem key={receiptBook.id} value={receiptBook.id.toString()}>
                                            {receiptBook.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            type="number"
                            name="receiptNo"
                            placeholder="เล่มที่"
                            required
                        />
                        <Input
                            type="number"
                            name="amount"
                            placeholder="จำนวน"
                            required
                        />
                    </div>
                </div>
                <ButtonSubmitAddImportData />
            </div>
        </form>
    );
};

const ButtonSubmitAddImportData = () => {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending} type='submit'>{pending ? "กำลังโหลด..." : "เพิ่มข้อมูล"}</Button>
    )
}



export interface CSVData {
    [key: string]: string | number | boolean | null;
}
export const ImportCSV = () => {
    const REQUIRED_HEADERS = [
        'student_id',
        'student_no',
        'cid',
        'classroom',
        'student_name',
        'education_year_term',
        'receipt_book_name',
        'receipt_no',
        'amount',
    ];
    const [data, setData] = useState<CSVData[]>([]);
    const [preview, setPreview] = useState<CSVData[]>([]);
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            Papa.parse<CSVData>(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results: ParseResult<CSVData>) => {
                    const parsedData = results.data as CSVData[];
                    const headers = Object.keys(parsedData[0] || {});

                    const missingHeaders = REQUIRED_HEADERS.filter(
                        (header) => !headers.includes(header)
                    );

                    if (missingHeaders.length > 0) {
                        toast.error(
                            `ไฟล์ไม่ถูกต้อง! ไม่พบคอลัมน์ ${missingHeaders.join(', ')}`,
                            { position: 'bottom-right' }
                        );
                        setData([]);
                        setPreview([]);
                        setIsValid(false);
                    } else {
                        setData(parsedData);
                        setPreview(parsedData);
                        setIsValid(true);
                    }
                },
                error: (error) => {
                    console.error('Error parsing file:', error);
                    toast.error('เกิดข้อผิดพลาดในการอ่านไฟล์', {
                        position: 'bottom-right',
                    });
                },
            });
        }
    };

    const handleClear = () => {
        setData([]);
        setPreview([]);
        setIsValid(false);
    };

    const handleConfirm = async () => {
        try {
            const res: Res = await SubmitAddImportDataByCSV(data);
            toast[res.type](res.message, { position: 'bottom-right' });
            if (res.type !== 'error') {
                setData([]);
                setPreview([]);
                setIsValid(false);
            }
        } catch (error) {
            console.error('Failed To Import Data:', error);
            toast.error('ไม่สามารถนำเข้าข้อมูลได้ กรุณาลองอีกครั้ง', { position: 'bottom-right' });
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <h1 className="text-2xl font-bold">นำเข้าข้อมูลจากไฟล์ CSV</h1>
            <div>ตัวอย่างไฟล์เทมเพลต</div>
            <div className="flex flex-row space-x-4">
                <Input
                    onChange={handleFileChange}
                    type="file"
                    id="file"
                    accept=".csv"
                    className="input-class"
                />
            </div>
            {preview.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold">ข้อมูลจากไฟล์</h2>
                    <div className="flex justify-between mb-4">
                        <Button
                            onClick={handleClear}
                            className="bg-red-500 mt-2 text-white rounded"
                        >
                            ล้างค่า
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={!isValid}
                            className={`rounded ${isValid
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            ยืนยันเพิ่มข้อมูล
                        </Button>
                    </div>
                    <Table className='dark:bg-neutral-900/30 bg-gray-100'>
                        <TableHeader className="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-zinc-700 dark:to-gray-700">
                            <TableRow className='border-white border-b-4 dark:border-b-neutral-950'>
                                {Object.keys(preview[0]).map((key, index) => (
                                    <TableHead className="dark:text-slate-200 text-slate-700" key={index}>
                                        {key}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {preview.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {Object.values(row).map((value, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};
