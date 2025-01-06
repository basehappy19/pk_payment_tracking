import BarGraphPanel from '@/components/dashbroad/BarGraphPanel'
import { BtnBack } from '@/components/dashbroad/BtnOnDashboard'
import { AllStudentsWidget, NotPayRoomsWidget, PayedStudentsWidget, NotPayStudentsWidget } from '@/components/dashbroad/DataWidget'
import DoughnutGraphPanel from '@/components/dashbroad/DoughnutGraphPanel'
import WaveGraphPanel from '@/components/dashbroad/WaveGraphPanel'
import React from 'react'

const page = async () => {
    return (
        <div className="flex justify-center pt-4">
            <div className="container">
                <div className="flex items-center gap-4 ">
                    <BtnBack />
                    <p className='text-4xl font-semibold'>Dashboard</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-0">
                    <AllStudentsWidget />
                    <NotPayStudentsWidget />
                    <PayedStudentsWidget />
                    <NotPayRoomsWidget />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 justify-center gap-4">
                    <DoughnutGraphPanel />
                    <BarGraphPanel />
                </div>

                <WaveGraphPanel />
            </div>
        </div>
    )
}

export default page