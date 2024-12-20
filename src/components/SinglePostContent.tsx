import Comment from "@/components/Comment";
import SessionCommentsForm from "@/components/SessionCommentsForm";
// import { prisma } from "@/db";
import { Suspense } from "react";
// import { uniq } from 'lodash';
import { BookmarkIcon, HeartIcon } from "lucide-react";
import LikesInfo from "@/components/LikesInfo";
import { getSinglePostData } from "@/actions";
import { Comment as CommentModel, Like, Post, Profile } from "@prisma/client";
// import { getSessionEmailOrThrow } from "@/actions";

export default  function SinglePostContent ({
    post,
    authorProfile,
    comments,
    commentsAuthor,
    myLike,
}:{
    post: Post;
    authorProfile: Profile;
    comments: CommentModel[];
    commentsAuthor: Profile[];
    myLike: Like | null;

}){
    // const data = await getSinglePostData(postId);
    return (
        <div>
            <div className="grid md:grid-cols-2 gap-4 ">
                <div className="">
                    <img className="rounded-md" src={post.image} alt={post.description} />
                </div>
                <div>
                    <Comment
                        createdAt={post.createdAt}
                        text={post.description}
                        authorProfile={authorProfile} />
                    <div className="pt-4 flex flex-col gap-2">
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <Comment
                                    createdAt={comment.createdAt}
                                    text={comment.text}
                                    authorProfile={commentsAuthor.find(a => a.email === comment.author)} />
                            </div>
                        ))}
                    </div>
                    <div className="flex text-gray-700 gap-2 py-4 mt-4 border-t border-t-gray-200 items-center justify-between">
                        <LikesInfo post={post} sessionLike={myLike} />
                        <div className="flex items-center">
                            <button>
                                <BookmarkIcon />
                            </button>
                        </div>
                    </div>
                    <div className="pt-8 border-t mt-2 border-t-gray-300">
                        {/* Post your comments: */}
                        <Suspense>
                            <SessionCommentsForm postId={post.id} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}