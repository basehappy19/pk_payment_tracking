import React from 'react'
import { Card } from '../ui/card'
import { DownMoney, GrowthMoney } from './WaveDataWidget'
import WaveGraph from './WaveGraph'
import { Button } from '../ui/button'

const WaveGraphPanel = () => {
  return (
    <div className="mt-4">
      <Card className='p-4'>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
          <GrowthMoney />
          <DownMoney />
        </div>
        <div className="my-2">
          <WaveGraph />
        </div>
        <div className="mt-4">
            <Button className='w-full transition-transform duration-300 hover:scale-[101.5%] my-6'>
              ส่งออก 
            </Button>
        </div>
      </Card>    
    </div>
  )
};

export default WaveGraphPanel;