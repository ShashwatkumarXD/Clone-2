'use server';

import { auth } from "./auth";
import { prisma } from "./db";

async function getSessionEmailOrThrow(){
    const session = await auth();
    const userEmail =session?.user?.email;
    if(!userEmail){
        throw 'not logged in';
    }
    return userEmail;
}

export async function updateProfile(data: FormData){
    // const session = await auth();
    const userEmail = await getSessionEmailOrThrow();
    const newUserInfo = {
        username: data.get('username') as string,
        name: data.get('name') as string,
        subtitle: data.get('subtitle') as string,
        bio: data.get('bio') as string,
        avatar: data.get('avatar') as string,
    };
    // console.log(data.get('username'));
    await prisma.profile.upsert({
        where: {
            email: userEmail,
        },
        update: newUserInfo,
        create: {
            email: userEmail,
            ...newUserInfo,
        },
    });

}

export async function postEntry(data: FormData){
    // const session = await auth(); 
    const sessionEmail = await getSessionEmailOrThrow();
    const postDoc = await prisma.post.create({
        data: {
            author: sessionEmail,
            image: data.get('image') as string,
            description: data.get('description') as string || '',
        },
    });
    return postDoc.id;
}