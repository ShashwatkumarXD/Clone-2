import { prisma } from "@/db";

export default async function SinglePostPage({ params }: { params: { id: string } }) {
    const post = await prisma.post.findFirstOrThrow({ where: { id: params.id } });
    const authorProfile = await prisma.profile.findFirstOrThrow({ where: { email: post.author } });

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-4 ">
                <div className="">
                    <img className="rounded-md" src={post.image} alt={post.description} />
                </div>
                <div>
                    <div className="flex gap-3">
                        <div className="">
                            <div className="size-12 aspect-square overflow-hidden rounded-full">
                                <img
                                    className=""
                                    src={authorProfile.avatar || ''}
                                    alt={authorProfile.username + 'avatar'} />
                            </div>
                        </div>
                        <div className="">
                            <h3 className="flex gap-1">
                                {authorProfile.name}
                            </h3>
                            <h4 className="text-gray-400 text-sm -mt-1">
                                @{authorProfile.username}
                            </h4>
                            <div className="bg-gray-200 rounded-md p-4 mt-2">
                                <p>
                                    {post.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}