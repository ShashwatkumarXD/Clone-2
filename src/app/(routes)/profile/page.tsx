import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/db";
import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {

    // this how we export aur data from db to the client side.
    // to be remember: FindFirstOrThrow is used to fetch first table from the db and if not throw error.
    const session = await auth();
    const profile = await prisma.profile.findFirstOrThrow({where: {email:session?.user?.email as string}})
    //

    return (
        <main>
            <section className="flex justify-between items-center">
                <button>
                    <ChevronLeft />
                </button>
                <div className="font-bold flex items-center gap-2">
                    {profile.username}
                    <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
                        <CheckIcon size={16} />
                    </div>
                </div>
                <Link href='/settings'>
                    <CogIcon />
                </Link>
            </section>
            <section className="mt-8 flex justify-center">
                <div className="size-48 p-2 bg-gradient-to-tr from-ig-orange to-ig-red rounded-full">
                    <div className="size-44 p-2 bg-white rounded-full">
                        <div className="size-40 aspect-square overflow-hidden rounded-full">
                            <img
                                className="object-cover"
                                src={profile.avatar || ""}
                                alt=""></img>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center mt-4">
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-gray-500 mt-1 mb-1">{profile.subtitle}</p>
                <p className="">
                    {profile.bio}
                </p>
            </section>
            <section className="mt-4">
                <div className="flex justify-center gap-4 font-bold">
                    <Link href={''}>Posts</Link>
                    <Link className="text-gray-400" href={'/highlights'}>Highlights</Link>
                </div>
            </section>
            <section className="mt-4">
                <PostsGrid/>
            </section>
        </main>
    );
}