import { prisma } from "@/db";
import Avatar from "./Avatar";
import Link from "next/link";
import PostsGrid from "./PostsGrid";

export default async function SearchResults({ query }: { query: string }) {
    const profile = await prisma.profile.findMany({
        where: {
            OR: [
                { username: { contains: query }, },
                { name: { contains: query }, },
            ]
        },
        take: 10,
    });

    const posts = await prisma.post.findMany({
        where: {
            description: { contains: query },
        },
        take: 100,
    })
    return (
        <div>
            <h1 className="text-gray-500 mt-4">
                Search result for ...."{query}"
            </h1>

            {profile.length > 0 && (
                <div className="grid mt-4 grid-cols-2 gap-2">
                    {profile.map(profile => (
                        <Link
                            href={`/users/${profile.username}`}
                            className="flex gap-2 bg-gray-200 border border-gray-300 p-2 rounded-md">
                            <div>
                                <Avatar src={profile.avatar || ""} />
                            </div>
                            <div className="">
                                <h3 className="">{profile.name}</h3>
                                <h4 className="text-gray-500 text-xs">@{profile.username}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className="mt-4">
                <PostsGrid posts={posts} />
            </div>
        </div>
    );
}