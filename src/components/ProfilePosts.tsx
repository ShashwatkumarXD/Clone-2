import { prisma } from "@/db";
import PostsGrid from "./PostsGrid";

export default async function ProfilePosts ({email}:{email:string}){ //it will take a prop of email
    const posts = await prisma.post.findMany({where:{author:email}});
    return(
        <PostsGrid posts = {posts} />
    );
}