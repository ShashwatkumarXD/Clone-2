// import { Prisma } from "@prisma/client";
import { auth, signOut } from "@/auth";
import SettingForm from "@/components/settingForm";
import { prisma } from "@/db";
import { Button } from "@radix-ui/themes";

// import { redirect } from "next/dist/server/api-utils";

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user?.email) {
        return 'not logged in';
    }
    const profile = await prisma.profile.findFirst({
        where: { email: session.user.email },
    });
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Profile settings</h1>
            <p className="text-gray-500 text-xs text-center -mt-4 mb-4 ">
                {session.user.email}
            </p>
            <SettingForm
                profile={profile}/>
            <div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
                <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    {/* <button className="border px-4 py-2 bg-ig-red text-white rounded" type="submit">
                        Logout
                    </button> */}
                <Button type="submit" variant="outline">Logout</Button>
                </form>
            </div>
        </div>
    );
}