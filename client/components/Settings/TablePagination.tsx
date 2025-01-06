'use client'
import React from 'react';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { Pagination } from '@/app/types/Settings/Pagination';

interface TablePaginationProps {
    pagination: Pagination;
}

const TablePagination: React.FC<TablePaginationProps> = ({
    pagination,
}) => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
    
        params.set('page', page.toString());
    
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <div className="mt-4 flex justify-between items-center">
            <div>
                หน้า {pagination.currentPage.toLocaleString()} จาก {pagination.totalPages.toLocaleString()}
            </div>
            <div>
                <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                >
                    ก่อนหน้า
                </Button>
                <Button
                    variant="outline"
                    className="ml-2"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={(pagination.totalPages === 0 || pagination.currentPage === pagination.totalPages)}
                >
                    ถัดไป
                </Button>
            </div>
        </div>
    );
};

export default TablePagination;
