'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import AfterSignIn from '@/app/action/Auth/AfterSignIn'

export default function CardLoginStudent() {
    const router = useRouter()

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const res = await signIn("student-login", {
            sid: formData.get('sid') as string,
            cid: formData.get('cid') as string,
            redirect: false,
        })
        await AfterSignIn();
        if (res?.error) {
            return toast.error('รหัสนักเรียน หรือ เลขบัตรประชาชนไม่ถูกต้อง', { position: 'bottom-right'});
        }
        router.push('/fee');
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] dark:bg-black">
            <Card className="w-full md:w-1/2 bg-gradient-to-t from-pink-200 to-rose-100 border-pink-300 border-2 dark:from-stone-800 dark:to-zinc-800 dark:border-stone-700/50">
                <CardHeader>
                    <CardTitle className="text-2xl font-medium text-center">ตรวจค่าบำรุงการศึกษานักเรียน</CardTitle>
                    <CardDescription className="text-center text-pink-500">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sid border-pink-200">รหัสนักเรียน</Label>
                            <Input className='border-pink-300 border dark:border-stone-800' id="sid" name="sid" type="text" placeholder="กรอกรหัสนักเรียน" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cid">เลขบัตรประชาชน</Label>
                            <Input className='border-pink-300 border dark:border-stone-800' id="cid" name="cid" type="password" placeholder="กรอกเลขบัตรประชาชน" required />
                        </div>
                        <Button type="submit" className="w-full">เข้าสู่ระบบ</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}