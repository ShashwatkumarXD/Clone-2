'use client'

import { followProfile, unfollowProfile } from "@/actions";
import { Follower } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
    profileIdToFollow,
    ourFollow = null,

}: {
    profileIdToFollow: string;
    ourFollow: Follower | null;

}) {

    const router = useRouter();
    const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);
    return (
        <form action={async () => {
            setIsFollowed(prev => !prev);
            if (isFollowed) {
                //unfollow
                // setIsFollowed(false);
                await unfollowProfile(profileIdToFollow);
            } else {
                //follow
                // setIsFollowed(true);
                await followProfile(profileIdToFollow)
            }
            router.refresh();
        }}>
            {/* <input type="hidden" name="profileIdToFollow" value={}/> */}
            <Button
                size="3"
                className={
                    isFollowed ? 'bg-red-500 my-3'
                        : "bg-gradient-to-tr from-ig-orange to-ig-red to-80% my-3"}>
                {isFollowed ? <UserMinusIcon className="size-5" /> : <UserPlusIcon className="size-5" />}
                {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
        </form>
    );
}