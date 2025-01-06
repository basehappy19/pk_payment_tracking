'use client'
import React, { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClassroomOptions } from '@/app/types/classroom';
import StudentFeeInClassrooms from './StudentFeeInClassrooms';
import Loading from './Loading';

interface ClassroomDisplayProps {
    options: ClassroomOptions
}

const ClassroomDisplay: FC<ClassroomDisplayProps> = ({ options }) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    type SelectedState = {
        year: string;
        term: string;
        level: string;
        room: string;
    };

    const [selected, setSelected] = useState<SelectedState>({
        year: "",
        term: "",
        level: "",
        room: ""
    });

    useEffect(() => {
        if (selected.year && selected.term && selected.level && selected.room) {
            setLoading(true);
        }
    }, [selected]);

    return (
        <main className="min-h-screen container mx-auto p-4">
            <Card className="mb-8 dark:bg-zinc-900 dark:border-stone-700/50 border-2 border-pink-300/65 bg-pink-100/80">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">ตรวจสอบค่าบำรุงการศึกษานักเรียน</CardTitle>
                    {selected.year && selected.term && selected.level && selected.room && (
                        <p className='text-center'>
                            ชั้นมัธยมศึกษาปีที่ {selected.level}/{selected.room} ปีการศึกษา {selected.year} เทอม {selected.term}
                        </p>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="education_year">ปีการศึกษา</Label>
                            <Select value={selected.year} onValueChange={(value) => setSelected((prev) => ({ ...prev, year: value }))}>
                                <SelectTrigger id="education_year">
                                    <SelectValue placeholder="เลือกปีการศึกษา" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.education_years.map((year) => (
                                        <SelectItem key={year.id} value={year.name.toString()}>
                                            {year.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="education_term">ภาคเรียน</Label>
                            <Select value={selected.term} onValueChange={(value) => setSelected((prev) => ({ ...prev, term: value }))}>
                                <SelectTrigger id="education_term">
                                    <SelectValue placeholder="เลือกภาคเรียน" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.education_terms.map((term) => (
                                        <SelectItem key={term.id} value={term.name.toString()}>
                                            {term.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="level">ระดับชั้น</Label>
                            <Select value={selected.level} onValueChange={(value) => setSelected((prev) => ({ ...prev, level: value }))}>
                                <SelectTrigger id="level">
                                    <SelectValue placeholder="เลือกระดับชั้น" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.levels.map((level) => (
                                        <SelectItem key={level.id} value={level.name.toString()}>
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="room">ห้องเรียน</Label>
                            <Select value={selected.room} onValueChange={(value) => setSelected((prev) => ({ ...prev, room: value }))}>
                                <SelectTrigger id="room">
                                    <SelectValue placeholder="เลือกห้องเรียน" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.rooms.map((room) => (
                                        <SelectItem key={room.id} value={room.name.toString()}>
                                            {room.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {!isLoading ? (
                <StudentFeeInClassrooms 
                    onLoading={setLoading} 
                    year={selected.year} 
                    term={selected.term} 
                    level={selected.level} 
                    room={selected.room} 
                />
            ) : (
                <Loading />
            )}
        </main>
    );
};

export default ClassroomDisplay;
