import React from 'react'
import { Card, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import BarGraph from './BarGraph'
import { AllRooms, NotAllPayRooms, PayedRooms } from './RoomOverview'

const BarGraphPanel = () => {
    return (
        <Card className="p-2 shadow shadow-md dark:shaodow-none dark:bg-zinc-200 border-2">
            <CardHeader>
                <p className='text-2xl text-center font-bold text-black'>
                    ค่าเฉลี่ยรายห้อง <span className='text-gray-700'>( ล่าสุด )</span>
                </p>
            </CardHeader>
            <div className="grid-cols-1 lg:grid-cols-2 md:grid-cols-1 grid">
                <div className="col-span-1 flex items-center justify-center mx-auto">
                        <div className="flex justify-center items-center md:mb-10">
                            <BarGraph/>
                        </div>
                </div>
                <div className="col-span-1 text-center flex items-center justify-center">
                    <div className="">
                        <AllRooms />
                        <PayedRooms />
                        <NotAllPayRooms />    
                        <div className="items-baseline m-4">
                            <Card className='p-6'>
                                <Button className='w-full transition-transform duration-300 hover:scale-105'>
                                    ส่งออก 
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}





export default BarGraphPanel