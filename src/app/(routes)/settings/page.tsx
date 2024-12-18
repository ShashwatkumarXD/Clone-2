// import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import SettingForm from "@/components/settingForm";
import { prisma } from "@/db";

// import { redirect } from "next/dist/server/api-utils";

export default async function SettingsPage() {
    const session = await auth();
    if(!session?.user?.email){
        return 'not logged in';
    }
    const profile = await prisma.profile.findFirstOrThrow({
        where: {email: session.user.email},
    });
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Profile settings</h1>
            <SettingForm 
            profile={profile}
            userEmail={session.user.email}/>
        </div>
    );
}