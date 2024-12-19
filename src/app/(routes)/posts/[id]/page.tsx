// import Avatar from "@/components/Avatar";
import Comment from "@/components/Comment";
import SessionCommentsForm from "@/components/SessionCommentsForm";
import { prisma } from "@/db";
import { Suspense } from "react";
import { uniq } from 'lodash';
import { BookmarkIcon, HeartIcon } from "lucide-react";
import LikesInfo from "@/components/LikesInfo";
import { getSessionEmailOrThrow } from "@/actions";

export default async function SinglePostPage({ params }: { params: { id: string } }) {
    const post = await prisma.post.findFirstOrThrow({ where: { id: params.id } });
    const authorProfile = await prisma.profile.findFirstOrThrow({ where: { email: post.author } });
    const comments = await prisma.comment.findMany({ where: { postId: post.id } });
    const commentsAuthor = await prisma.profile.findMany({
        where: {
            email: { in: uniq(comments.map(c => c.author)) },
        }
    })

    const myLike = await prisma.like.findFirst({
        where: {
            author: await getSessionEmailOrThrow(),
            postId: post.id,
        }
    });
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
                        <LikesInfo post={post} sessionLike={myLike}/>
                        <div className="flex items-center">
                            <button>
                                <BookmarkIcon/>
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