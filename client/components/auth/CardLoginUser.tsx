'use client'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import AfterSignIn from '@/app/action/Auth/AfterSignIn'
import { signIn } from 'next-auth/react'

export default function CardLoginUser() {
    const router = useRouter()

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const res = await signIn("user-login", {
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            redirect: false,
        })
        await AfterSignIn();
        if (res?.error) {
            return toast.error('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง', { position: 'bottom-right' });
        }
        router.push('/');
    }

    return (
        <main className="flex justify-center items-center min-h-[80vh]">
            <Card className="w-full md:w-1/2 bg-gradient-to-t from-pink-200 to-rose-100 border-pink-300 border-2 dark:from-stone-800 dark:to-zinc-800 dark:border-stone-700/50">
                <CardHeader>
                    <CardTitle className="text-2xl font-medium text-center">ล็อกอิน</CardTitle>
                    <CardDescription className="text-center text-pink-500">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">ชื่อผู้ใช้</Label>
                            <Input className='border-pink-300 border dark:border-stone-800' id="username" name="username" type="text" placeholder="กรอกชื่อผู้ใช้" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">รหัสผ่าน</Label>
                            <Input className='border-pink-300 border dark:border-stone-800' id="password" name="password" type="password" placeholder="กรอกรหัสผ่าน" required />
                        </div>
                        <Button type="submit" className="w-full">เข้าสู่ระบบ</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}