import { auth } from "@/auth";
import ProfilePageContent from "@/components/ProfilePageContent";
// import PostsGrid from "@/components/PostsGrid";
// import ProfilePosts from "@/components/ProfilePosts";
import { prisma } from "@/db";
// import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
// import Link from "next/link";
import { redirect } from "next/navigation";
// import { Suspense } from "react";

export default async function ProfilePage() {

    // this how we export aur data from db to the client side.
    // to be remember: FindFirstOrThrow is used to fetch first table from the db and if not throw error.
    const session = await auth();
    const profile = await prisma.profile
    .findFirst({ where: { email: session?.user?.email as string } });
    if(!profile){
        return redirect('/settings');
    }
    //

    return (
        <ProfilePageContent profile={profile} isOurProfile={true} />
    );
}

//this <Suspense fallback="Loading..."></Suspense> is used to refresh the fast, So that i could render faster.