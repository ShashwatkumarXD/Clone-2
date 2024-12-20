'use client'

import { likePost, removeLikeFromPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikesInfo({ post,sessionLike }: { post: Post,sessionLike:Like|null }) {
    const router = useRouter();
    const [likedByMe, setLikedByMe] = useState(!!sessionLike);
    return (
        <form
        action={async (data:FormData )=>{
            setLikedByMe(prev => !prev);
            if(likedByMe){
                // remove like
                await removeLikeFromPost(data);
            }else{
                // add like
                await likePost(data);
            }
            
            router.refresh();
        }}
        className="flex items-center gap-2">
            <input type="hidden" name="postId" value={post.id}/>
            <button
                className="" type="submit">
                <HeartIcon className={likedByMe ? 'text-red-500 fill-red-500' : ''} />
            </button>
            {post.likesCount} people like this
        </form>
    );
}