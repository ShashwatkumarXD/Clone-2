import { getSinglePostData } from "@/actions";
import Modal from "@/components/Modal";
import SinglePostContent from "@/components/SinglePostContent";

export default async function PhotosInModel({ params: { id } }: { params: { id: string } }) {
    const { post,
        authorProfile,
        comments,
        commentsAuthor,
        myLike } = await getSinglePostData(id);
    return (
        <Modal>
            <SinglePostContent
                post={post}
                authorProfile={authorProfile}
                comments={comments}
                commentsAuthor={commentsAuthor}
                myLike={myLike}
            />
        </Modal>
    );
}