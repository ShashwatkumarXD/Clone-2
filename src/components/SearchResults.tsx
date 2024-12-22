import { prisma } from "@/db";
import Avatar from "./Avatar";
import Link from "next/link";

export default async function SearchResults({ query }: { query: string }) {
    const profile = await prisma.profile.findMany({
        where: {
            OR: [
                { username: { contains: query }, },
                { name: { contains: query }, },
            ]
        }
    });
    return (
        <div>
            <h1 className="text-gray-500">
                Search result for ...."{query}"
            </h1>
            <h2 className="">Profile</h2>
            {/* {!profile.length && (
                <div className="text-gray-500">No profile found</div>
            )} */}
            <div className="grid grid-cols-2 gap-2">
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
        </div>
    );
}