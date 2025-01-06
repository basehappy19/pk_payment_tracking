import type { Metadata } from 'next'
import MainMenu from "@/components/MainMenu";
import { getUserData } from '../functions/getUserData';

export const metadata: Metadata = {
  title: 'ระบบตรวจสอบค่าบำรุงการศึกษา | โรงเรียนภูเขียว',
  description: 'ระบบตรวจสอบค่าบำรุงการศึกษา โรงเรียนภูเขียว',
}

export default async function Home() {
  const session = await getUserData()
  
  return (
    <main className="bg-gradient-to-t from-pink-400/40 to-pink-200/40 dark:from-pink-950/40 dark:to-stone-950/50 flex items-center justify-center min-h-screen p-4">
      <MainMenu session={session} />
    </main>
  );
}
