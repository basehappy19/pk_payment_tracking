'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StatusPagination } from '@/app/(user)/(students)/fee/page';

const NextPrevFees = ({ pagination }: { pagination: StatusPagination }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentIndex = parseInt(searchParams.get('index') || '0', 10);

    const [index, setIndex] = useState(currentIndex);

    useEffect(() => {
        setIndex(currentIndex);
    }, [currentIndex]);

    const handleBack = () => {
        if (index > 0) {
            const newIndex = index - 1;
            if (newIndex === 0) {
                router.push(`/fee`);
                return;
            }
            router.push(`?index=${newIndex}`);
        }
    };

    const handleNext = () => {
        if (index < pagination.total - 1) {
            const newIndex = index + 1;
            if (newIndex === 0) {
                router.push(`/fee`);
                return;
            }
            router.push(`?index=${newIndex}`);
        }
    };

    return (
        <div className="flex justify-between items-center gap-4">
            <Button
                onClick={handleNext}
                disabled={index >= pagination.total - 1}
                variant="outline"
                className={`
                        flex items-center gap-2 min-w-48
                        transition-all duration-200 
                        ${pagination.next.data === null ? 'opacity-50' : 'hover:bg-blue-50 hover:text-blue-600'}
                    `}
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="flex flex-col items-start">
                    <span className="text-sm font-normal">ย้อนหลับ</span>
                    {pagination.next.data && (
                        <span className="text-xs text-muted-foreground">
                            {pagination.next.data.classroom.education_term.name}/
                            {pagination.next.data.classroom.education_year.name}
                        </span>
                    )}
                </span>
            </Button>

            <Button
                onClick={handleBack}
                disabled={index === 0}
                variant="outline"
                className={`
                        flex items-center gap-2 min-w-48
                        transition-all duration-200
                        ${index === 0 ? 'opacity-50' : 'hover:bg-green-50 hover:text-green-600'}
                    `}
            >
                <span className="flex flex-col items-end">
                    <span className="text-sm font-normal">
                        {index === 0 ? "ปีการศึกษาล่าสุดแล้ว" : "ถัดไป"}
                    </span>
                    {pagination.prev.data && (
                        <span className="text-xs text-muted-foreground">
                            {pagination.prev.data.classroom.education_term.name}/
                            {pagination.prev.data.classroom.education_year.name}
                        </span>
                    )}
                </span>
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default NextPrevFees;