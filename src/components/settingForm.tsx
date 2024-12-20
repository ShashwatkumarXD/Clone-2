'use client'
import { updateProfile } from "@/actions";
// import { auth } from "@/auth";
// import { prisma } from "@/db";
import { Profile } from "@prisma/client";
import { TextField, TextArea, Button } from "@radix-ui/themes";
import { CloudUpload } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import { redirect } from "next/navigation";



export default function SettingForm({
    profile,
}: {
    profile: Profile | null;
}) {
    const router = useRouter();
    const fileInRef = useRef<HTMLInputElement>(null);
    const [file, setfile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
    useEffect(() => {
        if (file) {
            const data = new FormData()
            data.set("file", file);
            fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then(response =>{
                response.json().then(url => {
                    setAvatarUrl(url);
                });
            });
        }
    }, [file]);
    // const session = await auth();
    return (
        <form action={async (data: FormData) => {
            //below we created a function for data
            await updateProfile(data);
            router.push('/profile');
            router.refresh();
            // redirect('/profile');
            //upsert means either update or insert 
        }}>
            <input type="hidden" name="avatar" value={avatarUrl || ''}/>
            <div className="flex gap-4 items-center">
                <div>
                    <div className="bg-gray-400 size-24 rounded-full overflow-hidden aspect-square shadow-md shadow-gray-400">
                        <img className="" src={avatarUrl || ''} alt=""/>
                    </div>
                </div>
                <div>
                    <input type="file"
                        ref={fileInRef}
                        className="hidden"
                        onChange={ev => setfile(ev.target.files?.[0] || null)} />
                    <Button
                        variant="surface"
                        type="button"
                        onClick={() => fileInRef.current?.click()}>
                        <CloudUpload />
                        change Avatar
                    </Button>
                </div>
            </div>
            <p className="mt-2 font-bold">username</p>
            <TextField.Root
                name="username"
                defaultValue={profile?.username || ''}
                placeholder="your_username" />
            <p className="mt-2 font-bold">name</p>
            <TextField.Root
                name="name"
                defaultValue={profile?.name || ''}
                placeholder="shashwat kumar" />
            <p className="mt-2 font-bold">subtitle</p>
            <TextField.Root
                name="subtitle"
                defaultValue={profile?.subtitle || ''}
                placeholder="username" />
            <p className="mt-2 font-bold">bio</p>
            <TextArea name="bio"
                defaultValue={profile?.bio || ''} />
            <div className="mt-2 flex justify-center">
                <Button variant="solid">Save Setting</Button>
            </div>

        </form>
    );
}