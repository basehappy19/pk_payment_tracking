import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r dark:from-purple-700/75 dark:to-pink-700/75 from-purple-400 to-pink-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-2">
            {/* <Code className="w-5 h-5" /> */}
            <div className='text-center'>
              <p className='text-center dark:text-purple-200'>
                กลุ่มบริหารงบประมาณ โรงเรียนภูเขียว อำเภอภูเขียว จังหวัดชัยภูมิ
              </p>
              <p className='dark:text-purple-200'>
                สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาชัยภูมิ
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* <Paintbrush className="w-5 h-5" /> */}
            <div className=''>
              <p className='dark:text-pink-200'>Website : <Link target='_blank' className='underline font-semibold' href={`https://phukhieo.ac.th`}>Phukhieo.ac.th</Link></p>
              <p className="dark:text-pink-200">
                Facebook : โรงเรียนภูเขียว อ.ภูเขียว จ.ชัยภูมิ 
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-purple-500 dark:bg-violet-600/60 py-2 text-center text-sm">
        <p>&copy; 2024 <Link target='_blank' href={`https://phukhieo.ac.th`}>Phukhieo School</Link></p>
      </div>
    </footer>
  );
};

export default Footer;