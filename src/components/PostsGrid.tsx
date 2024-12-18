// 'use client'
// import Masonry from 'react-masonry-css';
// const images = [
//     'https://picsum.photos/id/32/1024/768',
//     'https://picsum.photos/id/10/200/300',
//     'https://picsum.photos/id/34/1024/768',
//     'https://picsum.photos/id/35/768/1024',
//     'https://picsum.photos/id/36/1024/768',
//     'https://picsum.photos/id/37/768/1024',
//     'https://picsum.photos/id/38/1024/768',
//     'https://picsum.photos/id/39/768/1024',
//     'https://picsum.photos/id/40/1024/768',
//     'https://picsum.photos/id/41/768/1024',
//     'https://picsum.photos/id/42/1024/768',
//     'https://picsum.photos/id/43/768/1024',

// ];
// export default function PostsGrid() {
//     return (
//         <div className='max-w-4xl mx-auto'>
//             <Masonry
//                 breakpointCols={{
//                     default: 4,
//                     1100: 3,
//                     500: 2
//                 }}
//                 className="flex -ml-4"
//                 columnClassName="pl-4">
//                 {/* array of JSX items */}
//                 {images.map(src => (
//                     <div className='mb-4 border-4 rounded-md border-gray-500'>
//                         <img className='rounded-sm' src={src} alt="post" />
//                     </div>
//                 ))}
//             </Masonry>
//         </div>

//     );
// }

'use client';
import Masonry from 'react-masonry-css';

const images = [
    'https://picsum.photos/id/32/1024/768',
    'https://picsum.photos/id/10/200/300',
    'https://picsum.photos/id/34/1024/768',
    'https://picsum.photos/id/35/768/1024',
    'https://picsum.photos/id/36/1024/768',
    'https://picsum.photos/id/37/768/1024',
    'https://picsum.photos/id/38/1024/768',
    'https://picsum.photos/id/39/768/1024',
    'https://picsum.photos/id/40/1024/768',
    'https://picsum.photos/id/41/768/1024',
    'https://picsum.photos/id/42/1024/768',
    'https://picsum.photos/id/43/768/1024',
];

export default function PostsGrid() {
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
                {images.map((src, index) => (
                    <div
                        key={index} // Unique key for each child
                        className="mb-4 border-4 rounded-md border-gray-500"
                    >
                        <img className="rounded-sm" src={src} alt="post" />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}
