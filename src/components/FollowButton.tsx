'use client'

import { Button } from "@radix-ui/themes";
import { UserPlusIcon } from "lucide-react";

export default function FollowButton() {
    return (
        <form action={async()=>{
            
        }}>
        <Button className="bg-gradient-to-tr from-ig-orange to-ig-red to-80% my-3">
            <UserPlusIcon className="size-5" />
            Follow
        </Button>
        </form>
    );
}