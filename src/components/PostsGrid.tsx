'use client';
import { Post } from '@prisma/client';
import Link from 'next/link';
import Masonry from 'react-masonry-css';


export default function PostsGrid({posts}:{posts:Post[]}) {
    return (
        <div className="max-w-4xl mx-auto">
            <Masonry
                breakpointCols={{
                    default: 4,
                    1100: 3,
                    500: 2,
                }}
                className="flex -ml-4"
                columnClassName="pl-4"
            >
                {posts.map((post, index) => (
                    <Link href={`/posts/${post.id}`}
                        key={index} // Unique key for each child
                        className="mb-4 rounded-md shadow-md shadow-gray-600"
                    >
                        <img className="rounded-sm" src={post.image} alt="post" />
                    </Link>
                ))}
            </Masonry>
        </div>
    );
}
